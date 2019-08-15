import React, { Component } from 'react'
import styled from '@emotion/styled'

const BoxStyle = styled.div`
  margin: 6em auto;
  background: blue;
  color: red;
`

export default class Box extends Component {
  render() {
    return (
      <BoxStyle>
        With some stuff
      </BoxStyle>
    )
  }
}