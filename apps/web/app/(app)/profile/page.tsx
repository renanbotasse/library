import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProfileClient } from "./ProfileClient";

export const metadata: Metadata = { title: "Profile" };

export default async function ProfilePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  // Get profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Get collection stats
  const { data: stats } = await supabase
    .from("collection")
    .select("status")
    .eq("user_id", user.id);

  const counts = {
    total: stats?.length ?? 0,
    read: stats?.filter((s) => s.status === "read").length ?? 0,
    reading: stats?.filter((s) => s.status === "reading").length ?? 0,
    to_read: stats?.filter((s) => s.status === "to_read").length ?? 0,
  };

  return (
    <ProfileClient
      user={{ id: user.id, email: user.email ?? "", name: profile?.full_name ?? user.user_metadata?.["full_name"] ?? "" }}
      avatarUrl={profile?.avatar_url ?? null}
      stats={counts}
    />
  );
}
