import dynamic from "next/dynamic";

const RegisterStar3DInner = dynamic(
  () => import("./RegisterStar3D").then((m) => ({ default: m.RegisterStar3D })),
  {
    ssr: false,
    loading: () => (
      <div
        className="mx-auto h-28 w-28 animate-pulse rounded-full"
        style={{ backgroundColor: "rgba(163,130,74,0.15)" }}
      />
    ),
  }
);

export function RegisterStar3DWrapper() {
  return <RegisterStar3DInner />;
}
