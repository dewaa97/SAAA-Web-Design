export type ImddHubNavItem = {
  id: string;
  label: string;
  href: string;
  description: string;
  icon: "home" | "info" | "calendar" | "building" | "users" | "briefcase" | "mail";
};

export type ImddInstitution = {
  name: string;
  logo: string;
  url?: string;
};

export type ImddPhase = {
  phase: string;
  title: string;
  description: string;
};

export type ImddTestimonial = {
  name: string;
  role: string;
  quote: string;
};

export const imddContent = {
  contactEmail: "events@saaa.org.sg",
  intro:
    "Project IMDD focuses on enhancing the logistics skills of young talents through mentorship and a hands-on approach by providing skills-based knowledge, it aims to empower individuals in the field. The project leverages on Digitalization, Sustainability, and Generative Artificial Intelligence to address geopolitical challenges in Supply Chain Management",
  mission:
    "SAAA@Singapore's Project IMDD aims to attract talent to the logistics industry by offering skills competency training, mentorship, and long-term career development opportunities.",
  quote: {
    text: "Young Singaporeans entering the workforce are equipped with the latest knowledge and skills from school, but will still need to sharpen their skills based on their work requirements",
    author: "PM Lawrence Wong",
    source: "Ng Wei Kai, Straits Times, November 19 2024",
  },
  objectives: [
    "To start from the root by partnering with the 5 polytechnics and ITE",
    "To pair the students through internship or work-study initiatives with forward looking logistics companies",
    "To retain talents though far-sighted career initiatives",
    "To further talent's education with direct entry for Work Study Degree or Work Study Specialist Diploma",
    "To develop skills competency training through SAAA training programmes before embarking on company specific skill's trainings",
    "To expose talents through industry site visits organised by SAAA",
    "To develop a pool of next generation of high skilled and tech savvy logisticians through this initiative",
  ],
  phases: [
    { phase: "01", title: "Selection", description: "Interns undergo 5/6 months of internship with a pre-validated logistics company who are members of SAAA" },
    { phase: "02", title: "Basic Skills Competency Training", description: "Selected candidates will undergo extensive training with SAAA over the duration of Project IMDD" },
    { phase: "03", title: "Accelerated Logistician Talent Development", description: "Mentorship as a full-time employee with a partner logistics company" },
    { phase: "04", title: "Final Year Project", description: "Participate in SAAA Logistics Skills Competition" },
    { phase: "05", title: "Further Education", description: "Direct entry to Work Study Degree or Work Study Specialist Diploma" },
    { phase: "06", title: "Follow Up", description: "Monitor the progression of this initiative for the next 5 years" },
  ] satisfies ImddPhase[],
  caseStudy: {
    title: "Case Study — SAAA Pilot Run",
    paragraphs: [
      "To address the challenges of recruiting young talents into the logistics industry, SAAA Council Member (Roger Chew, SFS Global Logistics) accepted 2 ITE candidates majoring in Human Resource Management (GPA 1) & Events Management (GPA 2) respectively for Work Study Diploma to work as Logistics Specialists in 2023.",
      "After 2 years of mentoring, they are proficient in Control Tower Supply Chain Management for Cold Chain Pharma and Air Operations Roles. Their GPA also improved from 1 to 4 and 2 to 3.8 respectively. Through this success, SFS received overwhelming candidates wanting to intern or work full time with SFS after internship.",
      "SFS accepted more candidates for Project IMDD officially launching in 2025. 2 candidates Major in Logistics and 1 Major in Electrical Engineering to work as Logistics Specialists with SFS.",
    ],
  },
  institutions: [
    { name: "ITE", logo: "/images/project-imdd/ite.png", url: "https://www.ite.edu.sg" },
    { name: "Nanyang Polytechnic", logo: "/images/project-imdd/nanyang-polytechnic.svg", url: "https://www.nyp.edu.sg" },
    { name: "Ngee Ann Polytechnic", logo: "/images/project-imdd/ngee-ann-polytechnic.svg", url: "https://www.np.edu.sg" },
    { name: "Republic Polytechnic", logo: "/images/project-imdd/republic-polytechnic.png", url: "https://www.rp.edu.sg" },
    { name: "Singapore Polytechnic", logo: "/images/project-imdd/singapore-polytechnic.png", url: "https://www.sp.edu.sg" },
    { name: "Temasek Polytechnic", logo: "/images/project-imdd/temasek-polytechnic.svg", url: "https://www.tp.edu.sg" },
  ] satisfies ImddInstitution[],
  hubNav: [
    { id: "home", label: "Overview", href: "/project-imdd", description: "Why Project IMDD, mission, partner institutions, and talent stories.", icon: "home" },
    { id: "program", label: "Program", href: "/project-imdd/program", description: "Complimentary training programmes for IMDD interns.", icon: "calendar" },
    { id: "employers", label: "For Employers", href: "/project-imdd/employers", description: "Partner with Project IMDD and submit your company enquiry.", icon: "building" },
    { id: "applicants", label: "For Applicants", href: "/project-imdd/applicants", description: "Explore logistics careers and internship opportunities.", icon: "users" },
    { id: "companies", label: "Companies", href: "/project-imdd/companies", description: "Browse partner companies hiring through Project IMDD.", icon: "briefcase" },
  ] satisfies ImddHubNavItem[],
  testimonials: [
    { name: "Jovi Ng", role: "ITE Graduate in Higher Nitec Events Management", quote: "I had no experience in logistics when I joined my current company that took me onboard for work study diploma under a pilot program called Project IMDD. My mentor vigorously trained me in control tower supply chain management. Subsequently progressing into airfreight operations and vaccines management. Over the course of training that I received, my GPA went from 2.4 to current 3.8." },
    { name: "Thomas Ting", role: "ITE Graduate in Human Resource", quote: "During interview, i was informed about project IMDD and was glad that the company took me onboard for work study diploma despite not having any prior knowledge about logistics. Over the course of 2 years, I was mentored on pharma cold chain management for air export and import. I now have a clear understanding of air operations and I'm able to execute and manage critical pharmaceutical shipments confidently. Also my GPA prior to joining the company was 1.8 to currently 4. A grade that I thought was not achievable. Thank you Project IMDD" },
    { name: "Dylan Ang", role: "ITE Graduate in Nitec International Logistics", quote: "I was an intern with my current company and heard about a pilot program called project IMDD. I decided to participate and after completing my internship, the company offered me a full-time employment. For the first 2 months, i was mentored on how to manage e-commerce shipments and learn about air freight operations. My GPA is 3.8. However, embarking on project IMDD, i realized that the skills i received is worth more than grades." },
  ] satisfies ImddTestimonial[],
};

