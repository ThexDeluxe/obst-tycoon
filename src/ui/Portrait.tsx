// Gezeichnete Porträts der Figuren (eigene SVG, keine Emojis): Bauern und der Boss der Gemüsegang.

type HairStyle = 'short' | 'bun' | 'bob' | 'slick' | 'bald' | 'long' | 'curly';
type Hat = 'straw' | 'cap' | 'flat' | 'scarf' | null;
type Beard = 'full' | 'mustache' | 'stubble' | null;
type Brows = 'calm' | 'stern' | 'worried';

interface Look {
  skin: string;
  hair: string;
  style: HairStyle;
  hat: Hat;
  hatColor?: string;
  beard: Beard;
  glasses?: boolean;
  shirt: string;
  collar?: string;
  tie?: string;
  brows: Brows;
  lips?: string;
  bg: string;
}

/** Aussehen der Bauern in der Reihenfolge von FARMS */
const FARMERS: Look[] = [
  // Henning Brinkmann: alter Bauer, Strohhut, grauer Bart, rotes Karohemd
  { skin: '#e8b98f', hair: '#9a9a96', style: 'short', hat: 'straw', hatColor: '#e2c46a', beard: 'full', shirt: '#b8433a', collar: '#8e2f28', brows: 'calm', bg: '#e6efe0' },
  // Greta Lindenau: grauer Dutt, strenger Blick, grüne Jacke
  { skin: '#f0c7a4', hair: '#b9b4ae', style: 'bun', hat: null, beard: null, shirt: '#3f6b4a', collar: '#2f5238', brows: 'stern', bg: '#e9eee4' },
  // Ralf Kessler: zurückgekämmtes Haar, Schnurrbart, bunte Hemden
  { skin: '#d9a477', hair: '#3a2a20', style: 'slick', hat: null, beard: 'mustache', shirt: '#e3a72f', collar: '#c4861a', brows: 'calm', bg: '#f3ecd9' },
  // Ilse Hartmann: Kopftuch, Brille, besorgter Blick
  { skin: '#f2cdb0', hair: '#6b4a32', style: 'long', hat: 'scarf', hatColor: '#7a5aa0', beard: null, glasses: true, shirt: '#8b6fb0', collar: '#6c5490', brows: 'worried', bg: '#ece6f2' },
  // Jens Petersen: rote Haare, Schirmmütze, Latzhose
  { skin: '#f3c9a8', hair: '#c4622d', style: 'curly', hat: 'cap', hatColor: '#3d5a80', beard: 'stubble', shirt: '#4a6fa5', collar: '#35557f', brows: 'worried', bg: '#e3eaf2' },
  // Vera Nowak: schwarzer Bob, Laborkittel
  { skin: '#e9bf9b', hair: '#1f1d22', style: 'bob', hat: null, beard: null, shirt: '#f4f4f2', collar: '#d9dcdc', lips: '#b0353f', brows: 'calm', bg: '#e4eef0' },
];

/** Kohl-Kalle, Boss der Gemüsegang: Schiebermütze, dunkler Anzug, kohlgrüne Krawatte */
const BOSS: Look = {
  skin: '#dcae88',
  hair: '#2b2622',
  style: 'bald',
  hat: 'flat',
  hatColor: '#3b3f45',
  beard: 'stubble',
  shirt: '#2e3238',
  collar: '#e8e8e4',
  tie: '#5f8f3a',
  brows: 'stern',
  bg: '#f2e3e0',
};

function Hair({ l }: { l: Look }) {
  switch (l.style) {
    case 'short':
      return <path d="M14 21c0-7 4.5-11 10-11s10 4 10 11c-1-3-3-5-5-5.5-3 1.5-7 1.5-10 0-2 .5-4 2.5-5 5.5z" fill={l.hair} />;
    case 'bun':
      return (
        <>
          <circle cx="24" cy="9" r="4.2" fill={l.hair} />
          <path d="M14 22c-.5-7.5 4-12 10-12s10.5 4.5 10 12c-1.5-4-4.5-6.5-10-6.5S15.5 18 14 22z" fill={l.hair} />
        </>
      );
    case 'bob':
      return <path d="M13 28c-1.5-10 3-17 11-17s12.5 7 11 17c-1-1-1.5-4-2-8-3.5 1-11 1-18 0-.5 4-1 7-2 8z" fill={l.hair} />;
    case 'slick':
      return <path d="M14.5 20c.5-6.5 4.5-9.5 9.5-9.5 5.5 0 9.5 3 9.5 9.5-2-3.5-5-4.5-9.5-4.5-3.5 0-7 1-9.5 4.5z" fill={l.hair} />;
    case 'long':
      return <path d="M13.5 32c-2-12 2-20 10.5-20s12.5 8 10.5 20c-1-3-1.5-8-2-11-4 1-11 1-17 0-.5 3-1 8-2 11z" fill={l.hair} />;
    case 'curly':
      return (
        <g fill={l.hair}>
          <circle cx="17" cy="16" r="3.4" />
          <circle cx="21.5" cy="13" r="3.6" />
          <circle cx="27" cy="13" r="3.6" />
          <circle cx="31" cy="16.5" r="3.3" />
        </g>
      );
    case 'bald':
      return <path d="M14.2 24c-.6-2 .2-3.5 1.2-4M33.8 24c.6-2-.2-3.5-1.2-4" stroke={l.hair} stroke-width="2" fill="none" />;
  }
}

