
-- 1. Explicitly add the column if it's missing (using IF NOT EXISTS to be safe)
ALTER TABLE posts ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES profiles(id);

-- 2. Force PostgREST to refresh its schema cache
-- This is often required after altering tables so the API knows about the new column
NOTIFY pgrst, 'reload schema';
