import "./logoloader.css";

export function LogoLoader() {
  return (
    <div className="relative">
      {/* Glow background */}
      <div className="absolute inset-0 rounded-full blur-2xl bg-accent-primary/40 logo-glow" />

      {/* Logo with pulse animation */}
      <div className="relative logo-pulse">
        <svg
          width="91"
          height="91"
          viewBox="0 0 91 91"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative drop-shadow-[0_0_20px_rgba(255,156,43,0.4)]"
        >
          <g clipPath="url(#clip0_191_543)">
            <path
              d="M90.5096 45.2548L45.2547 90.5097L36.7695 82.0244L73.539 45.2548L35.3552 7.07107L43.8405 -1.41421L90.5096 45.2548Z"
              fill="white"
            />
            <path
              d="M53.7401 8.48529L16.9706 45.2548L26.8701 55.1543L45.2548 36.7696L53.7401 45.2548L35.3553 63.6396L53.7401 82.0244L45.2548 90.5097L0 45.2548L45.2548 3.8147e-06L53.7401 8.48529Z"
              fill="url(#paint0_linear_191_543)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_191_543"
              x1="-7.07107"
              y1="38.1838"
              x2="47.0226"
              y2="92.2774"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF9C2B" />
              <stop offset="1" stopColor="#AF5D00" />
            </linearGradient>
            <clipPath id="clip0_191_543">
              <rect
                y="45.2548"
                width="64"
                height="64"
                rx="8"
                transform="rotate(-45 0 45.2548)"
                fill="white"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}
