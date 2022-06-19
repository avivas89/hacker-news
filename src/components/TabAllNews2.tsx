import {useState, useEffect, FC} from 'react'
import {newsApi} from "../services/newsApi"
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
  const [filterNews, setFilterNews] = useState(
    localStorage.getItem('filterSelectNew') ? localStorage.getItem('filterSelectNew') : '')
  const [filteredNews, setFilteredNews] = useState<any>([])

  // useEffect(() => {
  //     const newsLS = localStorage.getItem('newsData') ? JSON.parse(localStorage.getItem('newsData') || '{}') : [];
  //     setFilteredNews(newsLS)
  // }, [])

  useEffect(() => {
    (async () => {
      if (localStorage.getItem('newsData')) {
        setData(JSON.parse(localStorage.getItem('newsData') || '' ))
      } else {
        loadData()
      }
    })()
  }, [])


  const loadData = () => {
    (async () => {
      try {
        const response = await newsApi(`query=${filterNews}&page=${page}`)
        setData(response.hits)
        localStorage.setItem('newsData', JSON.stringify(response.hits) )
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





  // useEffect(()=>{
  //   loadData()
  //   setPage(1)
  //   // localStorage.setItem('filterSelectNew', filterNews ? filterNews : '' )
  //   // localStorage.setItem('newsData', JSON.stringify(data))
  // }, [filterNews])





  if(!data) {
    return <div>Loading...</div>
  }
  return (
    <>
      <select
        value={filterNews ? filterNews : ''}
        onChange={e => setFilterNews(e.target.value) }
      >
        <option value="">Select your news</option>
        <option value="angular">Angular</option>
        <option value="reactjs">Reactjs</option>
        <option value="vuejs">Vuejs</option>
      </select>

      <List>
      {
        (filteredNews.length > 0) ? (
          filteredNews?.map((d:any, i:number) => (
            (d.story_title !== null && d.story_url !== null && d.created_at !== null) &&
            <Card
              key= {i}
              title={d.story_title}
              url={d.story_url}
              created_at={d.created_at}
            />
          ))
        ) : (
          data?.map((d:any, i:number) => (
            (d.story_title !== null && d.story_url !== null && d.created_at !== null) &&
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
