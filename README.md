# Salon Appointment & Consent Web App

A mobile-first salon booking app built with React, Vite, and Tailwind CSS. Users can choose makeup and waxing services, complete a consent form, and schedule appointments. Appointments are stored in local storage and are visible in the password-protected admin dashboard.

## Features

- Service selection for Makeup and Waxing
- Consent form with allergy and skin condition checkboxes
- Digital text signature
- Date and time slot picker
- Booking confirmation screen with summary and mock confirmation code
- Admin dashboard with appointment list, status badges, and consent details
- Local storage persistence

## Setup

```bash
cd /home/pawan/Source
PATH=/home/pawan/.local/node/bin:$PATH npm install
PATH=/home/pawan/.local/node/bin:$PATH npm run dev
```

## Build

```bash
PATH=/home/pawan/.local/node/bin:$PATH npm run build
```

## Deployment

The app can be deployed to free hosting providers such as Vercel or GitHub Pages.

### GitHub Pages

This repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that builds the app and deploys the generated `dist` folder to GitHub Pages. The project page is expected at `https://pawankool2k-droid.github.io/MySalonApp` after the workflow completes.

### Vercel

1. Create a new project in Vercel.
2. Link the repository.
3. Run 'npm install'
4. If require run 'npm audit fix --force'
5. Use the default build command: `npm run build`.
6. Publish the `dist` output folder.
7. You can test my hosting from local using this command 'npx vite preview --host --port 4173' in root folder.

## Notes

- Admin access uses the passphrase `salonsparkle`.
- Data is stored in browser local storage, so appointments persist across refreshes in the same browser.
