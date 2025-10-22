import CatHistory from "./components/CatHistory"
import BanList from "./components/BanList"
import { useState } from "react"

const App = () => {

  let url = `https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1&api_key=${import.meta.env.VITE_API_KEY}`
  const [kittyItems, setKittyItems] = useState([])
  const [items, setItems] = useState([])
  const [banned, setBanned] = useState([])

  const addBanned = async (detail) => {
    setBanned(prevItems => [...prevItems, detail]);
  }


  const getKitties = async () => {
    let newKittyDetails;
    let isBanned;
    do {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 429) {
          alert("Rate limit exceeded. Please wait and try again later.");
          return;
        } else {
          alert("Error fetching cat data.");
          return;
        }
      }
      const json = await response.json();
      newKittyDetails = [
        json[0].url,
        json[0].breeds[0].name,
        json[0].breeds[0].weight.metric + " lbs",
        json[0].breeds[0].life_span,
        json[0].breeds[0].origin
      ];
      isBanned = newKittyDetails.some(detail => banned.includes(detail));

      console.log(newKittyDetails)
    } while (isBanned);

    setKittyItems(newKittyDetails);
    setItems(prevItems => [...prevItems, newKittyDetails]);
  };

  const Shuffle = () => {
    return (
      <div className="shuffle">
        <h1 className="title">
          Cat breed selector
        </h1>
        <h2 className="title">Shuffle and get cute cat breeds!</h2>
        <button className="shuffle-button" onClick={getKitties}>Shuffle</button>
        <div className="image-wrapper">
          <img src={kittyItems[0]} className="cat-image"></img>
        </div>

        <div className="kitty-descriptor-wrapper">
          {kittyItems.map((kittyDetail, idx) => {
            return (idx != 0) ? <button key={idx} className="kitty-descriptor-button"
              onClick={() => addBanned(kittyDetail)}>{kittyDetail}</button> : <></>
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <CatHistory items={items}></CatHistory>
      <Shuffle></Shuffle>
      <BanList banned={banned} setBanned={setBanned}></BanList>
    </div>
  )
}

export default App
