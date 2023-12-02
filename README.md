This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# OpenMicFinder - Your Open Mic Event Discovery Platform

OpenMicFinder is a web application that caters to upcoming and aspiring stand-up comedians by providing a platform to discover open mic events in their selected city. Also allows users to post their events increase advertising, and let locals find their events. This project is built using TypeScript and leverages Firebase/Firestore for data management, along with Google Cloud Platform Maps integration for location-based features.

## Getting Started

To get started with OpenMicFinder, follow these steps:

#### 1. Clone the repository to your local machine:

git clone "https://github.com/njwright92/micfinder.git"
cd OpenMicFinder

Install the dependecies:

npm install
or
yarn install
or
pnpm install
or
bun install

#### 2. Set up Firebase:

Create a Firebase project on the Firebase Console.
Obtain your Firebase configuration credentials.
Create a .env.local file in the project root and add your Firebase credentials as follows:

NEXT_PUBLIC_FIREBASE_API_KEY=<your-api-key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-messaging-sender-id>
NEXT_PUBLIC_FIREBASE_APP_ID=<your-app-id>

#### 3. Run the development server:

npm run dev
or
yarn dev
or
pnpm dev
or
bun dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Features

- Discover a wide range of open mic events in your selected city.
- Explore events for stand-up comedy, poetry slams, music jams, and more.
- Connect with local artists and enthusiasts to build your network.
- Showcase your talent by promoting your own open mic events.
- Technologies and Dependencies
- OpenMicFinder utilizes the following technologies and dependencies:

-- Next.js: A React framework for server-rendered applications.
-- Firebase: A cloud-based platform for building web and mobile applications.
-- Google Cloud Platform Maps: Integration for location-based features.
-- @googlemaps/js-api-loader: JavaScript API loader for Google Maps.
-- @heroicons/react: A set of free, MIT-licensed high-quality SVG icons.
-- react-datepicker: A responsive date and time picker library.
-- sharp: A high-performance image processing library.

### Learn More

To learn more about the project and its development, refer to the following resources:

- Next.js Documentation: Explore Next.js features and API.
- Firebase Documentation: Discover Firebase's capabilities.
- Google Cloud Maps Documentation: Learn about Google Maps integration.
- The OpenMicFinder GitHub Repository: Contribute to the project and share your feedback.

### Deploy on Vercel

The easiest way to deploy your OpenMicFinder app is to use the Vercel Platform by the creators of Next.js.

Check out the Next.js deployment documentation for more details.

We welcome your contributions and feedback to make OpenMicFinder even better!
