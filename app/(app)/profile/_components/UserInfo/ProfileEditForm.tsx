"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { updateProfile, uploadAvatar } from "@/app/actions/profile";
import type { Profile } from "@/types/profile";
import { Avatar } from "./Avatar";
import { formatJoinDate } from "../../_utils/date";

interface ProfileEditFormProps {
  profile: Profile;
  onCancel: () => void;
}

export function ProfileEditForm({ profile, onCancel }: ProfileEditFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState(profile.username || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(
    profile.avatar_url,
  );
  const [isPending, setIsPending] = useState(false);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewAvatar(URL.createObjectURL(file));
    }
  }

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
    onCancel();
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative group shrink-0 cursor-pointer"
        >
          <Avatar src={previewAvatar} username={username || profile.username} />
          <span className="absolute w-8 h-8 bg-[#1a1a20] border border-border-input right-0 bottom-0 rounded-full flex items-center justify-center text-white group-hover:bg-[#34343D] transition">
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
          className="w-full resize-none text-sm mb-4 h-15"
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
  );
}
