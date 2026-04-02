function Card({ card, selectable = false , selected = false }) {

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "1rem",
      margin: "0.5rem 0",
      borderRadius: "8px",
      backgroundColor: "#fff"
    }}>
      <p>{`${selectable ? '[ ] ' : ''}${card.number.name} of ${card.suit.name}${selected ? ' (selected)' : ''}`}</p>
    </div>
  );
}