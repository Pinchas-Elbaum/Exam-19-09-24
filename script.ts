const url : string = "https://nbaserver-q21u.onrender.com";

const form = document.querySelector('#form') as HTMLFormElement;
const submit = document.querySelector('#submit') as HTMLButtonElement;
const table = document.querySelector('table') as HTMLTableElement;

const fantasyTeamArr : string[] = ["","","","",""];

interface filterdPlayersResponse{
    position: string;
    twoPercent: Number;
    threePercent: Number;
    points: Number;
    playerName: string;
}

interface filterdPlayersRequest{
    position: string;
    twoPercent: Number;
    threePercent: Number;
    points: Number;
}


function createPlayerRequest() : filterdPlayersRequest{
    const position = document.querySelector('#position') as HTMLInputElement;
    const twoPercent = document.querySelector('#twoPercent') as HTMLInputElement; 
    const threePercent = document.querySelector('#threePercent') as HTMLInputElement;
    const points = document.querySelector('#points') as HTMLInputElement;

    const playerRequest : filterdPlayersRequest = {
        position: position.value,
        twoPercent: Number(twoPercent.value),
        threePercent: Number( threePercent.value),
        points: Number(points.value)
    };
    
    return playerRequest;   
}

async function getFilteredPlayers(filterdPlayer : filterdPlayersRequest): Promise<filterdPlayersResponse[]>{
    const response = await fetch(`${url}/api/filter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filterdPlayer)
    });
    const data = await response.json();
    
    return data;
}

async function addToTable(listFilterdPlayersResponse : filterdPlayersResponse[]) : Promise<void>{

    for(let i = 0; i < await listFilterdPlayersResponse.length; i++){ 
        const currentPlayer = listFilterdPlayersResponse[i];

        const tableRow = document.createElement('tr');
        const tablePlayerName = document.createElement('td');
        const tablePosition = document.createElement('td');
        const tablePoints = document.createElement('td');
        const tableTwoPercent = document.createElement('td');
        const tableThreePercent = document.createElement('td');
        const tableAction = document.createElement('td');


        tablePlayerName.textContent = currentPlayer.playerName;
        tablePosition.textContent = currentPlayer.position;
        tablePoints.textContent = String(currentPlayer.points);
        tableTwoPercent.textContent = String(currentPlayer.twoPercent);
        tableThreePercent.textContent = String(currentPlayer.threePercent);
        const AddButton = document.createElement('button');
        AddButton.textContent = `Add ${currentPlayer.playerName} To ${currentPlayer.position}`;

        AddButton.addEventListener('click', () => {
            const playerCard = document.querySelector(`#${currentPlayer.position}`) as HTMLTableElement;
            
            playerCard.querySelector("#name")?.remove();
            playerCard.querySelector("#threePercent")?.remove();
            playerCard.querySelector("#twoPercent")?.remove();
            playerCard.querySelector("#points")?.remove();
                    
            const name = document.createElement("p") as HTMLTableElement;
            name.id = "name";
            const threePercent = document.createElement("p") as HTMLTableElement;
            threePercent.id = "threePercent";
            const twoPercent = document.createElement("p") as HTMLTableElement;
            twoPercent.id = "twoPercent";
            const points = document.createElement("p") as HTMLTableElement;
            points.id = "points";

            
            name.textContent = currentPlayer.playerName;
            threePercent.textContent = `Tree Percent: ${String(currentPlayer.threePercent)}`;
            twoPercent.textContent = `Two Percent: ${String(currentPlayer.twoPercent)}`;
            points.textContent = ` Points: ${String(currentPlayer.points)}`;

            
            playerCard.appendChild(name);
            playerCard.appendChild(threePercent);
            playerCard.appendChild(twoPercent);
            playerCard.appendChild(points);

            addPlayerToTable(currentPlayer);
            saveToLocalStorage();
           

        });
        tableAction.appendChild(AddButton);


        tableRow.appendChild(tablePlayerName);
        tableRow.appendChild(tablePosition);    
        tableRow.appendChild(tablePoints);
        tableRow.appendChild(tableTwoPercent);
        tableRow.appendChild(tableThreePercent);
        tableRow.appendChild(tableAction);
        
        table.appendChild(tableRow);    
}}

async function randerTable(): Promise<void>{
    const listFilterdPlayersResponse = await getFilteredPlayers(createPlayerRequest());
    await addToTable(listFilterdPlayersResponse);
}


form.addEventListener('submit', (event) => {    
    event.preventDefault();
    randerTable();
})

function addPlayerToTable(player : filterdPlayersResponse) {
    switch (player.position) {
        case 'PG':
            fantasyTeamArr[0] = `{playerName: ${player.playerName}, position: ${player.position}, points: ${player.points}, twoPercent: ${player.twoPercent}, threePercent: ${player.threePercent}}`;
            break;
        case 'SG':
            fantasyTeamArr[1] = `{playerName: ${player.playerName}, position: ${player.position}, points: ${player.points}, twoPercent: ${player.twoPercent}, threePercent: ${player.threePercent}}`
            break;
        case 'SF':
            fantasyTeamArr[2] = `{playerName: ${player.playerName}, position: ${player.position}, points: ${player.points}, twoPercent: ${player.twoPercent}, threePercent: ${player.threePercent}}`
            break;
        case 'PF':
            fantasyTeamArr[3] =  `{playerName: ${player.playerName}, position: ${player.position}, points: ${player.points}, twoPercent: ${player.twoPercent}, threePercent: ${player.threePercent}}`
            break;
        case 'C':
            fantasyTeamArr[4] = `{playerName: ${player.playerName}, position: ${player.position}, points: ${player.points}, twoPercent: ${player.twoPercent}, threePercent: ${player.threePercent}}`
            break;
    }
}

function saveToLocalStorage() {
    localStorage.setItem('fantasyTeamArr', JSON.stringify(fantasyTeamArr));
}   

submit.addEventListener('click', async () => {
    randerTable();
});