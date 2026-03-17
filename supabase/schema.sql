-- Table: bookings (Recreated to ensure 'source' field is properly set up)
DROP TABLE IF EXISTS public.bookings;

CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    event_date DATE NOT NULL,
    package TEXT NOT NULL,
    requirements TEXT,
    amount NUMERIC,
    discount NUMERIC,
    status TEXT DEFAULT 'pending'::text NOT NULL CHECK (status IN ('pending', 'completed', 'delivered')),
    source TEXT NOT NULL CHECK (source IN ('customer', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: gallery
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    url TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('wedding', 'prewedding', 'cinematic')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: videos
CREATE TABLE IF NOT EXISTS public.videos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    couple TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    youtube_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup basic RLS (Row Level Security) - allowing anon access for simplicity in the demo, adjust for production.
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Allow read access to everyone for gallery and videos
CREATE POLICY "Allow public read action on gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read action on videos" ON public.videos FOR SELECT USING (true);

-- Allow public insert on bookings (for customer form)
CREATE POLICY "Allow public insert on bookings" ON public.bookings FOR INSERT WITH CHECK (true);
-- Allow public select/update/delete on bookings (acting as "admin" for simplicity without full auth hookup)
CREATE POLICY "Allow public all actions on bookings for demo admin" ON public.bookings FOR ALL USING (true);
