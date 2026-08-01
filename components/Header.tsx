import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import HeaderClient from "@/components/HeaderClient";

async function HeaderUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <HeaderClient user={user} />;
}

export default function Header() {
  return (
    <Suspense fallback={<HeaderClient user={undefined} />}>
      <HeaderUser />
    </Suspense>
  );
}
