// Alusta äänestykset (polls array pitäisi olla ladattuna localStoragesta)
const polls = JSON.parse(localStorage.getItem('polls')) || [];


// Funktio päivittää äänestyskortit käyttöliittymässä
function updatePollCardsContainer() {


    console.log(polls.length);
    if(polls.length != 0){
    
        const pollCardsContainer = document.getElementById('pollCardsContainer');
        pollCardsContainer.innerHTML = '';

        polls.forEach((poll, index) => {
            const card = document.createElement('div');
            card.className = 'card m-2';
            card.style.width = '18rem';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const question = document.createElement('h5');
            question.className = 'card-title';
            question.textContent = poll.question;

            const optionsContainer = document.createElement('div');

            poll.options.forEach((option, optionIndex) => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'pollRadio';
                input.value = optionIndex;
                input.dataset.pollIndex = index; // Tallennetaan pollIndex data-attribuuttiin
                label.appendChild(input);
                label.appendChild(document.createTextNode(option));
                optionsContainer.appendChild(label);
                optionsContainer.appendChild(document.createElement('br'));
        });


        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'results-container';
        resultsContainer.style.display = 'none'; // Piilotetaan aluksi
        cardBody.appendChild(resultsContainer);
        console.log(resultsContainer);


        cardBody.appendChild(question);
        cardBody.appendChild(optionsContainer);
        card.appendChild(cardBody);
        pollCardsContainer.appendChild(card);
    });

    }
    else{
        alert("Tällä hetkellä ei ole yhtään avointa äänestystä!\n Ohjataan takaisin etusivulle.");
        setTimeout(function() {
           
            location.replace("index.html")

        },1500);
    }

}
//äänestyksen käsittely
document.getElementById('voteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedOption = document.querySelector('input[name="pollRadio"]:checked');

    if (!selectedOption) {
        alert('Valitse äänestys ja vaihtoehto.');
        return;
    }

    const pollIndex = selectedOption.dataset.pollIndex;
    const userVotes = JSON.parse(localStorage.getItem('userVotes')) || {};
    const loggedInUser = localStorage.getItem('loggedInUser'); // Haetaan kirjautunut käyttäjä localStoragesta

    if (!loggedInUser) {
        alert('Käyttäjä ei ole kirjautunut sisään!');
        return;
    }

    // Tarkista, onko käyttäjä jo äänestänyt tässä äänestyksessä
    if (userVotes[loggedInUser] && userVotes[loggedInUser][pollIndex]) {
        alert('Olet jo äänestänyt tässä äänestyksessä!');
        return;
    }

    // Päivitä äänet ja käyttäjän äänestyshistoria
    polls[pollIndex].votes[selectedOption.value]++;
    localStorage.setItem('polls', JSON.stringify(polls));
    
    // Tallenna tieto, että käyttäjä on äänestänyt tässä äänestyksessä
    userVotes[loggedInUser] = userVotes[loggedInUser] || {};
    userVotes[loggedInUser][pollIndex] = true;
    localStorage.setItem('userVotes', JSON.stringify(userVotes));

    // Etsi oikea resultsContainer
    const card = selectedOption.closest('.card-body');
    const resultsContainer = card.querySelector('.results-container');

    // Päivitä tulokset
    updateResultsList(pollIndex, resultsContainer);

    alert('Äänesi on tallennettu, kiitos!');
});


//tulosten näyttäminen


const results_button = document.getElementById("check_results");
results_button.addEventListener("click", showResults);

function showResults() {
    const selectedOption = document.querySelector('input[name="pollRadio"]:checked');

    if (selectedOption) {
        const pollIndex = selectedOption.dataset.pollIndex;
        const card = selectedOption.closest('.card-body');
        const resultsContainer = card.querySelector('.results-container');

        if (resultsContainer.style.display === 'none' || resultsContainer.style.display === '') {
            updateResultsList(pollIndex, resultsContainer);
            resultsContainer.style.display = 'block';  
            results_button.innerHTML = "Näytä / Piilota";
        } else {
            resultsContainer.style.display = 'none';  
            
        }
    } else {
        alert("Valitse ensin äänestys");
    }
}


function updateResultsList(pollIndex, resultsContainer) {
    resultsContainer.innerHTML = '';
    const poll = polls[pollIndex];
    poll.options.forEach((option, index) => {
        const p = document.createElement('p');
        p.textContent = `${option}: ${poll.votes[index]} ääntä`;
        resultsContainer.appendChild(p);
    });
    resultsContainer.style.display = 'block'; // Näytetään tulokset
}



// Päivitä kortit sivun latauksen yhteydessä
updatePollCardsContainer();
