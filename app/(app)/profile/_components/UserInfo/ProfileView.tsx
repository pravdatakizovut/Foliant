"use client";

import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/types/profile";
import { SubscribeButton } from "./SubscribeButton";
import { Avatar } from "./Avatar";
import { formatJoinDate } from "../../_utils/date";

interface ProfileViewProps {
  profile: Profile;
  currentUser: User | null;
  isFollowing: boolean;
  onEdit: () => void;
}

export function ProfileView({
  profile,
  currentUser,
  isFollowing,
  onEdit,
}: ProfileViewProps) {
  const isOwner = currentUser?.id === profile.id;

  return (
    <div className="flex flex-col justify-between gap-3">
      <div className="flex gap-4">
        <Avatar src={profile.avatar_url} username={profile.username} />

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold truncate">
            {profile.username || "Пользователь"}
          </h1>
          <p className="text-text-secondary mb-3 break-all">{profile.email}</p>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="text-text-secondary mb-4 h-15 text-sm">
          {profile.bio ||
            "Расскажите о себе, своих книжных вкусах и предпочтениях, чтобы другим читателям было легче находить вас."}
        </p>

        <div className="flex gap-4 justify-between items-center">
          <span className="text-text-secondary text-sm">
            На Foliant с {formatJoinDate(profile.created_at)}
          </span>
          <div className="flex flex-wrap gap-3">
            {isOwner && (
              <button
                type="button"
                onClick={onEdit}
                className="px-6 py-2 border border-border-input rounded-full hover:bg-white/5 transition cursor-pointer"
              >
                Редактировать
              </button>
            )}
            {!isOwner && currentUser && (
              <SubscribeButton
                userId={profile.id}
                initialIsFollowing={isFollowing}
              />
            )}
            {!currentUser && (
              <p className="text-text-secondary text-sm">
                Войдите, чтобы подписаться
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
