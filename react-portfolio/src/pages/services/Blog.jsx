import "./Services.css";

export default function Blog() {
  return (
    <>
    <header className="device-header" aria-hidden="false">
      <button className="back-button" onClick={() => window.history.back()}>
        ← Back
      </button>
      <div className="brand-title">Blog Writing</div>
    </header>
    <div className="device-wrap">
      <div className="device">
        <div className="info-box">
          <h2 style={{fontFamily: 'Dimod'}}>Work Ethics</h2>
          <div className="info-body">
          <p>Welcome to my blog writing services page! I specialize in creating modern, responsive, and user-friendly websites tailored to your needs. Whether you're looking for a personal blog, a business site, or an e-commerce platform, I've got you covered.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}