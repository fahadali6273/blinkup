// ✅ SERVER-SIDE Firebase Admin SDK
// ❗ NEVER import this file inside React components — only in API routes or server actions

import admin from "firebase-admin";

// Prevent re-initialization during hot reload in dev
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

// ✅ Firestore instance for admin use
export const adminDb = admin.firestore();

// ✅ Auth instance (optional, if you’ll verify tokens)
export const adminAuth = admin.auth();
