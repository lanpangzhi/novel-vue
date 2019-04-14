// const path = require('path');
// const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');

// module.exports = {
//   configureWebpack: {
//     plugins: [
//       new SkeletonWebpackPlugin({
//         webpackConfig: {
//           entry: {
//             app: path.join(__dirname, './src/skeleton.js'),
//           },
//         },
//         minimize: true,
//         quiet: true,
//         router: {
//           mode: 'history',
//           routes: [
//             {
//               path: '/',
//               skeletonId: 'skeleton1'
//             }
//           ]
//         }
//       }),
//     ],
//   },
// };