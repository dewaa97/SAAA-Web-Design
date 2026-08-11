export type ProgrammeFeature = {
  text: string;
};

export type PathwayStep = {
  step: string;
  title: string;
  description: string;
  accentClass: string;
  iconClass: string;
};

export const projectImddProgramme = {
  title: "Project IMDD",
  paragraphs: [
    "Project IMDD is a talent development initiative led by SAAA@Singapore as part of SAAA's industry programmes. It enhances the logistics skills of young talents in Singapore's air cargo and logistics sector through mentorship, hands-on training, and long-term career development.",
    "Partnering with ITE and the five polytechnics, the programme pairs students with SAAA member companies through internships and work-study placements. By building skills competency before company-specific development, Project IMDD attracts, develops, and retains the next generation of tech-savvy logisticians for the industry.",
  ],
  features: [
    "Mentorship with partner logistics companies",
    "SAAA skills competency training programmes",
    "Partnerships with ITE and polytechnics",
    "Career progression and further education pathways",
  ],
  pathway: [
    {
      step: "Step 1",
      title: "Selection",
      description:
        "Interns are paired with pre-validated SAAA member logistics companies for internship or work-study placements.",
      accentClass: "pathway-accent-1",
      iconClass: "pathway-icon-1",
    },
    {
      step: "Step 2",
      title: "Skills Training",
      description:
        "Selected candidates undergo complimentary SAAA skills competency training throughout the programme.",
      accentClass: "pathway-accent-2",
      iconClass: "pathway-icon-2",
    },
    {
      step: "Step 3",
      title: "Mentorship",
      description:
        "Accelerated talent development through mentorship as full-time employees with partner companies.",
      accentClass: "pathway-accent-3",
      iconClass: "pathway-icon-3",
    },
    {
      step: "Step 4",
      title: "Further Education",
      description: "Direct entry to Work Study Degree or Work Study Specialist Diploma programmes.",
      accentClass: "pathway-accent-4",
      iconClass: "pathway-icon-4",
    },
  ] satisfies PathwayStep[],
  contactEmail: "events@saaa.org.sg",
};

export const ccpProgramme = {
  title: "Career Conversion Programme (CCP) for Air Transport Sector",
  externalUrl:
    "https://conversion.mycareersfuture.gov.sg/portal/ProgramDetails.aspx?ProgID=P00003355",
  description:
    "The Career Conversion Programme (CCP) is a workforce initiative by the SkillsFuture Workforce Development Agency (SWDA) that supports mid-career individuals in transitioning into the air freight forwarding industry.",
};

export const pendingProgramme = {
  title: "Job Redesign Playbook for the Aviation",
  badge: "Information Pending",
  description:
    "Details for this programme are being finalised. Please contact SAAA for the latest updates on aviation job redesign initiatives.",
};
