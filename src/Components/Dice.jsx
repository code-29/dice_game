import React, { useState } from 'react';
import '../Components/Dice.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix
} from '@fortawesome/free-solid-svg-icons';

const Dice = () => {
  const [roll, setRoll] = useState(0);
  const [target, setTarget] = useState(null);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const [tries, setTries] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const dice_roll = [faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix];

  const handleRoll = () => {
    if (isGameOver) return;

    const random = Math.floor(Math.random() * 6);
    setRoll(random);

    setTries(prevTries => {
      const updatedTries = prevTries + 1;

      // Check for loss after updating tries
      if (updatedTries >= 8 && score + (random + 1) < target) {
        setResult("😢 You lose! Reached 8 tries without hitting the target.");
        setIsGameOver(true);
      }

      return updatedTries;
    });

    setScore(prevScore => {
      const updatedScore = prevScore + (random + 1);

      // Check for win
      if (updatedScore >= target && tries < 8) {
        setResult(`🎉 You win!! You tried ${tries + 1} times`);
        setIsGameOver(true);
      }

      return updatedScore;
    });
  };

  const targetNo = () => {
    const target_random = Math.floor(Math.random() * 30) + 10; // slightly higher to make it fair
    setTarget(target_random);
    setRoll(0);
    setScore(0);
    setTries(0);
    setResult("");
    setIsGameOver(false);
  };

  const handleClear = () => {
    setRoll(0);
    setTarget(null);
    setScore(0);
    setTries(0);
    setResult("");
    setIsGameOver(false);
  };

  return (
    <div className='dice_content'>
      <div className='dice'>
      <div className='dice_roll'>
        <h1 className='heading'>Dice Rolling Game</h1>
        <FontAwesomeIcon icon={dice_roll[roll]} className='diceimg' />
        <button className='roll_btn' onClick={handleRoll} disabled={target === null || isGameOver}>Roll</button>
      </div>

      <div className='target_set'>
        <button className='target_button' onClick={targetNo}>Set Target</button>
        <h2>🎯 Target: {target}</h2>
      </div>

      <div className='score_set'>
        <div className='score_heading'>
          <h3>Your Score</h3>
          <h3>No of Tries</h3>
        </div>
        <div className='score_value'>
          <h4>{score}</h4>
          <h4>{tries}</h4>
        </div>
        <h5>{result}</h5>
      </div>

      <button onClick={handleClear} className='clear_btn'>Clear</button>
      </div>
    </div>
  );
};

export default Dice;
