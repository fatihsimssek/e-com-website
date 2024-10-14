/* [About] AkileNisa - START */

const teams = document.querySelectorAll('.about-team');
let currentTeam = 1;

function showTeam(page) {
  currentTeam = page;
  const startIndex = (page - 1) * 3;
  const endIndex = page * 3;

  teams.forEach((team, index) => {
    if (index >= startIndex && index < endIndex) {
      team.style.display = 'block';
    } else {
      team.style.display = 'none';
    }
  });
}
showTeam(1);


/* [About] AkileNisa - END */