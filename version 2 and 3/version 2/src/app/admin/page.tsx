import { redirect } from "next/navigation";
import { getAdminFromCookies } from "@/lib/auth";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { MessagesPanel } from "@/components/admin/MessagesPanel";
import VotingPanelWrapper from "@/components/admin/VotingPanelWrapper";
import ProduceManagerWrapper from "@/components/admin/ProduceManagerWrapper";
import LivestockManagerWrapper from "@/components/admin/LivestockManagerWrapper";
import GalleryManagerWrapper from "@/components/admin/GalleryManagerWrapper";
import SubscriberExportWrapper from "@/components/admin/SubscriberExportWrapper";

export default async function AdminPage() {
  const isAuthenticated = await getAdminFromCookies();
  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  const panels = {
    messages: <MessagesPanel />,
    voting: <VotingPanelWrapper />,
    produce: <ProduceManagerWrapper />,
    livestock: <LivestockManagerWrapper />,
    gallery: <GalleryManagerWrapper />,
    subscribers: <SubscriberExportWrapper />,
  } as const;

  return <AdminDashboard panels={panels} />;
}
