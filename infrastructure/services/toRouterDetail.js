export default function toRouter(context, { replaceOldRoute, route }) {
  if (replaceOldRoute) {
    context.$router.replace(route);
  } else {
    context.$router.push(route);
  }
}
