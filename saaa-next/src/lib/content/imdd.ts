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
