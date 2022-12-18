// DELIVERABLE 2: this is our UI Component for each dog

export default function DogDiv({ dog, addLike }) {
  // we know the properties of props and the dog, so destructure those
  const { image, likes, id, name } = dog;
  return (
    <div key={id} className="dog">
      <img src={image} alt={name} />
      <p>{name}</p>
      <p>Likes: {likes}</p>
      <button
        onClick={() => {
          // DELIVERABLE 2: use the ID to find the dog we need
          addLike(id, likes);
        }}
      >
        Like
      </button>
      <br />
      <br />
    </div>
  );
}
