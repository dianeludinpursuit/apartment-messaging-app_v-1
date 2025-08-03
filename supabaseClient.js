// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Access environment variables using import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if keys are loaded (good for debugging)
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase environment variables are not loaded! Check your .env file and VITE_ prefix.");
  // Optionally throw an error or handle this more gracefully in production
} else {
  console.log("Supabase URL and Key loaded from environment variables.");
}

// Create and export the Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);