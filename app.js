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
    let arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(cards[i], cards[i + n]);
    }
    return arr;
  }

  //// SETUP ////

  initializeDecks();
  console.log(deck, enemies);

  // // Example logic
  // function createArr(cards, n) {
  //   let arr = [];
  //   for (let i = 0; i < n; i++) {
  //     arr.push(cards[i], cards[i + n]);
  //   }
  //   return arr;
  // }

  const initializeDecks = () => {
    const startingNumbers = [NUMBER.ACE, NUMBER.TWO, NUMBER.THREE, NUMBER.FOUR, NUMBER.FIVE, NUMBER.SIX, NUMBER.SEVEN, NUMBER.EIGHT, NUMBER.NINE, NUMBER.TEN];
    startingNumbers.forEach(number => {
      deck.add({ number, suit: SUIT.SPADE });
      deck.add({ number, suit: SUIT.HEART });
      deck.add({ number, suit: SUIT.DIAMOND });
      deck.add({ number, suit: SUIT.CLUB });
    });
    setDeck(shuffle(startingNumbers));

    const jacks = [
      { number: NUMBER.JACK, suit: SUIT.SPADE },
      { number: NUMBER.JACK, suit: SUIT.HEART },
      { number: NUMBER.JACK, suit: SUIT.DIAMOND },
      { number: NUMBER.JACK, suit: SUIT.CLUB },
    ];
    const queens = [
      { number: NUMBER.QUEEN, suit: SUIT.SPADE },
      { number: NUMBER.QUEEN, suit: SUIT.HEART },
      { number: NUMBER.QUEEN, suit: SUIT.DIAMOND },
      { number: NUMBER.QUEEN, suit: SUIT.CLUB },
    ];
    const kings = [
      { number: NUMBER.KING, suit: SUIT.SPADE },
      { number: NUMBER.KING, suit: SUIT.HEART },
      { number: NUMBER.KING, suit: SUIT.DIAMOND },
      { number: NUMBER.KING, suit: SUIT.CLUB },
    ];
    setEnemies([...shuffle(jacks), ...shuffle(queens), ...shuffle(kings)]);
  }

  const cards = ['A','B','C','D','E','F'];
  const result = createArr(cards, 3); // example usage

  return (
    <div className="container">
      <div className="card">
        <h1>React JSX No-Build GitHub Pages</h1>
        <p>Counter: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <p>Example array: {result.join(', ')}</p>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);