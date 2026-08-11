"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

const industryOptions = [
  { name: "industryFreightForwarder", label: "Freight Forwarder", value: "Freight Forwarder" },
  { name: "industryGroundHandling", label: "Ground Handling Company", value: "Ground Handling Company" },
  { name: "industryAirline", label: "Airline", value: "Airline" },
  { name: "industryPostCourier", label: "Post & Courier", value: "Post & Courier" },
  { name: "industryWarehousing", label: "Warehousing & Storage", value: "Warehousing & Storage" },
  { name: "industryLocalTrucking", label: "Local Trucking", value: "Local Trucking" },
  { name: "industryAirRelated", label: "Air Related", value: "Air Related" },
  { name: "industryGovernmentBodies", label: "Government Bodies", value: "Government Bodies" },
  { name: "industryOthers", label: "Others", value: "Others" },
] as const;

function getFormValue(form: HTMLFormElement, name: string) {
  const radio = form.querySelector<HTMLInputElement>(`input[type="radio"][name="${name}"]:checked`);
  if (radio) return radio.value;

  const field = form.elements.namedItem(name);
  if (!field) return "";

  if (field instanceof RadioNodeList) {
    const checked = Array.from(field).find((item) => item instanceof HTMLInputElement && item.checked);
    return checked instanceof HTMLInputElement ? checked.value : "";
  }

  if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) {
    return field.value.trim();
  }

  return "";
}

function getCheckedIndustries(form: HTMLFormElement) {
  return industryOptions
    .filter((option) => {
      const input = form.querySelector<HTMLInputElement>(`input[name="${option.name}"]`);
      return input?.checked;
    })
    .map((option) => option.value);
}

function getUploadedFileName(form: HTMLFormElement, name: string) {
  const input = form.querySelector<HTMLInputElement>(`input[type="file"][name="${name}"]`);
  return input?.files?.[0]?.name ?? "";
}