export type ImddCompany = {
  name: string;
  logo: string;
  url?: string;
  hasApply?: boolean;
};

export type ImddTrainingProgramme = {
  title: string;
  date: string;
  time: string;
  location: string;
  fee: string;
  image: string;
};

export const imddProgramContent = {
  trainingIntro: "Continuous learning is a journey and is paramount to the effectiveness of your workforce. SAAA leads by offering both practical, easy to implement and cost effective solutions to the logistics community with trainers who are professional practitioners.",
  trainingProgrammes: [
  {
    "title": "Building Up a Built-Up Pallet (Practical)",
    "date": "13 Nov 2025",
    "time": "9am to 5pm",
    "location": "TBC",
    "fee": "FOC IMDD Interns",
    "image": "/images/project-imdd/program-built-up-pallet.jpg"
  },
  {
    "title": "Overview of Airline Operations (Turkish Airline)",
    "date": "3 Dec 2025",
    "time": "9am to 5pm",
    "location": "SAAA Training Centre",
    "fee": "FOC IMDD Interns",
    "image": "/images/project-imdd/program-airline-operations.jpg"
  },
  {
    "title": "AI Solutions for Freight Forwarding Operations (Workshop)",
    "date": "30 Apr 2026",
    "time": "2pm to 4pm",
    "location": "SFS Global Office",
    "fee": "FOC IMDD Interns",
    "image": "/images/project-imdd/program-ai-workshop.jpg"
  },
  {
    "title": "CeMAT South East Asia 2026",
    "date": "13 May 2026",
    "time": "9am to 6pm",
    "location": "Singapore Expo",
    "fee": "FOC IMDD Interns",
    "image": "/images/project-imdd/program-cemat.jpg"
  }
] satisfies ImddTrainingProgramme[],
  brochure: {
  "year": 2026,
  "fileUrl": "https://41af8c4f-3239-4ac0-bbd7-d906f1f394a5.filesusr.com/ugd/8c57ed_49126f063d164c3d949c8ce40f9e1dde.pdf",
  "label": "View Internship Vacancies Brochure"
},
};

