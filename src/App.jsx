import { useState, useEffect, useMemo, memo } from "react";

import "./App.css";

//! Milestone 1: Recuperare e visualizzare i dati

/* Effettua una chiamata API a
    https://boolean-spec-frontend.vercel.app/freetestapi/politicians

    Salva la risposta in uno stato React (useState).

    Mostra i politici in una lista di card, visualizzando almeno le seguenti proprietà:
        Nome (name)
        Immagine (image)
        Posizione (position)
        Breve biografia (biography)

Obiettivo: Caricare e mostrare i politici in un’interfaccia chiara e leggibile. */

//! Milestone 2: Implementare la ricerca ottimizzata

/* Aggiungi un campo di ricerca (<input type="text">) sopra la lista dei politici.
    Permetti all’utente di filtrare i risultati in base a nome o biografia (se il testo cercato è incluso).
     Suggerimento: Creare un array derivato filtrato, che viene aggiornato solo quando cambia la lista di politici o il valore della ricerca.
    ❌ Non usare useEffect per aggiornare l’array filtrato.

Obiettivo: Migliorare le prestazioni evitando ricalcoli inutili quando il valore della ricerca non cambia. */

//! Milestone 3: Ottimizzare il rendering delle card con React.memo

/* Attualmente, ogni volta che l’utente digita nella barra di ricerca, tutte le card vengono ri-renderizzate, anche quelle che non sono cambiate.
    Usa React.memo() per evitare il ri-render delle card quando le loro props non cambiano.
    Aggiungi un console.log() dentro il componente Card per verificare che venga renderizzato solo quando necessario.

Obiettivo: Se la lista filtrata cambia, solo le nuove card devono essere renderizzate, mentre le altre rimangono in memoria senza essere ridisegnate. */

//! Bonus: Filtrare anche per posizione politica (position)

/* Creare un array derivato che contiene tutte le posizioni politiche (position) disponibili, ma senza duplicati.
    Aggiungere un <select> sopra la lista che permette di filtrare i politici anche in base alla loro posizione.
    Modificare l’array filtrato per tenere conto sia della stringa di ricerca, sia della posizione selezionata. */
const PoliticianCard = memo(({ image, name, position, biography }) => {
  console.log("Card render");
  return (
    <div className="card mb-3">
      <img className="card-img-top" src={image} alt={name} />
      <h2 className="ps-2">{name}</h2>
      <h3 className="ps-2">{position}</h3>
      <p className="ps-2">{biography}</p>
    </div>
  );
});
function App() {
  const [politicians, setPoliticians] = useState([]);

  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch(" https://freetestapi.com/api/v1/politicians")
      .then((response) => response.json())
      .then((data) => setPoliticians(data))
      .catch((error) => console.error(error));
  }, []);

  const filterPoliticians = useMemo(() => {
    return politicians.filter(
      (politician) =>
        politician.name.toLowerCase().includes(search.toLowerCase()) ||
        politician.biography.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, politicians]);

  return (
    <>
      <div className="container">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cerca politico"
          className="mt-3"
        />
        <h1>Lista politici</h1>
        <div className="container">
          {filterPoliticians.map((politician) => (
            <PoliticianCard key={politician.id} {...politician} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
