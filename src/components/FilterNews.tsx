import Select from 'react-select';
import Angular from '../images/icon-angular.png'
import React from '../images/icon-react.png'
import Vue from '../images/icon-vuejs.png'
import styled from '@emotion/styled'

const optionsSelect:any = [
  { value: '', label: 'Select your news', image: ''},
  { value: 'angular', label: 'Angular', image: `${Angular}`},
  { value: 'reactjs', label: 'Reactjs', image: `${React}` },
  { value: 'vuejs', label: 'Vuejs', image: `${Vue}`},
];

const Flex = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`

const FilterNews = ({filterNews, setFilterNews}:any) => {
  let imagePlace
  if(filterNews === optionsSelect.value) {
    imagePlace = <Flex><img src={optionsSelect.image} width='18' alt={optionsSelect.label}/> <span>{optionsSelect.label}</span></Flex>
  }

  return (
    <div>
      <Select
        placeholder={filterNews ? imagePlace : 'Select your news'}
        defaultValue={filterNews}
        options={optionsSelect}
        onChange={e => setFilterNews(e.value)}
        formatOptionLabel={({label, image}:any) => (
          <Flex>
            {(image !== '') && <img src={image} alt={label} width='18'/>}
            <span>{label}</span>
          </Flex>
        )}
        styles={{
          control: (provided, state) => ({
            ...provided,
            maxWidth: 300,
            borderColor: '#2e2e2e',
            margin: '40px 0'
          }),
          menu: (provided, state) => ({
            ...provided,
            width: 300
          }),
          indicatorSeparator: (provided, state) => ({
            ...provided,
            display: 'none'
          }),
          option: (provided, state) => ({
            ...provided,
            padding: '15px 10px',
            backgroundColor: state.isFocused || state.isSelected ? '#eaeaea33' : '#fff',
            color: '#343434'
          }),
        }}
      />
    </div>
  )
}

export default FilterNews
