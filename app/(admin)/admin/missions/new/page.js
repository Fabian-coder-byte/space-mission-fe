import { getAgencies } from "@/lib/api/agency";
import { getRockets } from "@/lib/api/rockets";
import { getLaunchSites } from "@/lib/api/launch-sites";
import NewMissionForm from "./new-mission-form";

export const metadata = {
  title: "Nuova Missione",
};

export default async function NewMissionPage() {
  const [agencies, rockets, launchSites] = await Promise.all([
    getAgencies().catch(() => []),
    getRockets().catch(() => []),
    getLaunchSites().catch(() => []),
  ]);

  return (
    <NewMissionForm
      agencies={agencies || []}
      rockets={rockets || []}
      launchSites={launchSites || []}
    />
  );
}
