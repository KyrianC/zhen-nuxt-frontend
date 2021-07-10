export default function({ route, $auth, redirect }) {
    if (route.path !== '/complete-profile' && $auth.loggedIn && ($auth.user.level == 'unset' || $auth.user.learning_language == 'unset')) {
        return redirect('/complete-profile')
    }
}
