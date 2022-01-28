export default function({ route, $auth, redirect, app }) {
  if (
    route.path !== app.localePath("/complete-profile") &&
    $auth.loggedIn &&
    ($auth.user.level == "unset" || $auth.user.learning_language == "unset")
  ) {
    return redirect(app.localePath("/complete-profile"));
  }
}
