'use server'

import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { checkAdminStatus } from '@/actions/auth';

export async function createProject(formData: FormData) {
  try {
    if (!(await checkAdminStatus())) throw new Error("Unauthorized: Only admins can create projects.");

    // 1. Handle Image Upload (if provided)
    const file = formData.get('image') as File;
    let imageUrl = '';

    if (file && file.size > 0) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      // 🟢 สิ่งที่เพิ่มเข้ามา: แปลง File เป็น ArrayBuffer แล้วทำเป็น Buffer ดิบ
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // 🟢 เปลี่ยนจากส่ง file เฉยๆ เป็นส่ง buffer และระบุประเภทไฟล์ (contentType)
      const { error: uploadError } = await supabaseAdmin.storage
        .from('project-images')
        .upload(fileName, buffer, {
          contentType: file.type,
        });

      if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);

      const { data: publicUrlData } = supabaseAdmin.storage
        .from('project-images')
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }
    // 2. Process Skills Array
    const skillsString = formData.get('skills') as string;
    const skillsArray = skillsString ? skillsString.split(',').map(s => s.trim()).filter(Boolean) : [];

    // 3. Prepare Data Payload
    const projectData = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      quest_type: formData.get('questType') as string,
      role: formData.get('role') as string,
      timeline: formData.get('timeline') as string,
      skills: skillsArray,
      lore: formData.get('lore') as string,
      demo_link: formData.get('demoLink') as string || null,
      frontend_link: formData.get('frontendLink') as string || null,
      backend_link: formData.get('backendLink') as string || null,
      is_pinned: formData.get('isPinned') === 'on', // Checkbox returns 'on' if checked
      image_url: imageUrl
    };


    // 4. Insert into Database
    const { error: dbError } = await supabaseAdmin.from('projects').insert([projectData]);
    if (dbError) throw new Error(`Database error: ${dbError.message}`);

    // Revalidate paths to show fresh data
    revalidatePath('/');
    revalidatePath('/projects');

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteProject(projectId: string, imageUrl: string | null) {
  try {
    if (!(await checkAdminStatus())) throw new Error("Unauthorized: Only admins can delete projects.");

    // 1. Delete image from Storage if it exists
    if (imageUrl) {
      // Extract filename from the URL
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      if (fileName) {
        const { error: storageError } = await supabaseAdmin.storage
          .from('project-images')
          .remove([fileName]);
        
        if (storageError) console.error('Storage deletion error:', storageError);
      }
    }

    // 2. Delete from Database
    const { error: dbError } = await supabaseAdmin
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (dbError) throw new Error(`Failed to delete project: ${dbError.message}`);

    // 3. Revalidate paths
    revalidatePath('/');
    revalidatePath('/settings');
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateProject(id: string, formData: FormData) {
  try {
    if (!(await checkAdminStatus())) throw new Error("Unauthorized: Only admins can update projects.");

    const file = formData.get('image') as File;
    let imageUrl = formData.get('existingImage') as string || '';

    if (file && file.size > 0) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: uploadError } = await supabaseAdmin.storage
        .from('project-images')
        .upload(fileName, buffer, {
          contentType: file.type,
        });

      if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);

      const { data: publicUrlData } = supabaseAdmin.storage
        .from('project-images')
        .getPublicUrl(fileName);

      // 🟢 ลบรูปภาพเก่าทิ้งจาก Storage (ถ้ามีรูปเก่าอยู่)
      if (imageUrl) {
        const oldUrlParts = imageUrl.split('/');
        const oldFileName = oldUrlParts[oldUrlParts.length - 1];
        if (oldFileName) {
          await supabaseAdmin.storage.from('project-images').remove([oldFileName]);
        }
      }

      imageUrl = publicUrlData.publicUrl;
    }

    const skillsString = formData.get('skills') as string;
    const skillsArray = skillsString ? skillsString.split(',').map(s => s.trim()).filter(Boolean) : [];

    const projectData = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      quest_type: formData.get('questType') as string,
      role: formData.get('role') as string,
      timeline: formData.get('timeline') as string,
      skills: skillsArray,
      lore: formData.get('lore') as string,
      demo_link: formData.get('demoLink') as string || null,
      frontend_link: formData.get('frontendLink') as string || null,
      backend_link: formData.get('backendLink') as string || null,
      is_pinned: formData.get('isPinned') === 'on',
      image_url: imageUrl
    };

    const { error: dbError } = await supabaseAdmin.from('projects').update(projectData).eq('id', id);
    if (dbError) throw new Error(`Database error: ${dbError.message}`);

    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath(`/projects/${projectData.slug}`);
    revalidatePath('/settings');

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
