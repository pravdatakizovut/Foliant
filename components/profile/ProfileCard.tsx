"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { updateProfile, uploadAvatar } from "@/app/actions/profile";
import { SubscribeButton } from "./SubscribeButton";
import type { Profile } from "@/types/profile";
import type { User } from "@supabase/supabase-js";
import { Pencil, X } from "lucide-react";
import Image from "next/image";

interface ProfileCardProps {
  profile: Profile;
  currentUser: User | null;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
}

function formatJoinDate(dateString: string) {
  const date = new Date(dateString);
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

function Avatar({
  src,
  username,
}: {
  src: string | null;
  username: string | null;
}) {
  const initial = (username || "П").charAt(0).toUpperCase();

  if (src) {
    return (
      <Image
        src={src}
        alt=""
        width={80}
        height={80}
        className="w-20 h-20 rounded-full object-cover border border-border-input"
      />
    );
  }

  return (
    <div className="w-20 h-20 rounded-full bg-accent-primary/10 border border-border-input flex items-center justify-center text-3xl font-bold text-accent-primary">
      {initial}
    </div>
  );
}

export function ProfileCard({
  profile,
  currentUser,
  followersCount,
  followingCount,
  isFollowing,
}: ProfileCardProps) {
  const router = useRouter();
  const isOwner = currentUser?.id === profile.id;
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(profile.username || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(
    profile.avatar_url,
  );
  const [isPending, setIsPending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsPending(true);

    const profileForm = new FormData();
    profileForm.set("username", username.trim());
    profileForm.set("bio", bio.trim());
    const profileResult = await updateProfile(profileForm);

    if (profileResult.error) {
      alert(profileResult.error);
      setIsPending(false);
      return;
    }

    if (fileInputRef.current?.files?.[0]) {
      const avatarForm = new FormData();
      avatarForm.set("avatar", fileInputRef.current.files[0]);
      const avatarResult = await uploadAvatar(avatarForm);
      if (avatarResult.error) {
        alert(avatarResult.error);
      }
    }

    setIsPending(false);
    setIsEditing(false);
    router.refresh();
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewAvatar(URL.createObjectURL(file));
    }
  }

  return (
    <div className="  max-h-[250px] col-span-4 border border-border-input rounded-3xl p-5 bg-bg-secondary">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative group shrink-0 cursor-pointer"
            >
              <Avatar
                src={previewAvatar}
                username={username || profile.username}
              />
              <span className="absolute w-8 h-8 bg-[#1a1a20] border border-border-input right-0  bottom-0 rounded-full flex items-center justify-center text-white group-hover:bg-[#34343D]/100 transition">
                <Pencil className="w-4 h-4 text-accent-primary" />
              </span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />

            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-2xl font-bold w-full"
                placeholder="username"
              />
              <p className="text-text-secondary break-all">{profile.email}</p>
            </div>
          </div>

          <div className="flex flex-col">
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full resize-none text-sm  mb-4 h-15"
              placeholder="Расскажите о себе, своих книжных вкусах и предпочтениях, чтобы другим читателям было легче находить вас."
            />

            <div className="flex gap-4 justify-between items-center">
              <span className="text-text-secondary text-sm">
                На Foliant с {formatJoinDate(profile.created_at)}
              </span>
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2 bg-accent-primary text-white rounded-full hover:bg-accent-primary/80 disabled:opacity-50 transition cursor-pointer"
                >
                  {isPending ? "Сохранение..." : "Сохранить"}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex flex-col justify-between gap-3">
          <div className="flex gap-4">
            <Avatar
              src={previewAvatar}
              username={username || profile.username}
            />

            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold  truncate">
                {profile.username || "Пользователь"}
              </h1>
              <p className="text-text-secondary mb-3 break-all">
                {profile.email}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-text-secondary mb-4  h-15 text-sm">
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
                    onClick={() => setIsEditing(true)}
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
      )}
    </div>
  );
}
