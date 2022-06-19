import styled from '@emotion/styled'
import logo from '../images/hacker-news.png'
import { ReactNode } from "react";

const Header = styled.div`
  margin: 0 0 40px;
  padding: 25px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.12);
  background-image: linear-gradient(to bottom, #ececec -32%, #fff 124%);
  @media (min-width: 1200px) {
    padding: 44px 150px 42px 150px;
    margin: 0 0 70px;
  }
`
const Image = styled.img`
  max-width: 300px;
  width: 50%;
  margin: 20px 0 0;
  display: block;
`
const Main = styled.div`
  padding: 0 0 98px;
`

const Layout = ({children}:{children: ReactNode}) => {
  return (
    <Main>
      <Header>
        <Image
          src={logo}
          alt="Hacker News"
        />
      </Header>
      <div>
        {children}
      </div>
    </Main>

  )
}

export default Layout
