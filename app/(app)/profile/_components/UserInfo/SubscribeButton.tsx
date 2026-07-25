"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { followUser, unfollowUser } from "@/app/actions/follow";
import Button from "@/components/ui/Buttons/Button";

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
    <Button
      type="button"
      variant={isFollowing ? "outline" : "primary"}
      size="md"
      isLoading={isPending}
      onClick={handleClick}
      className="rounded-full px-8"
    >
      {isFollowing ? "Отписаться" : "Подписаться"}
    </Button>
  );
}
