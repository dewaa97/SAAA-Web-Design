export type LogoItem = {
  src: string;
  alt: string;
  scale?: number;
};

export const memberLogos: LogoItem[] = [
  { src: "/images/members/logos/dhl.jpg", alt: "DHL" },
  { src: "/images/members/logos/kuehne-nagel-in-singapore.png", alt: "Kuehne+Nagel" },
  { src: "/images/members/logos/yusen-logistics-pte-ltd.png", alt: "Yusen Logistics" },
  { src: "/images/members/logos/jas-forwarding-worldwide-pte-ltd.png", alt: "JAS Forwarding" },
  { src: "/images/members/logos/dnata-singapore-pte-ltd.png", alt: "dnata Singapore" },
  { src: "/images/members/logos/sats-airport-services-pte-ltd.png", alt: "SATS" },
  { src: "/images/members/logos/ups-pte-ltd.png", alt: "UPS" },
  { src: "/images/members/logos/b-h-worldwide-sg-pte-ltd.png", alt: "B&H Worldwide" },
  { src: "/images/members/logos/global-airfreight-international-pte-ltd.png", alt: "Global Airfreight International" },
  { src: "/images/members/logos/scanwell-logistics-singapore-pte-ltd.png", alt: "Scanwell Logistics" },
  { src: "/images/members/logos/st-logistics-pte-ltd.png", alt: "ST Logistics" },
  { src: "/images/members/logos/seko.png", alt: "SEKO" },
  { src: "/images/members/logos/alliance-21-pte-ltd.jpg", alt: "Alliance 21" },
  { src: "/images/members/logos/logwin-air-ocean-singapore-pte-ltd.png", alt: "Logwin" },
  { src: "/images/members/logos/rcs-logistics-singapore-pte-ltd.png", alt: "RCS Logistics" },
  { src: "/images/members/logos/quickflo-logistics-pte-ltd.png", alt: "Quickflo Logistics" },
  { src: "/images/members/logos/cargo-community-network-pte-ltd.jpg", alt: "Cargo Community Network" },
  { src: "/images/members/logos/aspac-aircargo-services-pte-ltd.jpg", alt: "ASPAC Aircargo Services" },
  { src: "/images/members/logos/acs-freight-services-pte-ltd.jpg", alt: "ACS Freight Services" },
  { src: "/images/members/logos/baylink-logistics-pte-ltd.jpg", alt: "Baylink Logistics" },
  { src: "/images/members/logos/evo-logistics-pte-ltd.png", alt: "EVO Logistics" },
  { src: "/images/members/logos/harbour-handlers-pte-ltd.png", alt: "Harbour Handlers" },
  { src: "/images/members/logos/mercury-freight-distribution-pte-ltd.png", alt: "Mercury Freight" },
  { src: "/images/members/logos/pacific-logistics-group-pte-ltd.png", alt: "Pacific Logistics Group" },
];

export const partnerLogos = {
  government: [
    { src: "/images/partners/caas.png", alt: "CAAS" },
    { src: "/images/partners/esg.png", alt: "Enterprise Singapore" },
    { src: "/images/partners/ica.png", alt: "ICA" },
    { src: "/images/partners/imda.png", alt: "IMDA" },
    { src: "/images/partners/mindef.jpeg", alt: "MINDEF" },
    { src: "/images/partners/mot.png", alt: "MOT" },
    { src: "/images/partners/swda.png", alt: "SWDA" },
    { src: "/images/partners/sc.jpeg", alt: "Singapore Customs" },
    { src: "/images/partners/wshc.jpeg", alt: "WSHC" },
  ],
  industry: [
    { src: "/images/partners/aais.jpeg", alt: "AAIS" },
    { src: "/images/partners/asme.jpeg", alt: "ASME" },
    { src: "/images/partners/aon.png", alt: "AON" },
    { src: "/images/partners/ccn.png", alt: "Cargo Community Network" },
    { src: "/images/partners/dnata.jpeg", alt: "dnata Singapore" },
    { src: "/images/partners/e2i.jpeg", alt: "e2i" },
    { src: "/images/partners/iata.jpeg", alt: "IATA" },
    { src: "/images/partners/ihrp.jpeg", alt: "IHRP" },
    { src: "/images/partners/lscms.png", alt: "LSCMS" },
    { src: "/images/partners/sats.jpeg", alt: "SATS" },
    { src: "/images/partners/snef.png", alt: "SNEF" },
    { src: "/images/partners/ssia.png", alt: "SSIA" },
  ],
  ihls: [
    { src: "/images/partners/ite.png", alt: "ITE" },
    { src: "/images/partners/rp.jpeg", alt: "Republic Polytechnic" },
    { src: "/images/partners/tp.jpeg", alt: "Temasek Polytechnic" },
  ],
} satisfies Record<string, LogoItem[]>;
