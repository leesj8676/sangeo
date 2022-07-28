export function login(email, password) {
  console.log("auth들어옴");
  return new Promise((res, rej) => {
    return setTimeout(() => {
      sessionStorage.setItem("isAuthorized", "true");
      return res({ resultcode: 1 });
    }, 300);
  });
}
