const { useState } = React;

function App() {
  const [count, setCount] = useState(0);

  // Example logic
  function createArr(cards, n) {
    let arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(cards[i], cards[i + n]);
    }
    return arr;
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