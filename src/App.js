import { useState, useEffect, useRef } from "react";

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
    lat: 51.4067,
    lng: -0.0246,
    country: "UK",
  },
  {
    name: "Finchley",
    tier: "Super",
    lat: 51.5916,
    lng: -0.1861,
    country: "UK",
  },
  {
    name: "Northwood",
    tier: "Super",
    lat: 51.6116,
    lng: -0.4226,
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
    lat: 46.2044,
    lng: 6.1432,
    country: "Switzerland",
  },
  {
    name: "Uccle",
    tier: "Super",
    lat: 50.8005,
    lng: 4.3517,
    country: "Belgium",
  },
  {
    name: "Serrano",
    tier: "Super",
    lat: 40.4333,
    lng: -3.6837,
    country: "Spain",
  },
  { name: "Brooklands", tier: "1", lat: 51.3623, lng: -0.4545, country: "UK" },
  { name: "Bushey", tier: "1", lat: 51.643, lng: -0.3718, country: "UK" },
  { name: "Cambridge", tier: "1", lat: 52.1951, lng: 0.1313, country: "UK" },
  { name: "Chigwell", tier: "1", lat: 51.6441, lng: 0.0731, country: "UK" },
  { name: "Enfield", tier: "1", lat: 51.6522, lng: -0.0808, country: "UK" },
  { name: "Epsom", tier: "1", lat: 51.3368, lng: -0.2686, country: "UK" },
  { name: "Fulham", tier: "1", lat: 51.4791, lng: -0.2095, country: "UK" },
  {
    name: "Kidbrooke Village",
    tier: "1",
    lat: 51.4661,
    lng: 0.0243,
    country: "UK",
  },
  {
    name: "Milton Keynes",
    tier: "1",
    lat: 52.0406,
    lng: -0.7594,
    country: "UK",
  },
  {
    name: "Notting Hill",
    tier: "1",
    lat: 51.5138,
    lng: -0.2022,
    country: "UK",
  },
  {
    name: "Royal Berkshire",
    tier: "1",
    lat: 51.4306,
    lng: -0.7311,
    country: "UK",
  },
  { name: "Hampton", tier: "1", lat: 51.4108, lng: -0.3728, country: "UK" },
  { name: "Purley", tier: "1", lat: 51.3343, lng: -0.1125, country: "UK" },
  { name: "Wickwoods", tier: "1", lat: 50.9702, lng: -0.2476, country: "UK" },
  {
    name: "Sterrebeek",
    tier: "1",
    lat: 50.8706,
    lng: 4.5014,
    country: "Belgium",
  },
  { name: "La Finca", tier: "1", lat: 40.3457, lng: -3.7271, country: "Spain" },
  { name: "Boadilla", tier: "1", lat: 40.4065, lng: -3.8765, country: "Spain" },
  { name: "Gava Mar", tier: "1", lat: 41.2977, lng: 1.9965, country: "Spain" },
  {
    name: "Cricklewood Lane",
    tier: "2",
    lat: 51.5636,
    lng: -0.2141,
    country: "UK",
  },
  { name: "Acton Park", tier: "2", lat: 51.5102, lng: -0.2784, country: "UK" },
  {
    name: "Beaconsfield",
    tier: "2",
    lat: 51.6079,
    lng: -0.6477,
    country: "UK",
  },
  { name: "Dartford", tier: "2", lat: 51.4466, lng: 0.2241, country: "UK" },
  { name: "Farnham", tier: "2", lat: 51.2152, lng: -0.7986, country: "UK" },
  { name: "Woking", tier: "2", lat: 51.3188, lng: -0.5585, country: "UK" },
  {
    name: "Bristol Westbury",
    tier: "2",
    lat: 51.4928,
    lng: -2.6271,
    country: "UK",
  },
  {
    name: "Bristol Emersons Green",
    tier: "2",
    lat: 51.4933,
    lng: -2.4936,
    country: "UK",
  },
  {
    name: "Manchester Trafford City",
    tier: "2",
    lat: 53.4643,
    lng: -2.3339,
    country: "UK",
  },
  {
    name: "West Bridgford",
    tier: "2",
    lat: 52.922,
    lng: -1.1366,
    country: "UK",
  },
  { name: "Cheadle", tier: "2", lat: 53.3789, lng: -2.204, country: "UK" },
  { name: "Newcastle", tier: "2", lat: 54.9778, lng: -1.6109, country: "UK" },
  { name: "Leeds", tier: "2", lat: 53.7965, lng: -1.5479, country: "UK" },
  { name: "Lichfield", tier: "2", lat: 52.682, lng: -1.8274, country: "UK" },
  { name: "Hatfield", tier: "2", lat: 51.7623, lng: -0.2353, country: "UK" },
  { name: "Exeter", tier: "2", lat: 50.7184, lng: -3.5339, country: "UK" },
  { name: "Derby", tier: "2", lat: 52.9225, lng: -1.4773, country: "UK" },
  { name: "Veigy", tier: "2", lat: 46.3167, lng: 6.2167, country: "France" },
  { name: "Aravaca", tier: "2", lat: 40.4527, lng: -3.7714, country: "Spain" },
  { name: "Turo", tier: "2", lat: 41.3968, lng: 2.1356, country: "Spain" },
  { name: "Antwerp", tier: "2", lat: 51.2194, lng: 4.4025, country: "Belgium" },
  { name: "Gidea Park", tier: "3", lat: 51.5806, lng: 0.1988, country: "UK" },
  { name: "Coventry", tier: "3", lat: 52.4068, lng: -1.5197, country: "UK" },
  { name: "Shawfair", tier: "3", lat: 55.94, lng: -3.068, country: "UK" },
  { name: "Sidcup", tier: "3", lat: 51.4274, lng: 0.1053, country: "UK" },
  { name: "Southend", tier: "3", lat: 51.5459, lng: 0.7077, country: "UK" },
  { name: "Bicester", tier: "3", lat: 51.9109, lng: -1.1517, country: "UK" },
  { name: "Colchester", tier: "3", lat: 51.8917, lng: 0.9011, country: "UK" },
  { name: "Gloucester", tier: "3", lat: 51.8642, lng: -2.2382, country: "UK" },
  { name: "Heston", tier: "3", lat: 51.4775, lng: -0.3791, country: "UK" },
  { name: "Sudbury Hill", tier: "3", lat: 51.554, lng: -0.3329, country: "UK" },
  {
    name: "Bury St Edmunds",
    tier: "3",
    lat: 52.2459,
    lng: 0.7145,
    country: "UK",
  },
  { name: "Oxford", tier: "3", lat: 51.752, lng: -1.2577, country: "UK" },
  { name: "Rouken Glen", tier: "3", lat: 55.8073, lng: -4.2985, country: "UK" },
  { name: "Rugby", tier: "3", lat: 52.3788, lng: -1.2563, country: "UK" },
  {
    name: "Solihull Cranmore",
    tier: "3",
    lat: 52.4139,
    lng: -1.8019,
    country: "UK",
  },
  { name: "Ringwood", tier: "3", lat: 50.8456, lng: -1.7966, country: "UK" },
  { name: "Cheam", tier: "3", lat: 51.3641, lng: -0.2202, country: "UK" },
  {
    name: "Amsterdam",
    tier: "3",
    lat: 52.3676,
    lng: 4.9041,
    country: "Netherlands",
  },
  { name: "Malaspina", tier: "3", lat: 41.545, lng: 2.1074, country: "Spain" },
  { name: "Modena", tier: "3", lat: 44.6471, lng: 10.9252, country: "Italy" },
  { name: "Kensington", tier: "4", lat: 51.4985, lng: -0.1931, country: "UK" },
  { name: "Kings Hill", tier: "4", lat: 51.2714, lng: 0.4134, country: "UK" },
  { name: "Basildon", tier: "4", lat: 51.5762, lng: 0.4955, country: "UK" },
  { name: "Cardiff", tier: "4", lat: 51.4816, lng: -3.1791, country: "UK" },
  {
    name: "Glasgow West End",
    tier: "4",
    lat: 55.8762,
    lng: -4.3041,
    country: "UK",
  },
  { name: "Worthing", tier: "4", lat: 50.8291, lng: -0.4191, country: "UK" },
  { name: "Lincoln", tier: "4", lat: 53.2307, lng: -0.5406, country: "UK" },
  { name: "Narborough", tier: "4", lat: 52.5815, lng: -1.2059, country: "UK" },
  { name: "Southampton", tier: "4", lat: 50.9097, lng: -1.4044, country: "UK" },
  { name: "Bromsgrove", tier: "4", lat: 52.332, lng: -2.0588, country: "UK" },
  { name: "York", tier: "4", lat: 53.959, lng: -1.0815, country: "UK" },
  { name: "Ipswich", tier: "4", lat: 52.0577, lng: 1.1393, country: "UK" },
  { name: "Newbury", tier: "4", lat: 51.3927, lng: -1.3048, country: "UK" },
  {
    name: "Southampton West End",
    tier: "4",
    lat: 50.9234,
    lng: -1.3381,
    country: "UK",
  },
  {
    name: "Liverpool Speke",
    tier: "4",
    lat: 53.3583,
    lng: -2.8577,
    country: "UK",
  },
  { name: "Teesside", tier: "4", lat: 54.5694, lng: -1.2195, country: "UK" },
  { name: "Worcester", tier: "4", lat: 52.192, lng: -2.221, country: "UK" },
  {
    name: "Bristol Long Ashton",
    tier: "4",
    lat: 51.4356,
    lng: -2.6488,
    country: "UK",
  },
  { name: "Edinburgh", tier: "4", lat: 55.9533, lng: -3.1883, country: "UK" },
  { name: "Luton", tier: "4", lat: 51.8787, lng: -0.42, country: "UK" },
  {
    name: "Bad Homburg",
    tier: "4",
    lat: 50.2269,
    lng: 8.6186,
    country: "Germany",
  },
  {
    name: "Frankfurt",
    tier: "4",
    lat: 50.1109,
    lng: 8.6821,
    country: "Germany",
  },
  { name: "Harrogate", tier: "5", lat: 54.0062, lng: -1.5387, country: "UK" },
  { name: "Kingston", tier: "5", lat: 51.4085, lng: -0.3006, country: "UK" },
  { name: "Swindon", tier: "5", lat: 51.5558, lng: -1.7797, country: "UK" },
  { name: "Brighton", tier: "5", lat: 50.8225, lng: -0.1372, country: "UK" },
  { name: "Chorley", tier: "5", lat: 53.653, lng: -2.6291, country: "UK" },
  { name: "Eastbourne", tier: "5", lat: 50.77, lng: 0.2837, country: "UK" },
  { name: "Poole", tier: "5", lat: 50.7214, lng: -2.0071, country: "UK" },
  { name: "Port Solent", tier: "5", lat: 50.8477, lng: -1.0793, country: "UK" },
  { name: "Aberdeen", tier: "5", lat: 57.1497, lng: -2.0943, country: "UK" },
  { name: "Bolton", tier: "5", lat: 53.5781, lng: -2.4283, country: "UK" },
  {
    name: "Cheshire Oaks",
    tier: "5",
    lat: 53.2721,
    lng: -2.8695,
    country: "UK",
  },
  { name: "Warrington", tier: "5", lat: 53.39, lng: -2.597, country: "UK" },
  { name: "Shrewsbury", tier: "5", lat: 52.707, lng: -2.7519, country: "UK" },
  {
    name: "Alstertal",
    tier: "5",
    lat: 53.6591,
    lng: 10.015,
    country: "Germany",
  },
  {
    name: "Wandsbek",
    tier: "5",
    lat: 53.5709,
    lng: 10.0713,
    country: "Germany",
  },
  {
    name: "Eppendorf",
    tier: "5",
    lat: 53.5944,
    lng: 9.9825,
    country: "Germany",
  },
  {
    name: "Capelle",
    tier: "5",
    lat: 51.9282,
    lng: 4.5786,
    country: "Netherlands",
  },
  {
    name: "Spandau",
    tier: "5",
    lat: 52.5352,
    lng: 13.2001,
    country: "Germany",
  },
  { name: "Birmingham", tier: "6", lat: 52.4862, lng: -1.8904, country: "UK" },
  { name: "Hamilton", tier: "6", lat: 55.7771, lng: -4.0397, country: "UK" },
  {
    name: "Manchester North",
    tier: "6",
    lat: 53.5195,
    lng: -2.2614,
    country: "UK",
  },
  {
    name: "Newhaven Harbour",
    tier: "6",
    lat: 55.9823,
    lng: -3.1896,
    country: "UK",
  },
  { name: "Nottingham", tier: "6", lat: 52.9548, lng: -1.1581, country: "UK" },
  { name: "Renfrew", tier: "6", lat: 55.8817, lng: -4.4024, country: "UK" },
  {
    name: "Peterborough",
    tier: "6",
    lat: 52.5695,
    lng: -0.2405,
    country: "UK",
  },
  { name: "Reading", tier: "6", lat: 51.4543, lng: -0.9781, country: "UK" },
  { name: "Sunderland", tier: "6", lat: 54.9063, lng: -1.3838, country: "UK" },
  { name: "Malaga", tier: "6", lat: 36.7213, lng: -4.4214, country: "Spain" },
  {
    name: "Blijdorp",
    tier: "6",
    lat: 51.9293,
    lng: 4.4669,
    country: "Netherlands",
  },
  {
    name: "Eindhoven",
    tier: "6",
    lat: 51.4416,
    lng: 5.4697,
    country: "Netherlands",
  },
  {
    name: "Rotterdam Centrum",
    tier: "6",
    lat: 51.9225,
    lng: 4.4792,
    country: "Netherlands",
  },
  { name: "Zaragoza", tier: "6", lat: 41.6488, lng: -0.8891, country: "Spain" },
  {
    name: "Am Michel",
    tier: "6",
    lat: 53.5494,
    lng: 9.9663,
    country: "Germany",
  },
  {
    name: "Barmbek",
    tier: "6",
    lat: 53.5892,
    lng: 10.0407,
    country: "Germany",
  },
  { name: "Belfast", tier: "7", lat: 54.5973, lng: -5.9301, country: "UK" },
  { name: "Norwich", tier: "7", lat: 52.6309, lng: 1.2974, country: "UK" },
  { name: "Swansea", tier: "7", lat: 51.6214, lng: -3.9436, country: "UK" },
  { name: "Dudley", tier: "7", lat: 52.512, lng: -2.081, country: "UK" },
  { name: "Dundee", tier: "7", lat: 56.462, lng: -2.9707, country: "UK" },
  { name: "Hull", tier: "7", lat: 53.7457, lng: -0.3367, country: "UK" },
  { name: "Knowsley", tier: "7", lat: 53.4521, lng: -2.8534, country: "UK" },
  { name: "Stevenage", tier: "7", lat: 51.9045, lng: -0.2019, country: "UK" },
  { name: "Maidenhead", tier: "7", lat: 51.5233, lng: -0.7127, country: "UK" },
  {
    name: "Leicester Meridian",
    tier: "7",
    lat: 52.6,
    lng: -1.153,
    country: "UK",
  },

  // ── New clubs — opened late 2025, tier TBC ──────────────────────────────────
  {
    name: "Colliers Wood",
    tier: "1",
    lat: 51.4154,
    lng: -0.1781,
    country: "UK",
  },
  { name: "Herne Bay", tier: "New", lat: 51.3762, lng: 1.129, country: "UK" },
  { name: "Harlow", tier: "2", lat: 51.7714, lng: 0.1134, country: "UK" },

  // ── Coming Soon ─────────────────────────────────────────────────────────────
  {
    name: "Bedford",
    tier: "Future",
    lat: 52.130232,
    lng: -0.44857,
    country: "UK",
  },
  { 
    name: "Bishop's Cleeve",
    tier: "Future",
    lat: 51.946908,
    lng: -2.082905,
    country: "UK",
  },
  { 
    name: "St Neots",
    tier: "Future",
    lat: 52.223946,
    lng: -0.248399,
    country: "UK",
  },
  { 
    name: "Kettering",
    tier: "Future",
    lat: 52.377653,
    lng: -0.6810299,
    country: "UK",
  },
  { 
    name: "Ashford",
    tier: "Future",
    lat: 51.125626,
    lng: 0.902772,
    country: "UK",
  },
];

