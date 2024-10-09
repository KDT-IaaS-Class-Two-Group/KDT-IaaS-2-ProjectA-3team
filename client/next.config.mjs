import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

// 먼저 플러그인 설정 함수를 생성합니다.
const withVanillaExtract = createVanillaExtractPlugin();

// 생성된 플러그인 설정 함수를 nextConfig에 적용합니다.
export default withVanillaExtract(nextConfig);
