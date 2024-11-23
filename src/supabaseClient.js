// src/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lslhnaujeydfbajpoeyh.supabase.co'; // Replace with your project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzbGhuYXVqZXlkZmJhanBvZXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyOTM3MzUsImV4cCI6MjA0Nzg2OTczNX0.AH98bLT39N7qa6QRcDq9cltraQlOghI7419oj7O9-s0'; // Replace with your anon key

export const supabase = createClient(supabaseUrl, supabaseKey);
