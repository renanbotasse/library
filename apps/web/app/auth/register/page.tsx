import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { register } from "../actions";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { GoogleComingSoon } from "@/components/ui/GoogleComingSoon";
import { AnimatedStar } from "@/components/ui/AnimatedStar";

export const metadata: Metadata = { title: "Join the Library" };

interface Props {
  searchParams: { error?: string };
}

export default function RegisterPage({ searchParams }: Props) {
  return (
    <div className="relative flex min-h-dvh items-center justify-center p-4">
      {/* Background image — transparent filter */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/register-bg.png"
          alt=""
          fill
          className="object-cover opacity-[0.18]"
          sizes="100vw"
          priority
        />
        {/* dark vignette so form stays readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(11,10,15,0.55) 0%, rgba(11,10,15,0.88) 100%)",
          }}
        />
      </div>

      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(75,46,94,0.08) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 70% 80%, rgba(107,31,51,0.05) 0%, transparent 55%)",
        }}
      />

      <div className="relative w-full max-w-sm space-y-8">
        {/* Header */}
        <div className="text-center">
          {/* 3D rotating star */}
          <div className="mb-2">
            <AnimatedStar />
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-wide text-text">
            Join the Library
          </h1>
          <p className="mt-2 font-sans text-sm italic text-muted">
            Begin your personal collection today.
          </p>
        </div>

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

        <form action={register} className="space-y-4">
          {/* Name */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="label-wl">Name</label>
            <input
              id="name" name="name" type="text" required
              autoComplete="name" placeholder="Your name"
              className="input-wl"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="label-wl">Email</label>
            <input
              id="email" name="email" type="email" required
              autoComplete="email" placeholder="you@example.com"
              className="input-wl"
            />
          </div>

          {/* Password with live requirements */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="label-wl">Password</label>
            <PasswordInput />
          </div>

          <button
            type="submit"
            className="btn-gold-solid w-full rounded-xl py-3 text-base active:scale-95"
          >
            Create my library ✦
          </button>
        </form>

        <div className="divider-ornate">or continue with</div>

        {/* Google — coming soon */}
        <GoogleComingSoon />

        {/* Already a member — button */}
        <Link href="/auth/login" className="btn-gold-outline block w-full rounded-xl py-3 text-center text-sm">
          Already a member? Enter the vault
        </Link>
      </div>
    </div>
  );
}
