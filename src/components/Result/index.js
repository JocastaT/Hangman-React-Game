import React from 'react'
import { Wrapper, Content, Title, Button } from './styled'

export default ({ buttonAction, disabled, title, buttonLabel }) => (
  //The code is a wrapper that has the disabled attribute set to true.
  //This makes sense because we want users to be able to click on the button without any issues or errors occurring when they do so.
  <Wrapper disabled={disabled}> 
    <Content>
      <Title> {title}</Title>
      <Button onClick={buttonAction}>{buttonLabel}</Button>
    </Content>
  </Wrapper>
  //These are both children of our Content element, meaning they're nested within each other
)