const COUNTRIES = [
  "All",
  ...Array.from(new Set(CLUBS.map((c) => c.country))).sort(),
];

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
    className: "",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -12],
  });
}

export default function DavidLloydMap() {
  const [selectedTiers, setSelectedTiers] = useState(
    new Set(Object.keys(TIER_CONFIG))
  );
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const [mapReady, setMapReady] = useState(false);

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const leafletRef = useRef(null);

  const tierCounts = {};
  Object.keys(TIER_CONFIG).forEach((t) => {
    tierCounts[t] = CLUBS.filter((c) => c.tier === t).length;
  });

  const visibleClubs = CLUBS.filter(
    (c) =>
      selectedTiers.has(c.tier) &&
      (country === "All" || c.country === country) &&
      (search === "" || c.name.toLowerCase().includes(search.toLowerCase()))
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
    const map = L.map(mapContainerRef.current, { preferCanvas: true }).setView(
      [52.5, -1.5],
      6
    );
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
          }</div>
        </div>
      `,
        { maxWidth: 250 }
      );
      layer.addLayer(marker);
    });
  }, [visibleClubs, mapReady]);

  const toggleTier = (tier) =>
    setSelectedTiers((prev) => {
      const n = new Set(prev);
      n.has(tier) ? n.delete(tier) : n.add(tier);
      return n;
    });

  const allOn = selectedTiers.size === Object.keys(TIER_CONFIG).length;

  return (
    <div
      style={{
        fontFamily: "system-ui,sans-serif",
        background: "#0d1117",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "#e2e8f0",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#111827",
          borderBottom: "1px solid #1e2a40",
          padding: "11px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 7,
              background: "linear-gradient(135deg,#FFD700,#FF8C42)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 13,
              color: "#111",
            }}
          >
            DL
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>
              David Lloyd Clubs — Tier Map
            </div>
            <div style={{ fontSize: 11, color: "#4a6080" }}>
              {CLUBS.length} locations across UK &amp; Europe · OpenStreetMap
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{
              background: "#1e2a40",
              border: "1px solid #2a3a55",
              borderRadius: 7,
              color: "#e2e8f0",
              padding: "7px 10px",
              fontSize: 13,
              outline: "none",
            }}
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clubs…"
            style={{
              background: "#1e2a40",
              border: "1px solid #2a3a55",
              borderRadius: 7,
              color: "#e2e8f0",
              padding: "7px 12px",
              fontSize: 13,
              width: 190,
              outline: "none",
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div
          style={{
            width: 210,
            background: "#111827",
            borderRight: "1px solid #1e2a40",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              padding: "11px 13px 5px",
              fontSize: 10,
              fontWeight: 700,
              color: "#4a6080",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Filter by tier
          </div>
          <div style={{ padding: "0 10px 8px" }}>
            <button
              onClick={() =>
                setSelectedTiers(
                  allOn ? new Set() : new Set(Object.keys(TIER_CONFIG))
                )
              }
              style={{
                width: "100%",
                background: "#1e2a40",
                border: "1px solid #2a3a55",
                borderRadius: 6,
                color: "#94a3b8",
                fontSize: 11,
                padding: "5px",
                cursor: "pointer",
              }}
            >
              {allOn ? "Deselect All" : "Select All"}
            </button>
          </div>

          {Object.entries(TIER_CONFIG)
            .sort((a, b) => a[1].order - b[1].order)
            .map(([tier, cfg]) => {
              const on = selectedTiers.has(tier);
              return (
                <button
                  key={tier}
                  onClick={() => toggleTier(tier)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    width: "100%",
                    background: on ? `${cfg.color}15` : "transparent",
                    border: "none",
                    borderLeft: `3px solid ${on ? cfg.color : "transparent"}`,
                    padding: "8px 12px",
                    cursor: "pointer",
                    opacity: on ? 1 : 0.35,
                    transition: "all 0.12s",
                    textAlign: "left",
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
                  <div style={{ flex: 1 }}>
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

          <div
            style={{
              marginTop: "auto",
              padding: "12px",
              borderTop: "1px solid #1e2a40",
            }}
          >
            <div style={{ fontSize: 10, color: "#4a6080" }}>Showing</div>
            <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1 }}>
              {visibleClubs.length}
            </div>
            <div style={{ fontSize: 10, color: "#4a6080" }}>
              of {CLUBS.length} clubs
            </div>
          </div>
        </div>

        {/* Map */}
        <div style={{ flex: 1, position: "relative" }}>
          <div
            ref={mapContainerRef}
            style={{ width: "100%", height: "100%" }}
          />

          {!mapReady && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#0d1117",
                flexDirection: "column",
                gap: 10,
                color: "#4a6080",
              }}
            >
              <div style={{ fontSize: 30 }}>🗺️</div>
              <div style={{ fontSize: 14 }}>Loading map…</div>
            </div>
          )}

          {/* Buy Me a Coffee — bottom left, above OSM attribution */}
          <div
            style={{
              position: "absolute",
              bottom: 32,
              left: 16,
              zIndex: 1000,
              pointerEvents: "auto",
            }}
          >
            <a
              href="https://www.buymeacoffee.com/salmoncode"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#5F7FFF",
                color: "#ffffff",
                border: "1px solid #000",
                borderRadius: 8,
                padding: "8px 16px",
                fontFamily: "'Cookie', cursive",
                fontSize: 18,
                fontWeight: 400,
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: 20 }}>☕</span>
              Buy me a coffee
            </a>
          </div>
        </div>
      </div>

      {/* Load Cookie font for the BMC button style */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cookie&display=swap');`}</style>
    </div>
  );
}
