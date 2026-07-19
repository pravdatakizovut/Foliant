export interface Profile {
  id: string;
  username: string | null;
  display_name: string | null;
  email: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface ProfileWithStats extends Profile {
  followers_count: number;
  following_count: number;
}
