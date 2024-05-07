export function checkAuth() {
  const user = getUser();
  if (user.uid) {
    return true;
  }

  return false;
}

export function getUser() {
  const user = window.localStorage.getItem("user");
  if (!user) return {};
  return JSON.parse(user);
}
