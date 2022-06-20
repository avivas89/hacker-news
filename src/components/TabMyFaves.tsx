import{useState, useEffect, FC} from 'react'
import Card from './Card'
import styled from '@emotion/styled'

const List = styled.ul`
  padding-left: 0;
  margin-top: 45px;

  @media (min-width:768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 1fr;
    gap: 15px 50px;
  }
`

const TabMyFaves: FC<{}> = () => {
  const [listFavorite, setListFavorite] = useState<any>([])

  const loadFavorites = () => {
    const listNewsLS = localStorage.getItem('favoritePost') ? JSON.parse(localStorage.getItem('favoritePost') || "") : []
    const filterFavoriteNews = listNewsLS.filter((i:any) => i.favorite ===  true)
    setListFavorite(filterFavoriteNews)
  }

  useEffect(() => {
   loadFavorites()
  }, [])

  const handleFavorite = (idFavorite:any) => {
    const updatePost = listFavorite.filter((post:any) => post.created_at_i !== idFavorite)
    setListFavorite(updatePost)
    localStorage.setItem('favoritePost', JSON.stringify(updatePost))
  }

  return (
    <List>
      {
        listFavorite?.map((d:any, i:number) => (
          (d.story_title !== null && d.story_url !== null && d.created_at !== null) &&
          <Card
            key={i}
            title={d.story_title}
            url={d.story_url}
            created_at={d.created_at}
            favorite={d.favorite}
            click={() => handleFavorite(d.created_at_i)}
          />
        ))
      }
    </List>
  )
}

export default TabMyFaves
