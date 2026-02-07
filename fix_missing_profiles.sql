
-- Backfill missing profiles for existing auth users
-- This fixes the issue where a User exists in Auth but not in the Profiles table

INSERT INTO public.profiles (
    id, 
    first_name, 
    father_name, 
    grand_father_name, 
    mobile_number, 
    email_address, 
    region, 
    zone
)
SELECT 
    id, 
    'System', 
    'User', 
    'Fixed', 
    -- Use phone if available, otherwise generate a placeholder using the ID to ensure uniqueness
    COALESCE(phone, 'placeholder_' || substr(id::text, 1, 8)), 
    email, 
    'Addis Ababa', 
    'Finfinne'
FROM auth.users
WHERE NOT EXISTS (
    SELECT 1 FROM public.profiles WHERE profiles.id = auth.users.id
);
