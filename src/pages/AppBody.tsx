import React from 'react'
import styled from 'styled-components'
import { Card } from '@pancakeswap-libs/uikit'

export const BodyWrapper = styled(Card)`
  position: relative;
  max-width: 436px;
  width: 100%;
  z-index: 5;
  background:transparent;
  border:1px solid white;
`
export const BodyBG = styled(Card)`
  position: absolute;
  width: 100%;
  height:100%;
  
  background:rgba(0,0,0,.5);
  backdrop-filter:blur(20px);
`


/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <>
  
  <BodyWrapper><BodyBG />{children}</BodyWrapper>
  </>
}
