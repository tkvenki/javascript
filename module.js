function User() {
  console.log("1. User() runs and creates a new private scope.");

  var username, password;
  console.log("2. Private variables start as:", { username, password });

  function doLogin(user, pw) {
    console.log("4. The public login() method can update the private variables.");

    username = user;
    password = pw;

    console.log("5. Private state after login:", {
      username,
      passwordIsSet: Boolean(password)
    });
    // Do the rest of the login work.
  }

  var publicAPI = {
    login: doLogin
  };

  console.log("3. User() exposes only this public API:", Object.keys(publicAPI));
  return publicAPI;
}

// create a `User` module instance
var fred = User();
console.log("The module instance contains:", fred);
console.log("Private variables are not directly accessible:", fred.username);

fred.login("fred", "12Battery34!");
