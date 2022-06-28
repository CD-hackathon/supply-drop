import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';

function AutoCompleteLocations({ setLocation }) {
    const timeRef = useRef(0);
    const [results, setResults] = useState([]);

    function handleInputChange(event, newInputValue) {
        const now = Date.now();

        if (
            newInputValue &&
            newInputValue.length > 2 &&
            now - timeRef.current > 1000
        ) {
            timeRef.current = now;

            console.log(newInputValue, event);
            axios
                .get(
                    'http://localhost:8000/api/place/search?q=' + newInputValue,
                    {
                        withCredentials: true,
                    }
                )
                .then((res) => {
                    setResults(res.data);
                });
        }

        if (event.type === 'keydown' && event.key === 'Enter' && setLocation) {
            setLocation(newInputValue);
        }
    }

    return (
        <Autocomplete
            options={results}
            onInputChange={handleInputChange}
            renderInput={(params) => (
                <TextField {...params} name="location" label="location" />
            )}
        />
    );
}

export default AutoCompleteLocations;
