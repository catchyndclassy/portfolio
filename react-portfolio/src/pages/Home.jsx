import React from "react";
import ColorBlend from "../components/backgrounds/ColorBlends";
import "./Home.css";

export default function Home() {
  return (
    <>
      <div className="bg-span" aria-hidden="true">
        <div className="bg-span__inner">
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
      </div>

      <main className="content">
        <div className="transparent-box">
          <h1>Welcome to My Portfolio</h1>
        </div>
      </main>
    </>
  );
}
