import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCountryByName } from '../actions';
import s from '../styles/SearchBar.module.css';



export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchResults() {
      const response = await getCountryByName(name);
      setResults(response.data);
    }

    if (name.length > 0) {
      fetchResults();
    } else {
      setResults([]);
    }
  }, [name]);


    function handleInput(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getCountryByName(name));
        setName("");
    }

    
    return (
        <div className={s.divVI}>
            <input className={s.inpI}
                type="text"
                placeholder="Search country..."
                value={name}
                onChange={(e) => handleInput(e)}
            />
            <button className={s.btnV} type="submit" onClick={(e) => handleSubmit(e)}>Search country</button>
        </div>

    )
}
