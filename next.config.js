/** @type {import('next').NextConfig} */
const nextConfig = {
  // 활성화 시 콘솔 두번 찍힘
  // reactStrictMode: true,
  swcMinify: true,
  // emotion 사용시 추가
  compiler: {
    emotion: true
  }
}

module.exports = nextConfig
