const username = "omar-fy";

const container = document.getElementById("repo-container");
const searchInput = document.getElementById("search");
const themeToggle = document.getElementById("themeToggle");

let allRepos = [];

/* THEME (SAFE) */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

/* FETCH REPOS */
async function loadRepos() {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  allRepos = await res.json();
  render(allRepos);
}

/* RENDER */
function render(repos) {
  container.innerHTML = "";

  repos.forEach(repo => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h2>${repo.name}</h2>
      <p>${repo.description || "No description"}</p>
      <a href="${repo.html_url}" target="_blank">View →</a>
    `;

    container.appendChild(div);
  });
}

/* SEARCH FILTER */
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = allRepos.filter(repo =>
    repo.name.toLowerCase().includes(value)
  );

  render(filtered);
});

/* INIT */
loadRepos();
