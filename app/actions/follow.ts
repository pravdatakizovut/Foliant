"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function followUser(userId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Необходимо авторизоваться" };
  }

  if (user.id === userId) {
    return { error: "Нельзя подписаться на себя" };
  }

  const { error } = await supabase
    .from("follows")
    .insert({ follower_id: user.id, following_id: userId });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/profile/${userId}`);
  return { success: true };
}

export async function unfollowUser(userId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Необходимо авторизоваться" };
  }

  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", user.id)
    .eq("following_id", userId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/profile/${userId}`);
  return { success: true };
}

export async function getProfileStats(userId: string) {
  const supabase = await createClient();

  const { count: followersCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("following_id", userId);

  const { count: followingCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("follower_id", userId);

  return {
    followersCount: followersCount ?? 0,
    followingCount: followingCount ?? 0,
  };
}
