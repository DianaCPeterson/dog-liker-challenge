export default function DogDiv(props) {
  const { dog, name, isGoodBoy, toggleGoodBoy } = props;
  return (
    <div className="dog">
      <img src={dog} alt={dog} />
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
