import Select from 'react-select';
import { formatOptionLabel, FilterNewsTypes } from '../types/Types';

import Angular from '../images/icon-angular.png'
import React from '../images/icon-react.png'
import Vue from '../images/icon-vuejs.png'
import styled from '@emotion/styled'

const options:any = [
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
const FilterNews = ({filterNews, setFilterNews}:FilterNewsTypes) => {
  const category = options.find((o:any) => o.value === filterNews)
  let labelCategory = <Flex><img src={category.image} width='18' alt={category.label}/>{category.label}</Flex>

  return (
    <div>
      <Select
        placeholder={filterNews ? labelCategory : 'Select your news'}
        defaultValue={filterNews}
        options={options}
        onChange={(e:any) => setFilterNews(e.value)}
        formatOptionLabel={({label, image}:formatOptionLabel) => (
          <Flex>
            {(image !== '') && <img src={image} alt={label} width='18'/>}
            {label}
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
