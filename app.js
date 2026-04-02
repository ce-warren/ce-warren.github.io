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

  /// STATE ////

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

  //// FUNCTIONS ////

  const shuffle = cards => {
    let currentIndex = cards.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [cards[currentIndex], cards[randomIndex]] = [
        cards[randomIndex], cards[currentIndex]];
    }
  }

  const initializeDecks = () => {
    const startingNumbers = [NUMBER.ACE, NUMBER.TWO, NUMBER.THREE, NUMBER.FOUR, NUMBER.FIVE, NUMBER.SIX, NUMBER.SEVEN, NUMBER.EIGHT, NUMBER.NINE, NUMBER.TEN];
    const startingDeck = [];
    startingNumbers.forEach(number => {
      startingDeck.push({ number, suit: SUIT.SPADE });
      startingDeck.push({ number, suit: SUIT.HEART });
      startingDeck.push({ number, suit: SUIT.DIAMOND });
      startingDeck.push({ number, suit: SUIT.CLUB });
    });
    shuffle(startingDeck);
    setDeck(startingDeck);

    const jacks = [
      { number: NUMBER.JACK, suit: SUIT.SPADE },
      { number: NUMBER.JACK, suit: SUIT.HEART },
      { number: NUMBER.JACK, suit: SUIT.DIAMOND },
      { number: NUMBER.JACK, suit: SUIT.CLUB },
    ];
    shuffle(jacks);
    const queens = [
      { number: NUMBER.QUEEN, suit: SUIT.SPADE },
      { number: NUMBER.QUEEN, suit: SUIT.HEART },
      { number: NUMBER.QUEEN, suit: SUIT.DIAMOND },
      { number: NUMBER.QUEEN, suit: SUIT.CLUB },
    ];
    shuffle(queens);
    const kings = [
      { number: NUMBER.KING, suit: SUIT.SPADE },
      { number: NUMBER.KING, suit: SUIT.HEART },
      { number: NUMBER.KING, suit: SUIT.DIAMOND },
      { number: NUMBER.KING, suit: SUIT.CLUB },
    ];
    shuffle(kings)
    console.log(startingDeck, kings);
    setEnemies([...jacks, ...queens, ...kings]);
  }

  //// SETUP ////

  // initializeDecks();
  console.log(deck, enemies);

  return (
    <div className="container">
      <div className="card">
        <h1>React JSX No-Build GitHub Pages</h1>
        <p>Counter: {count}</p>
        <button
          onClick={() => initializeDecks();}
        >
          Start
        </button>
        {enemies.map(enemy => (
          <p>{enemy}</p>
        ))}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);