import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,  // 기본적인 설정 추가
  swcMinify: true,        // SWC를 사용한 최적화 설정
};

export default createVanillaExtractPlugin(nextConfig);
