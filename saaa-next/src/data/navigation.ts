export type NavVariant = "home" | "subpage";

export type NavLinkItem = {
  label: string;
  href: string;
};

export type NavDropdown = {
  label: string;
  triggerHref: string;
  items: NavLinkItem[];
};

export type SocialLink = {
  label: string;
  href: string;
};

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/saaa-singapore-2b6861243/%20",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/pages/SAAA/834894096585648?fref=ts",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/saaasingapore/",
  },
];

function homeHref(hash: string) {
  return hash;
}

function subpageHref(hash: string) {
  return `/${hash}`;
}

export function getNavDropdowns(variant: NavVariant): NavDropdown[] {
  const prefix = variant === "home" ? homeHref : subpageHref;

  return [
    {
      label: "About Us",
      triggerHref: prefix("#about"),
      items: [
        { label: "Our History", href: "/history" },
        { label: "Milestones", href: "/milestones" },
        { label: "Organisation Structure", href: "/organization" },
        { label: "Standard Trading Conditions", href: "/stc" },
        { label: "Programmes", href: "/programmes" },
      ],
    },
    {
      label: "Members",
      triggerHref: prefix("#members"),
      items: [
        { label: "Membership Sign-Up", href: "/membership-application" },
        { label: "SAAA Members Listing", href: "/members-listing" },
        { label: "Members Portal Log In", href: "/members-login" },
      ],
    },
    {
      label: "Services",
      triggerHref: prefix("#services"),
      items: [
        { label: "Permit & Certificate of Origin", href: "/permit-certificate-of-origin" },
        { label: "Neutral Airway Bill", href: "/neutral-airway-bill" },
        { label: "Bar Code Labels", href: "/bar-code-labels" },
      ],
    },
    {
      label: "Events",
      triggerHref: prefix("#events"),
      items: [{ label: "Calendar of Events", href: "/events" }],
    },
    {
      label: "Publications",
      triggerHref: prefix("#publication"),
      items: [
        { label: "Announcements", href: "/announcements" },
        { label: "Featured News", href: "/featured-news" },
        { label: "Publications", href: "/publications" },
      ],
    },
  ];
}

export function getTrainingHref(variant: NavVariant) {
  return variant === "home" ? "#training" : "/#training";
}
