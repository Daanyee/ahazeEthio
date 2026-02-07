
-- Fix Products table to link with Posts
ALTER TABLE products ADD COLUMN IF NOT EXISTS post_id UUID REFERENCES posts(id) ON DELETE CASCADE;

-- Fix Rentals table to link with Posts
ALTER TABLE rentals ADD COLUMN IF NOT EXISTS post_id UUID REFERENCES posts(id) ON DELETE CASCADE;

-- Force PostgREST schema cache reload
NOTIFY pgrst, 'reload schema';
