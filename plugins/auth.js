export default function({ $auth, localePath }) {
  $auth.onRedirect((to, _from) => {
    return localePath(to)
  })
}
