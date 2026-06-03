'use server'

import { cookies } from 'next/headers';

export async function verifyPasscode(passcode: string) {
  const correctPasscode = process.env.ADMIN_PASSCODE;
  
  if (!correctPasscode) {
    return { success: false, message: 'Server configuration error.' };
  }
  
  if (passcode === correctPasscode) {
    // Set a secure, HTTP-only cookie that lasts for 24 hours
    // In Next 15+, cookies() is async
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'unlocked', { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    return { success: true };
  }
  
  return { success: false, message: 'Invalid Master Passcode.' };
}

export async function checkAdminStatus() {
  const cookieStore = await cookies();
  return cookieStore.get('admin_session')?.value === 'unlocked';
}

export async function lockEditMode() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
}
