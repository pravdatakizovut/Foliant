import { createClient } from "@/lib/supabase/server";
import { ProfileCard } from "../_components/UserInfo/ProfileCard";
import { notFound } from "next/navigation";
import type { Profile } from "@/types/profile";
import ProgressTracker from "../_components/ProgressTracker/ProgressTracker";
import StreakTracker from "../_components/StreakTracker/StreakTracker";
import UserStatistics from "../_components/UserStatistics/UserStatistics";

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}
// str fixed
export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single<Profile>();

  if (!profile) {
    notFound();
  }

  const { count: followersCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("following_id", id);

  const { count: followingCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("follower_id", id);

  let isFollowing = false;
  if (user && user.id !== id) {
    const { data: follow } = await supabase
      .from("follows")
      .select("*")
      .eq("follower_id", user.id)
      .eq("following_id", id)
      .single();

    isFollowing = !!follow;
  }

  return (
    <div className="foliant-container mt-40 grid grid-cols-12 pb-10 gap-8">
      <div className="col-span-4 gap-6 flex flex-col">
        <ProfileCard
          profile={profile}
          currentUser={user}
          followersCount={followersCount ?? 0}
          followingCount={followingCount ?? 0}
          isFollowing={isFollowing}
        />
        <ProgressTracker />
        <StreakTracker />
      </div>
      <div className="col-span-8 flex gap-4 h-25">
        <UserStatistics />
      </div>
    </div>
  );
}
