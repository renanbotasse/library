import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { CollectionGrid } from "@/components/collection/CollectionGrid";
import { CollectionFilters } from "@/components/collection/CollectionFilters";
import { CollectionSearch } from "@/components/collection/CollectionSearch";
import { ViewToggle } from "./ViewToggle";

export const metadata: Metadata = { title: "My Library" };

export default async function CollectionPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 pb-28 pt-6 md:pb-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-text">My Library</h1>
        <ViewToggle />
      </div>

      <CollectionSearch />
      <CollectionFilters />
      <CollectionGrid />
    </div>
  );
}
