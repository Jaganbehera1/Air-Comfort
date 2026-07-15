# Environment Setup Guide

## Firebase Configuration

This project uses Firebase for authentication and database. To run locally, you need to set up environment variables.

### Step 1: Copy the environment template
```bash
cp .env.example .env.local
```

### Step 2: Fill in your Firebase credentials

Edit `.env.local` and add your Firebase project credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

You can find these values in your Firebase Console:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on the Settings icon (⚙️) → Project Settings
4. Scroll down to "Your apps" section
5. Click on your web app to see the Firebase config

### Step 3: Never commit `.env.local`

The `.env.local` file is automatically ignored by git (see `.gitignore`). 

**IMPORTANT**: Never commit sensitive credentials to version control.

### For Other Developers

Other developers should:
1. Clone the repository
2. Copy `.env.example` to `.env.local`
3. Fill in their own Firebase credentials (or use shared credentials from team lead)
4. Start the development server

## Development Server

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

## Deploying to Production

For production deployments, set environment variables in your hosting platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Build & Deploy → Environment
- GitHub Actions: Settings → Secrets and Variables → Actions
- Or any other hosting platform you use
