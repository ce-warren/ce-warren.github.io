function Card({ card }) {

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "1rem",
      margin: "0.5rem 0",
      borderRadius: "8px",
      backgroundColor: "#fff"
    }}>
      <p>{`${card.number.name} of ${card.suit.name}`}</p>
    </div>
  );
}