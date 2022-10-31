import React, { useMemo, useState, useEffect, useCallback } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Select from "@mui/material/Select";
import Rating from '@mui/material/Rating';
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";

import { CATEGORIES_VALUES } from '../../constants/categories';
import { MoviesList } from '../../components/MoviesList';
import { data, starsOptions, categoriesOptions } from './assets';
import './App.css';


const App = () => {
  const autocompleteOptions = useMemo(() => data.map(({ title }) => ({ label: title })), []);
  
  const [searchValue, setSearchValue] = useState('');
  const [ratings, setRatings] = useState([0]);
  const [genre, setGenre] = useState([CATEGORIES_VALUES.any]);
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    const conVertedSearchValue = searchValue.toLowerCase(); 
    const newData = data.filter(({ title, rating, data }) => {
      const convertedTitle = title.toLowerCase();
      const isTextIncluded = conVertedSearchValue
        ? convertedTitle.includes(conVertedSearchValue)
        : true;
      const isGenreIncluded = genre.includes(CATEGORIES_VALUES.any) || genre.includes(data);
      const isRatingIncluded = ratings.includes(0) || ratings.includes(Math.floor(rating));

      return isTextIncluded && isGenreIncluded && isRatingIncluded;
    })
    setFilteredData(newData);
  }, [searchValue, ratings, genre])

  const onSearchChange = useCallback((e) => {
    const { value, outerText } = e.target;

    if (e.type === 'change') {
      setSearchValue(value);
    }

    if (e.type === 'click') {
      setSearchValue(outerText || '');
    }
  }, [])

  const onRatingChange = useCallback((e) => {
    const { value } = e.target;

    if (!value.length) {
      setRatings([0]);
      return;
    }

    if (value.length === 2 && value.includes(0)) {
      setRatings([value[1]]);
      return;
    }

    if (value.length > 2 && value.includes(0)) {
      setRatings([0]);
      return;
    }

    setRatings(value);
  }, []);

  const onGenreChange = useCallback((e) => {
    const { value } = e.target;

    if (!value.length) {
      setGenre([CATEGORIES_VALUES.any]);
      return;
    }

    if (value.length === 2 && value.includes(CATEGORIES_VALUES.any)) {
      setGenre([value[1]]);
      return;
    }

    if (value.length > 2 && value.includes(CATEGORIES_VALUES.any)) {
      setGenre([CATEGORIES_VALUES.any]);
      return;
    }

    setGenre(value);
  }, [])

  return (
    <div className="App">
      <div>
        <Autocomplete
          disablePortal
          freeSolo
          
          inputValue={searchValue}
          options={autocompleteOptions}
          renderInput={(params) => <TextField {...params} />}
          onInputChange	={onSearchChange}
        />
        <MoviesList moviesList={filteredData}/>
      </div>
      <div className="selectors">
        <Select
          multiple
          value={ratings}
          onChange={onRatingChange}
          displayEmpty
          renderValue={() => "Ratings"}
        >
          {starsOptions.map((value) => (
            <MenuItem key={value} value={value}>
              <Checkbox checked={ratings.indexOf(value) > -1} />
              {value ? <Rating readOnly value={value} max={10} /> : <div>Any</div>}
            </MenuItem>
          ))}
        </Select>
        <Select
          multiple
          value={genre}
          onChange={onGenreChange}
          displayEmpty
          renderValue={() => "Genre"}
        >
          {categoriesOptions.map(({value, title}) => (
            <MenuItem key={value} value={value}>
              <Checkbox checked={genre.indexOf(value) > -1} />
              <span>{title}</span>
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
}

export default App;
