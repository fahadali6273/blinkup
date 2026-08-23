// ✅ SERVER-SIDE Firebase Admin SDK
// ❗ NEVER import this file inside React components — only in API routes or server actions

import admin from "firebase-admin";

function serviceAccount() {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (json) {
    const parsed = JSON.parse(json);
    return {
      projectId: parsed.project_id,
      clientEmail: parsed.client_email,
      privateKey: parsed.private_key?.replace(/\\n/g, "\n"),
    };
  }

  return {
    projectId:
      process.env.FIREBASE_ADMIN_PROJECT_ID ||
      process.env.FIREBASE_PROJECT_ID ||
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail:
      process.env.FIREBASE_ADMIN_CLIENT_EMAIL ||
      process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: (
      process.env.FIREBASE_ADMIN_PRIVATE_KEY ||
      process.env.FIREBASE_PRIVATE_KEY ||
      ""
    ).replace(/\\n/g, "\n"),
  };
}

function getAdminApp() {
  if (admin.apps.length) return admin.app();
  const credentials = serviceAccount();
  if (!credentials.projectId || !credentials.clientEmail || !credentials.privateKey) {
    throw new Error("Firebase Admin credentials are not configured.");
  }
  return admin.initializeApp({ credential: admin.credential.cert(credentials) });
}

export function isFirebaseAdminConfigured() {
  if (admin.apps.length) return true;
  const credentials = serviceAccount();
  return Boolean(
    credentials.projectId && credentials.clientEmail && credentials.privateKey
  );
}

// Server-only accessors are intentionally lazy so static page builds do not
// require production credentials.
export function getAdminDb() {
  return getAdminApp().firestore();
}

export function getAdminAuth() {
  return getAdminApp().auth();
}
