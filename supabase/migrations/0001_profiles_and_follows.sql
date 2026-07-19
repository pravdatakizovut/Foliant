-- Profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  display_name text,
  email text,
  bio text,
  avatar_url text,
  created_at timestamptz default now()
);

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS username text,
  ADD COLUMN IF NOT EXISTS display_name text,
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS bio text,
  ADD COLUMN IF NOT EXISTS avatar_url text;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'profiles_username_key' AND conrelid = 'public.profiles'::regclass
  ) THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_username_key UNIQUE (username);
  END IF;
END
$$;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Follows table
CREATE TABLE IF NOT EXISTS public.follows (
  follower_id uuid references public.profiles(id) on delete cascade,
  following_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (follower_id, following_id)
);

ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Follows are viewable by everyone" ON public.follows;
CREATE POLICY "Follows are viewable by everyone"
  ON public.follows FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can follow" ON public.follows;
CREATE POLICY "Authenticated users can follow"
  ON public.follows FOR INSERT
  WITH CHECK (auth.uid() = follower_id);

DROP POLICY IF EXISTS "Users can unfollow" ON public.follows;
CREATE POLICY "Users can unfollow"
  ON public.follows FOR DELETE
  USING (auth.uid() = follower_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, email)
  VALUES (
    NEW.id,
    split_part(NEW.email, '@', 1),
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email
  )
  ON CONFLICT (id) DO UPDATE
  SET username = EXCLUDED.username,
      display_name = EXCLUDED.display_name,
      email = EXCLUDED.email;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Storage bucket for avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Avatar images are publicly accessible." ON storage.objects;
CREATE POLICY "Avatar images are publicly accessible."
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Users can upload their own avatar." ON storage.objects;
CREATE POLICY "Users can upload their own avatar."
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "Users can update their own avatar." ON storage.objects;
CREATE POLICY "Users can update their own avatar."
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "Users can delete their own avatar." ON storage.objects;
CREATE POLICY "Users can delete their own avatar."
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
