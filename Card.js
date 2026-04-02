function Card({ card, selectable , selected }) {

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "1rem",
      margin: "0.5rem 0",
      borderRadius: "8px",
      backgroundColor: "#fff"
    }}>
      <p>{`${selected ? '[ ] ' : ''}${card.number.name} of ${card.suit.name}${selected ? ' (selected)' : ''}`}</p>
    </div>
  );
}