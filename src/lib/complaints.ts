import type { ComplaintStatus } from "@/components/ui/StatusBadge";

export type TimelineStep = {
  label: string;
  date: string | null;
};

export type Complaint = {
  id: string;
  title: string;
  category: string;
  status: ComplaintStatus;
  lastUpdated: string;
  location: string;
  description: string;
  attachments: number;
  timeline: TimelineStep[];
  routedMda: string | null;
  routedDepartment: string | null;
};

export const complaints: Complaint[] = [
  {
    id: "TKGY-53912",
    title: "Pothole on Douglas Ezenwa Avenue",
    category: "Roads & transportation",
    status: "in_review",
    lastUpdated: "26 August 2026",
    location: "Douglas Ezenwa Avenue, Ikeja",
    description:
      "There's a large pothole in the middle of the road that's been causing traffic and near-accidents, especially at night when it's hard to see.",
    attachments: 2,
    timeline: [
      { label: "Submitted", date: "24 Aug" },
      { label: "Received", date: "24 Aug" },
      { label: "Assigned", date: "25 Aug" },
      { label: "In review", date: "26 Aug" },
      { label: "Resolved", date: null },
    ],
    routedMda: "Ministry of Works and Infrastructure",
    routedDepartment: "Road Maintenance",
  },
  {
    id: "TKGY-53872",
    title: "Blocked drainage near Ago",
    category: "Waste & environment",
    status: "resolved",
    lastUpdated: "21 August 2026",
    location: "Ago Palace Way, Okota",
    description:
      "Drainage has been blocked for weeks, causing flooding on the road whenever it rains.",
    attachments: 1,
    timeline: [
      { label: "Submitted", date: "14 Aug" },
      { label: "Received", date: "14 Aug" },
      { label: "Assigned", date: "15 Aug" },
      { label: "In review", date: "18 Aug" },
      { label: "Resolved", date: "21 Aug" },
    ],
    routedMda: "Lagos Waste Management Authority (LAWMA)",
    routedDepartment: null,
  },
  {
    id: "TKGY-53690",
    title: "Streetlight not working on Allen Avenue",
    category: "Electricity & utilities",
    status: "assigned",
    lastUpdated: "18 August 2026",
    location: "Allen Avenue, Ikeja",
    description:
      "Streetlight has been off for over a month, making the road unsafe at night.",
    attachments: 1,
    timeline: [
      { label: "Submitted", date: "16 Aug" },
      { label: "Received", date: "16 Aug" },
      { label: "Assigned", date: "18 Aug" },
      { label: "In review", date: null },
      { label: "Resolved", date: null },
    ],
    routedMda: "Ministry of Energy & Mineral Resources",
    routedDepartment: "Public Utilities",
  },
];

export const statusMeaning: Record<ComplaintStatus, string> = {
  received: "We've received your complaint.",
  assigned: "Your complaint has been sent to the relevant government team.",
  in_review: "The team is currently reviewing the issue.",
  resolved:
    "The issue has been addressed or the relevant team has completed its response.",
};

export const statusHeadline: Record<ComplaintStatus, string> = {
  received: "Received",
  assigned: "Assigned",
  in_review: "In review",
  resolved: "Resolved",
};
