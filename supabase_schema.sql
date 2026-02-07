-- Core Profiles Table (Section [1])
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT NOT NULL,
  father_name TEXT NOT NULL,
  grand_father_name TEXT NOT NULL,
  mobile_number TEXT NOT NULL UNIQUE,
  email_address TEXT,
  gender TEXT CHECK (gender IN ('Male', 'Female')),
  birth_date DATE,
  region TEXT NOT NULL,
  zone TEXT NOT NULL,
  woreda TEXT,
  kebele TEXT,
  village TEXT,
  education_level TEXT,
  work_status TEXT,
  skills TEXT[],
  profile_photo_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organizations Table (Section [2])
CREATE TABLE organizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  managed_by UUID REFERENCES profiles(id),
  org_type TEXT, -- Business, Non-business
  business_type TEXT, -- Sole, PLC, etc.
  industry TEXT,
  tin_number TEXT,
  established_date DATE,
  region TEXT NOT NULL,
  zone TEXT NOT NULL,
  woreda TEXT,
  kebele TEXT,
  sefer TEXT,
  building TEXT,
  phone TEXT NOT NULL,
  email TEXT,
  about TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Posts Table (Section [3.1])
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES profiles(id),
  org_id UUID REFERENCES organizations(id),
  content_text TEXT,
  media_urls TEXT[],
  post_type TEXT CHECK (post_type IN ('normal', 'job', 'event', 'product', 'rent', 'live')),
  target_location JSONB, -- {region, zone, woreda, kebele}
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Jobs Extension Table (Section [3.2])
CREATE TABLE jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  job_name TEXT NOT NULL,
  description TEXT,
  workers_needed INTEGER DEFAULT 1,
  gender_preference TEXT,
  job_type TEXT,
  payment_amount DECIMAL,
  deadline DATE,
  min_education TEXT,
  min_experience_years INTEGER
);

-- Events Extension Table (Section [3.3])
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  event_name TEXT NOT NULL,
  purpose TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  entry_requirement TEXT DEFAULT 'Free', -- Free, Paid
  location_details JSONB
);

-- Products/Shelf Table (Section [3.4])
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES profiles(id),
  org_id UUID REFERENCES organizations(id),
  category TEXT,
  name TEXT NOT NULL,
  price DECIMAL NOT NULL,
  description TEXT,
  min_quantity INTEGER DEFAULT 1,
  stock_count INTEGER DEFAULT 0,
  media_urls TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rentals Table (Section [3.6])
CREATE TABLE rentals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES profiles(id),
  org_id UUID REFERENCES organizations(id),
  category TEXT,
  item_name TEXT NOT NULL,
  price_per_unit DECIMAL NOT NULL,
  unit_type TEXT, -- hour, day, month
  media_urls TEXT[]
);

-- Orders Table (Section [1.7.2 / 2.2.3])
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  buyer_id UUID REFERENCES profiles(id),
  quantity INTEGER NOT NULL,
  delivery_address JSONB,
  status TEXT DEFAULT 'Placed', -- Noticed, On the way, Delivered
  created_at TIMESTAMPTZ DEFAULT NOW()
);
