import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://vgialvtyczmfhhusvvkm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnaWFsdnR5Y3ptZmhodXN2dmttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIyNTcwMDEsImV4cCI6MjAxNzgzMzAwMX0.Jco7hk8OyaX7rC1fUQ2Kfc_sHSZgSxj0IOHm01EstC8";
export const supabase = createClient(supabaseUrl, supabaseKey);