export const imddEmployerContent = {
  questions: [
  "How to attract and retain young talents?",
  "Competing for manpower with other industries?",
  "Where to find manpower, poaching from competitors?",
  "No time to expose young talents to other logistics verticals to broaden their insights?",
  "Not sure where to send young talents to quality skill-based training to enhance their skillsets?"
],
  note: "By investing in their growth, companies can build a loyal workforce that can evolve into skilled professionals over time.",
  contactEmail: "events@saaa.org.sg",
};

export const imddApplicantContent = {
  intro: [
  "Thinking about a future in logistics? Project IMDD offers hands-on training tailored to the logistics industry and gives you the chance to explore a wide spectrum of exciting roles and opportunities across the diverse world of logistics.",
  "Project IMDD stands out by focusing on holistic career progression, offering hands-on experience across all aspects of logistics while supporting university advancement opportunities—going beyond the limited scope of traditional internships."
],
  internshipApplication: {
  "open": true,
  "eventLabel": "Outreach@ITE College East on 22nd May 2026",
  "closedMessage": "Internship applications are currently closed. Please visit the Companies page during the next Project IMDD outreach event for application links."
},
  brochure: {
  "year": 2026,
  "fileUrl": "https://41af8c4f-3239-4ac0-bbd7-d906f1f394a5.filesusr.com/ugd/8c57ed_49126f063d164c3d949c8ce40f9e1dde.pdf",
  "label": "View Internship Vacancies Brochure"
},
  contactEmail: "events@saaa.org.sg",
};

