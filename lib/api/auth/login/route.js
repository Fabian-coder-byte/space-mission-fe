import { NextResponse } from "next/server";

const API_URL = "http://localhost:5000";

export async function POST(request) {
  try {
    console.log(request);
    const body = request;

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data?.message || "Credenziali non valide" },
        { status: response.status },
      );
    }

    const res = NextResponse.json({
      user: data.user,
      message: "Login effettuato",
    });

    res.cookies.set("access_token", data.session.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return res;
  } catch (error) {
    console.error("Login route error:", error);

    return NextResponse.json(
      { message: "Errore interno durante il login" },
      { status: 500 },
    );
  }
}
