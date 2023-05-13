//Add click event on the login button and check if user exists
const loginBtn = document.getElementById("login-btn");

loginBtn.onclick = () => {
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const errorContainer = document.getElementById("error-message");

  const userJSON = localStorage.getItem(username.value);

  if (userJSON) {
    const user = JSON.parse(userJSON);
    if (password.value === user.password) {
      sessionStorage.setItem("logged", username.value);
      username.value = "";
      password.value = "";
      errorContainer.innerHTML = "";
      window.location.href = "index.html";
    } else {
      errorContainer.innerHTML = "*Incorrect password";
      password.value = "";
    }
  } else {
    errorContainer.innerHTML = "*Incorrect username";
    username.value = "";
    password.value = "";
  }
};
