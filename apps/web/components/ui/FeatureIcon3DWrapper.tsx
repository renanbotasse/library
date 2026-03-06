import dynamic from "next/dynamic";

const FeatureIcon3DInner = dynamic(
  () => import("./FeatureIcon3D").then((m) => ({ default: m.FeatureIcon3D })),
  {
    ssr: false,
    loading: () => (
      <div
        className="mx-auto h-24 w-24 animate-pulse rounded-full"
        style={{ backgroundColor: "rgba(33,28,41,0.7)" }}
      />
    ),
  }
);

interface Props {
  type: "rook" | "card" | "bottle" | "cake";
  glowColor?: string;
}

export function FeatureIcon3DWrapper({ type, glowColor }: Props) {
  return <FeatureIcon3DInner type={type} glowColor={glowColor} />;
}
