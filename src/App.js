import { useState, useEffect, useRef, useMemo } from "react";
import "./styles.css";

const TIER_CONFIG = {
  Super: { color: "#FFD700", label: "Super Tier", order: 0 },
  1: { color: "#FF4B6E", label: "Tier 1", order: 1 },
  2: { color: "#FF8C42", label: "Tier 2", order: 2 },
  3: { color: "#6BCB77", label: "Tier 3", order: 3 },
  4: { color: "#4D9DE0", label: "Tier 4", order: 4 },
  5: { color: "#A78BFA", label: "Tier 5", order: 5 },
  6: { color: "#F472B6", label: "Tier 6", order: 6 },
  7: { color: "#94A3B8", label: "Tier 7", order: 7 },
  New: { color: "#00FF9C", label: "New (Tier TBC)", order: 8 },
  Future: { color: "#00E5FF", label: "Coming Soon", order: 9 },
};

const TIER_DESCRIPTIONS = {
  Super:
    "Flagship clubs — ultra-premium Spa Retreats. Diamond membership only.",
  1: "Premium clubs — full spa, extensive racquet courts, premium amenities.",
  2: "High-quality clubs — full facilities, good spa, broad class timetable.",
  3: "Mid-range clubs — gym, pool, classes, basic spa.",
  4: "Good all-rounders — core facilities, pool, classes.",
  5: "Regional clubs — gym, pool, essential classes.",
  6: "Value clubs — gym and pool, core fitness offer.",
  7: "Entry-level clubs — gym, pool, standard classes.",
  New: "Recently opened — tier to be confirmed.",
  Future: "Upcoming clubs — not yet open.",
};

