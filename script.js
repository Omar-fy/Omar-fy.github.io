const username = "omar-fy"; // <-- change if needed

const container = document.getElementById("repo-container");

async function getRepos() {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  const repos = await res.json();

  container.innerHTML = "";

  repos.forEach(async (repo) => {
    const card = document.createElement("div");
    card.className = "repo glass";

    card.innerHTML = `
      <h2>${repo.name}</h2>
      <p>${repo.description || "No description"}</p>
      <a href="${repo.html_url}" target="_blank">View Repo →</a>
      <div class="readme" id="readme-${repo.name}">Loading README...</div>
    `;

    container.appendChild(card);

    // fetch README
    try {
      const readmeRes = await fetch(
        `https://raw.githubusercontent.com/${username}/${repo.name}/main/README.md`
      );
      const text = await readmeRes.text();

      document.getElementById(`readme-${repo.name}`).innerText =
        text.slice(0, 300) + "...";
    } catch (e) {
      document.getElementById(`readme-${repo.name}`).innerText =
        "No README found.";
    }
  });
}

getRepos();
