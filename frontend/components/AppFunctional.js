import React, { useState } from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState(initialMessage);

  function getXY() {
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    return { x, y };
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const { x, y } = getXY();
    return `Coordinates (${x}, ${y})`;
  }

  function getMovesMessage() {
    return `You moved ${steps} ${steps === 1 ? 'time' : 'times'}`;
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setIndex(initialIndex);
    setSteps(initialSteps);
    setEmail(initialEmail);
    setMessage(initialMessage);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    const currentX = index % 3;
    const currentY = Math.floor(index / 3);

    switch (direction) {
      case 'left':
        return currentX > 0 ? index -1 : -1;
      case 'right':
        return currentX < 2 ? index + 1 : -1;
      case 'up':
        return currentY > 0 ? index - 3 : -1;
      case 'down':
        return currentY < 2 ? index + 3 : -1;
      default:
        return index;
    }
  }

  function move(evt) {
    const direction = evt.target.id;
    const newIndex = getNextIndex(direction);
    if (newIndex === -1) {
      setMessage(`You can't go ${direction}`);
    } else if (newIndex !== index) {
      setIndex(newIndex);
      setSteps(steps + 1);
      setMessage('');
    }
   }
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  

  function onChange(evt) {
    // You will need this to update the value of the input.
    setEmail(evt.target.value);
  }

  async function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();

    if (!email.trim()) {
      setMessage('Ouch: email is required');
      return
    }

    const { x, y } = getXY();
    try {
      const response = await fetch('http://localhost:9000/api/result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ x, y, steps, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      setMessage(data.message);
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">{getMovesMessage()}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left"   onClick={move}>LEFT</button>
        <button id="up"     onClick={move}>UP</button>
        <button id="right"  onClick={move}>RIGHT</button>
        <button id="down"   onClick={move}>DOWN</button>
        <button id="reset"  onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={email} onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
