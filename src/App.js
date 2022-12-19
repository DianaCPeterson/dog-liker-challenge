import { useState, useEffect } from "react";
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
          {/* DELIVERABLE 1: map out the dogs to the pattern given */}
          {dogs.map((dog) => {
            // we know the properties of props and the dog, so destructure those
            const { image, likes, id, name } = dog;
            return (
              <div key={id} className="dog">
                <img src={image} alt={name} />
                <p>{name}</p>
                <p>Likes: {likes}</p>
                <button
                  onClick={() => {
                    console.dog("dog clicked!");
                  }}
                >
                  Like
                </button>
                <br />
                <br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
