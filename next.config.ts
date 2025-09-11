import type { NextConfig } from 'next' 
const withPWA = require('next-pwa');


module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
});
 
const nextConfig: NextConfig = {
  turbopack: {
    // ...
  },
}
 
export default nextConfig

