# BlinkUp Home Service Platform

This repository contains the source code for **BlinkUp Home Services**, a full‑stack platform for booking and managing home service requests. The application is built with **Next.js (App Router)** on the frontend, **Tailwind CSS** for styling, **Firebase** (Firestore, Storage and Auth) on the backend, and integrates with the **WhatsApp Cloud API** and **OpenAI/Gemini** for an AI‑powered chatbot.

## Features

- **Home page** with hero section, services overview, “Why choose BlinkUp” section, gallery preview and testimonials.
- **Services page** listing all 15 service categories. Each service links to an advanced lead form where customers can select a sub‑service, choose a date and time, add notes and upload an optional photo.
- **Lead form** collects customer details and saves them to Firestore. Upon submission a WhatsApp notification is sent to the administrator and a confirmation message to the customer.
- **About, Contact, Testimonials and Gallery pages** showcase company information, allow visitors to reach out via a small contact form and display customer reviews and completed work.
- **Thank you page** confirms successful lead submission and provides a WhatsApp CTA.
- **Admin panel** (protected route) with dashboards showing lead statistics, lead list with status management, gallery uploader, testimonial manager and settings page. Only users authenticated through Firebase Auth should have access (not implemented in this demo).
- **AI chatbot** integration via WhatsApp Cloud API and OpenAI/Gemini (placeholder). Incoming customer messages are parsed to recognise service requests, collect details and save leads automatically.

## Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

   The project uses `next`, `react`, `firebase` and `firebase-admin`. It also installs `tailwindcss` and `autoprefixer` for styling. The dependencies are listed in `package.json` but not installed in this repository. You will need an active internet connection to download them.

2. **Configure environment variables**

   Copy `.env.example` to `.env.local` and fill in your values:

   ```bash
   cp .env.example .env.local
   ```

   - **Firebase client config**: obtain your API key, auth domain, project ID, storage bucket, messaging sender ID and app ID from the Firebase console.
   - **Firebase Admin SDK**: generate a service account and copy the `project_id`, `client_email` and `private_key` fields. Replace newlines in the private key with `\n` in your `.env.local` file.
   - **WhatsApp Cloud API**: set your API token, phone number ID and the admin number to which notifications should be sent.

3. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

4. **Deploy**

   - **Vercel**: Create a new project pointing to this repository and add the environment variables under **Project Settings → Environment Variables**. Vercel will build and deploy the Next.js app automatically.
   - **Firebase Hosting**: Alternatively, you can deploy to Firebase Hosting. Build the project with `npm run build` and `npm run start` locally to verify. Then follow Firebase CLI instructions to deploy the `app` directory.

5. **Domain (blinkuphome.com)**

   The domain is hosted on Hostinger. After deploying to Vercel or Firebase Hosting, update the DNS records at Hostinger to point `blinkuphome.com` to your hosted site. Enable HTTPS via your hosting provider.

## WhatsApp Cloud API setup guide

1. Create a Meta for Developers account and set up a WhatsApp Business account.
2. In the [Meta Developers Portal](https://developers.facebook.com/), create an app and add the **WhatsApp** product. Follow the quick start to get a **phone number ID** and a **permanent access token**.
3. Add a webhook callback URL in the **WhatsApp** product settings that points to a Firebase Cloud Function or Next.js API route which will handle incoming messages.
4. Save the following variables in your `.env.local`:

   ```env
   WHATSAPP_CLOUD_API_TOKEN=EAAJ...
   WHATSAPP_PHONE_NUMBER_ID=1234567890
   WHATSAPP_ADMIN_NUMBER=919876543210
   ```

5. The API endpoint used in `src/app/api/lead/route.ts` posts messages to the admin using the [messages endpoint](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages). You can extend the logic to send templated messages to customers.

## Firebase setup

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Firestore** (in native mode) and create collections matching the structure described in the specification: `leads`, `services`, `testimonials`, `gallery`, and `admin`.
3. Enable **Firebase Storage** for image uploads. Update the storage rules to allow authenticated writes and public reads (or as per your security requirements).
4. Enable **Email/Password** sign‑in in **Authentication** for the admin panel. Create an admin user and note down the credentials.
5. Generate a service account key (JSON) under **Project Settings → Service accounts** and populate the `FIREBASE_ADMIN_*` variables in `.env.local`.

## AI chatbot integration

The project includes a placeholder for connecting an AI chatbot to the WhatsApp Cloud API. You can implement a webhook (e.g. a Firebase Cloud Function) that receives incoming WhatsApp messages, uses the OpenAI GPT or Google Gemini API to parse the user’s intent, collects details like name, location and preferred time, saves the lead to Firestore and sends confirmation messages. Refer to the official [OpenAI API documentation](https://platform.openai.com/docs/api-reference) or [Google Gemini documentation] for details on integrating the language model.

## Documentation for administrators

- **Add gallery images**: Navigate to **Admin → Gallery** and use the file picker to upload new images. In a production system the images would be uploaded to Firebase Storage and added to the `gallery` collection.
- **Add or edit testimonials**: Go to **Admin → Testimonials** to submit new reviews. Existing reviews are listed below the form.
- **Manage leads**: The **Leads** page displays all service requests. Click on a lead to update its status (e.g. mark as Contacted or Completed). You can contact the customer directly via the WhatsApp button.
- **Change settings**: Update the WhatsApp number or business hours under **Admin → Settings**.

## Notes

- Many backend functions are stubbed in this demo (e.g. uploading images, saving testimonials, updating lead status) because they require a live Firebase project and network access. Hooks are clearly commented where integration code should go.
- The UI uses basic Tailwind components with custom colours; feel free to adjust the design to match your branding.
- This codebase provides a solid starting point for the BlinkUp Home Services platform and demonstrates how the various features described in the specification can be structured within a Next.js & Firebase stack.