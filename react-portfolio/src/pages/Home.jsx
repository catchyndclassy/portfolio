import ColorBlend from "../components/backgrounds/ColorBlends";

export default function Home() {
  return (
    <>
      <div className="bg-span">
        <ColorBlend
          colors={["#d12c16ff"]}
          rotation={-75}
          speed={0.2}
          scale={0.5}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          parallax={0.5}
          noise={0.1}
          transparent={false}
        />
      </div>
    </>
  );
}