export const imddCompanies = [
  {
    "name": "ACS Freight Services Pte Ltd",
    "logo": "/images/members/logos/acs-freight-services-pte-ltd.jpg",
    "url": "https://acsfrt.com.sg/"
  },
  {
    "name": "Air Market Logistics (S) Pte Ltd",
    "logo": "/images/members/logos/air-market-express-s-pte-ltd.jpg",
    "url": "https://airmarket.com.sg/about-airmarket/"
  },
  {
    "name": "Alliance 21 Pte Ltd",
    "logo": "/images/members/logos/alliance-21-pte-ltd.jpg",
    "url": "https://alex.world/",
    "hasApply": true
  },
  {
    "name": "Aspac Aircargo Services Pte Ltd",
    "logo": "/images/members/logos/aspac-aircargo-services-pte-ltd.jpg",
    "url": "https://aspac-aircargo.com.sg/"
  },
  {
    "name": "B&H Worldwide (SG) Pte Ltd",
    "logo": "/images/members/logos/b-h-worldwide-sg-pte-ltd.png",
    "url": "https://bhworldwide.com/working-with-us/?utm_source=projectimdd&utm_medium=referral&utm_campaign=projectimdd",
    "hasApply": true
  },
  {
    "name": "Clasquin Singapore Pte Ltd",
    "logo": "/images/project-imdd/companies/clasquin-singapore-pte-ltd.png",
    "url": "https://www.clasquin.com/en/"
  },
  {
    "name": "Commonwealth Kokubu Logistics Pte Ltd",
    "logo": "/images/project-imdd/companies/commonwealth-kokubu-logistics-pte-ltd.png",
    "url": "https://www.cklogasia.com/"
  },
  {
    "name": "Crane Worldwide Logistics (S) Pte Ltd",
    "logo": "/images/project-imdd/companies/crane-worldwide-logistics-s-pte-ltd.jpg",
    "url": "https://www.craneww.com/locations/singapore/singapore/",
    "hasApply": true
  },
  {
    "name": "Dachser (Singapore) Pte Ltd",
    "logo": "/images/project-imdd/companies/dachser-singapore-pte-ltd.png",
    "url": "https://www.dachser.com/en/"
  },
  {
    "name": "Flycraft SG Pte Ltd",
    "logo": "/images/project-imdd/companies/flycraft-sg-pte-ltd.jpg",
    "url": "https://www.flycraft.sg/"
  },
  {
    "name": "Global Airfreight International Pte Ltd",
    "logo": "/images/members/logos/global-airfreight-international-pte-ltd.png",
    "url": "https://www.globalair.com.sg/"
  },
  {
    "name": "KC INTL LOGISTICS SINGAPORE PTE LTD",
    "logo": "/images/project-imdd/companies/kc-intl-logistics-singapore-pte-ltd.png",
    "hasApply": true,
    "url": "https://www.kc-intl.com/"
  },
  {
    "name": "Leschaco Pte Ltd",
    "logo": "/images/project-imdd/companies/leschaco-pte-ltd.jpg",
    "url": "https://www.leschaco.com/en/start.html"
  },
  {
    "name": "LOGISTEED Singapore Pte Ltd",
    "logo": "/images/members/logos/logisteed-asia-pacific-pte-ltd.png",
    "url": "https://sg.logisteed.com/"
  },
  {
    "name": "Logwin Air+Ocean Singapore Pte Ltd",
    "logo": "/images/members/logos/logwin-air-ocean-singapore-pte-ltd.png",
    "url": "https://www.logwin-logistics.com/index.php"
  },
  {
    "name": "Morrison Express Logistics Pte Ltd",
    "logo": "/images/project-imdd/companies/morrison-express-logistics-pte-ltd.png",
    "url": "https://www.morrisonexpress.com/"
  },
  {
    "name": "Nanhai Business Solutions",
    "logo": "/images/project-imdd/companies/nanhai-business-solutions.jpg",
    "url": "https://www.yusen-logistics.com/sg_en/about-us/nanhai-business-solutions"
  },
  {
    "name": "NGFS (Singapore) Pte Ltd",
    "logo": "/images/project-imdd/companies/ngfs-singapore-pte-ltd.png",
    "url": "https://www.ngfsworld.com/"
  },
  {
    "name": "Ninja Logistics Pte. Ltd.",
    "logo": "/images/project-imdd/companies/ninja-logistics-pte-ltd.png",
    "hasApply": true,
    "url": "https://www.ninjavan.co/en-sg/support/contact-us"
  },
  {
    "name": "SAAA@Singapore",
    "logo": "/images/saaa-logo.png",
    "url": "http://saaa.org.sg/",
    "hasApply": true
  },
  {
    "name": "SATS Ltd",
    "logo": "/images/sats-logo.png",
    "url": "https://www.sats.com.sg/"
  },
  {
    "name": "SFS Global Logistics Pte Ltd",
    "logo": "/images/project-imdd/companies/sfs-global-logistics-pte-ltd.png",
    "url": "https://www.sfspharma.com/"
  },
  {
    "name": "Sky Leader Freight Pte Ltd",
    "logo": "/images/members/logos/sky-leader-freight-pte-ltd.png",
    "url": "https://www.linkedin.com/company/skyleaderfreight/?originalSubdomain=sg",
    "hasApply": true
  },
  {
    "name": "Skylift Consolidator (Pte) Ltd",
    "logo": "/images/members/logos/skylift-consolidator-pte-ltd.png",
    "url": "https://www.skylift.com.sg/"
  },
  {
    "name": "Speedmark Air Transportation Pte Ltd",
    "logo": "/images/members/logos/speedmark-air-transportation-pte-ltd.jpg",
    "url": "https://www.speedmark.com.sg/"
  },
  {
    "name": "Union Air Freight (S) Pte Ltd",
    "logo": "/images/members/logos/union-air-freight-s-pte-ltd.png",
    "url": "http://www.uafsin.com.sg/",
    "hasApply": true
  },
  {
    "name": "VTQ85 Transport Pte Ltd",
    "logo": "/images/project-imdd/companies/vtq85-transport-pte-ltd.jpg"
  },
  {
    "name": "Yat Lye Airfreight Pte Ltd",
    "logo": "/images/project-imdd/companies/yat-lye-airfreight-pte-ltd.png",
    "url": "https://yatlyeairfrt.sg/"
  },
  {
    "name": "Yusen Logistics (Singapore) Pte Ltd",
    "logo": "/images/members/logos/yusen-logistics-singapore-pte-ltd.png",
    "url": "https://www.yusen-logistics.com/"
  }
] satisfies ImddCompany[];

