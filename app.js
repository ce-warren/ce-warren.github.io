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
  const [handNorth, setHandNorth] = useState([]);
  const [handEast, setHandEast] = useState([]);
  const [handSouth, setHandSouth] = useState([]);
  const [handWest, setHandWest] = useState([]);
  const [currentHand, setCurrentHand] = useState(0);

  const HAND_TRACKER = [
    { name: "North", hand: handNorth, setHand: setHandNorth} ,
    { name: "East", hand: handEast, setHand: setHandEast },
    { name: "South", hand: handSouth, setHand: setHandSouth },
    { name: "West", hand: handWest, setHand: setHandWest },
  ];

  const [deck, setDeck] = useState([]);
  const [discardPile, setDiscardPile] = useState([]);
  const [enemies, setEnemies] = useState([]);

  const [enemyHealth, setEnemyHealth] = useState(0);
  const [shield, setShield] = useState(0);

  // Functions
  const shuffle = (cards) = {
    let currentIndex = cards.length;

    while (currentIndex !== 0) {

      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
    };
  };

  const initializeDecks = () = {
    const startingNumbers = [NUMBER.ACE, NUMBER.TWO, NUMBER.THREE, NUMBER.FOUR, NUMBER.FIVE, NUMBER.SIX, NUMBER.SEVEN, NUMBER.EIGHT, NUMBER.NINE, NUMBER.TEN];
    startingNumbers.forEach(number => {
      deck.add({ number, suit: SUIT.SPADE });
      deck.add({ number, suit: SUIT.HEART });
      deck.add({ number, suit: SUIT.DIAMOND });
      deck.add({ number, suit: SUIT.CLUB });
    });
    setDeck(startingNumbers);

    const jacks = [
      { number, NUMBER.JACK: SUIT.SPADE },
      { number, NUMBER.JACK: SUIT.HEART },
      { number, NUMBER.JACK: SUIT.DIAMOND },
      { number, NUMBER.JACK: SUIT.CLUB },
    ];
    shuffle(jacks);
    const queens = [
      { number, NUMBER.QUEEN: SUIT.SPADE },
      { number, NUMBER.QUEEN: SUIT.HEART },
      { number, NUMBER.QUEEN: SUIT.DIAMOND },
      { number, NUMBER.QUEEN: SUIT.CLUB },
    ];
    shuffle(queens);
    const kings = [
      { number, NUMBER.KING: SUIT.SPADE },
      { number, NUMBER.KING: SUIT.HEART },
      { number, NUMBER.KING: SUIT.DIAMOND },
      { number, NUMBER.KING: SUIT.CLUB },
    ];
    shuffle(kings);
    setEnemies([...jacks, ...queens, ...kings]);
  };

  

  // Setup
  initializeDecks();
  console.log(deck, enemies);

  // Setup


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
