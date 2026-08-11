import type { ContactHours } from "@/lib/content/services";

type ServiceSection = {
  title: string;
  body: string;
  isCard?: boolean;
};

type ServicePageContentProps = {
  sections: ServiceSection[];
  contact: ContactHours;
  registerUrl?: string;
  registerLabel?: string;
};

export function ServicePageContent({ sections, contact, registerUrl, registerLabel }: ServicePageContentProps) {
  return (
    <div className="page-content">
      {sections.map((section) =>
        section.isCard ? (
          <div key={section.title} className="info-card">
            <h3>{section.title}</h3>
            <p>{section.body}</p>
          </div>
        ) : (
          <div key={section.title}>
            <h3>{section.title}</h3>
            <p>{section.body}</p>
          </div>
        ),
      )}

      <div className="info-card contact-hours-card">
        <h3 className="contact-hours-title">Contact & Operating Hours</h3>
        <div className="contact-hours-grid">
          <div className="contact-block">
            <h4>Contact Us</h4>
            <ul className="contact-list">
              {contact.phone ? (
                <li>
                  <span>Phone</span>
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
                </li>
              ) : null}
              {contact.fax ? (
                <li>
                  <span>Fax</span>
                  <span>{contact.fax}</span>
                </li>
              ) : null}
              <li>
                <span>Email</span>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
            </ul>
          </div>
          {contact.address ? (
            <div className="contact-block">
              <h4>Address</h4>
              <p>{contact.address}</p>
            </div>
          ) : null}
          <div className="contact-block">
            <h4>Operating Hours</h4>
            <ul className="hours-list">
              {contact.hours.map((row) => (
                <li key={row.day}>
                  <span className="hours-day">{row.day}</span>
                  <span className="hours-time">{row.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {registerUrl ? (
        <div className="service-cta">
          <a href={registerUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            {registerLabel ?? "Proceed to Register"}
          </a>
        </div>
      ) : null}
    </div>
  );
}
