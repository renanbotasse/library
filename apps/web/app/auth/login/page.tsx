import type { Metadata } from "next";
import Link from "next/link";
import { login } from "../actions";
import { GoogleComingSoon } from "@/components/ui/GoogleComingSoon";
import { LandingScene3DWrapper } from "@/components/shelf/LandingScene3DWrapper";

export const metadata: Metadata = { title: "Enter the Vault" };

interface Props {
  searchParams: { error?: string; message?: string };
}

export default function LoginPage({ searchParams }: Props) {
  return (
    <div className="relative flex min-h-dvh items-center justify-center p-4">
      {/* 3D Background */}
      <LandingScene3DWrapper />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "radial-gradient(ellipse at center, rgba(11,10,15,0.55) 0%, rgba(11,10,15,0.88) 100%)" }}
      />

      <div className="relative z-10 w-full max-w-sm space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mb-4 font-serif text-7xl text-gold">⚿</div>
          <h1 className="font-serif text-3xl font-bold tracking-wide text-text">
            Enter the Vault
          </h1>
          <p className="mt-2 font-sans text-sm italic text-muted">
            Your library awaits.
          </p>
        </div>

        {/* Alerts */}
        {searchParams.error && (
          <div
            className="rounded-xl px-4 py-3 font-sans text-sm"
            style={{
              borderWidth: "1px",
              borderColor: "rgba(200,140,154,0.3)",
              backgroundColor: "rgba(107,31,51,0.12)",
              color: "#C88C9A",
            }}
          >
            {searchParams.error}
          </div>
        )}
        {searchParams.message && (
          <div
            className="rounded-xl px-4 py-3 font-sans text-sm"
            style={{
              borderWidth: "1px",
              borderColor: "rgba(49,67,56,0.35)",
              backgroundColor: "rgba(49,67,56,0.12)",
              color: "#7EC87E",
            }}
          >
            {searchParams.message}
          </div>
        )}

        {/* Form */}
        <form action={login} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="label-wl">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="input-wl"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="label-wl">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="input-wl"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn-gold-solid w-full rounded-xl py-3 text-base active:scale-95">
            Unlock ⚿
          </button>
        </form>

        {/* Divider */}
        <div className="divider-ornate">or continue with</div>

        {/* Google — coming soon */}
        <GoogleComingSoon />

        <Link href="/auth/register" className="btn-gold-outline block w-full rounded-xl py-3 text-center text-sm">
          No account yet? Join the library
        </Link>
      </div>
    </div>
  );
}
