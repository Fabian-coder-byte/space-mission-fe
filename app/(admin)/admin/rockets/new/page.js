import { getAgencies } from "@/lib/api/agency";
import NewRocketForm from "./new-rocket-form";

export const metadata = {
  title: "Nuovo Razzo",
};

export default async function NewRocketPage() {
  const agencies = await getAgencies();

  return <NewRocketForm agencies={agencies || []} />;
}
