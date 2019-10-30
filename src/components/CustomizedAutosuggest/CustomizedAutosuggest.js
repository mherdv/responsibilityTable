import React, { useState } from 'react';

import Autosuggest from 'react-autosuggest';

const filterSuggestions = ({ suggestions, value }) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : suggestions.filter(lang =>
        lang.name.toLowerCase().search(inputValue) !== -1
    );
}

const findEquivalent = ({ suggestions, value }) => {
    return suggestions.find(suggestion => {
        return suggestion.name.toLowerCase().trim() === value.toLowerCase().trim()
    })
}

const CustomizedAutosuggest = ({ suggestions, setSelected }) => {

    const [value, setValue] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);

    setSelected && setSelected(findEquivalent({ suggestions, value: value }) || value);

    return <Autosuggest
        suggestions={filteredSuggestions}
        onSuggestionsFetchRequested={(e) => {

            setFilteredSuggestions(
                filterSuggestions({ suggestions, value })
            );

        }}
        onSuggestionsClearRequested={(e) => { }}
        getSuggestionValue={(e) => {

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
            },
            placeholder: "select responsibility Type"
        }}

    />
}
export default CustomizedAutosuggest