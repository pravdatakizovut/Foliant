"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { followUser, unfollowUser } from "@/app/actions/follow";

interface SubscribeButtonProps {
  userId: string;
  initialIsFollowing: boolean;
}

export function SubscribeButton({ userId, initialIsFollowing }: SubscribeButtonProps) {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isPending, setIsPending] = useState(false);

  async function handleClick() {
    setIsPending(true);

    const action = isFollowing ? unfollowUser : followUser;
    const result = await action(userId);

    if (!result.error) {
      setIsFollowing((prev) => !prev);
      router.refresh();
    }

    setIsPending(false);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="px-8 py-2.5 rounded-full bg-accent-primary text-white hover:bg-accent-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      {isPending
        ? "Загрузка..."
        : isFollowing
        ? "Отписаться"
        : "Подписаться"}
    </button>
  );
}