function HatShape({ l }: { l: Look }) {
  const c = l.hatColor ?? '#555';
  switch (l.hat) {
    case 'straw':
      return (
        <>
          <ellipse cx="24" cy="15.5" rx="15" ry="3.2" fill={c} />
          <path d="M16.5 15c0-5 3.5-8 7.5-8s7.5 3 7.5 8z" fill={c} />
          <path d="M16.6 13.4h14.8" stroke="#a5423a" stroke-width="1.6" />
        </>
      );
    case 'cap':
      return (
        <>
          <path d="M15 17c0-6 4-9.5 9-9.5s9 3.5 9 9.5z" fill={c} />
          <path d="M29 16.5c3 0 6.5.6 8.5 1.8-2.5.7-6 .7-9 .2z" fill={c} />
        </>
      );
    case 'flat':
      return (
        <>
          <path d="M14.5 17.5c-.5-5.5 4-9 10-9 5.5 0 9.5 2.5 10 7.5-3.5 1.5-12 2.5-20 1.5z" fill={c} />
          <path d="M30 15.5c2.5.3 5 1 6 2-2 .6-4.5.6-6.5.3z" fill={c} />
        </>
      );
    case 'scarf':
      return <path d="M13 26c-1-10 4-16 11-16s12 6 11 16c-1.5-5-2.5-8-3.5-9-4 1.2-11 1.2-15 0-1 1-2 4-3.5 9z" fill={c} />;
    default:
      return null;
  }
}

function Face({ l }: { l: Look }) {
  const browY = 21.2;
  const brow =
    l.brows === 'stern'
      ? ['M18.6 20.3l3.6 1.3', 'M29.4 20.3l-3.6 1.3']
      : l.brows === 'worried'
        ? ['M18.8 21.6l3.4-1.2', 'M29.2 21.6l-3.4-1.2']
        : [`M18.8 ${browY}h3.4`, `M25.8 ${browY}h3.4`];
  return (
    <>
      {brow.map((d, k) => (
        <path key={k} d={d} stroke="#3a2c24" stroke-width="1.1" stroke-linecap="round" />
      ))}
      <circle cx="20.6" cy="23.6" r="1.05" fill="#2a211c" />
      <circle cx="27.4" cy="23.6" r="1.05" fill="#2a211c" />
      {l.glasses && (
        <g stroke="#2c2c30" stroke-width="0.9" fill="none">
          <circle cx="20.6" cy="23.6" r="2.6" />
          <circle cx="27.4" cy="23.6" r="2.6" />
          <path d="M23.2 23.6h1.6" />
        </g>
      )}
      <path d="M23.6 24.8l-.8 3h1.6" stroke="#b07c5c" stroke-width="0.8" fill="none" stroke-linecap="round" />
      {l.beard === 'full' && <path d="M17 26c0 6 3 9.5 7 9.5s7-3.5 7-9.5c-1.5 2-3 2.5-4 2.5-1.5-1-4.5-1-6 0-1 0-2.5-.5-4-2.5z" fill="#a9a8a3" />}
      {l.beard === 'mustache' && <path d="M20.5 29.6c1.2-1.3 2.4-1.5 3.5-.8 1.1-.7 2.3-.5 3.5.8-1.4.2-2.5.2-3.5-.3-1 .5-2.1.5-3.5.3z" fill={l.hair} />}
      {l.beard === 'stubble' && <path d="M18 28.5c1 4.5 3.5 6.6 6 6.6s5-2.1 6-6.6" stroke={l.hair} stroke-opacity="0.35" stroke-width="2.6" fill="none" />}
      <path d="M21.7 31c1.5.8 3.1.8 4.6 0" stroke={l.lips ?? '#8a4a3c'} stroke-width={l.lips ? 1.6 : 1} stroke-linecap="round" fill="none" />
    </>
  );
}

function Draw({ l, size }: { l: Look; size: number }) {
  return (
    <svg class="portrait" width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="24" fill={l.bg} />
      <clipPath id="pclip">
        <circle cx="24" cy="24" r="24" />
      </clipPath>
      <g clip-path="url(#pclip)">
        {/* Schultern und Kleidung */}
        <path d="M6 50c1-9 8-13.5 18-13.5S41 41 42 50z" fill={l.shirt} />
        <path d="M19 37.2l5 5 5-5" stroke={l.collar ?? l.shirt} stroke-width="2.4" fill="none" />
        {l.tie && <path d="M23 38.5h2l1 9h-4z" fill={l.tie} />}
        <rect x="21" y="31" width="6" height="7" rx="2" fill={l.skin} />
        {l.style === 'long' || l.hat === 'scarf' ? <Hair l={l} /> : null}
        <ellipse cx="24" cy="23.5" rx="9.6" ry="11" fill={l.skin} />
        <ellipse cx="14.6" cy="24.5" rx="1.6" ry="2.4" fill={l.skin} />
        <ellipse cx="33.4" cy="24.5" rx="1.6" ry="2.4" fill={l.skin} />
        <Face l={l} />
        {l.style !== 'long' && l.hat !== 'scarf' ? <Hair l={l} /> : null}
        <HatShape l={l} />
      </g>
    </svg>
  );
}

export function FarmerPortrait({ farm, size = 44 }: { farm: number; size?: number }) {
  const l = FARMERS[farm] ?? FARMERS[0];
  return <Draw l={l} size={size} />;
}

export function BossPortrait({ size = 44 }: { size?: number }) {
  return <Draw l={BOSS} size={size} />;
}
