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

1. Create a GitHub repository named `MySalonApp`.
2. Push the project code to the `main` branch.
3. A GitHub Actions workflow will build and publish the app to the `gh-pages` branch.
4. The site should become available at `https://pawankool2k-droid.github.io/MySalonApp` shortly after the action completes.

## Notes

- Admin access uses the passphrase `salonsparkle`.
- Data is stored in browser local storage, so appointments persist across refreshes in the same browser.
