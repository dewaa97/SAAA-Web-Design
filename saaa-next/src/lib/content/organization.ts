export type CouncilMember = {
  slug: string;
  name: string;
  role: string;
  company: string;
  photo: string;
  rowClass: string;
};

export type SecretariatStaff = {
  name: string;
  title: string;
  email: string;
};

export type SecretariatDepartment = {
  pill: string;
  pillClass: string;
  staff: SecretariatStaff[];
};

export type SecretariatBranch = {
  header: string;
  headerClass?: string;
  departments: SecretariatDepartment[];
  layout?: "single" | "cargo-grid";
};

export const councilRows: CouncilMember[][] = [
  [
    { slug: "gabriel-lam", name: "Gabriel Lam", role: "Chairman", company: "Shalom International Movers Pte Ltd", photo: "/images/members/gabriel_lam.jpg", rowClass: "council-row-1" },
    { slug: "paul-teo", name: "Paul Teo", role: "First Deputy Chairman", company: "Speedmark Transportation Pte Ltd", photo: "/images/members/paul_teo.jpg", rowClass: "council-row-1" },
    { slug: "benjamin-ong", name: "Benjamin Ong", role: "Second Deputy Chairman", company: "Alliance 21 Pte Ltd", photo: "/images/members/benjamin_ong.jpg", rowClass: "council-row-1" },
  ],
  [
    { slug: "steven-lee", name: "Steven Lee", role: "Immediate Past Chairman", company: "Cargo Community Network Pte Ltd", photo: "/images/members/steven_lee.jpg", rowClass: "council-row-2" },
    { slug: "ken-chua", name: "Ken Chua", role: "Honorary Treasurer", company: "UT-WAYS Freight Services Pte Ltd", photo: "/images/members/ken_chua.jpg", rowClass: "council-row-2" },
    { slug: "jimmy-ler", name: "Jimmy Ler", role: "Honorary Secretary", company: "Logwin Air + Ocean Transportation Pte Ltd", photo: "/images/members/jimmy_ler.jpg", rowClass: "council-row-2" },
  ],
  [
    { slug: "ramadas-naidu", name: "Ramadas Naidu", role: "Council Member", company: "Raffles Fulfillment Pte Ltd", photo: "/images/members/ramadas_naidu.jpg", rowClass: "council-row-3" },
    { slug: "daniel-chng", name: "Daniel Chng", role: "Council Member", company: "Airtropolis Express (S) Pte Ltd", photo: "/images/members/daniel_chng.jpg", rowClass: "council-row-3" },
    { slug: "chorina-khoo", name: "Chorina Khoo", role: "Council Member", company: "Rohlig Singapore Pte Ltd", photo: "/images/members/chorina_khoo.jpg", rowClass: "council-row-3" },
    { slug: "tan-liang-jian", name: "Tan Liang Jian", role: "Council Member", company: "Union Air Freight (Singapore) Pte Ltd", photo: "/images/members/tan_liang_jian.jpg", rowClass: "council-row-3" },
  ],
  [
    { slug: "roger-chew", name: "Roger Chew", role: "Council Member", company: "SFS Global Logistics Pte Ltd", photo: "/images/members/roger_chew.jpg", rowClass: "council-row-4" },
    { slug: "andrea-bettoni", name: "Andrea Bettoni", role: "Council Member", company: "Skyquick International Pte Ltd", photo: "/images/members/andrea_bettoni.jpg", rowClass: "council-row-4" },
    { slug: "lim-zhiwei", name: "Lim Zhiwei", role: "Council Member", company: "Apex Logistics International (S) Pte Ltd", photo: "/images/members/lim_zhiwei.jpg", rowClass: "council-row-4" },
    { slug: "kitty-teo", name: "Ms Kitty Teo", role: "Council Member", company: "Dachser (Singapore) Pte Ltd", photo: "/images/members/kitty_teo.jpg", rowClass: "council-row-4" },
    { slug: "eric-tan", name: "Eric Tan", role: "Council Member", company: "Federal Express (S) Pte Ltd", photo: "/images/members/eric_tan.jpg", rowClass: "council-row-4" },
  ],
  [
    { slug: "richard-chua", name: "Richard Chua", role: "Honorary Executive", company: "SAAA@Singapore", photo: "/images/members/richard_chua.jpg", rowClass: "council-row-5" },
    { slug: "michael-yew", name: "Michael Yew", role: "Honorary Executive", company: "SAAA@Singapore", photo: "/images/members/honorary_executive2.jpg", rowClass: "council-row-5" },
  ],
];

export const secretariat = {
  ceo: {
    department: "SAAA Secretariat",
    name: "Pauline Tok",
    title: "Chief Executive Officer",
    email: "pauline.tok@saaa.org.sg",
  },
  branches: [
    {
      header: "SAAA@Singapore",
      departments: [
        {
          pill: "Membership & Events",
          pillClass: "membership",
          staff: [
            { name: "Pammie Loh", title: "Events and Partnership Manager", email: "pammie.loh@saaa.org.sg" },
            { name: "Zyman Tan", title: "Assistant Manager, Events & Outreach", email: "zyman.tan@saaa.org.sg" },
          ],
        },
      ],
    },
    {
      header: "SAAA Cargo Services Pte Ltd",
      headerClass: "cargo",
      layout: "cargo-grid",
      departments: [
        {
          pill: "Corporate Affairs & Finance",
          pillClass: "corp-affairs",
          staff: [
            { name: "Azlinda Bte Hassan", title: "Senior Manager, Corporate Services", email: "finance@saaa.org.sg" },
          ],
        },
        {
          pill: "Training & Development",
          pillClass: "training",
          staff: [
            { name: "Fatah Nawawi", title: "Manager - Training & Development", email: "muhd.fatah@saaa.org.sg" },
            { name: "Peggy Lim", title: "Assistant Manager - Training & Development", email: "peggy.lim@saaa.org.sg" },
          ],
        },
        {
          pill: "Business Operations",
          pillClass: "biz-ops",
          staff: [
            { name: "Andrew Soh", title: "Senior Executive, Tradenet Documentation", email: "scs@saaa.org.sg" },
            { name: "Siti Junaidah Bte Mohamed Normaya", title: "Executive, Admin & Tradenet Documentation", email: "scs@saaa.org.sg" },
            { name: "Muhd Izwan", title: "Tradenet Documentation Officer", email: "scs@saaa.org.sg" },
            { name: "Nurnadhirah", title: "Officer, Admin & Tradenet Documentations", email: "projectadmin@saaa.org.sg" },
          ],
        },
      ],
    },
  ] satisfies SecretariatBranch[],
};
