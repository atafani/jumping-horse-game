const scoreTable = document.getElementById("highscores-table");

const usernames = Object.keys(localStorage);

if (usernames.length == 0) {
  scoreTable.style.display = "none";
  document.getElementById("main-container").innerHTML = "No users registered.";
} else {
  scoreTable.style.display = "table";
}

const users = [];
const tbody = document.getElementById("highscores-table-body");

for (let i = 0; i < usernames.length; i++) {
  users.push(JSON.parse(localStorage.getItem(usernames[i])));
}

users.sort((a, b) => {
  return b.score - a.score;
});

for (let i = 0; i < users.length; i++) {
  let row = document.createElement("tr");
  let rankData = document.createElement("td");
  let usernameData = document.createElement("td");
  let scoreData = document.createElement("td");

  rankData.innerHTML = i + 1;
  usernameData.innerHTML = users[i].username;
  scoreData.innerHTML = users[i].score;
  tbody.appendChild(row);
  row.appendChild(rankData);
  row.appendChild(usernameData);
  row.appendChild(scoreData);
}
