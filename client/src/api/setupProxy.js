// const { createProxyMiddleware } = require("http-proxy-middleware");
// module.exports = function(app) {
//   app.use(
//     "/api",
//     createProxyMiddleware({
//       target: "http://localhost:8000/",
//       changeOrigin: true
//     })
//   );
// // };
// const proxy = require("http-proxy-middleware");
// module.exports = function(app) {
//   // add other server routes to path array
//   app.use(proxy("/api", { target: "http://localhost:8000" }));
// };
