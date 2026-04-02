const { useEffect, useState } = React;

// Cards
const SUIT = {
  SPADE: { name: "Spades" },
  HEART: { name: "Hearts" },
  DIAMOND: { name: "Diamonds" },
  CLUB: { name: "Clubs" },
};
const NUMBER = {
  ACE: { name: "A", attack: 1 },
  TWO: { name: "2", attack: 2 },
  THREE: { name: "3", attack: 3 },
  FOUR: { name: "4", attack: 4 },
  FIVE: { name: "5", attack: 5 },
  SIX: { name: "6", attack: 6 },
  SEVEN: { name: "7", attack: 7 },
  EIGHT: { name: "8", attack: 8 },
  NINE: { name: "9", attack: 9 },
  TEN: { name: "10", attack: 10 },
  JACK: { name: "J", attack: 10 },
  QUEEN: { name: "Q", attack: 15 },
  KING: { name: "K", attack: 20 },
};

function App() {

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
  const [currentEnemy, setCurrentEnemy] = useState(undefined);

  const [enemyHealth, setEnemyHealth] = useState(0);
  const [shield, setShield] = useState(0);

  const [newBattleAvailable, setNewBattleAvailable] = useState(true);

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
    setEnemies([...jacks, ...queens, ...kings]);
  }

  const deal = handIndex => {
    if (deck.length === 0) {
      return
    }
    const newCard = deck[0];
    setDeck(deck.slice(1));
    HAND_TRACKER[handIndex].setHand([...HAND_TRACKER[handIndex].hand, newCard]);
  }

  const dealInitialHands = () => {
    HAND_TRACKER.forEach((hand, index) => {
      deal(index);
      deal(index);
      deal(index);
      deal(index);
      deal(index);
    });
  }

  const startBattle = () => {
    const newEnemy = enemies[0];
    setCurrentEnemy(newEnemy);
    setEnemies(enemies.slice(1));
    setEnemyHealth(newEnemy.number.attack);
  }

  //// SETUP ////

  useEffect(() => {
    initializeDecks();
    dealInitialHands();
  }, []);

  console.log(handNorth);
  console.log(HAND_TRACKER[currentHand]);

  return (
    <div className="container">
      <div className="card">
        <h1>Regicide</h1>
        {newBattleAvailable && (
          <button
            onClick={() => startBattle()}
          >
            Start
          </button>
        )}
        {!!currentEnemy && (
          <div>
            <p>{`${currentEnemy.number.name} of ${currentEnemy.suit.name}`}</p>
          </div>
        )}
        <div>
          <p>Stats</p>
          <p>{`Deck: ${deck.length}`}</p>
          <p>{`Discard: ${discardPile.length}`}</p>
          <p>{`Enemies remaining: ${enemies.length}`}</p>
          <p>{`Enemy health: ${enemyHealth}`}</p>
          <p>{`Shield: ${shield}`}</p>
        </div>
        <div>
          <p>{`Hand - ${HAND_TRACKER[currentHand].name}`}</p>
          {HAND_TRACKER[currentHand].hand.map(card => (
            <p>{`${card.number.name} of ${card.suit.name}`}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);