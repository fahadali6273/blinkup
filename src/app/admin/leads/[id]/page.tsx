import { redirect } from "next/navigation";

export default function LegacyAdminLeadPage() {
  redirect("/admin/leads");
}
