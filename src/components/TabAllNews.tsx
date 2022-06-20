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
  const [/*isFetching*/, setIsFetching] = useInfiniteScroll(moreData);
  const [filterNews, setFilterNews] = useState(localStorage.getItem('filterSelectNew') ? localStorage.getItem('filterSelectNew') : "")
  const [favorite, setFavorite] = useState<any>(localStorage.getItem('favoritePost') ? JSON.parse(localStorage.getItem('favoritePost') || "") : [])

  useEffect(() => {
    if (localStorage.getItem(`newsData-${filterNews}`)) {
      setData(JSON.parse(localStorage.getItem(`newsData-${filterNews}`) || ''))
    } else {
      loadData()
    }
  }, [filterNews])

  const framework = (selectValue: string) => {
    setFilterNews(selectValue)
    localStorage.setItem("filterSelectNew", selectValue)
  }

  const loadData = () => {
    (async () => {
      try {
        const response = await newsApi(`query=${filterNews}&page=0`)
        setData(response.hits)
        localStorage.setItem(`newsData-${filterNews}`, JSON.stringify(response.hits))
      } catch (error) {
        console.log(error)
      }
    })()
  }

  function moreData () {
    (async () => {
      try {
        const res = await newsApi(`query=${filterNews}&page=${page}`)
        setData([...data, ...res.hits])
        setPage(page + 1)
        setIsFetching(false)
      } catch (error) {
        console.log(error)
      }
    })()
  }


  const handleFavorite = (postId:any) => {
    const itemPost = data.find((post:any) => post.created_at_i === postId)
    const favoriteIdx =  favorite.findIndex(((obj:any) => obj.created_at_i === postId))
    if (favoriteIdx > -1) {
      favorite[favoriteIdx].favorite = !favorite[favoriteIdx].favorite
      localStorage.setItem('favoritePost', JSON.stringify(favorite))
    } else {
      itemPost.favorite = true
      setFavorite([...favorite, itemPost])
      localStorage.setItem('favoritePost', JSON.stringify([...favorite, itemPost]))
    }
    loadData()
  }

  const isFavorite = (id:any) => {
    const itemPost = favorite.find((post:any) => post.created_at_i === id)
    let item2
    if (itemPost) {
      item2 = itemPost.favorite
    } else {
      item2 = false
    }
    return item2
  }



  return (
    <>
      {!data ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* <select
            value={filterNews ? filterNews : ''}
            onChange={e => framework(e.target.value)}
          >
            <option value="">Select your news</option>
            <option value="angular">Angular</option>
            <option value="reactjs">Reactjs</option>
            <option value="vuejs">Vuejs</option>
          </select> */}

          <FilterNews
            filterNews={filterNews ? filterNews : ''}
            setFilterNews={framework}
          />

          <List>
            {
              data?.map((d: any, i: number) => (
                (d.story_title !== null && d.story_url !== null && d.created_at !== null) &&
                <Card
                  key={i}
                  title={d.story_title}
                  url={d.story_url}
                  created_at={d.created_at}
                  favorite={isFavorite(d.created_at_i)}
                  click={() => handleFavorite(d.created_at_i)}
                />
              ))
            }
          </List>
        </>
      )}
    </>
  )
}

export default TabAllNews
