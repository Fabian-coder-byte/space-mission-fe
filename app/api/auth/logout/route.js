import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sb_access_token")?.value;

  if (accessToken) {
    try {
      await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch {
      // continue regardless
    }
  }

  cookieStore.delete("sb_access_token");
  cookieStore.delete("sb_refresh_token");

  redirect("/login");
}
