import { COMPLAINT_STAGES, type ComplaintStatus } from "@/components/ui/StatusBadge";

export type TimelineStep = {
  label: string;
  date: string | null;
};

export type Complaint = {
  id: string;
  title: string;
  category: string;
  status: ComplaintStatus;
  submittedDate: string;
  lastUpdated: string;
  latestUpdate: string;
  location: string;
  description: string;
  attachments: number;
  timeline: TimelineStep[];
  routedMda: string | null;
  routedDepartment: string | null;
};

/**
 * Builds a five-stage timeline from the dates a complaint has reached so far.
 * Positions map to COMPLAINT_STAGES; `null` means the stage is still pending.
 */
export function buildTimeline(dates: (string | null)[]): TimelineStep[] {
  return COMPLAINT_STAGES.map((stage, i) => ({
    label: stage.label,
    date: dates[i] ?? null,
  }));
}

export const complaints: Complaint[] = [
  {
    id: "TKGY-53912",
    title: "Pothole on Douglas Ezenwa Avenue",
    category: "Roads & bridges",
    status: "in_review",
    submittedDate: "24 August 2026",
    lastUpdated: "26 August 2026",
    latestUpdate:
      "An engineer from the Road Maintenance unit has been asked to inspect the site and estimate the repair work needed.",
    location: "Douglas Ezenwa Avenue, Ikeja",
    description:
      "There's a large pothole in the middle of the road that's been causing traffic and near-accidents, especially at night when it's hard to see.",
    attachments: 2,
    timeline: buildTimeline(["24 Aug", "24 Aug", "26 Aug", null, null]),
    routedMda: "Ministry of Works and Infrastructure",
    routedDepartment: "Road Maintenance",
  },
  {
    id: "TKGY-53872",
    title: "Blocked drainage near Ago",
    category: "Waste & environment",
    status: "resolved",
    submittedDate: "14 August 2026",
    lastUpdated: "21 August 2026",
    latestUpdate:
      "The drainage channel has been cleared and water is flowing freely again. This complaint is now closed.",
    location: "Ago Palace Way, Okota",
    description:
      "Drainage has been blocked for weeks, causing flooding on the road whenever it rains.",
    attachments: 1,
    timeline: buildTimeline(["14 Aug", "14 Aug", "15 Aug", "18 Aug", "21 Aug"]),
    routedMda: "Lagos Waste Management Authority (LAWMA)",
    routedDepartment: null,
  },
  {
    id: "TKGY-53690",
    title: "Streetlight not working on Allen Avenue",
    category: "Electricity & utilities",
    status: "in_progress",
    submittedDate: "16 August 2026",
    lastUpdated: "25 August 2026",
    latestUpdate:
      "A replacement fitting has been scheduled for installation on this stretch of Allen Avenue.",
    location: "Allen Avenue, Ikeja",
    description:
      "Streetlight has been off for over a month, making the road unsafe at night.",
    attachments: 1,
    timeline: buildTimeline(["16 Aug", "16 Aug", "18 Aug", "25 Aug", null]),
    routedMda: "Ministry of Energy & Mineral Resources",
    routedDepartment: "Public Utilities",
  },
  {
    id: "TKMV-41208",
    title: "Faulty traffic light at Maryland junction",
    category: "Traffic & public transport",
    status: "received",
    submittedDate: "29 August 2026",
    lastUpdated: "30 August 2026",
    latestUpdate:
      "Your complaint has been logged and passed to the Traffic Management unit for review.",
    location: "Maryland Junction, Ikeja",
    description:
      "The traffic light at the junction has been stuck on red in one direction, causing long build-ups during rush hour.",
    attachments: 0,
    timeline: buildTimeline(["29 Aug", "30 Aug", null, null, null]),
    routedMda: "Ministry of Transportation",
    routedDepartment: "Traffic Management",
  },
  {
    id: "TKQR-38845",
    title: "Refuse not collected on Adeniran Ogunsanya",
    category: "Waste & environment",
    status: "in_progress",
    submittedDate: "22 August 2026",
    lastUpdated: "28 August 2026",
    latestUpdate:
      "A collection truck has been assigned to this route and pickup is expected within the week.",
    location: "Adeniran Ogunsanya Street, Surulere",
    description:
      "Refuse has not been collected on this street for over two weeks and the pile is now spilling onto the walkway.",
    attachments: 3,
    timeline: buildTimeline(["22 Aug", "22 Aug", "24 Aug", "28 Aug", null]),
    routedMda: "Lagos Waste Management Authority (LAWMA)",
    routedDepartment: null,
  },
  {
    id: "TKBD-29471",
    title: "Illegal structure on drainage setback",
    category: "Buildings & housing",
    status: "in_review",
    submittedDate: "20 August 2026",
    lastUpdated: "27 August 2026",
    latestUpdate:
      "Building Control officers are verifying the permit status of the structure before any action is taken.",
    location: "Ikotun-Egbe Road, Alimosho",
    description:
      "Someone is putting up a permanent structure directly on the drainage setback, which will block water flow when the rains come.",
    attachments: 2,
    timeline: buildTimeline(["20 Aug", "21 Aug", "27 Aug", null, null]),
    routedMda: "Lagos State Building Control Agency (LASBCA)",
    routedDepartment: null,
  },
  {
    id: "TKWZ-60733",
    title: "Broken water pipe flooding the road",
    category: "Water & drainage",
    status: "submitted",
    submittedDate: "2 September 2026",
    lastUpdated: "2 September 2026",
    latestUpdate:
      "Your complaint has been submitted through Citizens Gate and is waiting to be picked up.",
    location: "Ojota, Kosofe",
    description:
      "A burst pipe has been leaking onto the road for days and the water is starting to wash away the surface.",
    attachments: 1,
    timeline: buildTimeline(["2 Sep", null, null, null, null]),
    routedMda: "Ministry of Environment & Water Resources",
    routedDepartment: "Drainage Services",
  },
  {
    id: "TKLM-17654",
    title: "Overflowing gutter at Ikotun market",
    category: "Water & drainage",
    status: "in_progress",
    submittedDate: "18 August 2026",
    lastUpdated: "29 August 2026",
    latestUpdate:
      "Desilting work has started at the market end of the gutter and is expected to continue this week.",
    location: "Ikotun Market, Alimosho",
    description:
      "The gutter beside the market overflows onto the walkway whenever it rains, making it difficult for traders and shoppers to pass.",
    attachments: 2,
    timeline: buildTimeline(["18 Aug", "19 Aug", "23 Aug", "29 Aug", null]),
    routedMda: "Ministry of Environment & Water Resources",
    routedDepartment: "Drainage Services",
  },
  {
    id: "TKHP-50219",
    title: "Health centre generator not working",
    category: "Public health",
    status: "received",
    submittedDate: "31 August 2026",
    lastUpdated: "1 September 2026",
    latestUpdate:
      "The complaint has been received and forwarded to Primary Healthcare Services for assessment.",
    location: "Bariga Primary Health Centre, Shomolu",
    description:
      "The generator at the health centre has been down for weeks, so evening consultations are affected whenever there is no power.",
    attachments: 0,
    timeline: buildTimeline(["31 Aug", "1 Sep", null, null, null]),
    routedMda: "Lagos State Ministry of Health",
    routedDepartment: "Primary Healthcare Services",
  },
];

/** Plain-language explanation of each stage, shown on the complaint detail page. */
export const stageMeaning: Record<ComplaintStatus, string> = {
  submitted: "Your complaint has been sent through Citizens Gate.",
  received:
    "Your complaint has been received and is being prepared for review.",
  in_review: "The relevant agency is assessing the issue.",
  in_progress: "Action is being taken to address the issue.",
  resolved:
    "The reported issue has been addressed and the complaint has been closed.",
};
