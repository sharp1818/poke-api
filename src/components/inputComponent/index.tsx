/* eslint-disable no-param-reassign */
import { useState } from 'react';
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import './inputComponent.scss';

interface InputText {
  pokemonName: any;
  fetch: any;
}

function InputComponent({ pokemonName, fetch }: InputText) {
  const [value, setValue] = useState('');
  const clear = () => {
    pokemonName.current = '';
    setValue('');
    fetch();
  };
  const onChange = (e: any) => {
    pokemonName.current = e.target.value;
    setValue(e.target.value);
  };
  const keyPress = (e: any) => {
    if (e.keyCode === 13) {
      fetch();
    }
  };
  return (
    <div className="text-field-container">
      <TextField
        label="Search an Pokemon"
        placeholder="Pokemon Name"
        variant="outlined"
        value={value}
        ref={pokemonName.current.value}
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => keyPress(e)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" onClick={() => fetch()}>
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: pokemonName.current && (
            <InputAdornment position="end" onClick={() => clear()}>
              <ClearIcon />
            </InputAdornment>
          )
        }}
      />
    </div>
  );
}

export default InputComponent;
