import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/auth/actions";

export async function Navbar() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header
      className="sticky top-0 z-40 hidden backdrop-blur-md md:block"
      style={{ borderBottom: "1px solid rgba(163,130,74,0.1)", backgroundColor: "rgba(11,10,15,0.85)" }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="font-serif text-3xl text-gold transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(163,130,74,0.7)] leading-none">
            ⚿
          </span>
          <span className="font-serif text-2xl font-bold tracking-wider text-text">
            Wonder<span className="text-gold">library</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link
                href="/search"
                className="font-sans text-sm text-muted transition-colors duration-200 hover:text-text"
              >
                Search
              </Link>
              <Link
                href="/collection"
                className="font-sans text-sm text-muted transition-colors duration-200 hover:text-text"
              >
                Library
              </Link>
              <Link
                href="/profile"
                className="font-sans text-sm text-muted transition-colors duration-200 hover:text-text"
              >
                Profile
              </Link>
              <form action={logout}>
                <button type="submit" className="btn-dark">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="font-sans text-sm text-muted transition-colors duration-200 hover:text-text"
              >
                Sign in
              </Link>
              <Link href="/auth/register" className="btn-gold-outline">
                Open the vault
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
