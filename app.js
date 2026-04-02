const { useEffect, useState } = React;

//// Cards ////

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

const PHASE = {
  START: "START",
  PLAY: "PLAY",
  REPLENISH: "REPLENISH",
  ATTACK: "ATTACK",
  DEFEND: "DEFEND",
};

function App() {

  //// STATE ////

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

  const [selectedCards, setSelectedCards] = useState([]);

  const [deck, setDeck] = useState([]);
  const [discardPile, setDiscardPile] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [currentEnemy, setCurrentEnemy] = useState(undefined);

  const [enemyHealth, setEnemyHealth] = useState(0);
  const [shield, setShield] = useState(0);

  const [phase, setPhase] = useState(PHASE.START);
  const [newBattleAvailable, setNewBattleAvailable] = useState(false);

  //// FUNCTIONS ////

  const shuffle = cards => {
    let currentIndex = cards.length;

    while (currentIndex != 0) {

      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

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

  const deal = (handIndex, numberCards = 1) => {
    if (deck.length < numberCards) {
      console.error("Error in deal: not enough cards in deck");
      return;
    }
    const newCards = deck.slice(0, numberCards);
    setDeck(deck.slice(numberCards));
    HAND_TRACKER[handIndex].setHand([...HAND_TRACKER[handIndex].hand, ...newCards]);
  }

  const dealInitialHands = () => {
    HAND_TRACKER.forEach((hand, index) => {
      deal(index, 5);
    });
  }

  const startBattle = () => {
    const newEnemy = enemies[0];
    setCurrentEnemy(newEnemy);
    setEnemies(enemies.slice(1));
    setEnemyHealth(newEnemy.number.attack * 2);
    setNewBattleAvailable(false);
  }

  const isValidCardSelection = card => {
    const currentSelectedSum = selectedCards.reduce((acc, curr) => acc.attack + curr.attack, 0);
    return currentSelectedSum + card.attack <= 10;
  }

  const playCards = () => {

  }

  //// SETUP ////

  useEffect(() => {
    initializeDecks();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>Regicide</h1>
        {phase === PHASE.START && (
          <button
            onClick={() => {
              dealInitialHands();
              setNewBattleAvailable(true);
              setPhase(PHASE.PLAY);
            }}
          >
            Start
          </button>
        )}
        {newBattleAvailable && (
          <button
            onClick={() => startBattle()}
          >
            Start Battle
          </button>
        )}
        {currentEnemy && (
          <div>
            <Card card={currentEnemy} />
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
            phase === PHASE.PLAY
              ? (
                <button
                  onClick={() => {setSelectedCards([...selectedCards, card])}}
                  disabled={selectedCards.includes(card) || !isValidCardSelection(card)}
                >
                  <Card
                    card={card}
                    selectable={true}
                    selected={selectedCards.includes(card)}
                  />
                </button>
              ) : (
                <Card card={card} />
              )
          ))}
        </div>
        {phase === PHASE.PLAY && (
          <div>
            <button
              onClick={() => {
                setPhase(PHASE.REPLENISH);
              }}
            >
              Play
            </button>
            <button
              onClick={() => setPhase(PHASE.DEFEND)}
            >
              Yield
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);