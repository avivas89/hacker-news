import { useState } from "react"
import TabsElement from "../components/Tabs"
import TabAllNews from '../components/TabAllNews'
import TabMyFaves from '../components/TabMyFaves'
import styled from '@emotion/styled'


const Section = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 0 15px;
  margin: 0 auto;
`



type TabsType = {
  label: string;
  index: number;
  Component: React.FC<{}>;
}[];

const tabs: TabsType = [
  {
    label: 'All',
    index: 1,
    Component: TabAllNews
  },
  {
    label: 'My faves',
    index: 2,
    Component: TabMyFaves
  }
]

const Home = () => {
  const [currentTab, setCurrentTab] = useState<number>(tabs[0].index)

  return (
    <Section>
      <TabsElement currentTab={currentTab} tabs={tabs} onClick={setCurrentTab}/>
    </Section>

  )
}

export default Home
