import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const activeApps = getApps();
const serviceAccount = {
  type: "service_account",
  project_id: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID || process.env.PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
  private_key_id: import.meta.env.FIREBASE_PRIVATE_KEY_ID || process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: (import.meta.env.FIREBASE_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY)?.replace(/\\n/g, "\n"),
  client_email: import.meta.env.FIREBASE_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL,
  client_id: import.meta.env.FIREBASE_CLIENT_ID || process.env.FIREBASE_CLIENT_ID,
  auth_uri: import.meta.env.FIREBASE_AUTH_URI || process.env.FIREBASE_AUTH_URI,
  token_uri: import.meta.env.FIREBASE_TOKEN_URI || process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: import.meta.env.FIREBASE_AUTH_CERT_URL || process.env.FIREBASE_AUTH_CERT_URL,
  client_x509_cert_url: import.meta.env.FIREBASE_CLIENT_CERT_URL || process.env.FIREBASE_CLIENT_CERT_URL,
};

const initApp = () => {
  const hasPrivateKey = import.meta.env.FIREBASE_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY;
  const hasClientEmail = import.meta.env.FIREBASE_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL;

  if (hasPrivateKey || hasClientEmail) {
    console.info("Loading service account from env variables.");
    return initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
    });
  }

  console.info("No service account variables found. Using default service account.");
  return initializeApp();
};

export const app = activeApps.length === 0 ? initApp() : activeApps[0];
export const db = getFirestore(app);
