export const prerender = false;
import type { APIRoute } from "astro";
import { db } from "../../firebase/server";
import { FieldValue } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, name, whatsapp_number, source } = body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // email format validation
    if (!email || !emailRegex.test(email)) {
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

    // Check duplicate email
    const emailSnap = await db.collection("Waitlist").where("email", "==", email).get();
    if (!emailSnap.empty) {
      return new Response(
        JSON.stringify({ message: "This email is already on the waitlist!" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Check duplicate phone number
    const phoneSnap = await db.collection("Waitlist").where("whatsapp_number", "==", whatsapp_number).get();
    if (!phoneSnap.empty) {
      return new Response(
        JSON.stringify({ message: "This phone number is already on the waitlist!" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const docData: Record<string, any> = {
      email: email,
      name: name || "",
      whatsapp_number: whatsapp_number,
      subscribedAt: FieldValue.serverTimestamp(),
    };

    if (source) {
      docData.source = source;
    }

    const docRef = await db.collection("Waitlist").add(docData);

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
