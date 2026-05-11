const username = "omar-fy";

const container = document.getElementById("repo-container");

async function loadRepos() {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  const repos = await res.json();

  container.innerHTML = "";

  repos.forEach(repo => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h2>${repo.name}</h2>
      <p>${repo.description || "No description"}</p>
      <a href="${repo.html_url}" target="_blank">View Repo →</a>
    `;

    container.appendChild(div);
  });
}

loadRepos();
