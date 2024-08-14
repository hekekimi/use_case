# Äänestyssovelluksen käyttötapauskuvaukset


## Käyttötapaus: Luo tunnus sovellukseen
**Käyttäjät:** Uusi käyttäjä tai ylläpitäjä

**Laukaisija:** Käyttäjä tai ylläpitäjä haluaa luoda uuden tunnuksen sovellukseen.

**Esiehto:** Käyttäjä tai ylläpitäjä ei ole vielä luonut tunnusta sovellukseen.

**Jälkiehto:** Uusi käyttäjä- tai ylläpitäjätunnus on luotu ja käyttäjä voi kirjautua sisään.

**Käyttötapauksen kulku:**
1. Käyttäjä avaa etusivun.
2. Käyttäjä syöttää tarvittavat tiedot.
3. Käyttäjä vahvistaa rekisteröitymisen painikkeeella "Luo käyttäjä".
4. Sovellus tarkistaa syötetyt tiedot ja luo uuden tunnuksen.
5. Käyttäjä näkee vahvistusviestin onnistuneesta rekisteröitymisestä.

**Poikkeuksellinen toiminta:**
- **Poikkeus 1:** Jos syötetyt tiedot ovat puutteellisia, näytetään ilmoitus esim. " Täytä tämä kenttä"
- **Poikkeus 2:** Jos käyttäjä tai ylläpitäjä on jo olemassa, näytetään virheilmoitus "Käyttäjätuunnus on varattu, valitse toinen tunnus".




## Käyttötapaus : Kirjaudu sisään

**Käyttäjät:** Käyttäjä tai ylläpitäjä

**Laukaisija** Käyttäjä avaa kirjautumissivun ja haluaa kirjautua sisään.

**Esiehto** Käyttäjätunnus täytyy olla luotuna.

**Kälkiehto** Käyttäjä on kirjautuneena sisään ja voi käyttää sovelluksen toimintoja.

**Käyttötapauksen kulku**
1. Käyttäjä tai ylläpitäjä avaa kirjautumissivun.
2. Käyttäjä tai ylläpitäjä syöttää tunnuksen ja salasanan.
3. Käyttäjä tai ylläpitäjä vahvistaa kirjautumisen.
4. Sovellus tarkastaa tiedot ja käyttäjä kirjautuu sisään.
5. Käyttäjä tai ylläpitäjä siirtyy sovellukseen.

**Poikkeuksellinen toiminta:**
- **Poikkeus 1:** Jos käyttäjätunnus tai salasana on virheellinen, näytetään virheilmoitus."Virheellinen käyttäjätunnus tai salasana"






## Käyttötapaus: Selaa äänestyksiä
**Käyttäjät:** Käyttäjä

**Laukaisija:** Käyttäjä avaa sovelluksen etusivun.

**Esiehto:** Käyttäjän on oltava kirjautuneena sovellukseen.

**Jälkiehto:** Käyttäjä näkee listan aktiivisista äänestyksistä.

**Käyttötapauksen kulku:**
1. Käyttäjä avaa sovelluksen etusivun.
2. Sovellus hakee ja näyttää listan aktiivisista äänestyksistä.
3. Käyttäjä voi selata listaa ja valita haluamansa äänestyksen.

**Poikkeuksellinen toiminta:**
- **Poikkeus 1:** Jos sovelluksessa ei ole aktiivisia äänestyksiä, näytetään viesti ja ohjataan takaisin etusivulle.

## Käyttötapaus: Katso äänestystilanne
**Käyttäjät:** Käyttäjä

**Laukaisija:** Käyttäjä valitsee äänestyksen etusivulta.

**Esiehto:** Käyttäjän on oltava kirjautuneena sovellukseen ja valittava äänestys.

**Jälkiehto:** Käyttäjä näkee valitsemansa äänestyksen nykyisen äänestystilanteen.

**Käyttötapauksen kulku:**
1. Käyttäjä valitsee äänestyksen etusivulta.
2. Sovellus hakee valitun äänestyksen nykyisen äänestystilanteen.
3. Sovellus näyttää äänestyksen tulokset käyttäjälle.

**Poikkeuksellinen toiminta:**
- **Poikkeus 1:** Jos äänestystä ei löydy, näytetään viesti esim. "Äänestystä ei löydy".

## Käyttötapaus: Osallistu äänestykseen
**Käyttäjät:** Käyttäjä

**Laukaisija:** Käyttäjä valitsee äänestyksen ja haluaa äänestää.

**Esiehto:** Käyttäjän on oltava kirjautuneena sovellukseen ja valittava äänestys. Äänestyksiä täytyy olla luotuna vähintään yksi.

**Jälkiehto:** Käyttäjän ääni on tallennettu ja äänestystilanne on päivitetty.

**Käyttötapauksen kulku:**
1. Käyttäjä valitsee äänestyksen.
2. Käyttäjä valitsee haluamansa vaihtoehdon ja vahvistaa äänensä.
3. Sovellus tallentaa käyttäjän äänen ja päivittää äänestystilanteen.
4. Sovellus näyttää äänestystilanteen käyttäjälle.

**Poikkeuksellinen toiminta:**
- **Poikkeus 1:** Jos käyttäjä on jo äänestänyt, näytetään viesti "Olet jo äänestänyt tässä äänestyksessä".
- **Poikkeus 2:** Jos äänestys on päättynyt, näytetään viesti "Äänestys on päättynyt".

## Käyttötapaus: Luo uusi äänestys
**Käyttäjät:** Ylläpitäjä

**Laukaisija:** Ylläpitäjä haluaa luoda uuden äänestyksen.

**Esiehto:** Ylläpitäjän on oltava kirjautuneena sovellukseen ja oltava ylläpitäjän roolissa.

**Jälkiehto:** Uusi äänestys on luotu ja näkyvissä käyttäjille.

**Käyttötapauksen kulku:**
1. Ylläpitäjä avaa "Luo uusi äänestys" -sivun.
2. Ylläpitäjä luo äänestyksen, kysymyksen ja vaihtoehdot.
3. Ylläpitäjä vahvistaa äänestyksen luomisen.
4. Sovellus tallentaa uuden äänestyksen ja näyttää sen käyttäjille.

**Poikkeuksellinen toiminta:**
- **Poikkeus 1:** Jos syötetyt tiedot ovat puutteellisia, näytetään virheilmoitus esim. "Kaikki kentät on täytettävä"

## Käyttötapaus: Poista äänestys
**Käyttäjät:** Ylläpitäjä

**Laukaisija:** Ylläpitäjä haluaa poistaa äänestyksen.

**Esiehto:** Ylläpitäjän on oltava kirjautuneena sovellukseen ja oltava ylläpitäjän roolissa. Äänestyksiä on oltava olemassa vähintään yksi.

**Jälkiehto:** Valittu äänestys on poistettu eikä se ole enää äänestettävissä.

**Käyttötapauksen kulku:**
1. Ylläpitäjä avaa "Poista äänestys" -sivun.
2. Ylläpitäjä valitsee poistettavan äänestyksen.
3. Ylläpitäjä vahvistaa poistamisen.
4. Sovellus poistaa valitun äänestyksen ja päivittää äänestyslistan.

**Poikkeuksellinen toiminta:**
- **Poikkeus 1:** Jos äänestystä ei löydy, näytetään viesti "Äänestystä ei löydy".
- **Poikkeus 2:** Jos äänestyksen poistaminen jostain syystä epäonnistuu, näytetään virheilmoitus "Äänestyksen poistaminen epäonnistui".
