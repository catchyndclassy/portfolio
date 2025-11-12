import ColorBlend from "../../components/backgrounds/ColorBlends";
import "./Services.css";

export default function WebDev() {
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
    <header className="device-header" aria-hidden="false">
      <button className="back-button" onClick={() => window.history.back()}>
        ← Back
      </button>
      <div className="brand-title">Web Development</div>
    </header>
    <div className="device-wrap">
      <div className="device">
        <div className="info-box">
          <h2 style={{fontFamily: 'Dimod'}}>Work Ethics</h2>
          <div className="info-body">
          <p>Welcome to my web development services page! I specialize in creating modern, responsive, and user-friendly websites tailored to your needs. Whether you're looking for a personal blog, a business site, or an e-commerce platform, I've got you covered.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}