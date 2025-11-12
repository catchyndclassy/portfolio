import React, { useState, useRef, useEffect, useCallback } from "react";
import ColorBlend from "../components/backgrounds/ColorBlends";
import Blocks from "../components/blocks/Blocks";
import LogoLoop from "../components/logoScroll/LogoLoop";
import "./Home.css";

const SECTIONS = [
  {
    title: "About",
    body: (
      <>
        Welcome to Catchy & Classy, a fresh perspective to the world of digital experiences.From full-stack development and Figma design to blog writing that resonates, every detail gets our signature balance of catchy creativity and classy precision. <br /> Our philosophy is simple: aesthetics and efficiency go hand in hand. We design with intent, code with purpose, and write with personality.<br />Catchy meets Classy — in everything we create.
      </>
    )
  },
  {
    title: "Services",
    body: (
      <>
        <Blocks
          items={[
            {label: "Web Development", to:'/webdev'},
            {label: "Figma Design", to:'/figma'},
            {label: "Blog Writing", to:'/blog'}
          ]}
        />
      </>
    )
  },
  {
    title: "Work",
    body: "Selected projects include interactive backgrounds, brand pages, and micro-animations."
  },
  {
    title: "Contact",
    body: "I preserved your existing interaction logic (wheel, touch, keyboard) and accessibility attributes.Font names like Akira and Dimod are preserved but fallback fonts are included; ensure you load those custom fonts if you want their exact look.If you want a visible bezel (to mimic a laptop more strongly) I can add a darker outer frame around .device.If you want, I can also:Add a small resize handle or helper overlay that shows the current scaled pixel size for debugging.Change the aspect ratio to 16:10 (some laptops use that).Make the laptop viewport perfectly centered with a subtle bezel image.Want any of those tweaks?"
  }
];

const imageLogos = [
  { src: "../src/assets/logos/githubLogo.png", alt: "GitHub", href: "https://github.com/catchyndclassy" },
  { src: "../src/assets/logos/igLogo.png", alt: "Instagram", href: "https://www.instagram.com/catchyndclassy?igsh=cGJoaTFwOGI4MDRl&utm_source=qr " },
  { src: "../src/assets/logos/linkedinLogo.png", alt: "LinkedIn", href: "https://company3.com" },
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const boxRef = useRef(null);
  const scrollingRef = useRef(false);
  const touchStartYRef = useRef(null);

  const clamp = (v, a, b) => Math.max(a, Math.min(v, b));

  const changeIndex = useCallback((next) => {
    if (scrollingRef.current) return;
    next = clamp(next, 0, SECTIONS.length - 1);
    if (next === index) return;
    scrollingRef.current = true;
    setIndex(next);
    window.setTimeout(() => { scrollingRef.current = false; }, 650);
  }, [index]);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      e.preventDefault();
      if (e.deltaY > 0) changeIndex(index + 1);
      else if (e.deltaY < 0) changeIndex(index - 1);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [index, changeIndex]);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const onTouchStart = (e) => {
      const t = e.touches && e.touches[0];
      if (t) touchStartYRef.current = t.clientY;
    };
    const onTouchMove = (e) => {
      e.preventDefault();
    };
    const onTouchEnd = (e) => {
      const t = (e.changedTouches && e.changedTouches[0]);
      if (!t || touchStartYRef.current == null) return;
      const dy = touchStartYRef.current - t.clientY;
      const thresh = 30;
      if (dy > thresh) changeIndex(index + 1);
      else if (dy < -thresh) changeIndex(index - 1);
      touchStartYRef.current = null;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [index, changeIndex]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") changeIndex(index + 1);
      if (e.key === "ArrowUp" || e.key === "PageUp") changeIndex(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, changeIndex]);

  return (
    <>
    <div className="home-container">
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

      {/* header in normal flow; margin-top implements the 100px offset from top of body */}
      <header className="device-header" aria-hidden="false">
        <div className="brand-title">Catchy &amp; Classy</div>
      </header>

      {/* Device-like centered viewport (normal flow, no absolute positioning) */}
      <div className="device-wrap">
        <div className="device">
          <main
            className="device-main"
            role="main"
            aria-label="Main viewport"
          >
            <div
              className="info-box"
              ref={boxRef}
              role="region"
              aria-roledescription="carousel"
              aria-label="Information sections"
            >
              <div className="sections">
                {SECTIONS.map((s, i) => {
                  let posClass = "next";
                  if (i === index) posClass = "active";
                  else if (i < index) posClass = "prev";
                  return (
                    <section
                      key={s.title}
                      className={`section ${posClass}`}
                      aria-hidden={i === index ? "false" : "true"}
                    >
                      <h2 className="section-title">{s.title}</h2>
                      <div className="section-body">
                        {s.body}
                      </div>
                    </section>
                  );
                })}
              </div>

              <div className="nav-dots" aria-hidden="true">
                {SECTIONS.map((_, i) => (
                  <button
                    key={i}
                    className={`dot ${i === index ? "dot--active" : ""}`}
                    onClick={() => changeIndex(i)}
                    aria-label={`Go to ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* logo-scroll as last in flow; margin-bottom ensures it is 20px above the document end */}
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
    </>
  );
}
