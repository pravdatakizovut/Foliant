"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Необходимо авторизоваться" };
  }

  const username = formData.get("username") as string;
  const bio = formData.get("bio") as string;

  const { error } = await supabase
    .from("profiles")
    .update({ username, bio })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/profile/${user.id}`);
  return { success: true };
}

export async function uploadAvatar(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Необходимо авторизоваться" };
  }

  const file = formData.get("avatar") as File;
  if (!file) {
    return { error: "Файл не выбран" };
  }

  const fileExt = file.name.split(".").pop() || "png";
  const filePath = `${user.id}/${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    return { error: uploadError.message };
  }

  const { data: { publicUrl } } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", user.id);

  if (updateError) {
    return { error: updateError.message };
  }

  revalidatePath(`/profile/${user.id}`);
  return { success: true };
}
