export type MilestoneEvent = {
  year: string;
  text: string;
};

export type MilestoneDecade = {
  decade: string;
  side: "left" | "right";
  iconClass: string;
  events: MilestoneEvent[];
};

export const milestones: MilestoneDecade[] = [
  {
    decade: "1970s",
    side: "left",
    iconClass: "milestone-icon-1970s",
    events: [
      { year: "1971", text: "Formation of the Singapore Aircargo Agents Association" },
      { year: "1977", text: 'Change of name to "The Singapore Aircargo Agents Association"' },
      { year: "1978", text: "Official adoption of the SAAA logo" },
      { year: "1979", text: "Standard Trading Conditions were implemented" },
    ],
  },
  {
    decade: "1980s",
    side: "right",
    iconClass: "milestone-icon-1980s",
    events: [
      { year: "1982", text: "First Dangerous Goods Course was conducted" },
      { year: "1985", text: "SAAA together with Air Cargo Association of Korea (ACAK) mooted the idea of forming a Federation of Asia-Pacific Aircargo Agents Associations (FAPAA). FAPAA was formed in the same year" },
      { year: "1986", text: "First FAPAA meeting was held in Singapore" },
    ],
  },
  {
    decade: "1990s",
    side: "left",
    iconClass: "milestone-icon-1990s",
    events: [
      { year: "1991", text: "SAAA was invited to serve on the National Computer Board (NCB) Committee" },
      { year: "1993", text: "SAAA set up a Task Force to research and advise on Goods & Services Tax (GST)" },
      { year: "1995", text: "First SAAA Charity Golf Tournament was held in aid of the Dyslexia Association of Singapore" },
      { year: "1996", text: "SAAA celebrated its 25th Anniversary" },
      { year: "1997", text: "Chairman SAAA, invited to participate in the 4th Brunei-Singapore Exchange delegation led by the Minister for Foreign Affairs & Minister for Law" },
    ],
  },
  {
    decade: "2000s",
    side: "right",
    iconClass: "milestone-icon-2000s",
    events: [
      { year: "2000", text: "Forklift Driving Certification Course granted SDF" },
      { year: "2001", text: "SAAA Members invited to the International Civil Aviation Organisation (ICAO) Regional Dangerous Goods Seminar for Asia and Pacific region" },
      { year: "2002", text: "Hosting of the 12th AFFA General Meeting by SAAA & SLA" },
      { year: "2003", text: "Launch of CargoTec Pte Ltd at the Laguna National Golf and Country Club" },
      { year: "2007", text: "SAAA participated in the Career Fair Exhibition 2007" },
      { year: "2008", text: "SAAA, Airport Police Division and CAAS jointly organised the Regulated Cargo Agent Regime (RCAR) Outreach Programme" },
    ],
  },
  {
    decade: "2010s",
    side: "left",
    iconClass: "milestone-icon-2010s",
    events: [
      { year: "2011", text: "SAAA participated in the first Aviation Open House under the invitation of CAAS" },
      { year: "2012", text: "SAAA was invited by CAAS to sit in the Air Cargo Manpower Advisory Committee" },
      { year: "2013", text: "Rebranding of SAAA@Singapore" },
      { year: "2014", text: "SAAA@Singapore has been awarded bizSAFE Level 3 certification from Workplace Safety and Health Council" },
      { year: "2015", text: "SAAA@Singapore has been awarded bizSAFE Partner certification from Workplace Safety and Health Council" },
      { year: "2016", text: "SAAA@Singapore was recognised as having been part of the momentous milestone in Singapore's journey as a Nation — SG50" },
      { year: "2016", text: "SAAA Cargo Services Pte. Ltd. has been awarded as 2016 Asia Pacific Top Performing IATA Accredited Training School (ATS), as well as a 2016 Premier Circle Member" },
    ],
  },
];
