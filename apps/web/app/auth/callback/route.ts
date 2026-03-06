import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  // Whitelist to prevent open redirect attacks
  const ALLOWED_NEXT = ["/collection", "/profile", "/search", "/"];
  const rawNext = searchParams.get("next") ?? "/collection";
  const next = ALLOWED_NEXT.includes(rawNext) ? rawNext : "/collection";

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=Authentication failed.`);
}