const CLUBS = [
  {
    name: "Beckenham",
    tier: "Super",
    lat: 51.3939,
    lng: -0.037,
    country: "UK",
  },
  {
    name: "Finchley",
    tier: "Super",
    lat: 51.6068,
    lng: -0.173,
    country: "UK",
  },
  {
    name: "Northwood",
    tier: "Super",
    lat: 51.6125,
    lng: -0.4434,
    country: "UK",
  },
  {
    name: "Raynes Park",
    tier: "Super",
    lat: 51.4062,
    lng: -0.2238,
    country: "UK",
  },
  {
    name: "Country Club Geneva",
    tier: "Super",
    lat: 46.2605,
    lng: 6.1413,
    country: "Switzerland",
  },
  {
    name: "Uccle",
    tier: "Super",
    lat: 50.7848,
    lng: 4.3848,
    country: "Belgium",
  },
  {
    name: "Serrano",
    tier: "Super",
    lat: 40.432,
    lng: -3.6875,
    country: "Spain",
  },
  { name: "Brooklands", tier: "1", lat: 51.3467, lng: -0.4615, country: "UK" },
  { name: "Bushey", tier: "1", lat: 51.6633, lng: -0.3653, country: "UK" },
  { name: "Cambridge", tier: "1", lat: 52.1939, lng: 0.1668, country: "UK" },
  { name: "Chigwell", tier: "1", lat: 51.6293, lng: 0.063, country: "UK" },
  { name: "Enfield", tier: "1", lat: 51.6591, lng: -0.0613, country: "UK" },
  { name: "Epsom", tier: "1", lat: 51.345, lng: -0.288, country: "UK" },
  { name: "Fulham", tier: "1", lat: 51.4809, lng: -0.1946, country: "UK" },
  {
    name: "Kidbrooke Village",
    tier: "1",
    lat: 51.4589,
    lng: 0.0259,
    country: "UK",
  },
  {
    name: "Milton Keynes",
    tier: "1",
    lat: 52.0528,
    lng: -0.7334,
    country: "UK",
  },
  {
    name: "Notting Hill",
    tier: "1",
    lat: 51.5207,
    lng: -0.1943,
    country: "UK",
  },
  {
    name: "Royal Berkshire",
    tier: "1",
    lat: 51.3892,
    lng: -0.742,
    country: "UK",
  },
  { name: "Hampton", tier: "1", lat: 51.4371, lng: -0.3669, country: "UK" },
  { name: "Purley", tier: "1", lat: 51.3573, lng: -0.1244, country: "UK" },
  { name: "Wickwoods", tier: "1", lat: 50.9195, lng: -0.223, country: "UK" },
  {
    name: "Sterrebeek",
    tier: "1",
    lat: 50.8417,
    lng: 4.5117,
    country: "Belgium",
  },
  { name: "La Finca", tier: "1", lat: 40.4192, lng: -3.7999, country: "Spain" },
  { name: "Boadilla", tier: "1", lat: 40.4374, lng: -3.9076, country: "Spain" },
  { name: "Gava Mar", tier: "1", lat: 41.2677, lng: 2.0227, country: "Spain" },
  {
    name: "Cricklewood Lane",
    tier: "2",
    lat: 51.5595,
    lng: -0.2099,
    country: "UK",
  },
  { name: "Acton Park", tier: "2", lat: 51.5097, lng: -0.2564, country: "UK" },
  {
    name: "Beaconsfield",
    tier: "2",
    lat: 51.596,
    lng: -0.6824,
    country: "UK",
  },
  { name: "Dartford", tier: "2", lat: 51.4379, lng: 0.2264, country: "UK" },
  { name: "Farnham", tier: "2", lat: 51.2277, lng: -0.7768, country: "UK" },
  { name: "Woking", tier: "2", lat: 51.3052, lng: -0.558, country: "UK" },
  {
    name: "Bristol Westbury",
    tier: "2",
    lat: 51.4982,
    lng: -2.6113,
    country: "UK",
  },
  {
    name: "Bristol Emersons Green",
    tier: "2",
    lat: 51.4911,
    lng: -2.4687,
    country: "UK",
  },
  {
    name: "Manchester Trafford City",
    tier: "2",
    lat: 53.4699,
    lng: -2.3602,
    country: "UK",
  },
  {
    name: "West Bridgford",
    tier: "2",
    lat: 52.9254,
    lng: -1.1426,
    country: "UK",
  },
  { name: "Cheadle", tier: "2", lat: 53.3775, lng: -2.2192, country: "UK" },
  { name: "Newcastle", tier: "2", lat: 55.0013, lng: -1.5992, country: "UK" },
  { name: "Leeds", tier: "2", lat: 53.8436, lng: -1.5502, country: "UK" },
  { name: "Lichfield", tier: "2", lat: 52.652, lng: -1.8364, country: "UK" },
  { name: "Hatfield", tier: "2", lat: 51.7652, lng: -0.2439, country: "UK" },
  { name: "Exeter", tier: "2", lat: 50.7098, lng: -3.47, country: "UK" },
  { name: "Derby", tier: "2", lat: 52.9177, lng: -1.4579, country: "UK" },
  { name: "Veigy", tier: "2", lat: 46.2755, lng: 6.247, country: "France" },
  { name: "Aravaca", tier: "2", lat: 40.4723, lng: -3.7682, country: "Spain" },
  { name: "Turo", tier: "2", lat: 41.3824, lng: 2.1082, country: "Spain" },
  { name: "Antwerp", tier: "2", lat: 51.1503, lng: 4.4312, country: "Belgium" },
  { name: "Gidea Park", tier: "3", lat: 51.5837, lng: 0.2159, country: "UK" },
  { name: "Coventry", tier: "3", lat: 52.3905, lng: -1.4894, country: "UK" },
  { name: "Shawfair", tier: "3", lat: 55.9061, lng: -3.0976, country: "UK" },
  { name: "Sidcup", tier: "3", lat: 51.4223, lng: 0.116, country: "UK" },
  { name: "Southend", tier: "3", lat: 51.5649, lng: 0.6698, country: "UK" },
  { name: "Bicester", tier: "3", lat: 51.8864, lng: -1.166, country: "UK" },
  { name: "Colchester", tier: "3", lat: 51.9217, lng: 0.901, country: "UK" },
  { name: "Gloucester", tier: "3", lat: 51.8472, lng: -2.1702, country: "UK" },
  { name: "Heston", tier: "3", lat: 51.4934, lng: -0.4003, country: "UK" },
  { name: "Sudbury Hill", tier: "3", lat: 51.5558, lng: -0.3437, country: "UK" },
  {
    name: "Bury St Edmunds",
    tier: "3",
    lat: 52.2679,
    lng: 0.6955,
    country: "UK",
  },
  { name: "Oxford", tier: "3", lat: 51.7317, lng: -1.2023, country: "UK" },
  { name: "Rouken Glen", tier: "3", lat: 55.799, lng: -4.3235, country: "UK" },
  { name: "Rugby", tier: "3", lat: 52.3563, lng: -1.1923, country: "UK" },
  {
    name: "Solihull Cranmore",
    tier: "3",
    lat: 52.3952,
    lng: -1.8092,
    country: "UK",
  },
  { name: "Ringwood", tier: "3", lat: 50.8372, lng: -1.7854, country: "UK" },
  { name: "Cheam", tier: "3", lat: 51.355, lng: -0.2255, country: "UK" },
  {
    name: "Amsterdam",
    tier: "3",
    lat: 52.3577,
    lng: 4.8559,
    country: "Netherlands",
  },
  {
    name: "Milano Malaspina",
    tier: "3",
    lat: 45.4713,
    lng: 9.3104,
    country: "Italy",
  },
  { name: "Modena", tier: "3", lat: 44.6252, lng: 10.8896, country: "Italy" },
  { name: "Kensington", tier: "4", lat: 51.4952, lng: -0.1872, country: "UK" },
  { name: "Kings Hill", tier: "4", lat: 51.2763, lng: 0.3926, country: "UK" },
  { name: "Basildon", tier: "4", lat: 51.5865, lng: 0.4627, country: "UK" },
  { name: "Cardiff", tier: "4", lat: 51.5026, lng: -3.1457, country: "UK" },
  {
    name: "Glasgow West End",
    tier: "4",
    lat: 55.898,
    lng: -4.3254,
    country: "UK",
  },
  { name: "Worthing", tier: "4", lat: 50.8261, lng: -0.4293, country: "UK" },
  { name: "Lincoln", tier: "4", lat: 53.2523, lng: -0.6026, country: "UK" },
  { name: "Narborough", tier: "4", lat: 52.5815, lng: -1.2059, country: "UK" },
  { name: "Southampton", tier: "4", lat: 50.9368, lng: -1.4638, country: "UK" },
  { name: "Bromsgrove", tier: "4", lat: 52.3381, lng: -2.0486, country: "UK" },
  { name: "York", tier: "4", lat: 53.9517, lng: -1.0477, country: "UK" },
  { name: "Ipswich", tier: "4", lat: 52.0273, lng: 1.2135, country: "UK" },
  { name: "Newbury", tier: "4", lat: 51.3811, lng: -1.3364, country: "UK" },
  {
    name: "Southampton West End",
    tier: "4",
    lat: 50.9256,
    lng: -1.3242,
    country: "UK",
  },
  {
    name: "Liverpool Speke",
    tier: "4",
    lat: 53.3484,
    lng: -2.8831,
    country: "UK",
  },
  { name: "Teesside", tier: "4", lat: 54.566, lng: -1.2916, country: "UK" },
  { name: "Worcester", tier: "4", lat: 52.2166, lng: -2.1615, country: "UK" },
  {
    name: "Bristol Long Ashton",
    tier: "4",
    lat: 51.4376,
    lng: -2.6312,
    country: "UK",
  },
  {
    name: "Edinburgh Corstorphine",
    tier: "4",
    lat: 55.9389,
    lng: -3.3038,
    country: "UK",
  },
  { name: "Luton", tier: "4", lat: 51.8675, lng: -0.4094, country: "UK" },
  {
    name: "Bad Homburg",
    tier: "4",
    lat: 50.2179,
    lng: 8.6043,
    country: "Germany",
  },
  {
    name: "Frankfurt",
    tier: "4",
    lat: 50.1094,
    lng: 8.6527,
    country: "Germany",
  },
  { name: "Harrogate", tier: "5", lat: 54.0006, lng: -1.5544, country: "UK" },
  { name: "Kingston", tier: "5", lat: 51.4122, lng: -0.2996, country: "UK" },
  { name: "Swindon", tier: "5", lat: 51.604, lng: -1.7839, country: "UK" },
  { name: "Brighton", tier: "5", lat: 50.8122, lng: -0.107, country: "UK" },
  { name: "Chorley", tier: "5", lat: 53.6758, lng: -2.6196, country: "UK" },
  { name: "Eastbourne", tier: "5", lat: 50.7945, lng: 0.276, country: "UK" },
  { name: "Poole", tier: "5", lat: 50.7455, lng: -1.9901, country: "UK" },
  { name: "Port Solent", tier: "5", lat: 50.8405, lng: -1.098, country: "UK" },
  { name: "Aberdeen", tier: "5", lat: 57.1193, lng: -2.1267, country: "UK" },
  { name: "Bolton", tier: "5", lat: 53.5803, lng: -2.4401, country: "UK" },
  {
    name: "Cheshire Oaks",
    tier: "5",
    lat: 53.2637,
    lng: -2.8915,
    country: "UK",
  },
  { name: "Warrington", tier: "5", lat: 53.3876, lng: -2.6245, country: "UK" },
  { name: "Shrewsbury", tier: "5", lat: 52.7276, lng: -2.7106, country: "UK" },
  {
    name: "Alstertal",
    tier: "5",
    lat: 53.6529,
    lng: 10.0932,
    country: "Germany",
  },
  {
    name: "Wandsbek",
    tier: "5",
    lat: 53.5764,
    lng: 10.0805,
    country: "Germany",
  },
  {
    name: "Eppendorf",
    tier: "5",
    lat: 53.5798,
    lng: 9.9613,
    country: "Germany",
  },
  {
    name: "Capelle",
    tier: "5",
    lat: 51.9229,
    lng: 4.5738,
    country: "Netherlands",
  },
  {
    name: "Spandau",
    tier: "5",
    lat: 52.5338,
    lng: 13.1966,
    country: "Germany",
  },
  { name: "Birmingham", tier: "6", lat: 52.5533, lng: -1.8973, country: "UK" },
  { name: "Hamilton", tier: "6", lat: 55.7815, lng: -4.0339, country: "UK" },
  {
    name: "Manchester North",
    tier: "6",
    lat: 53.5566,
    lng: -2.2337,
    country: "UK",
  },
  {
    name: "Newhaven Harbour",
    tier: "6",
    lat: 55.9841,
    lng: -3.1946,
    country: "UK",
  },
  { name: "Nottingham", tier: "6", lat: 52.9666, lng: -1.1889, country: "UK" },
  { name: "Renfrew", tier: "6", lat: 55.8626, lng: -4.3997, country: "UK" },
  {
    name: "Peterborough",
    tier: "6",
    lat: 52.569,
    lng: -0.2979,
    country: "UK",
  },
  { name: "Reading", tier: "6", lat: 51.4625, lng: -0.932, country: "UK" },
  { name: "Sunderland", tier: "6", lat: 54.8648, lng: -1.4308, country: "UK" },
  { name: "Malaga", tier: "6", lat: 36.7225, lng: -4.3667, country: "Spain" },
  {
    name: "Blijdorp",
    tier: "6",
    lat: 51.9266,
    lng: 4.4411,
    country: "Netherlands",
  },
  {
    name: "Eindhoven",
    tier: "6",
    lat: 51.4231,
    lng: 5.4259,
    country: "Netherlands",
  },
  {
    name: "Rotterdam Centrum",
    tier: "6",
    lat: 51.9273,
    lng: 4.4761,
    country: "Netherlands",
  },
  { name: "Zaragoza", tier: "6", lat: 41.6634, lng: -0.8818, country: "Spain" },
  {
    name: "Am Michel",
    tier: "6",
    lat: 53.5466,
    lng: 9.9807,
    country: "Germany",
  },
  {
    name: "Barmbek",
    tier: "6",
    lat: 53.6037,
    lng: 10.0394,
    country: "Germany",
  },
  { name: "Belfast", tier: "7", lat: 54.5861, lng: -5.8219, country: "UK" },
  { name: "Norwich", tier: "7", lat: 52.6549, lng: 1.2633, country: "UK" },
  { name: "Swansea", tier: "7", lat: 51.6477, lng: -3.8501, country: "UK" },
  { name: "Dudley", tier: "7", lat: 52.488, lng: -2.1251, country: "UK" },
  { name: "Dundee", tier: "7", lat: 56.4917, lng: -2.8337, country: "UK" },
  { name: "Hull", tier: "7", lat: 53.7928, lng: -0.3576, country: "UK" },
  { name: "Knowsley", tier: "7", lat: 53.4784, lng: -2.8702, country: "UK" },
  { name: "Stevenage", tier: "7", lat: 51.8994, lng: -0.2093, country: "UK" },
  { name: "Maidenhead", tier: "7", lat: 51.5203, lng: -0.7223, country: "UK" },
  {
    name: "Leicester Meridian",
    tier: "7",
    lat: 52.6125,
    lng: -1.1885,
    country: "UK",
  },

  // ── New clubs — tier TBC ───────────────────────────────────────────────────
  {
    name: "Colliers Wood",
    tier: "1",
    lat: 51.4154,
    lng: -0.1781,
    country: "UK",
  },
  { name: "Herne Bay", tier: "New", lat: 51.3626, lng: 1.1518, country: "UK" },
  { name: "Harlow", tier: "2", lat: 51.7754, lng: 0.1308, country: "UK" },
  {
    name: "Dublin Riverview",
    tier: "New",
    lat: 53.3152,
    lng: -6.2351,
    country: "Ireland",
  },
  {
    name: "Sevilla Tomares",
    tier: "New",
    lat: 37.3826,
    lng: -6.0636,
    country: "Spain",
  },
  {
    name: "Milano Arese",
    tier: "New",
    lat: 45.563,
    lng: 9.0677,
    country: "Italy",
  },
  {
    name: "Sant Just",
    tier: "New",
    lat: 41.387,
    lng: 2.0731,
    country: "Spain",
  },
  {
    name: "Gillingham",
    tier: "New",
    lat: 51.3754,
    lng: 0.5736,
    country: "UK",
  },
  {
    name: "St Neots",
    tier: "New",
    lat: 52.223946,
    lng: -0.248399,
    country: "UK",
  },

  // ── Coming Soon ─────────────────────────────────────────────────────────────
  {
    name: "Bishops Cleeve",
    tier: "Future",
    lat: 51.946908,
    lng: -2.082905,
    country: "UK",
    opens: "8 December 2026",
  },
  {
    name: "Kettering",
    tier: "Future",
    lat: 52.385293,
    lng: -0.673942,
    country: "UK",
    opens: "22 December 2026",
  },
  {
    name: "Ashford",
    tier: "Future",
    lat: 51.124416,
    lng: 0.900079,
    country: "UK",
    opens: "Autumn 2027",
  },
  {
    name: "Yeovil",
    tier: "Future",
    lat: 50.935453,
    lng: -2.667574,
    country: "UK",
    opens: "Summer 2027",
  },
  {
    name: "Bedford",
    tier: "Future",
    lat: 52.1277,
    lng: -0.4499,
    country: "UK",
    opens: "TBC (former Oasis Beach Pool site, in planning)",
  },
  {
    name: "Berlin Ku'damm",
    tier: "Future",
    lat: 52.5019,
    lng: 13.3232,
    country: "Germany",
    opens: "TBC",
  },
];

