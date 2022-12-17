// note, this is called a "dumb" component, meaning it just has props and no state!
// generally speaking, in React, you'll want to maximize your "dumb" UI components that show things
// you'll want state to rest in a high component, redux or a dataLayer component!
// more info here: https://javascript.plainenglish.io/react-all-about-components-35650a02ff50

export default function DogDiv({ dog, toggleGoodBoy }) {
  const { name, url, isGoodBoy } = dog;
  return (
    <div className="dog">
      <img src={url} alt={name} />
      <p>{name}</p>
      <button
        onClick={() => {
          toggleGoodBoy();
        }}
      >
        {!isGoodBoy ? "OK Dog" : "Good Dog"}
      </button>
      <br />
      <br />
    </div>
  );
}
