import React from "react";
import ColorBlend from "../components/backgrounds/ColorBlends";
import StaggeredMenu from "../components/menus/StaggeredMenu";

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

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
        <StaggeredMenu
          isFixed={true}
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          // logoUrl is already defaulted to /src/assets/CatchyndClassy_LOGO.jpg,
          // but you can override it here if needed
          // logoUrl="/src/assets/CatchyndClassy_LOGO.jpg"
        />
      </div>
    </>
  );
}