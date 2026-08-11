export type ContactHours = {
  phone?: string;
  fax?: string;
  email: string;
  address?: string;
  hours: { day: string; time: string }[];
};

export const permitService = {
  registerUrl: "https://main.d1zqfaeaa5ju6p.amplifyapp.com/permit",
  sections: [
    {
      title: "Permit Declaration",
      body: "SAAA Cargo Services provide permit services for all walk-ins. The operating hours and office location makes it convenient for customers to apply import permits and subsequently proceeds with clearing of cargoes from terminals. We also provide services for export permits.",
    },
    {
      title: "Certificate of Origin",
      body: "Our operations office is also a collection centre for Certificate of Origins since 01 March 2006. Agents can conveniently apply these via Crimsonlogic portal and select SAAA as the collection centre. These certificates can be collected at our office with fees charged.",
      isCard: true,
    },
    {
      title: "ACES Cargo Manifest",
      body: "ACES is an electronic submission of Cargo Manifest Declaration. SAAA will provide the manifest submission services to Singapore Customs.",
    },
  ],
  contact: {
    phone: "(+65) 6545 9597",
    fax: "(+65) 6543 0147",
    email: "scs@saaa.org.sg",
    address: "105 Airport Cargo Road #01-107, SATS Airfreight Terminal 3, Core H, Singapore 819462",
    hours: [
      { day: "Monday to Friday", time: "08:30 – 20:00" },
      { day: "Saturday", time: "09:00 – 20:00" },
      { day: "Sunday & Public Holidays", time: "10:00 – 20:00" },
    ],
  } satisfies ContactHours,
};

export const neutralAirwayBill = {
  intro: "SAAA provides neutral airway bills (NAB) to member companies for use in air cargo documentation. Members may order NAB stock through the SAAA Cargo Services office.",
  sections: [
    {
      title: "Ordering NAB Stock",
      body: "Member companies can place orders for neutral airway bills by contacting SAAA Cargo Services. Stock is subject to availability and member account standing.",
    },
    {
      title: "Collection & Payment",
      body: "NAB stock can be collected from the SAAA Cargo Services office during operating hours. Payment terms and pricing are communicated upon order confirmation.",
      isCard: true,
    },
  ],
  contact: permitService.contact,
};

export const barCodeLabels = {
  intro: "SAAA supplies bar code labels for air cargo operations, supporting member companies with compliant labelling for shipments handled through Singapore.",
  sections: [
    {
      title: "Label Orders",
      body: "Member companies may order bar code labels through SAAA Cargo Services. Orders can be placed via email or in person at the permits office.",
    },
    {
      title: "Specifications",
      body: "Labels are supplied in standard formats compatible with industry requirements. Contact the office for current specifications and pricing.",
      isCard: true,
    },
  ],
  contact: permitService.contact,
};
