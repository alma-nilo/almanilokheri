import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import * as dotenv from "dotenv";
dotenv.config();

// import service account file (helps to know the firebase project details)
const privetKey = {
  type: "service_account",
  project_id: process.env.projectId,
  private_key_id: process.env.private_key_id,
  private_key: process.env.private_key.replace(/\\n/g, "\n"),
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.client_x509_cert_url,
  universe_domain: "googleapis.com",
};

const app = initializeApp({
  credential: admin.credential.cert(privetKey),
});

export const auth = getAuth(app);
