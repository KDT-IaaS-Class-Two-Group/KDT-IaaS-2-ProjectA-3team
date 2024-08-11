// import { NextApiRequest, NextApiResponse } from "next";
// import proxy from "http-proxy-middleware";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   // http-proxy-middleware를 사용해 API 요청을 NestJS 서버로 전달합니다.
//   const apiProxy = proxy({
//     target: "http://localhost:3000", // NestJS 서버 주소
//     changeOrigin: true,
//     pathRewrite: {
//       "^/api": "", // '/api'를 제거하고 NestJS API로 요청을 전달합니다.
//     },
//   });

//   apiProxy(req, res);
// }

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
