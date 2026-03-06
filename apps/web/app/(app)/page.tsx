"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion/variants";
import { LandingScene3DWrapper } from "@/components/shelf/LandingScene3DWrapper";
import { QuoteRotator } from "@/components/ui/QuoteRotator";
import { FeatureIcon3DWrapper } from "@/components/ui/FeatureIcon3DWrapper";

const features = [
  {
    iconType: "rook" as const,
    glowColor: "#A3824A",
    title: "Your entire library",
    description: "Every book you own, catalogued and always at hand.",
  },
  {
    iconType: "card" as const,
    glowColor: "#C88C9A",
    title: "Search millions",
    description: "Powered by Open Library — find any tome ever written.",
  },
  {
    iconType: "bottle" as const,
    glowColor: "#7B5EA7",
    title: "Personal grimoire",
    description: "Write private notes and reflections within each volume.",
  },
  {
    iconType: "cake" as const,
    glowColor: "#C88C9A",
    title: "Track your journey",
    description: "From unread curiosity to treasured companion.",
  },
];

export default function LandingPage() {
  return (
    <main className="relative overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 py-24 text-center">
        {/* 3D Background */}
        <LandingScene3DWrapper />

        {/* Vignette */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: "radial-gradient(ellipse at center, transparent 30%, #0B0A0F 78%)" }}
        />

        {/* Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 space-y-7"
        >
          {/* Cheshire Cat quote badge */}
          <motion.div variants={fadeInUp}>
            <p className="font-serif text-xl italic text-muted/70">
              &ldquo;Every adventure requires a first step.&rdquo;
              <span className="ml-2 not-italic font-sans text-lg text-gold/50">— Cheshire Cat</span>
            </p>
          </motion.div>

          {/* Title */}
          <motion.div variants={fadeInUp}>
            <h1 className="font-serif text-5xl font-black leading-none tracking-tight text-text sm:text-6xl md:text-8xl">
              Wonder<span className="text-gold-shimmer">library</span>
            </h1>
          </motion.div>

          {/* Rotating quotes */}
          <motion.div variants={fadeInUp} className="mx-auto max-w-lg">
            <QuoteRotator />
          </motion.div>

          {/* Short description */}
          <motion.p
            variants={fadeInUp}
            className="font-sans text-base text-muted/70"
          >
            Your books. Your stories.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Link
              href="/auth/register"
              className="btn-gold-solid inline-flex items-center gap-3 rounded-xl px-8 py-3.5 text-base active:scale-95"
            >
              Open the vault
              <span className="text-2xl leading-none">⚿</span>
            </Link>
            <Link
              href="/search"
              className="btn-gold-outline inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-base active:scale-95"
            >
              Explore books
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{ color: "rgba(163,130,74,0.35)" }}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section className="relative mx-auto max-w-5xl px-4 pb-24">
        <div className="mb-16 flex items-center gap-4">
          <div
            className="h-px flex-1"
            style={{ background: "linear-gradient(90deg, transparent, rgba(163,130,74,0.2), transparent)" }}
          />
          <span className="font-serif text-xl text-gold">✦</span>
          <div
            className="h-px flex-1"
            style={{ background: "linear-gradient(90deg, transparent, rgba(163,130,74,0.2), transparent)" }}
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={scaleIn}
              className="card-wl hover-gold relative overflow-hidden rounded-2xl p-6 text-center"
            >
              {/* Rotating 3D icon */}
              <div className="mb-5">
                <FeatureIcon3DWrapper type={f.iconType} glowColor={f.glowColor} />
              </div>
              <h3 className="mb-2 font-serif text-sm font-semibold tracking-widest text-text uppercase">
                {f.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-muted">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA BOTTOM ── */}
      <section
        className="py-24 text-center"
        style={{ borderTop: "1px solid rgba(163,130,74,0.08)" }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <motion.p variants={fadeInUp} className="font-sans text-sm tracking-widest text-gold uppercase">
            Begin your collection
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-3xl font-bold text-text sm:text-4xl">
            Every great library<br />starts with a single book.
          </motion.h2>
          <motion.div variants={fadeInUp}>
            <Link
              href="/auth/register"
              className="btn-gold-solid inline-flex items-center gap-3 rounded-xl px-8 py-3.5 text-base"
            >
              Create your library — it&apos;s free
              <span className="text-xl leading-none">⚿</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
