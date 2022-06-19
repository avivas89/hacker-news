import {useState, useEffect, FC} from 'react'
import {newsApi} from "../services/newsApi"
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import Card from './Card'

import styled from '@emotion/styled'
import FilterNews from './FilterNews'


const List = styled.ul`
  padding-left: 0;

  @media (min-width:768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 1fr;
    gap: 15px 50px;
  }
`

const TabAllNews: FC<{}> = () => {
  const [data, setData] = useState<any>([])
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useInfiniteScroll(moreData);
  const [filterNews, setFilterNews] = useState(
    localStorage.getItem('filterSelectNew') ? localStorage.getItem('filterSelectNew') : '')
  const [filteredNews, setFilteredNews] = useState<any>([])

  useEffect(() => {
      const newsLS = localStorage.getItem('newsData') ? JSON.parse(localStorage.getItem('newsData') || '{}') : [];
      setFilteredNews(newsLS)
  }, [])

  const loadData = () => {
    (async () => {
      try {

        const res = await newsApi(`query=${filterNews}&page=0`)
        setData(res.hits)

      } catch (error) {
        console.log(error)
      }
    })()
  }

  function moreData() {
     (async () => {
      try {
        const res = await newsApi(`query=${filterNews}&page=${page}`)
        setData([...data, ...res.hits])
        setPage(page+1)
        setIsFetching(false)
      } catch (error) {
        console.log(error)
      }
    })()
  }


  useEffect(()=>{
    loadData()
    setPage(1)
    localStorage.setItem('filterSelectNew', filterNews ? filterNews : '' )
    localStorage.setItem('newsData', JSON.stringify(data))
  }, [filterNews])





  if(!data) {
    return <div>Loading...</div>
  }
  return (
    <>
      {/* <select
        value={filterNews ? filterNews : ''}
        onChange={e => setFilterNews(e.target.value) }
      >
        <option value="">Select your news</option>
        <option value="angular">Angular</option>
        <option value="reactjs">Reactjs</option>
        <option value="vuejs">Vuejs</option>
      </select> */}

      <FilterNews
        filterNews={filterNews ? filterNews : ''}
        setFilterNews={setFilterNews}
      />

      <List>
      {
        (filteredNews.length > 0) ? (
          filteredNews.map((d:any, i:number) => (
            (d.story_title !== null && d.story_url !== null && d.created_at !== null && d.author !== null) &&
            <Card
              key= {i}
              title={d.story_title}
              url={d.story_url}
              created_at={d.created_at}
            />
          ))
        ) : (
          data?.map((d:any, i:number) => (
            (d.story_title !== null && d.story_url !== null && d.created_at !== null && d.author !== null) &&
            <Card
              key= {i}
              title={d.story_title}
              url={d.story_url}
              created_at={d.created_at}
            />
          ))
        )
      }
    </List>
    </>

  )
}

export default TabAllNews
