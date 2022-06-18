import { useState } from 'react';
import Select from 'react-select';

import Angular from '../images/icon-angular.png'
import React from '../images/icon-react.png'
import Vue from '../images/icon-vuejs.png'

const options = [
  { value: 'angular', label: 'Angular', image: `${Angular}`},
  { value: 'reactjs', label: 'Reactjs', image: `${React}` },
  { value: 'vuejs', label: 'Vuejs', image: `${Vue}`},
];


type filterTypes = {
  filterNews: string
}

const FilterNews = ({filterNews}: filterTypes) => {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div>
      <Select
        defaultValue={selectedOption}
        options={options}
        formatOptionLabel={({label, value, image}:any) => (
          <div>
            <img src={image} alt={label} width='15'/>
            <span>{label}</span>
          </div>
        )}
      />
    </div>
  )
}

export default FilterNews
