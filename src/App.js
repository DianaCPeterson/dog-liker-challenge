import { useState, useEffect, useMemo } from "react";
import DogDiv from "./DogDiv";
import "./App.css";

// extremely silly, ignore
console.dog = (message) => {
  console.log("woof woof arf");
  console.log(message);
};
const DOGS_URL = "http://localhost:3004/dogs";

function App() {
  // DELIVERABLE 1: dogs will be an array
  const [dogs, setDogs] = useState([]);

  // DELIVERABLE 1: fetch the dogs and set them to state
  // use the useEffect hook for fetches on load!
  useEffect(() => {
    fetch(DOGS_URL)
      .then((resp) => resp.json())
      .then((data) => setDogs(data))
      .catch((e) => console.error(e));
    /* 
    use an empty array as the second argument to 
    useEffect to only run once-ish on load
    */
  }, []);

  // DELIVERABLE 2: addLike, let's use linear search
  const addLike = (id, currentLikes) => {
    // increment likes
    const updatedLikes = currentLikes + 1;
    // we cant mutate state directly so let's make a copy of the array
    const copyOfDogs = [...dogs];
    // let's find the index of the dog we want to change
    const foundDogIndex = copyOfDogs.findIndex((dog) => dog.id === id);
    // let's change the value
    copyOfDogs[foundDogIndex].likes = updatedLikes;
    // let's update state
    setDogs(copyOfDogs);
  };

  return (
    <div className="App">
      <h2>Welcome to the Dog Liker!</h2>
      <div>
        <br />
        {/* example of a drodown implementation */}
        <select
          onChange={(e) => {
            console.dog(e.target.value);
          }}
        >
          <option value="all">All Dogs</option>
          <option value="liked">Liked Dogs</option>
        </select>
        <br />
        <br />
        {/* we use Array.prototype.map because an array of JSX object is valid react code */}
        <div id="dogs">
          {/* DELIVERABLE 2: map out the dogs array to individual components */}
          {dogs.map((dog) => {
            return <DogDiv dog={dog} addLike={addLike} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
