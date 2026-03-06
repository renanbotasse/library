"use client";

import dynamic from "next/dynamic";

const LandingScene3D = dynamic(
  () => import("./LandingScene3D").then((m) => ({ default: m.LandingScene3D })),
  { ssr: false, loading: () => null }
);

export function LandingScene3DWrapper() {
  return <LandingScene3D />;
}
