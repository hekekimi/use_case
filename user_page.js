//esimerkkiäänestykset
const exaplePolls = [
    {
        question: "Lempivärisi?",
        options: ["Punainen", "Sininen", "Vihreä","Keltainen"],
        votes: [0, 0, 0, 0] // alustetaan äänet
    },
    {
        question: "Paras ruoka?",
        options: ["Pasta", "Pizza", "Lanttukukko","Silli ja uudet perunat"],
        votes: [0, 0, 0, 0] 
    },
    {
        question: "Paras automerkki?",
        options: ["BMW","Mercedes-Benz","Audi","Joku muu A-B kulkuväline"],
        votes: [0, 0, 0, 0] 
    },
    {
        question: "Lempimusiikkisi?",
        options: ["Rock","Metalli","Iskelmä","Senegalilainen fuusiojazz"],
        votes: [0, 0, 0, 0] 
    }
];




// käytetään valmiita esimerkkiäänestyksiä ja/tai paikallisesti käyttäjän luomia
const polls = JSON.parse(localStorage.getItem('polls')) || exaplePolls;





// Funktio päivittää äänestyskortit käyttöliittymässä
function updatePollCardsContainer() {
    console.log(polls.length);
    if (polls.length !== 0) {
        const pollCardsContainer = document.getElementById('pollCardsContainer');
        pollCardsContainer.innerHTML = '';
        

        polls.forEach((poll, index) => {
            const card = document.createElement('div');
            card.className = 'card m-3';
            card.style.width = '18rem';
            
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            cardBody.dataset.pollIndex = index; // Lisää pollIndex data-attribuuttiin

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
    } else { //jos äänestykisä ei ole
        alert("Tällä hetkellä ei ole yhtään avointa äänestystä!\n Ohjataan takaisin etusivulle.");
        setTimeout(function() {
            location.replace("index.html");
        }, 1500);
    }


    





}

// Äänestyksen käsittely
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

    // tarkista, onko käyttäjä jo äänestänyt tässä äänestyksessä
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

// Tulosten näyttäminen
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
            results_button.innerHTML = "Katso tulokset";
        }
    } else {
        alert("Valitse äänestys ja jokin vaihtoehdoista nähdäksesi tulokset");
    }
}

function updateResultsList(pollIndex, resultsContainer) {
    
    resultsContainer.innerHTML = '';
    
    // Haetaan kyseinen äänestys polls-taulukosta pollIndex:n perusteella
    const poll = polls[pollIndex];
    
    // Lasketaan kaikkien vaihtoehtojen äänten kokonaismäärä
    const totalVotes = poll.votes.reduce((total, votes) => total + votes, 0);
    
    // Käydään läpi kaikki äänestyksen vaihtoehdot
    poll.options.forEach((option, index) => {
        // Haetaan kyseisen vaihtoehdon äänimäärä
        const votes = poll.votes[index];
        
        // Lasketaan prosenttiosuus kyseiselle vaihtoehdolle (kuinka monta prosenttia kaikista äänistä)
        const percentage = totalVotes ? Math.round((votes / totalVotes) * 100) : 0;
        
        
        const progressBarContainer = document.createElement('div');
        progressBarContainer.className = 'mb-2';  

        // vaihtoehdon nimi, äänimäärä ja prosenttiosuus
        const label = document.createElement('div');
        label.textContent = `${option}: ${votes} ääntä (${percentage}%)`;
        label.className = 'small mb-1';  

       
        const progress = document.createElement('div');
        progress.className = 'progress';

        // progress bar, joka näyttää äänten prosenttiosuuden
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar progress-bar-striped bg-success';
        progressBar.style.width = `${percentage}%`;  // aseta leveys prosenttiosuuden mukaan
        
        progressBar.setAttribute('aria-valuenow', percentage);  
        progressBar.setAttribute('aria-valuemin', '0');
        progressBar.setAttribute('aria-valuemax', '100');

       
        progress.appendChild(progressBar);
        
        
        progressBarContainer.appendChild(label);
        progressBarContainer.appendChild(progress);

        
        resultsContainer.appendChild(progressBarContainer);
    });

    // Näytetään tulokset 
    resultsContainer.style.display = 'block';
}


// Päivitä kortit sivun latauksen yhteydessä
updatePollCardsContainer();

document.getElementById('randomizeVotesButton').addEventListener('click', function() { //satunnaisia ääniä voidaan lisätä napilla
    polls.forEach(poll => {
        poll.votes = poll.votes.map(() => Math.floor(Math.random() * 100)); 
    });
    localStorage.setItem('polls', JSON.stringify(polls)); 
    updatePollCardsContainer(); // Päivitä käyttöliittymä
    
});

