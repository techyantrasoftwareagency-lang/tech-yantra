// Tech Yantra emblem — clean Y mark on white/transparent background
const LOGO_URL = "https://customer-assets.emergentagent.com/job_intelligent-build-11/artifacts/zokqsahi_NEWWChatGPT%20Image%20Jun%2030%2C%202026%2C%2003_25_50%20PM.png";

export default function Logo({ size = 40, className = "" }) {
  return (
    <img
      src={LOGO_URL}
      alt="Tech Yantra"
      className={`object-contain ${className}`}
      style={{ width: size, height: size, mixBlendMode: "multiply" }}
      data-testid="brand-logo"
    />
  );
}
