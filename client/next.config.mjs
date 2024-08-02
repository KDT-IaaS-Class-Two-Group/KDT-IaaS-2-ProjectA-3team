import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true };

export default createVanillaExtractPlugin(nextConfig);