export const imddTestimonialsFull = [
  {
    "name": "Jovi Ng",
    "role": "ITE Graduate in Higher Nitec Events Management",
    "quote": "I had no experience in logistics when I joined my current company that took me onboard for work study diploma under a pilot program called Project IMDD. My mentor vigorously trained me in control tower supply chain management. Subsequently progressing into airfreight operations and vaccines management. Over the course of training that I received, my GPA went from 2.4 to current 3.8."
  },
  {
    "name": "Thomas Ting",
    "role": "ITE Graduate in Human Resource",
    "quote": "During interview, i was informed about project IMDD and was glad that the company took me onboard for work study diploma despite not having any prior knowledge about logistics. Over the course of 2 years, I was mentored on pharma cold chain management for air export and import. I now have a clear understanding of air operations and I'm able to execute and manage critical pharmaceutical shipments confidently. Also my GPA prior to joining the company was 1.8 to currently 4. A grade that I thought was not achievable. Thank you Project IMDD"
  },
  {
    "name": "Dylan Ang",
    "role": "ITE Graduate in Nitec International Logistics",
    "quote": "I was an intern with my current company and heard about a pilot program called project IMDD. I decided to participate and after completing my internship, the company offered me a full-time employment. For the first 2 months, i was mentored on how to manage e-commerce shipments and learn about air freight operations. My GPA is 3.8. However, embarking on project IMDD, i realized that the skills i received is worth more than grades."
  },
  {
    "name": "Syauqii",
    "role": "ITE Graduate in Higher Nitec International Logistics",
    "quote": "I was initially skeptical about a pilot program called Project IMDD as my role was a driver in 2023. Unbeknownst to me, the training was stringent as the job requires me to comply to Standard Operating Procedures as i am collecting and delivering life saving pharmaceutical shipments using technology for real-time temperature monitoring. Today, as a highly trained and experienced supervisor, I'm mentoring the younger talents. This is beyond just a typical driver's role, the soft skills, employment of technology, technical know-how and meeting customers on the ground is beyond my comprehension. I realized that the starting role of the driver in project IMDD is more than meets the eye."
  },
  {
    "name": "Kerwin",
    "role": "ITE Graduate in Nitec Logistics Services",
    "quote": "I was 6 months into my work-study diploma with a company that suddenly decided not to continue with the program. I contacted my previous company that I had internship with when I was still a student, and found out about project IMDD. One month into my new company, I'm already meeting customers packing high valued shipments at customer's premise, and lodging the shipment to the airline terminal. On top of that, I'm being mentored to manage a fulfilment warehouse for thermal packaging solutions. I live in the west and the company is located in the east, I realized that distance should never be considered when applying for jobs. Project IMDD is living to its standards!"
  }
] satisfies ImddTestimonial[];

export function getApplyCompanies() {
  return imddCompanies.filter((c) => c.hasApply);
}

export function getCompanySlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
