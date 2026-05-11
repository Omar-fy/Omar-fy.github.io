const username = "omar-fy";

const container = document.getElementById("repo-container");
const searchInput = document.getElementById("search");
const themeToggle = document.getElementById("themeToggle");

let allRepos = [];

/*
   THEME TOGGLE (SAFE)
*/
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

/*
   FETCH REPOS
*/
async function loadRepos() {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await res.json();

    // store globally
    allRepos = repos;

    render(allRepos);
  } catch (err) {
    container.innerHTML = "<p>Failed to load repositories</p>";
  }
}

/*
   RENDER FUNCTION
*/ 

function render(repos) {
  container.innerHTML = "";

  repos.forEach(repo => {
    // OPTION 4: hide github pages repo
    if (repo.name === `${username}.github.io`) return;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${repo.name}</h2>
      <p>${repo.description || "No description provided"}</p>
      <a href="${repo.html_url}" target="_blank">View on GitHub →</a>
    `;

    container.appendChild(card);
  });
}

/*
   SEARCH FILTER
*/
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = allRepos.filter(repo =>
    repo.name.toLowerCase().includes(value)
  );

  render(filtered);
});

/* ---------------------------
   INIT
----------------------------*/
loadRepos();
