import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Please check .env.local');
}

// 1. Public Client: For fetching data (Safe to use in Client Components)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 2. Admin Client: For Server Actions only (Bypasses RLS - NEVER import this in 'use client' files)
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey) 
  : null as any;
