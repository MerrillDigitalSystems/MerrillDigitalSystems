import type { CaseStudyData } from "../types";

/**
 * No preview image exists for this one — it is internal software behind a
 * login, so there is nothing public to screenshot. `image` is deliberately
 * omitted and the template renders the ink panel instead.
 *
 * The quote is the client's published Clutch review, attributed as they
 * published it. It is the only testimonial on the site.
 */
export const BRIGHTPATH_DENTAL: CaseStudyData = {
  slug: "/work/brightpath-dental",
  title: "BrightPath Dental Company Directory | Merrill Digital",
  description:
    "A dental group's announcements, permissions, HR, training and compliance in one internal system — delivered on schedule with a 5.0 Clutch rating.",
  client: "BrightPath Dental",
  eyebrow: "CASE STUDY · DENTAL GROUP · INTERNAL SOFTWARE",
  h1: "One place the practice runs on.",
  lede:
    "BrightPath Dental Center needed an internal home for how the practice actually works — announcements, role-based permissions, location verification, HR, training, and compliance. It got built to their process, on the timeline we agreed, by the same person they talked to on day one.",
  facts: [
    { label: "CLIENT", value: "BrightPath Dental Center" },
    { label: "INDUSTRY", value: "Dental group" },
    { label: "SCOPE", value: "Internal company directory" },
    { label: "STATUS", value: "Live, in daily use" },
  ],
  problem: [
    "The information a practice runs on was spread across shared drives, email threads, and generic apps that never quite fit. Announcements went out and got buried. Policies existed somewhere. New hires got pointed at four different places on their first day.",
    "What they wanted wasn't complicated to describe and was awkward to buy: one internal system scoped to their process, where the right people see the right things and nobody sees the rest. Every off-the-shelf option was either a document graveyard or an HR suite priced for a company ten times their size.",
    "The other requirement was the timeline. Internal software has a reputation for starting with a demo and ending eight months later, and they'd rather not sign up for that.",
  ],
  built: [
    {
      title: "Announcements people see",
      body: "Practice-wide notices posted once, in the place the team already opens — instead of an email chain three people read and forward.",
    },
    {
      title: "Permissions by role",
      body: "Admins, managers, and staff each see what belongs to them. Access follows the role, so it changes when someone's job does.",
    },
    {
      title: "Location verification",
      body: "Multi-location practices need to know who belongs where. The system checks it rather than trusting a dropdown.",
    },
    {
      title: "HR in one place",
      body: "Policies, forms, and the answers people ask the office manager three times a week, all in the same system as everything else.",
    },
    {
      title: "Training material where the work is",
      body: "Onboarding and ongoing training live in the directory instead of a shared drive nobody can find on their first morning.",
    },
    {
      title: "Compliance that isn't a binder",
      body: "The documents and processes a dental practice has to keep current, kept somewhere current — and visible to the people accountable for them.",
    },
  ],
  results: [
    {
      value: "5.0",
      label: "CLUTCH RATING",
      body: "Quality, schedule, and cost — 5.0 on all three, submitted by the client and verified by the platform.",
    },
    {
      value: "On schedule",
      label: "DELIVERED TO THE DATE",
      body: "Scoped in one discovery session and written down before the build started. The timeline held because the scope did.",
    },
    {
      value: "Live",
      label: "IN DAILY USE",
      body: "One reliable place for the information and processes the team touches every day, running now across the practice.",
    },
  ],
  quote: {
    text: "Organized and proactive throughout. Clear communication, regular progress updates, and delivered on schedule.",
    attribution: "DEPARTMENT DIRECTOR · BRIGHTPATH DENTAL",
  },
  stack: ["Zoho Creator", "Deluge", "Role-based access", "HR & compliance"],
  relatedLinks: [
    { href: "/operations-software", label: "Operations software" },
    { href: "/work/bktoolbox", label: "BK Toolbox case study" },
    { href: "/pricing", label: "What this costs" },
  ],
};
