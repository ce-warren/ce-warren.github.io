const { useState } = React;

// Cards
const SUIT = {
  SPADE: { name: "Spade" },
  HEART: { name: "Heart" },
  DIAMOND: { name: "Diamond" },
  CLUB: { name: "Club" },
};
const NUMBER = {
  ACE: { attack: 1 },
  TWO: { attack: 2 },
  THREE: { attack: 3 },
  FOUR: { attack: 4 },
  FIVE: { attack: 5 },
  SIX: { attack: 6 },
  SEVEN: { attack: 7 },
  EIGHT: { attack: 8 },
  NINE: { attack: 9 },
  TEN: { attack: 10 },
  JACK: { attack: 10 },
  QUEEN: { attack: 15 },
  KING: { attack: 20 },
};

function App() {
  const [count, setCount] = useState(0);

  // State
  


  return (
    <div className="container">
      <div className="card">
        <h1>React GitHub Pages Starter</h1>
        <p>This is a minimal React skeleton running without a build step.</p>

        <p>Counter: {count}</p>
        <button onClick={() => setCount(count + 1)}>
          Increment
        </button>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
