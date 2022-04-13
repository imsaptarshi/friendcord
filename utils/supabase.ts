import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://keeqnndempzzoysmkzzf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlZXFubmRlbXB6em95c21renpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDkyMjIwMDIsImV4cCI6MTk2NDc5ODAwMn0.uYcBOWHcIHoHXchvG7l95lSoY57THTGhmDLc2GAEknM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);