import React, { useState } from 'react';

import Autosuggest from 'react-autosuggest';

const filterSuggestions = ({ suggestions, value }) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : suggestions.filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
}

const findEquivalent = ({ suggestions, value }) => {

}

const CustomizedAutosuggest = ({ suggestions }) => {

    const [value, setValue] = useState('');

    const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);

    const [selected, setSelected] = useState({});


    return <Autosuggest
        suggestions={filteredSuggestions}
        onSuggestionsFetchRequested={(e) => {
            setFilteredSuggestions(filterSuggestions({ suggestions, value }))
            // return filterSuggestions()
        }}
        onSuggestionsClearRequested={(e) => {
            // setValue(e)
        }}
        getSuggestionValue={(e) => {

            console.log(e)
            setSelected(e)
            setValue(e.name)

        }}
        renderSuggestion={(suggestions) => {

            return <span>{suggestions.name}</span>
        }}

        inputProps={{
            value,
            onChange: (e, props) => {
                if (props.newValue === undefined) return;

                setValue(props.newValue);


                // if has equivalent select id else clear selected and add clear value

                findEquivalent({ suggestions, value })
                // console.log(filterSuggestions({ suggestions, value }))
            }
        }}

    />
}
export default CustomizedAutosuggest