import React, { useState, useRef } from 'react'
import { Button } from './components/Result/styled'
import AnswerBox from './components/AnswerBox'
import FailBox from './components/FailBox'
import Result from './components/Result'
import Human from './components/Human'


import {
  Gallow,
  DownPipe,
  RightBlueTriangle,
  Input,
  AppWrapper,
  GameInstruction,
} from './styled'

export default () => {
  // The code starts by declaring a state variable for the word from API.
  //This is used to store the word that was inputted into the game.
  const [wordFromAPI, setWordFromAPI] = useState([])
  const [isPaused, setIsPaused] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  //The next two variables are used to track whether or not the game is paused and if it's over.
  const [resultBox, setResultBox] = useState({
    disabled: false,
    title: 'Hangman',
    buttonLabel: 'Start Game',
    //It has a button label of "Start Game" which will trigger when clicked on.
  })
  const [failedLetters, setFailedLetters] = useState([])
  const [correctLetters, setCorrectLetters] = useState([])
  const [word, setWord] = useState('')
  const inputRef = useRef(null)
  // This function also contains a reference variable called inputRef which will be used later on in this function.

  
  const handOnKeyPress = event => {
    let keyChar = event.key
    event.preventDefault()
    if (
      //If it finds a letter, then it will change the word from API to QWERTYUIOPASDFGHJKLZXCVBNM 
      //add an uppercase version of that letter.

      wordFromAPI.length > 0 &&
      'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'.indexOf(keyChar) >
        -1
    ) {
      keyChar = keyChar.toUpperCase()
      if (
        !failedLetters.find(x => x === keyChar) &&
        !correctLetters.find(x => x === keyChar)
      ) {
        let count = 0
        for (let i = 0; i < wordFromAPI.length; i++) {
          if (keyChar === wordFromAPI[i]) {
            count++
            const newCorrectLetters = correctLetters.concat([keyChar])
            setCorrectLetters(newCorrectLetters)
            countCorrectLetters(newCorrectLetters)
            return
          }
        }
        if (count === 0) {
          if (failedLetters.length === 10) {
            //If there are 10 failed letters, then it sets up a result box with disabled text and button label Restart Game .
            setResultBox({
              disabled: false,
              title: `Game Over { word: ${word} }`,
              buttonLabel: 'Restart Game',
            })
            setIsGameOver(true)
          }
          setFailedLetters(failedLetters.concat([keyChar]))
        }
      }
    }
  }

  const emptyBoxList = () => {
    // The code is a function that takes in an empty list of strings and returns the same.
    let arrayOfSpace = []
    if (wordFromAPI.length > 0) {
      const arraySize = wordFromAPI.length
      for (let x = 0; x < 12 - arraySize; x++) {
        arrayOfSpace.push(' ')
      }
      //if (wordFromAPI.length > 0) { } The code checks to see if there is a word in the API response before creating an array of spaces.
 //If there is a word, it will create an array of 12 - length, which will contain one space for each letter in the word.
    }
    return arrayOfSpace
  }

  const startGame = () => {
    setResultBox({
      disabled: true,
    })
    setFailedLetters([])
    setCorrectLetters([])
    setWordFromAPI([])
    setWord('')
    getDataFromAPI()
    setIsGameOver(false)
    inputRef.current.focus()
  }

  const continueGame = () => {
    setResultBox({
      disabled: true,
    })
    inputRef.current.focus()
  }

  const wordSetter = word => {
    let wordArr = word.toUpperCase().split('')
    wordArr.map(item => {
      item === '-' && wordArr.splice(wordArr.indexOf('-'), 1)
      item === ' ' && wordArr.splice(wordArr.indexOf(' '), 1)
      return item
    })

    setWordFromAPI(wordArr)
    setWord(word)
  }

  const getDataFromAPI = () => {
    const params = {
      hasDictionaryDef: true,
      minCorpusCount: 0,
      maxCorpusCount: -1,
      maxDictionaryCount: -1,
      minLength: 3,
      maxLength: 12,
      api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
    }
    let url = new URL('http://api.wordnik.com/v4/words.json/randomWord')
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    )
    fetch(url, {
      method: 'GET',
    })
      .then(response => {
        const responseStatus = response.status
        if (responseStatus >= 400 && responseStatus <= 500) {
          throw Error('API error, creating random word localy!')
        }
        return response.json()
      })
      .then(response => {
        wordSetter(response.word)
        return response.status
      })
      .catch(error => {
        console.log(error)
        const fruits = [
          'Apple',
          'Orange',
          'Pear',
          'Lemon',
          'Kiwi',
          'Watermelon',
          'Strawberry',
          'Banana',
        ]
        const randomFruit = fruits[Math.floor(Math.random() * fruits.length)]
        wordSetter(randomFruit)
      })
  }

  const countCorrectLetters = correctLetters => {
    let uniqueLetters = filterUniqueItems(wordFromAPI)
    if (correctLetters.length === uniqueLetters.length) {
      setResultBox({
        disabled: false,
        title: '★ You Won! ★',
        buttonLabel: 'Restart Game',
      })
      setIsGameOver(true)
    }
  }

  const filterUniqueItems = items => {
    const obj = {},
      uniqueItems = []
    for (var i = 0, l = items.length; i < l; ++i) {
      if (obj.hasOwnProperty(items[i])) {
        continue
      }
      uniqueItems.push(items[i])
      obj[items[i]] = 1
    }
    return uniqueItems
  }

  return (
    
    <AppWrapper>
            
      <GameInstruction>Press any keys (letters) to play.</GameInstruction>

      <Gallow>
        <DownPipe />
        <Input
          ref={inputRef}
          //pressing pause game will stop the game
          {...(!isGameOver && !isPaused && { onKeyDown: handOnKeyPress })}
          onFocus={() => setIsPaused(false)}
          onBlur={() => {
            if (!isGameOver) {
              setIsPaused(true)
              setResultBox({
                title: 'Game is Paused',
                disabled: false,
                buttonLabel: 'continue',
              })
            }
          }}
        />
      </Gallow>
      <Human failedLetterCount={failedLetters.length} />

      <FailBox failedLetters={failedLetters} />
      <AnswerBox
        wordFromAPI={wordFromAPI}
        correctLetters={correctLetters}
        spaces={emptyBoxList()}
      />

      <RightBlueTriangle />
      <Result
        title={resultBox.title}
        disabled={resultBox.disabled}
        buttonLabel={resultBox.buttonLabel}
        buttonAction={isPaused ? continueGame : startGame}
      />
      {!isPaused && <Button pause> Pause Game</Button>}
    </AppWrapper>
  )
}


