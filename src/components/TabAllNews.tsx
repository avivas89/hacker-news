import {useState, useEffect, FC} from 'react'
import newsApi from "../services/newsApi"
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import Card from './Card'

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
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useInfiniteScroll(moreData);
  const [filterNews, setFilterNews] = useState('')


  const loadData = () => {
    let url = `${process.env.REACT_APP_API}?query=${filterNews}&page=0`;
    (async () => {
      try {
        const res = await fetch(url)
        const response = await res.json()
        setData(response.hits)
      } catch (error) {

      }
    })()
  }

  function moreData() {
    let url = `${process.env.REACT_APP_API}?query=${filterNews}&page=${page}`;
    (async () => {
      try {
        const res = await fetch(url)
        const response = await res.json()
        setData([...data, ...response.hits])
        setPage(page+1)
        setIsFetching(false)
      } catch (error) {
        console.log(error)
      }

      /* try {
        if (isFetching) {
          setPage(page+1)
          const res = await fetch(url)
          const response = await res.json()
          setData([...data, ...response.hits])
        } else {
          const res = await fetch(url)
          const response = await res.json()
          setData(response.hits)

        }
        setIsFetching(false)
      } catch (error) {
        console.log(error)
      } */
    })()
  }



  /*useEffect(() => {
    (async () => {
      const getData = await newsApi()
      setData(getData)

    })()
  }, [])*/

  useEffect(()=>{
    loadData()
    setPage(1)
  }, [filterNews])





  if(data.length===0) {
    return <div>Loading...</div>
  }
  return (
    <>
      <select
        value={filterNews}
        onChange={e => setFilterNews(e.target.value) }
      >
        <option value="">Select your news</option>
        <option value="angular">Angular</option>
        <option value="reactjs">Reactjs</option>
        <option value="vuejs">Vuejs</option>
      </select>

      <List>
      {
          data?.map((d:any, i:number) => (
          (d.story_title !== null && d.story_url !== null && d.created_at !== null) &&
          <Card
            key= {i}
            title={d.story_title}
            url={d.story_url}
            created_at={d.created_at}
          />
        ))

      }
    </List>
    </>

  )
}

export default TabAllNews
