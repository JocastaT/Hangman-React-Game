import React from 'react'
import { Item, Wrapper } from './styled'

export default ({ spaces, correctLetters, wordFromAPI }) => (
  //The code iterates over all of the items in the wrapper, mapping each item to its index (spaces) or letter (word from API).
 //The code is a React component that renders an input field and the text from the API.
  <Wrapper>
    {spaces.map((item, index) => (
      <Item disabled key={`space-${index}`} />
      // For each iteration, it will create a new Item with key "space-${index}" 
      //(where index represents a number) that contains an input field with disabled key "space-${index}".

    ))}
    {wordFromAPI.map((letter, index) => {
      // The second argument maps over the API response for wordFromAPI 
      // creates a new Item for each letter using its corresponding index in correctLetters.

      return (
        <Item key={index}>
          {correctLetters.find(x => x === letter) ? letter : ''}
        </Item>
      )
    })}
  </Wrapper>
)

