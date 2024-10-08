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
 
 // Funktio äänestysten päivittämiseen käyttöliittymässä
 function updatePollList() {
     const pollList = document.getElementById('pollList');
     pollList.innerHTML = '';
     polls.forEach((poll, index) => {
         const li = document.createElement('li');
         li.textContent = `${poll.question} - Vaihtoehdot: ${poll.options.join(', ')}`;
         pollList.appendChild(li);
         let button = document.createElement('button');
         //button.className = "button";
         button.innerHTML = " Poista";
         button.setAttribute('data-index',index); // data-index painikkeelle
         pollList.appendChild(button);
         button.addEventListener("click", function() {
            removePoll(index);
        });
    });
}

 function removePoll(index){
    //poistetaan äänestys jos vastaus kyllä
    const pollName = polls[index].question;
    removal_confirmation = confirm(`Haluatko varmasti poistaa äänestyksen : ${pollName}?`)
    
    if(removal_confirmation){

        polls.splice(index,1);
        //päivitä localstore
        localStorage.setItem('polls',JSON.stringify(polls));
        //päivitä käyttöliittymö
        updatePollList();
    }
   
}



 // Käsittele äänestyksen luominen
 document.getElementById('createPollForm').addEventListener('submit', function(event) {
     event.preventDefault();

     const question = document.getElementById('question').value;
     
     const options = [
        document.getElementById('option1').value,
        document.getElementById('option2').value,
        document.getElementById('option3').value,
        document.getElementById('option4').value,
    ].filter(option => option); // Poistetaan tyhjät vaihtoehdot

     const newPoll = { question, options, votes: Array(options.length).fill(0) };
     polls.push(newPoll);
     localStorage.setItem('polls', JSON.stringify(polls));
     updatePollList();
     document.getElementById('createPollForm').reset();
 });


 // Päivitä äänestyslista sivun latauksen yhteydessä
 updatePollList();
 console.log(polls);