"use client";

import { useState } from "react";
import type { Profile } from "@/types/profile";
import type { User } from "@supabase/supabase-js";
import { ProfileEditForm } from "./ProfileEditForm";
import { ProfileView } from "./ProfileView";

interface ProfileCardProps {
  profile: Profile;
  currentUser: User | null;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
}

export function ProfileCard({
  profile,
  currentUser,
  isFollowing,
}: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-h-62.5 col-span-4 border border-border-input rounded-3xl p-5 bg-bg-secondary">
      {isEditing ? (
        <ProfileEditForm
          profile={profile}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ProfileView
          profile={profile}
          currentUser={currentUser}
          isFollowing={isFollowing}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </div>
  );
}
