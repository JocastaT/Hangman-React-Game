import React from 'react'
import { Wrapper, List, ListItem, Title } from './styled'

export default ({ failedLetters }) => (
  // The code is a function that takes an array of strings as input 
  //returns the same array with all letters replaced by their corresponding failed letter.
  <Wrapper>
    <Title>WRONG LETTERS:</Title>
    <List>
      {failedLetters.map(item => (
        // The code is using map to replace each item in the list with its corresponding failed letter.
        //renders as wrong letter 1-10
        <ListItem key={item}>{item}</ListItem>
      ))}
    </List>
  </Wrapper>
)


