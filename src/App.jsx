import { useState, useEffect } from "react";

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

function App() {
  const [politicians, setPoliticians] = useState([]);
  useEffect(() => {
    fetch(" https://freetestapi.com/api/v1/politicians")
      .then((response) => response.json())
      .then((data) => setPoliticians(data))
      .catch((error) => console.error(error));
  }, []);
  console.log(politicians);
  return (
    <>
      <h1>Lista politici</h1>
      <div className="container">
        {politicians.map((politician) => (
          <div className="card mb-3" key={politician.id}>
            <img
              className="card-img-top"
              src={politician.image}
              alt={politician.name}
            />
            <h2 className="ps-2">{politician.name}</h2>
            <h3 className="ps-2">{politician.position}</h3>
            <p className="ps-2">{politician.biography}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
