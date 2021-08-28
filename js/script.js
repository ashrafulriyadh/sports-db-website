const searchTeam = () => {
    const searchInput = document.getElementById('search-input');

    const searchText = searchInput.value;

    searchInput.value = '';

    if (searchText == '') {
        alert('Plese type Team Name');
    } else {
        const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchText}
    `;

        fetch(url)
            .then(res => res.json())
            .then(data => displayTeam(data.teams))
    }
}

const displayTeam = teams => {
    const displayResult = document.getElementById('display-team');
    displayResult.textContent = '';
    teams.forEach(team => {
        console.log(team);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<div onclick="loadId(${team.idTeam})" class="card mt-4 p-4">
            <img src="${team.strTeamBadge}" class="card-img-top w-75 mx-auto" alt="...">
            <div class="card-body">
                <h2 class="card-title text-center">${team.strTeam}</h2>
            </div>
            </div>`;
        displayResult.appendChild(div);
    })
}

const loadId = teamId => {
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayTeamInfo(data.teams[0]))
}

const displayTeamInfo = team => {
    const details = document.getElementById('team-details');
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card p-4 text-center">
  <img src="${team.strTeamBadge}" class="card-img-top w-50 mx-auto" alt="...">
  <div class="card-body">
    <h3 class="card-title"> ${team.strTeam} </h3>
    <p class="card-text">${(team.strDescriptionEN).slice(0, 200)}</p>
  </div>
</div>`;
    details.textContent = '';
    details.appendChild(div);
}