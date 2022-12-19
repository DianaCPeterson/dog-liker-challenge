import "./App.css";

// extremely silly, ignore
console.dog = (message) => {
  console.log("woof woof arf");
  console.log(message);
};

function App() {
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
        <div id="dogs">
          <h3>Put Dogs Here!</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