export function MembershipApplicationForm() {
  const [industryOthersChecked, setIndustryOthersChecked] = useState(false);
  const [iataMember, setIataMember] = useState("");
  const [otherAssociations, setOtherAssociations] = useState("");
  const [criminalHistory, setCriminalHistory] = useState("");
  const [paymentProofError, setPaymentProofError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    setPaymentProofError("");
    if (!getUploadedFileName(form, "paymentProof")) {
      setPaymentProofError("Upload your payment proof.");
      form.querySelector<HTMLInputElement>("#paymentProof")?.focus();
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const lines = ["SAAA Membership Application 2026", ""];

    function addSection(title: string) {
      lines.push(title);
      lines.push("");
    }

    function addLine(label: string, value: string) {
      if (value.trim()) {
        lines.push(`${label}: ${value}`);
      }
    }

    addSection("Membership Type & Classification");
    addLine("Membership Type", getFormValue(form, "membershipType"));
    const industries = getCheckedIndustries(form);
    if (industries.length) {
      lines.push(`Industry Classification: ${industries.join(", ")}`);
    }
    if (industryOthersChecked) {
      addLine("Other Industry (specify)", getFormValue(form, "industryOthersSpecify"));
    }

    addSection("Company Information");
    addLine("Company Type", getFormValue(form, "companyType"));
    addLine("Company Name", getFormValue(form, "companyName"));
    addLine("Main Office Address", getFormValue(form, "mainOfficeAddress"));
    addLine("Correspondence Address", getFormValue(form, "correspondenceAddress"));
    addLine("Telephone", getFormValue(form, "companyTelephone"));
    addLine("Fax", getFormValue(form, "companyFax"));
    addLine("Company Email", getFormValue(form, "companyEmail"));
    addLine("Company Website", getFormValue(form, "companyWebsite"));
    addLine("Staff Strength", getFormValue(form, "staffStrength"));

    addSection("Contact Person 1");
    addLine("Name", getFormValue(form, "contact1Name"));
    addLine("Designation", getFormValue(form, "contact1Designation"));
    addLine("Email", getFormValue(form, "contact1Email"));
    addLine("Contact Number (Office)", getFormValue(form, "contact1Office"));
    addLine("Contact Number (Mobile)", getFormValue(form, "contact1Mobile"));

    addSection("Contact Person 2");
    addLine("Name", getFormValue(form, "contact2Name"));
    addLine("Designation", getFormValue(form, "contact2Designation"));
    addLine("Email", getFormValue(form, "contact2Email"));
    addLine("Contact Number (Office)", getFormValue(form, "contact2Office"));
    addLine("Contact Number (Mobile)", getFormValue(form, "contact2Mobile"));

    addSection("Additional Information");
    addLine("Existing IATA Member", getFormValue(form, "iataMember"));
    addLine("Member of Other Logistics Associations", getFormValue(form, "otherAssociations"));
    addLine("Association Name(s)", getFormValue(form, "otherAssociationsDetails"));
    addLine("Criminal Offence History", getFormValue(form, "criminalHistory"));
    addLine("Criminal Offence Details", getFormValue(form, "criminalHistoryDetails"));

    addSection("Payment & Comments");
    addLine("Payment Proof", getUploadedFileName(form, "paymentProof"));
    addLine("Additional Comments", getFormValue(form, "comments"));

    lines.push("");
    lines.push("Please attach the following documents to your email before sending:");
    lines.push("1. ACRA Business Profile");
    lines.push("2. For freight forwarder ordinary member enrolment: two employee certificates as stated in the application form");
    let attachmentIndex = 3;
    if (getFormValue(form, "iataMember") === "Yes") {
      lines.push(`${attachmentIndex}. IATA supporting documents (also uploaded via the form if applicable)`);
      attachmentIndex += 1;
    }
    const paymentProofName = getUploadedFileName(form, "paymentProof");
    if (paymentProofName) {
      lines.push(`${attachmentIndex}. Payment proof: ${paymentProofName}`);
    }

    const subject = encodeURIComponent("SAAA Membership Application 2026");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:saaasin@saaa.org.sg?subject=${subject}&body=${body}`;
  }

  return (
    <div className="membership-form-card">
      <h3>SAAA Membership Application Form 2026</h3>
      <p className="form-desc">
        Complete all sections below. Your email client will open with the details ready to send to{" "}
        <a href="mailto:saaasin@saaa.org.sg">saaasin@saaa.org.sg</a>. Please attach ACRA Business Profile
        and any other required documents before sending.
      </p>

      <form id="membership-application-form" onSubmit={handleSubmit}>
        <div className="membership-form-section">
          <h4>Membership Type &amp; Classification</h4>
          <p className="form-desc" style={{ marginBottom: 16 }}>
            Select the membership category you are applying for and your company&apos;s industry classification.
          </p>
          <div className="membership-form-grid">
            <div className="membership-form-field imdd-form-field membership-type-field">
              <label htmlFor="membershipType">Membership Type</label>
              <select id="membershipType" name="membershipType" required defaultValue="">
                <option value="">Select membership type</option>
                <option value="Ordinary">Ordinary</option>
                <option value="Associate">Associate</option>
              </select>
            </div>
          </div>
          <p className="membership-field-label">
            Industry Classification <span className="membership-field-optional">(select all that apply)</span>
          </p>
          <div className="membership-checkbox-group">
            {industryOptions.map((option) => (
              <label key={option.name} className="membership-checkbox-item">
                <input
                  type="checkbox"
                  name={option.name}
                  value={option.value}
                  onChange={
                    option.name === "industryOthers"
                      ? (event) => setIndustryOthersChecked(event.target.checked)
                      : undefined
                  }
                />{" "}
                {option.label}
              </label>
            ))}
          </div>
          <div
            className={`membership-form-field full membership-conditional-field${industryOthersChecked ? " is-visible" : ""}`}
            id="industryOthersField"
          >
            <label htmlFor="industryOthersSpecify">Please specify industry</label>
            <input
              id="industryOthersSpecify"
              name="industryOthersSpecify"
              type="text"
              placeholder="Enter your industry classification"
            />
          </div>
        </div>

        <div className="membership-form-section">
          <h4>Company Information</h4>
          <p className="membership-field-label">Company Type</p>
          <div className="membership-radio-group">
            <label className="membership-radio-item">
              <input type="radio" name="companyType" value="Limited Liability Company" required /> Limited Liability Company
            </label>
            <label className="membership-radio-item">
              <input type="radio" name="companyType" value="Partnership" /> Partnership
            </label>
            <label className="membership-radio-item">
              <input type="radio" name="companyType" value="Sole Proprietorship" /> Sole Proprietorship
            </label>
          </div>
          <div className="membership-form-grid" style={{ marginTop: 20 }}>
            <div className="membership-form-field full">
              <label htmlFor="companyName">Company Name</label>
              <input id="companyName" name="companyName" type="text" required placeholder="Registered company name" />
            </div>
            <div className="membership-form-field full">
              <label htmlFor="mainOfficeAddress">Main Office Address</label>
              <textarea id="mainOfficeAddress" name="mainOfficeAddress" rows={3} required placeholder="Full address of main office" />
            </div>
            <div className="membership-form-field full">
              <label htmlFor="correspondenceAddress">
                Correspondence Address <span className="membership-field-optional">(if different)</span>
              </label>
              <textarea id="correspondenceAddress" name="correspondenceAddress" rows={3} placeholder="Leave blank if same as main office" />
            </div>
            <div className="membership-form-field">
              <label htmlFor="companyTelephone">Telephone</label>
              <input id="companyTelephone" name="companyTelephone" type="text" placeholder="Office telephone" />
            </div>
            <div className="membership-form-field">
              <label htmlFor="companyFax">Fax</label>
              <input id="companyFax" name="companyFax" type="text" placeholder="Office fax" />
            </div>
            <div className="membership-form-field">
              <label htmlFor="companyEmail">Company Email</label>
              <input id="companyEmail" name="companyEmail" type="email" required placeholder="company@example.com" />
            </div>
            <div className="membership-form-field">
              <label htmlFor="companyWebsite">Company Website</label>
              <input id="companyWebsite" name="companyWebsite" type="url" placeholder="https://" />
            </div>
            <div className="membership-form-field">
              <label htmlFor="staffStrength">Staff Strength</label>
              <input id="staffStrength" name="staffStrength" type="text" placeholder="Number of employees" />
            </div>
          </div>
        </div>

        <div className="membership-form-section">
          <h4>Contact Persons</h4>
          <p className="form-desc" style={{ marginBottom: 8 }}>
            A maximum of two Accredited Representatives are permitted for an Ordinary Member and one for an Associate Member.
          </p>
          <p className="form-desc" style={{ marginTop: 0, marginBottom: 16 }}>
            An Accredited Representative should be a person in the minimum capacity of Manager, who can decide on the Company&apos;s behalf.
          </p>
          <h5 className="membership-subheading">Contact Person 1</h5>
          <div className="membership-form-grid">
            <div className="membership-form-field">
              <label htmlFor="contact1Name">Name</label>
              <input id="contact1Name" name="contact1Name" type="text" required />
            </div>
            <div className="membership-form-field">
              <label htmlFor="contact1Designation">Designation</label>
              <input id="contact1Designation" name="contact1Designation" type="text" required />
            </div>
            <div className="membership-form-field">
              <label htmlFor="contact1Email">Email</label>
              <input id="contact1Email" name="contact1Email" type="email" required />
            </div>
            <div className="membership-form-field">
              <label htmlFor="contact1Office">Contact Number (Office)</label>
              <input id="contact1Office" name="contact1Office" type="text" />
            </div>
            <div className="membership-form-field">
              <label htmlFor="contact1Mobile">Contact Number (Mobile)</label>
              <input id="contact1Mobile" name="contact1Mobile" type="text" />
            </div>
          </div>
          <h5 className="membership-subheading" style={{ marginTop: 24 }}>
            Contact Person 2 <span className="membership-field-optional">(optional)</span>
          </h5>
          <div className="membership-form-grid">
            <div className="membership-form-field">
              <label htmlFor="contact2Name">Name</label>
              <input id="contact2Name" name="contact2Name" type="text" />
            </div>
            <div className="membership-form-field">
              <label htmlFor="contact2Designation">Designation</label>
              <input id="contact2Designation" name="contact2Designation" type="text" />
            </div>
            <div className="membership-form-field">
              <label htmlFor="contact2Email">Email</label>
              <input id="contact2Email" name="contact2Email" type="email" />
            </div>
            <div className="membership-form-field">
              <label htmlFor="contact2Office">Contact Number (Office)</label>
              <input id="contact2Office" name="contact2Office" type="text" />
            </div>
            <div className="membership-form-field">
              <label htmlFor="contact2Mobile">Contact Number (Mobile)</label>
              <input id="contact2Mobile" name="contact2Mobile" type="text" />
            </div>
          </div>
        </div>

        <div className="membership-form-section">
          <h4>Additional Information</h4>
          <div className="conditional-rows">
            <div className="conditional-row">
              <div className="conditional-row-left">
                <div className="membership-form-field imdd-form-field">
                  <label htmlFor="iataMember">Existing IATA Member?</label>
                  <select
                    id="iataMember"
                    name="iataMember"
                    value={iataMember}
                    onChange={(event) => setIataMember(event.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              <div className="conditional-row-right">
                <div
                  className={`membership-form-field membership-conditional-field${iataMember === "Yes" ? " is-visible" : ""}`}
                  id="iataUploadField"
                >
                  <label htmlFor="iataUpload">IATA Supporting Documents</label>
                  <input id="iataUpload" name="iataUpload" type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
                  <span className="membership-field-hint">PDF, JPG, PNG, DOC, or DOCX up to 10MB</span>
                </div>
              </div>
            </div>
            <div className="conditional-row">
              <div className="conditional-row-left">
                <div className="membership-form-field imdd-form-field">
                  <label htmlFor="otherAssociations">Member of Other Logistics Associations?</label>
                  <select
                    id="otherAssociations"
                    name="otherAssociations"
                    value={otherAssociations}
                    onChange={(event) => setOtherAssociations(event.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <span className="membership-field-hint">e.g. SLA, CDAS, STA</span>
                </div>
              </div>
              <div className="conditional-row-right">
                <div
                  className={`membership-form-field membership-conditional-field${otherAssociations === "Yes" ? " is-visible" : ""}`}
                  id="otherAssociationsField"
                >
                  <label htmlFor="otherAssociationsDetails">Association Name(s)</label>
                  <input id="otherAssociationsDetails" name="otherAssociationsDetails" type="text" placeholder="List association name(s)" />
                </div>
              </div>
            </div>
            <div className="conditional-row">
              <div className="conditional-row-left">
                <div className="membership-form-field imdd-form-field">
                  <label htmlFor="criminalHistory">Directors/Officers Criminal Offence History?</label>
                  <select
                    id="criminalHistory"
                    name="criminalHistory"
                    value={criminalHistory}
                    onChange={(event) => setCriminalHistory(event.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <span className="membership-field-hint">
                    Any director, shareholder or principal officer previously found guilty of a criminal offence.
                  </span>
                </div>
              </div>
              <div className="conditional-row-right">
                <div
                  className={`membership-form-field membership-conditional-field${criminalHistory === "Yes" ? " is-visible" : ""}`}
                  id="criminalHistoryField"
                >
                  <label htmlFor="criminalHistoryDetails">Criminal Offence Details</label>
                  <textarea id="criminalHistoryDetails" name="criminalHistoryDetails" rows={3} placeholder="Provide details if applicable" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="membership-form-section">
          <h4>Declaration &amp; Payment</h4>
          <p className="form-desc">
            We declare that all information given is accurate and correct and we have not wilfully withheld any material fact. If admitted as a member of SAAA@Singapore, we shall be bound by the Constitution and Byelaws of the Association and will undertake to support the Association&apos;s objectives. We undertake to inform the Association within seven days of any changes to the above information.
          </p>
          <p className="form-desc">
            We hereby undertake to pay the entrance fee of $600 (promotional rate), along with the pro-rated subscription fee for the first year. The standard annual subscription fee thereafter is $1,000.
          </p>

          <div className="membership-payment-methods">
            <div className="membership-payment-column membership-payment-column--bank">
              <div className="membership-payment-header">
                <h5 className="membership-payment-title">Bank Transfer</h5>
                <p className="membership-payment-subtitle">Wire transfer to our DBS account</p>
              </div>
              <dl className="membership-bank-details">
                <div className="membership-bank-item membership-bank-item--full">
                  <dt className="membership-bank-label">Beneficiary Name</dt>
                  <dd className="membership-bank-value">SAAA@SINGAPORE</dd>
                </div>
                <div className="membership-bank-item membership-bank-item--full">
                  <dt className="membership-bank-label">Bank Name</dt>
                  <dd className="membership-bank-value">DBS BANK LTD</dd>
                </div>
                <div className="membership-bank-item membership-bank-item--full">
                  <dt className="membership-bank-label">Bank Address</dt>
                  <dd className="membership-bank-value">12 MARINA BOULEVARD, MARINA BAY FINANCIAL CENTRE TOWER 3, S-018982</dd>
                </div>
                <div className="membership-bank-item">
                  <dt className="membership-bank-label">Bank Code</dt>
                  <dd className="membership-bank-value">7171</dd>
                </div>
                <div className="membership-bank-item">
                  <dt className="membership-bank-label">Branch Code</dt>
                  <dd className="membership-bank-value">004</dd>
                </div>
                <div className="membership-bank-item">
                  <dt className="membership-bank-label">Account No.</dt>
                  <dd className="membership-bank-value">004-011061-7</dd>
                </div>
                <div className="membership-bank-item">
                  <dt className="membership-bank-label">Currency</dt>
                  <dd className="membership-bank-value">SGD</dd>
                </div>
                <div className="membership-bank-item">
                  <dt className="membership-bank-label">Swift Code</dt>
                  <dd className="membership-bank-value">DBSSSGSG</dd>
                </div>
                <div className="membership-bank-item">
                  <dt className="membership-bank-label">Company&apos;s UEN</dt>
                  <dd className="membership-bank-value">S71SS0030A</dd>
                </div>
              </dl>
              <p className="membership-bank-remittance">
                Email remittance to <a href="mailto:finance@saaa.org.sg">finance@saaa.org.sg</a>
              </p>
            </div>
            <div className="membership-payment-column membership-payment-column--paynow">
              <div className="membership-paynow-header">
                <Image src="/images/paynow-logo.svg" alt="PayNow" className="membership-paynow-logo" width={120} height={32} />
                <span className="membership-paynow-badge">Instant payment</span>
              </div>
              <div className="membership-paynow-body">
                <Image
                  src="/images/paynow-qr.png"
                  alt="PayNow QR Code for S71SS0030A"
                  className="membership-paynow-qr"
                  width={160}
                  height={160}
                />
                <div className="membership-paynow-id-block">
                  <span className="membership-paynow-id-label">PayNow ID</span>
                  <span className="membership-paynow-id-value">S71SS0030A</span>
                </div>
                <p className="membership-paynow-hint">Scan the QR code or use the PayNow ID when making payment.</p>
              </div>
            </div>
          </div>

          <div className="membership-form-field full imdd-form-field membership-payment-proof-field" data-imdd-field="paymentProof">
            <label htmlFor="paymentProof">Payment Proof</label>
            <input
              id="paymentProof"
              name="paymentProof"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              required
              onChange={() => setPaymentProofError("")}
            />
            {paymentProofError ? <p className="imdd-field-error" aria-live="polite">{paymentProofError}</p> : null}
          </div>
          <div className="membership-form-field full membership-comments-field">
            <label htmlFor="comments">
              Additional Comments <span className="membership-field-optional">(optional)</span>
            </label>
            <textarea id="comments" name="comments" rows={4} placeholder="Any additional remarks or information for your application" />
          </div>
        </div>

        <div className="membership-form-actions">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}
