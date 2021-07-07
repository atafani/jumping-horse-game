const username = sessionStorage.getItem("logged");
const scoreContainer = document.getElementById("score");
const logoutButton = document.getElementById("logout-btn");

if (username !== null) {
  scoreContainer.innerHTML = username + " your score is: 0";
  logoutButton.style.display = "inline-block";
} else {
  scoreContainer.innerHTML = "Your score is: 0";
  logoutButton.style.display = "none";
}

// Add click event on logout button to manage logout

logoutButton.onclick = () => {
  sessionStorage.removeItem("logged");
  logoutButton.style.display = "none";
  scoreContainer.innerHTML = scoreContainer.innerHTML.replace(username, "");
};
