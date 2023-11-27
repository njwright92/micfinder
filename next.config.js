/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    remotePatterns: [
      {
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};
