import { useState } from 'react';
import Select from 'react-select';
import Angular from '../images/icon-angular.png'
import React from '../images/icon-react.png'
import Vue from '../images/icon-vuejs.png'
import styled from '@emotion/styled'
import { isFocusable } from '@testing-library/user-event/dist/utils';

const options = [
  { value: '', label: 'Select your news', image: ''},
  { value: 'angular', label: 'Angular', image: `${Angular}`},
  { value: 'reactjs', label: 'Reactjs', image: `${React}` },
  { value: 'vuejs', label: 'Vuejs', image: `${Vue}`},
];

const Flex = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  text-transform: capitalize;
`

const FilterNews = ({filterNews, setFilterNews}:any) => {
  let imagePlace
  if(filterNews === 'angular') {
    imagePlace = <Flex><img src={Angular} width='18'/> {filterNews}</Flex>
  } else if(filterNews === 'reactjs') {
    imagePlace = <Flex><img src={React} width='18'/>  {filterNews}</Flex>
  } else {
    imagePlace = <Flex><img src={Vue} width='18'/>  {filterNews}</Flex>
  }

  return (
    <div>
      <Select
        placeholder={filterNews ? imagePlace : 'Select your news'}
        defaultValue={filterNews}
        //value={}
        options={options}
        onChange={e => setFilterNews(e.value)}
        formatOptionLabel={({label, image}:any) => (
          <Flex>
            {(image != '') && <img src={image} alt={label} width='18'/>}
            <span>{label}</span>
          </Flex>
        )}
        closeMenuOnSelect={false}
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
