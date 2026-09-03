import { ReviewStep } from "@/components/report/steps/ReviewStep";

export default function DashboardReviewPage() {
  return <ReviewStep basePath="/track/dashboard/report" collectContact={false} />;
}
