import styled from 'styled-components'

const Container = styled.div`
  
  left:0;
  position:relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height:100%;
  width: 100%;
  
  min-height:100vh;
  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.lg} {

    height: 100% ;
  }
`

export default Container
