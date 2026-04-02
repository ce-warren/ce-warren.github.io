const { useEffect, useState } = React;

//// Cards ////

const SUIT = {
  SPADES: { name: "Spades" },
  HEARTS: { name: "Hearts" },
  DIAMONDS: { name: "Diamonds" },
  CLUBS: { name: "Clubs" },
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
  const [playedCards, setPlayedCards] = useState([]);

  const [deck, setDeck] = useState([]);
  const [discardPile, setDiscardPile] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [currentEnemy, setCurrentEnemy] = useState(undefined);

  const [enemyHealth, setEnemyHealth] = useState(0);
  const [shield, setShield] = useState(0);

  const [checkingReplenishment, setCheckingReplenishment] = useState(false);
  const [restoreAvailable, setRestoreAvailable] = useState(false);
  const [drawAvailable, setDrawAvailable] = useState(false);
  const [drawing, setDrawing] = useState(false);

  const [gameStarted, setGameStarted] = useState(false);
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
  };

  const initializeDecks = () => {
    const startingNumbers = [NUMBER.ACE, NUMBER.TWO, NUMBER.THREE, NUMBER.FOUR, NUMBER.FIVE, NUMBER.SIX, NUMBER.SEVEN, NUMBER.EIGHT, NUMBER.NINE, NUMBER.TEN];
    const startingDeck = [];
    startingNumbers.forEach(number => {
      startingDeck.push({ number, suit: SUIT.SPADES });
      startingDeck.push({ number, suit: SUIT.HEARTS });
      startingDeck.push({ number, suit: SUIT.DIAMONDS });
      startingDeck.push({ number, suit: SUIT.CLUBS });
    });
    shuffle(startingDeck);
    setDeck(startingDeck);

    const jacks = [
      { number: NUMBER.JACK, suit: SUIT.SPADES },
      { number: NUMBER.JACK, suit: SUIT.HEARTS },
      { number: NUMBER.JACK, suit: SUIT.DIAMONDS },
      { number: NUMBER.JACK, suit: SUIT.CLUBS },
    ];
    shuffle(jacks);
    const queens = [
      { number: NUMBER.QUEEN, suit: SUIT.SPADES },
      { number: NUMBER.QUEEN, suit: SUIT.HEARTS },
      { number: NUMBER.QUEEN, suit: SUIT.DIAMONDS },
      { number: NUMBER.QUEEN, suit: SUIT.CLUBS },
    ];
    shuffle(queens);
    const kings = [
      { number: NUMBER.KING, suit: SUIT.SPADES },
      { number: NUMBER.KING, suit: SUIT.c },
      { number: NUMBER.KING, suit: SUIT.DIAMONDS },
      { number: NUMBER.KING, suit: SUIT.CLUBS },
    ];
    shuffle(kings)
    setEnemies([...jacks, ...queens, ...kings]);
  };

  const deal = (handIndex, numberCards = 1) => {
    if (deck.length < numberCards) {
      console.error("Error in deal: not enough cards in deck");
      return;
    }
    const newCards = deck.slice(0, numberCards);
    setDeck(deck.slice(numberCards));
    HAND_TRACKER[handIndex].setHand([...HAND_TRACKER[handIndex].hand, ...newCards]);
  };

  const dealInitialHands = () => {
    HAND_TRACKER.forEach((hand, index) => {
      deal(index, 5);
    });
  };

  const startBattle = () => {
    const newEnemy = enemies[0];
    setCurrentEnemy(newEnemy);
    setEnemies(enemies.slice(1));
    setEnemyHealth(newEnemy.number.attack * 2);
    setNewBattleAvailable(false);
  };

  const isValidCardSelection = card => {
    const currentSelectedSum = selectedCards.reduce((acc, curr) => acc + curr.number.attack, 0);
    return currentSelectedSum + card.number.attack <= 10;
  };

  const playCards = () => {
    setPlayedCards(selectedCards);
    HAND_TRACKER[currentHand].setHand(HAND_TRACKER[currentHand].hand.filter(card => selectedCards.includes(card)));
    setSelectedCards([]);
    setPhase(PHASE.REPLENISH);
  };

  const yieldTurn = () => {
    setSelectedCards([]);
    setPhase(PHASE.DEFEND)
  };

  const getActiveSuits = () => {
    return playedCards.map(card => card.suit).filter(suit => suit != currentEnemy.suit);
  };

  const heartsActive = () => {
    return getActiveSuits.includes(SUIT.HEARTS);
  };

  const diamondsActive = () => {
    return getActiveSuits.includes(SUIT.DIAMONDS);
  };

  const clubsActive = () => {
    return getActiveSuits.includes(SUIT.CLUBS);
  };

  const spadesActive = () => {
    return getActiveSuits.includes(SUIT.SPADES);
  };

  const getAttackValue = () => {
    playedCards.reduce((acc, curr) => acc + curr.number.attack, 0);
  };

  const checkReplenishment = () => {
    if (heartsActive()) {
      setRestoreAvailable(true);
    }
    if (diamondsActive()) {
      setDrawAvailable(true);
    }
    setCheckingReplenishment(false);
  };

  const retoreFromDiscard = () => {
    // restore cards
    setRestoreAvailable(false);
  };

  const drawFromDeck = () => {
    // drawing phases?
    setDrawAvailable(false);
  };

  const endReplenishment = () => {
    setPhase(PHASE.ATTACK);
  };

  //// SETUP ////

  useEffect(() => {
    initializeDecks();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>Regicide</h1>
        {!gameStarted && (
          <button
            onClick={() => {
              dealInitialHands();
              setNewBattleAvailable(true);
              setGameStarted(true);
            }}
          >
            Start
          </button>
        )}
        {newBattleAvailable && (
          <button
            onClick={() => {
              startBattle()
              setPhase(PHASE.PLAY);
            }}
          >
            Start Battle
          </button>
        )}
        <div>
          <p>Stats</p>
          <p>{`Deck: ${deck.length}`}</p>
          <p>{`Discard: ${discardPile.length}`}</p>
          <p>{`Enemies remaining: ${enemies.length}`}</p>
          <p>{`Enemy health: ${enemyHealth}`}</p>
          <p>{`Shield: ${shield}`}</p>
        </div>
        {currentEnemy && (
          <div>
            <Card card={currentEnemy} />
          </div>
        )}
        {phase === PHASE.REPLENISH && (
          <div>
            hi
          </div>
        )}
        <div>
          <p>{`Hand - ${HAND_TRACKER[currentHand].name}`}</p>
          {HAND_TRACKER[currentHand].hand.map(card => (
            phase === PHASE.PLAY
              ? (
                <button
                  onClick={() => {
                    if (selectedCards.includes(card)) {
                      setSelectedCards(selectedCards.filter(selectedCard => selectedCard != card))
                    }
                    else {
                      setSelectedCards([...selectedCards, card])
                    }
                  }}
                  disabled={!selectedCards.includes(card) && !isValidCardSelection(card)}
                >
                  <Card
                    card={card}
                    selectable={true}
                    selected={selectedCards.includes(card)}
                  />
                </button>
              ) : (
                <Card
                  card={card}
                  selectable={false}
                  selected={false}
                />
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
            <button onClick={() => yieldTurn()}>
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