const COUNTRIES = [
  "All",
  ...Array.from(new Set(CLUBS.map((c) => c.country))).sort(),
];

const REPORT_BASE = "https://github.com/sam-jeffs/dl-club-map/issues/new";

function reportUrl(club) {
  const title = club
    ? `Inaccurate data: ${club.name}`
    : "Inaccurate data on the map";
  const body = [
    club
      ? `**Club:** David Lloyd ${club.name} (${club.country})\n**Currently shown as:** ${
          TIER_CONFIG[club.tier].label
        }`
      : "**Club(s):** ",
    "",
    "**What's wrong?** (e.g. wrong tier, wrong location, club closed, club missing)",
    "",
    "",
    "**What should it be?** (a link to a source helps)",
    "",
  ].join("\n");
  return `${REPORT_BASE}?${new URLSearchParams({ title, body })}`;
}

function makeSvgIcon(L, color, isSuper, isFuture, isNew) {
  let shape;
  if (isFuture) {
    shape = `<polygon points="9,1 17,9 9,17 1,9" fill="${color}33" stroke="${color}" stroke-width="1.5" stroke-dasharray="3,2"/>
             <text x="9" y="13" text-anchor="middle" font-size="9" fill="${color}" font-family="system-ui">?</text>`;
  } else if (isNew) {
    shape = `<circle cx="9" cy="9" r="6.5" fill="${color}" stroke="#fff" stroke-width="1.5"/>
             <text x="9" y="13" text-anchor="middle" font-size="8" fill="#000" font-family="system-ui" font-weight="bold">N</text>`;
  } else if (isSuper) {
    shape = `<polygon points="9,1.5 11.2,6.5 16.5,6.5 12.3,10 13.9,15.5 9,12 4.1,15.5 5.7,10 1.5,6.5 6.8,6.5" fill="${color}" stroke="#fff" stroke-width="1.2"/>`;
  } else {
    shape = `<circle cx="9" cy="9" r="6.5" fill="${color}" stroke="#fff" stroke-width="1.5"/>`;
  }
  return L.divIcon({
    html: `<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">${shape}</svg>`,
    className: "club-marker",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -10],
  });
}

