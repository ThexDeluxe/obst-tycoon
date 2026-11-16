// Eigene SVG-Symbole (keine Emojis).
import type { JSX } from 'preact';

type P = { size?: number; class?: string };

function Svg(props: P & { children: JSX.Element | JSX.Element[] }) {
  const s = props.size ?? 20;
  return (
    <svg
      class={props.class}
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width={1.9}
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      {props.children}
    </svg>
  );
}

export const IconStaff = (p: P) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 20c0-3.3 2.7-5.6 6-5.6s6 2.3 6 5.6" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M16.5 14.3c2.6.3 4.5 2.3 4.5 5.2" />
  </Svg>
);
export const IconMarket = (p: P) => (
  <Svg {...p}>
    <path d="M3 9h18l-1.6 10.2a1.5 1.5 0 0 1-1.5 1.3H6.1a1.5 1.5 0 0 1-1.5-1.3z" />
    <path d="M8 9l3-5M16 9l-3-5" />
    <path d="M9 13v4M15 13v4M12 13v4" />
  </Svg>
);
export const IconWarehouse = (p: P) => (
  <Svg {...p}>
    <path d="M3 10l9-6 9 6v10H3z" />
    <path d="M7 20v-7h10v7" />
    <path d="M7 16h10" />
  </Svg>
);
export const IconEquipment = (p: P) => (
  <Svg {...p}>
    <path d="M3 5h3l2.2 10h10.3l2-7H7.4" />
    <circle cx="9.5" cy="19" r="1.6" />
    <circle cx="17" cy="19" r="1.6" />
  </Svg>
);
export const IconMap = (p: P) => (
  <Svg {...p}>
    <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" />
    <path d="M9 4v14M15 6v14" />
  </Svg>
);
export const IconGoal = (p: P) => (
  <Svg {...p}>
    <path d="M5 21V4" />
    <path d="M5 4h11l-2 4 2 4H5" />
  </Svg>
);
export const IconReport = (p: P) => (
  <Svg {...p}>
    <path d="M4 20V4M4 20h16" />
    <path d="M8 16v-4M12 16V8M16 16v-6" />
  </Svg>
);
export const IconSettings = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2.8v2.4M12 18.8v2.4M4.2 7.5l2 1.2M17.8 15.3l2 1.2M4.2 16.5l2-1.2M17.8 8.7l2-1.2" />
    <circle cx="12" cy="12" r="7" />
  </Svg>
);
export const IconPause = (p: P) => (
  <Svg {...p}>
    <path d="M8 5v14M16 5v14" />
  </Svg>
);
export const IconPlay = (p: P) => (
  <Svg {...p}>
    <path d="M7 5l11 7-11 7z" fill="currentColor" />
  </Svg>
);
export const IconFast = (p: P) => (
  <Svg {...p}>
    <path d="M4 6l7 6-7 6zM12 6l7 6-7 6z" fill="currentColor" />
  </Svg>
);
export const IconFaster = (p: P) => (
  <Svg {...p}>
    <path d="M2 7l5 5-5 5zM8.5 7l5 5-5 5zM15 7l5 5-5 5z" fill="currentColor" />
  </Svg>
);
export const IconRotateLeft = (p: P) => (
  <Svg {...p}>
    <path d="M4 12a8 8 0 1 0 2.4-5.7" />
    <path d="M4 4v4.5h4.5" />
  </Svg>
);
export const IconRotateRight = (p: P) => (
  <Svg {...p}>
    <path d="M20 12a8 8 0 1 1-2.4-5.7" />
    <path d="M20 4v4.5h-4.5" />
  </Svg>
);
export const IconZoomIn = (p: P) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);
export const IconZoomOut = (p: P) => (
  <Svg {...p}>
    <path d="M5 12h14" />
  </Svg>
);
export const IconFullscreen = (p: P) => (
  <Svg {...p}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </Svg>
);
export const IconClose = (p: P) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
);
export const IconWarning = (p: P) => (
  <Svg {...p}>
    <path d="M12 3l10 18H2z" />
    <path d="M12 10v5M12 18v.5" />
  </Svg>
);
export const IconInfo = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v6M12 7.5v.5" />
  </Svg>
);
export const IconTruck = (p: P) => (
  <Svg {...p}>
    <path d="M2 6h12v10H2zM14 10h4l3 3v3h-7" />
    <circle cx="6" cy="18" r="1.8" />
    <circle cx="17" cy="18" r="1.8" />
  </Svg>
);
export const IconStar = (p: P) => (
  <Svg {...p}>
    <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8z" />
  </Svg>
);
export const IconCoin = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M15 8.6a4 4 0 1 0 0 6.8M7 11h6M7 13.5h6" />
  </Svg>
);
export const IconClock = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5l3 2" />
  </Svg>
);
export const IconMenu = (p: P) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);
export const IconCrosshair = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="7" />
    <path d="M12 2v5M12 17v5M2 12h5M17 12h5" />
  </Svg>
);
export const IconPhoneRotate = (p: P) => (
  <Svg {...p}>
    <rect x="7" y="2.5" width="10" height="19" rx="2" />
    <path d="M2 14a8 8 0 0 0 5 6M22 10a8 8 0 0 0-5-6" />
  </Svg>
);
export const IconPin = (p: P) => (
  <Svg {...p}>
    <path d="M12 21s-6-6.1-6-11a6 6 0 1 1 12 0c0 4.9-6 11-6 11z" />
    <circle cx="12" cy="10" r="2.2" />
  </Svg>
);
export const IconHome = (p: P) => (
  <Svg {...p}>
    <path d="M4 11l8-7 8 7M6 9.5V20h12V9.5" />
  </Svg>
);
export const IconCrate = (p: P) => (
  <Svg {...p}>
    <path d="M3 8h18v12H3z" />
    <path d="M3 8l2-4h14l2 4" />
    <path d="M8 12v5M12 12v5M16 12v5" />
  </Svg>
);
export const IconFist = (p: P) => (
  <Svg {...p}>
    <path d="M7 11V7.5a1.5 1.5 0 0 1 3 0V11M10 10V6.5a1.5 1.5 0 0 1 3 0V10M13 10V7.5a1.5 1.5 0 0 1 3 0V12" />
    <path d="M16 11a1.5 1.5 0 0 1 3 0v3a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-3l-2-3.5a1.5 1.5 0 0 1 2.6-1.5L9 14" />
  </Svg>
);
export const IconUserPlus = (p: P) => (
  <Svg {...p}>
    <circle cx="10" cy="8" r="3.4" />
    <path d="M3.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
    <path d="M19 7v6M16 10h6" />
  </Svg>
);
export const IconLock = (p: P) => (
  <Svg {...p}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </Svg>
);
export const IconTarget = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </Svg>
);
export const IconCheck = (p: P) => (
  <Svg {...p}>
    <path d="M5 12.5l4.2 4.2L19 7" />
  </Svg>
);
export const IconSound = (p: P) => (
  <Svg {...p}>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
    <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
  </Svg>
);
export const IconSoundOff = (p: P) => (
  <Svg {...p}>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
    <path d="M16 9.5l5 5M21 9.5l-5 5" />
  </Svg>
);
export const IconSnow = (p: P) => (
  <Svg {...p}>
    <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" />
    <path d="M9.5 4.5L12 6l2.5-1.5M9.5 19.5L12 18l2.5 1.5" />
  </Svg>
);
export const IconBuild = (p: P) => (
  <Svg {...p}>
    <path d="M4 20h16M6 20V10l6-5 6 5v10" />
    <path d="M10 20v-5h4v5" />
  </Svg>
);
export const IconBook = (p: P) => (
  <Svg {...p}>
    <path d="M5 4.5h10a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3z" />
    <path d="M5 17a3 3 0 0 1 3-3h10" />
    <path d="M9 8h5" />
  </Svg>
);
export const IconFarm = (p: P) => (
  <Svg {...p}>
    <path d="M3 20h18" />
    <path d="M5 20v-8l5-4 5 4v8" />
    <path d="M8.5 20v-4h3v4" />
    <path d="M17 20v-9.5a2 2 0 0 1 4 0V20" />
  </Svg>
);
