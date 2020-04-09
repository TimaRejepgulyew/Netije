// export default function (context) {
//   if (process.client) {
//     if (context.from.path == "/callback") {
//       console.log("callback in", context);
//       context.store
//         .dispatch("oidc/oidcSignInCallback", context.route.fullPath)
//         .then((redirectPath) => {
//           console.log(redirectPath, "redirect");
//           context.store.dispatch(
//             "permissions/getPermissions",
//             context.store.getters["oidc/oidcUser"].Metadata
//           );

//           //   context.app.router.push(redirectPath);
//         })
//         .catch((err) => {
//           console.log("error", err);
//         });
//     }
//   }
// }
