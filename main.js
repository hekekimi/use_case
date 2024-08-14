// Käyttäjätiedot tallennetaan localStorageen JSOn-muotoon, jos niitä ei vielä ole
if (!localStorage.getItem('users')) { //esimerki käyttjät
    const users = { 
        "user1": { password: "123", role: "user" },
        "user2": { password: "qwerty", role: "admin" }
    };
    localStorage.setItem('users', JSON.stringify(users));
}
const infomessage = document.getElementById('info-message');
//kirjautumisenkäsittely
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    
    const storedUsers = JSON.parse(localStorage.getItem('users')) || {};

    if (storedUsers[username] && storedUsers[username].password === password) {
        infomessage.textContent = '';
        alert('Kirjautuminen onnistui!');
        
        // Tallennetaan kirjautuneen käyttäjän nimi localStorageen
        localStorage.setItem('loggedInUser', username);

        if(storedUsers[username].role == "user")
            window.location.href = "user.html";
        else
            window.location.href = "admin.html";
        
    } else {
        infomessage.textContent = 'Virheellinen käyttäjänimi tai salasana.';
    }
});

//käyttäjän rekisteröinti
document.getElementById("registration_form").addEventListener("submit", function(event){
    event.preventDefault();
    
    const storedUsers = JSON.parse(localStorage.getItem('users')) || {};

    const newUsername = document.getElementById("add_username").value;
    const newPassword = document.getElementById("new_password").value;
    const role = document.getElementById("role").value;
    

    if (storedUsers[newUsername]) {
        infomessage.textContent = "Käyttäjänimi on varattu, valitse toinen nimi";
        //console.log(storedUsers);
    } else {
        storedUsers[newUsername] = { password: newPassword, role: role }; // Lisätään käyttäjä
        if(role === "user"){
            infomessage.classList.add("green");
            infomessage.textContent = `Käyttäjä ${newUsername} rekisteröity onnistuneesti!`;
        }
        else{
            infomessage.classList.add("green");
            infomessage.textContent =`Ylläpitäjä ${newUsername} rekisteröity onnistuneesti!`;
        }
        
        // Tallennus localStorageen
        localStorage.setItem('users', JSON.stringify(storedUsers));
        //console.log(storedUsers);
    }
});
