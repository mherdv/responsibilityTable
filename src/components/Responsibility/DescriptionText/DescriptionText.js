import React, { memo, useState } from 'react';
import classes from './discriptionText.module.scss'

const DescriptionText = memo(({ text, className, onInput }) => {
    const [focused, setFocused] = useState(false);
    function onKeyDown(event) {
        if (event.keyCode === 13) {
            event.preventDefault()
        }
    }
    return (
        <p className={focused ? classes.focused : '' + className || ''}
            contenteditable="true"
            onInput={onInput}
            onKeyDown={onKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
        >
            {text}
        </p >
    );
}, (next, prev) => {
    return !(next.text !== prev.text)
});

export default DescriptionText;