export default function DavidLloydMap() {
  const [selectedTiers, setSelectedTiers] = useState(
    new Set(Object.keys(TIER_CONFIG))
  );
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const [mapReady, setMapReady] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const leafletRef = useRef(null);

  const tierCounts = {};
  Object.keys(TIER_CONFIG).forEach((t) => {
    tierCounts[t] = CLUBS.filter((c) => c.tier === t).length;
  });

  const visibleClubs = useMemo(
    () =>
      CLUBS.filter(
        (c) =>
          selectedTiers.has(c.tier) &&
          (country === "All" || c.country === country) &&
          (search === "" ||
            c.name.toLowerCase().includes(search.toLowerCase()))
      ),
    [selectedTiers, country, search]
  );

  // Load Leaflet + Buy Me a Coffee button
  useEffect(() => {
    // Leaflet CSS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      document.head.appendChild(link);
    }
    // Leaflet JS
    if (window.L) {
      leafletRef.current = window.L;
      setMapReady(true);
    } else {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
      script.onload = () => {
        leafletRef.current = window.L;
        setMapReady(true);
      };
      document.head.appendChild(script);
    }
    // Buy Me a Coffee button
    if (!document.querySelector('script[data-name="bmc-button"]')) {
      const bmc = document.createElement("script");
      bmc.src = "https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js";
      bmc.setAttribute("data-name", "bmc-button");
      bmc.setAttribute("data-slug", "salmoncode");
      bmc.setAttribute("data-color", "#5F7FFF");
      bmc.setAttribute("data-emoji", "");
      bmc.setAttribute("data-font", "Cookie");
      bmc.setAttribute("data-text", "Buy me a coffee");
      bmc.setAttribute("data-outline-color", "#000000");
      bmc.setAttribute("data-font-color", "#ffffff");
      bmc.setAttribute("data-coffee-color", "#FFDD00");
      bmc.async = true;
      document.head.appendChild(bmc);
    }
  }, []);

  // Init map
  useEffect(() => {
    if (!mapReady || !mapContainerRef.current || mapRef.current) return;
    const L = leafletRef.current;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const map = L.map(mapContainerRef.current, {
      preferCanvas: true,
      zoomControl: !isMobile,
    }).setView([52.5, -1.5], isMobile ? 5 : 6);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);
    const layer = L.layerGroup().addTo(map);
    mapRef.current = map;
    layerRef.current = layer;
  }, [mapReady]);

  // Update markers
  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!L || !map || !layer) return;

    layer.clearLayers();
    visibleClubs.forEach((club) => {
      const cfg = TIER_CONFIG[club.tier];
      const marker = L.marker([club.lat, club.lng], {
        icon: makeSvgIcon(
          L,
          cfg.color,
          club.tier === "Super",
          club.tier === "Future",
          club.tier === "New"
        ),
        title: `David Lloyd ${club.name}`,
      });
      marker.bindPopup(
        `
        <div style="font-family:system-ui,sans-serif;min-width:190px;padding:2px 0">
          <div style="font-weight:700;font-size:14px;margin-bottom:5px;color:#111">David Lloyd ${
            club.name
          }</div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:7px">
            <span style="background:${cfg.color}20;color:${
          cfg.color
        };border:1px solid ${
          cfg.color
        }80;border-radius:4px;padding:2px 9px;font-size:12px;font-weight:700">${
          cfg.label
        }</span>
            <span style="font-size:11px;color:#888">${club.country}</span>
          </div>
          <div style="font-size:11.5px;color:#555;line-height:1.4">${
            TIER_DESCRIPTIONS[club.tier]
          }</div>${
          club.opens
            ? `<div style="font-size:11.5px;color:#111;margin-top:6px"><b>Opening:</b> ${club.opens}</div>`
            : ""
        }
          <a href="${reportUrl(
            club
          )}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:9px;font-size:11px;color:#4d6fd0">Report an issue with this club</a>
        </div>
      `,
        { maxWidth: 250, autoPanPadding: [16, 16] }
      );
      layer.addLayer(marker);
    });
  }, [visibleClubs, mapReady]);

  // Zoom to the matching clubs when the search or country changes
  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!L || !map || (search === "" && country === "All")) return;
    const pts = visibleClubs.map((c) => [c.lat, c.lng]);
    if (pts.length === 0) return;
    map.fitBounds(L.latLngBounds(pts), { padding: [40, 40], maxZoom: 11 });
  }, [search, country, mapReady]);

  const toggleTier = (tier) =>
    setSelectedTiers((prev) => {
      const n = new Set(prev);
      n.has(tier) ? n.delete(tier) : n.add(tier);
      return n;
    });

  const allOn = selectedTiers.size === Object.keys(TIER_CONFIG).length;
  const filtersActive = !allOn || country !== "All" || search !== "";

  // Close the filter sheet with Escape
  useEffect(() => {
    if (!filtersOpen) return;
    const onKey = (e) => e.key === "Escape" && setFiltersOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtersOpen]);

  const searchControls = (
    <>
      <select
        className="control"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        aria-label="Country"
      >
        {COUNTRIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        className="control control-search"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search clubs…"
        aria-label="Search clubs"
      />
    </>
  );

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="brand">
          <div className="brand-logo">DL</div>
          <div>
            <div className="brand-title">David Lloyd Clubs — Tier Map</div>
            <div className="brand-sub">
              {CLUBS.length} locations across UK &amp; Europe · OpenStreetMap
            </div>
          </div>
        </div>
        <div className="header-controls">{searchControls}</div>
      </header>

      <div className="body">
        {/* Backdrop for the mobile filter sheet */}
        <div
          className={`backdrop${filtersOpen ? " open" : ""}`}
          onClick={() => setFiltersOpen(false)}
        />

        {/* Sidebar (desktop) / bottom sheet (mobile) */}
        <aside className={`panel${filtersOpen ? " open" : ""}`}>
          <div className="panel-handle-row">
            <div className="panel-handle" />
            <button
              className="panel-done"
              onClick={() => setFiltersOpen(false)}
            >
              Done
            </button>
          </div>

          <div className="panel-controls">{searchControls}</div>

          <div className="panel-heading">Filter by tier</div>
          <div style={{ padding: "0 10px 8px" }}>
            <button
              className="select-all"
              onClick={() =>
                setSelectedTiers(
                  allOn ? new Set() : new Set(Object.keys(TIER_CONFIG))
                )
              }
            >
              {allOn ? "Deselect All" : "Select All"}
            </button>
          </div>

          <div className="tier-list">
            {Object.entries(TIER_CONFIG)
              .sort((a, b) => a[1].order - b[1].order)
              .map(([tier, cfg]) => {
                const on = selectedTiers.has(tier);
                return (
                  <button
                    key={tier}
                    className="tier-btn"
                    onClick={() => toggleTier(tier)}
                    aria-pressed={on}
                    style={{
                      background: on ? `${cfg.color}15` : "transparent",
                      borderLeft: `3px solid ${
                        on ? cfg.color : "transparent"
                      }`,
                      opacity: on ? 1 : 0.35,
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 18 18"
                      style={{ flexShrink: 0 }}
                    >
                      {tier === "Super" ? (
                        <polygon
                          points="9,1.5 11.2,6.5 16.5,6.5 12.3,10 13.9,15.5 9,12 4.1,15.5 5.7,10 1.5,6.5 6.8,6.5"
                          fill={cfg.color}
                        />
                      ) : tier === "Future" ? (
                        <polygon
                          points="9,1 17,9 9,17 1,9"
                          fill={`${cfg.color}44`}
                          stroke={cfg.color}
                          strokeWidth="1.5"
                          strokeDasharray="3,2"
                        />
                      ) : tier === "New" ? (
                        <>
                          <circle cx="9" cy="9" r="6.5" fill={cfg.color} />
                          <text
                            x="9"
                            y="13"
                            textAnchor="middle"
                            fontSize="8"
                            fill="#000"
                            fontFamily="system-ui"
                            fontWeight="bold"
                          >
                            N
                          </text>
                        </>
                      ) : (
                        <circle cx="9" cy="9" r="6.5" fill={cfg.color} />
                      )}
                    </svg>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: on ? cfg.color : "#64748b",
                        }}
                      >
                        {cfg.label}
                      </div>
                      <div style={{ fontSize: 10, color: "#4a6080" }}>
                        {tierCounts[tier]} clubs
                      </div>
                    </div>
                    {on && (
                      <span style={{ fontSize: 10, color: cfg.color }}>✓</span>
                    )}
                  </button>
                );
              })}
          </div>

          <a
            className="report-link"
            href={reportUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            ⚑ Report an inaccuracy
          </a>

          <div className="panel-count">
            <div style={{ fontSize: 10, color: "#4a6080" }}>Showing</div>
            <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1 }}>
              {visibleClubs.length}
            </div>
            <div style={{ fontSize: 10, color: "#4a6080" }}>
              of {CLUBS.length} clubs
            </div>
          </div>
        </aside>

        {/* Map */}
        <main className="map-wrap">
          <div ref={mapContainerRef} className="map" />

          {!mapReady && (
            <div className="map-loading">
              <div style={{ fontSize: 30 }}>🗺️</div>
              <div style={{ fontSize: 14 }}>Loading map…</div>
            </div>
          )}

          {/* Mobile-only floating filter button */}
          <button
            className="fab-filters"
            onClick={() => setFiltersOpen(true)}
            aria-expanded={filtersOpen}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M3 5h18M6 12h12M10 19h4"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            Filters
            <span className="fab-count">
              {visibleClubs.length}
              {filtersActive && <span className="fab-dot" />}
            </span>
          </button>

          {/* Buy Me a Coffee — bottom left, above OSM attribution */}
          <a
            className="bmc"
            href="https://www.buymeacoffee.com/salmoncode"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="bmc-cup">☕</span>
            <span className="bmc-text">Buy me a coffee</span>
          </a>
        </main>
      </div>

      {/* Load Cookie font for the BMC button style */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cookie&display=swap');`}</style>
    </div>
  );
}
