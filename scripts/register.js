// Click event on Register button to store the player info on local storage
const registerBtn = document.getElementById("register-btn");

registerBtn.onclick = () => {
  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const address = document.getElementById("address").value;
  const phoneNumber = document.getElementById("phone-number").value;
  const errorContainer = document.getElementById("error-message");

  // Register Form Validation
  if (name === "" || name.length < 4) {
    errorContainer.innerHTML =
      "*Please enter a valid name longer than 3 characters.";
    return;
  } else if (username === "" || username.length < 4) {
    errorContainer.innerHTML =
      "*Please enter a valid username longer than 3 characters.";
    return;
  } else if (
    email === "" ||
    email.match(
      /^[a-zA-z]+[.-_+]?[a-zA-z0-9]*@[a-zA-z]{2,}[.][a-zA-z]{2,}[.]?[a-zA-z]*/
    ) === null
  ) {
    errorContainer.innerHTML =
      "*Please enter a valid email address : example@example.com.";
    return;
  } else if (
    password === "" ||
    password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/) === null
  ) {
    errorContainer.innerHTML =
      "*Please enter a valid password.Must be 8 characters, must have at least on capital letter and at least one number.";
    return;
  } else if (password !== confirmPassword) {
    errorContainer.innerHTML = "*Passwords entered did not match.";
    return;
  } else if (
    address === "" ||
    address.match(/[,#-/ !@#$%^*(){[]}]+/) !== null
  ) {
    errorContainer.innerHTML = "*Please enter a valid address.";
    return;
  } else if (
    phoneNumber === "" ||
    phoneNumber.match(/[a-zA-Z,#-/ !@#$%^*(){[]}]+/) !== null
  ) {
    errorContainer.innerHTML = "*Please enter a valid phone number.";
    return;
  }

  // Store user information
  const user = {
    name: name,
    username: username,
    email: email,
    password: password,
    address: address,
    phoneNumber: phoneNumber,
    score: 0,
  };

  localStorage.setItem(username, JSON.stringify(user));
  window.location.href = window.location.href.replace("register", "login");
  document.getElementById("nerror-messageame").value = "";
  document.getElementById("name").value = "";
  document.getElementById("username").value = "";
  document.getElementById("confirm-password").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("address").value = "";
  document.getElementById("phone-number").value = "";
};
