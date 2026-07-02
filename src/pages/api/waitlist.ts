import type { APIRoute } from "astro";
import { db } from "../../firebase/server";
import { FieldValue } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, name, whatsapp_number } = body;

    // email format validation
    if (!email || !email.includes("@")) {
      return new Response(
        JSON.stringify({ message: "Missing or invalid email address." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // mobile number validation
    if (!whatsapp_number) {
      return new Response(
        JSON.stringify({ message: "Missing phone number." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const docRef = await db.collection("Waitlist").add({
      email: email,
      name: name || "",
      whatsapp_number: whatsapp_number,
      subscribedAt: FieldValue.serverTimestamp(),
    });

    return new Response(
      JSON.stringify({
        message: "Successfully joined the Waitlist!",
        id: docRef.id,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("firebase admin error:", error);
    return new Response(JSON.stringify({ message: "Internal server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
