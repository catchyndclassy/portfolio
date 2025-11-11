import React, { useState, useRef, useEffect, useCallback } from "react";
import ColorBlend from "../components/backgrounds/ColorBlends";
import "./Home.css";

const SECTIONS = [
  {
    title: "About",
    body: "We are Catchy and Classy, the banner says it all."
  },
  {
    title: "Services",
    body: "We craft delightful user experiences, animations and accessible UI."
  },
  {
    title: "Work",
    body: "Selected projects include interactive backgrounds, brand pages, and micro-animations."
  },
  {
    title: "Contact",
    body: "Say hi — we typically reply quickly and enjoy collaborative projects."
  }
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const boxRef = useRef(null);
  const scrollingRef = useRef(false);
  const touchStartYRef = useRef(null);

  // clamp helper
  const clamp = (v, a, b) => Math.max(a, Math.min(v, b));

  // change index with debounce lock to allow animation to complete
  const changeIndex = useCallback((next) => {
    if (scrollingRef.current) return;
    next = clamp(next, 0, SECTIONS.length - 1);
    if (next === index) return;
    scrollingRef.current = true;
    setIndex(next);
    // match CSS transition duration (600ms)
    window.setTimeout(() => { scrollingRef.current = false; }, 650);
  }, [index]);

  // wheel handler
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const onWheel = (e) => {
      // only react to vertical wheel
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      e.preventDefault(); // prevent page scroll
      if (e.deltaY > 0) changeIndex(index + 1);
      else if (e.deltaY < 0) changeIndex(index - 1);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [index, changeIndex]);

  // touch (swipe up/down)
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const onTouchStart = (e) => {
      const t = e.touches && e.touches[0];
      if (t) touchStartYRef.current = t.clientY;
    };
    const onTouchMove = (e) => {
      // prevent the native scroll behavior on touch move
      e.preventDefault();
    };
    const onTouchEnd = (e) => {
      const t = (e.changedTouches && e.changedTouches[0]);
      if (!t || touchStartYRef.current == null) return;
      const dy = touchStartYRef.current - t.clientY;
      const thresh = 30; // px threshold for swipe
      if (dy > thresh) changeIndex(index + 1); // swipe up -> next
      else if (dy < -thresh) changeIndex(index - 1); // swipe down -> prev
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

  // keyboard arrows for accessibility
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

      <div className="content">
        <div
          className="info-box"
          ref={boxRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Information sections"
        >
          <div className="sections">
            {SECTIONS.map((s, i) => {
              // decide class based on index
              let posClass = "next"; // default: to the right
              if (i === index) posClass = "active";
              else if (i < index) posClass = "prev";
              return (
                <section
                  key={s.title}
                  className={`section ${posClass}`}
                  aria-hidden={i === index ? "false" : "true"}
                >
                  <h1 style={{ fontFamily: "Ananda", fontSize: "60px" }}>{s.title}</h1>
                  <p>{s.body}</p>
                </section>
              );
            })}
          </div>

          {/* small UI hint (non-intrusive) */}
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
      </div>
    </>
  );
}
