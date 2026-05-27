import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMeApi } from "@/lib/api/auth";

export default async function UserLayout({ children }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sb_access_token")?.value;

  if (!accessToken) {
    redirect("/login");
  }

  const data = await getMeApi(accessToken);

  if (!data?.user) {
    redirect("/login");
  }

  return <>{children}</>;
}
