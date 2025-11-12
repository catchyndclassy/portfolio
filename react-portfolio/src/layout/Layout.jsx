import React from "react";
import { Outlet } from "react-router-dom";
import ColorBlend from "../components/backgrounds/ColorBlends";
import LogoLoop from "../components/logoScroll/LogoLoop";
import "./Layout.css";

const imageLogos = [
  {
    src: "../src/assets/logos/githubLogo.png",
    alt: "GitHub",
    href: "https://github.com/catchyndclassy"
  },
  {
    src: "../src/assets/logos/igLogo.png",
    alt: "Instagram",
    href: "https://www.instagram.com/catchyndclassy?igsh=cGJoaTFwOGI4MDRl&utm_source=qr "
  },
  {
    src: "../src/assets/logos/linkedinLogo.png",
    alt: "LinkedIn",
    href: "https://company3.com"
  }
];

const blendProps = {
  colors: ["#d12c16ff"],
  rotation: -75,
  speed: 0.2,
  scale: 0.5,
  frequency: 1,
  warpStrength: 1,
  mouseInfluence: 1,
  parallax: 0.5,
  noise: 0.1,
  transparent: false
};

export default function Layout() {
  return (
    <div className="home-container">
      <div className="bg-span" aria-hidden="true">
        <div className="bg-span__inner">
          <ColorBlend {...blendProps} />
        </div>
      </div>

      <div className="layout-content">
        <Outlet />
      </div>

      <div className="logo-scroll" aria-hidden="false">
        <LogoLoop
          logos={imageLogos}
          speed={120}
          direction="left"
          logoHeight={48}
          gap={50}
          hoverSpeed={0}
          scaleOnHover
          ariaLabel="Technology partners"
        />
      </div>
    </div>
  );
}

