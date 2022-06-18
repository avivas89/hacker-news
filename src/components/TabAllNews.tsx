import {useState, useEffect, FC} from 'react'
import newsApi from "../services/newsApi"
import Card from './Card'
import { generateId } from '../helpers'

import styled from '@emotion/styled'

const List = styled.ul`
  padding-left: 0;

  @media (min-width:768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 1fr;
    gap: 40px 60px;
  }
`



const TabAllNews: FC<{}> = () => {
  const [data, setData] = useState<any>([])

  useEffect(() => {
    (async () => {
      const getData = await newsApi()
      setData(getData.hits)

    })()
  }, [])


  if(!data) {
    return <div>Loading...</div>
  }
  return (
    <List>
      {

        data?.map((d:any) => (
        (d.story_title !== null && d.story_url !== null && d.created_at !== null) &&
        <Card
          key= {generateId()}
          title={d.story_title}
          url={d.story_url}
          created_at={d.created_at}
        />
      ))
      }
    </List>
  )
}

export default TabAllNews
