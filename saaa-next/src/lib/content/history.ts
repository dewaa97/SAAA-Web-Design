export type CouncilMember = {
  role: string;
  name: string;
  org: string;
};

export type CoreValue = {
  letter: string;
  label: string;
  description: string;
};

export const historyIntro = {
  tag: "Our Journey",
  titleAccent: "SAAA",
  description:
    "Established on 21 April 1971, Madam Mary Wu, Managing Director of Singapore Baggage Transport Agency Pte Ltd, formed the Singapore Aircargo Agents Association (SAAA). Its purpose was to advocate the promotion, protection and development of the business of carriage of goods by air transportation, as well as enhancing competiveness of the Air Cargo Forwarding business.",
};

export const firstBoardMembers: CouncilMember[] = [
  { role: "Chairman", name: "Mary Wu", org: "Singapore Baggage Transport Agency Pte Ltd" },
  { role: "Deputy Chairman", name: "Amir Kassim", org: "Air Cargo International Pte Ltd" },
  { role: "Honorary Treasurer", name: "Cheah Eng Lin", org: "Sam Foo Transport (Travel Service) Company Pte Ltd" },
  { role: "Honorary Secretary", name: "Gustav Patrick Sims", org: "Singapore Baggage Transport Agency Pte Ltd" },
  { role: "Board Member", name: "Paul Armstrong", org: "K.C. Dat (S) Pte Ltd" },
  { role: "Board Member", name: "Siew Weng Joo", org: "Singapore Baggage Transport Agency Pte Ltd" },
  { role: "Board Member", name: "Jackie Chua", org: "Hecny Transportation Pte Ltd" },
  { role: "Board Member", name: "Alan C.Y. Low", org: "Central Air-Cargo Agency Pte Ltd" },
];

export const historyParagraphs = [
  "In the 70s, numerous new international agents were setting up their offices in Singapore. This became a growing concern for the local agents and it prompted SAAA to step in and help upgrade their services and skills to meet new challenging demands.",
  "SAAA had since grown its membership base and works closely with various Government bodies and organisations to develop and propel the local air transportation industry. SAAA Cargo Services Pte Ltd was formed in 1988 as the commercial arm of SAAA to provide industry services.",
  "2013 marks a significant year for SAAA. A rebranding exercise was completed and on 1 October, SAAA@Singapore was officially launched by Mrs. Josephine Teo, Senior Minister of State, Ministry of Transport and Ministry of Finance. The significant change is that SAAA@Singapore can now encompass all air logistics related sectors to better represent the industry.",
];

export const trainingHighlight = {
  tag: "Training History",
  title: "SAAA Cargo Services & Training Development",
  description:
    "SAAA Cargo Services Pte Ltd (SCS) was formed as an investment arm of SAAA. Among its diverse activities, SCS undertakes cargo clearance permit processing service, sale of the Trade Development Board's revenue stamps, providing cargo insurance coverage for shipments, and issuing Certificate of Origin. Training courses are also gradually being transferred to SCS from SAAA. SCS is now accredited by the International Air Transport Association (IATA) as an Authorised Training Centre to conduct courses.",
};

export const scsServices = [
  "Tradenet Documentations",
  "Training courses (Accredited IATA Training Center)",
  "Sale of Bar Code Labels",
  "Neutral Airway Bills",
  "Issuing of Certificate of Origin",
];

export const coreValues: CoreValue[] = [
  { letter: "P", label: "Passion", description: "For continuous self-improvement" },
  { letter: "A", label: "Ace", description: "In innovation and delivering consistent excellence" },
  { letter: "C", label: "Commitment", description: "To roll great service and strive for change" },
  { letter: "T", label: "Trust", description: "In our Partners and engaging in future collaborations" },
];

export const objectives = [
  "To promote, protect and develop the business of carriage of goods by air transportation in general and the aircargo forwarding business in particular",
  "To advance and promote education and technical training in the aircargo forwarding industry and for such purposes to support training schemes",
  "To act as arbitrators and assist in the settlement of disputes between members",
  "To act as negotiating body for the member of the Association or with the approval of the Association, for any person, body or company for the transaction of any business connected with aircargo and to make recommendations to Government Departments or Agencies, IATA or other bodies in relation to any measure which may be taken involving members and/or the aircargo industry in Singapore",
  "To set and regulate high standards and practices to be maintained by members",
  "To protect the interest of SAAA members",
];

export const saaaMemberships = [
  "Federation of Asia-Pacific Aircargo Associations (FAPAA)",
  "International Federation of Freight Forwarders Associations (FIATA)",
  "ASEAN Federation of Forwarders Associations (AFA)",
  "Singapore International Chamber of Commerce (SICC)",
  "Singapore Chinese Chamber of Commerce & Industry (SCCI)",
];

export const industryCommittees = [
  "Airport Police Department (APD)",
  "Civil Aviation Authority of Singapore (CAAS)",
  "Singapore Customs (SC)",
  "Customs Advisory Committee (CAC)",
  "Immigration & Checkpoints Authority (ICA)",
  "Land Transport Authority (LTA)",
  "International Air Transport Association (IATA)",
  "Changi International Airport Services Pte Ltd (CIAS)",
  "SATS Airport Services Pte Ltd (SATS)",
  "International Enterprise Singapore (IE Singapore)",
  "Infocomm Development Authority of Singapore (IDA)",
  "SPRING Singapore",
];
