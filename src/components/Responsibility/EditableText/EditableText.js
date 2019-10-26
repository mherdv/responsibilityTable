import React, { memo, useState } from 'react';
import classes from './editableText.module.scss';

import ContentEditable from "react-contenteditable";

const EditableText = memo(({ text, className, onInput, onBlur }) => {


    // on height change dispatch to change parent height 
    const [focused, setFocused] = useState(false);
    function onKeyDown(event) {
        if (event.keyCode === 13) {
            event.preventDefault()
        }
    }
    return (
        <ContentEditable className={((focused ? classes.focused + ' ' : '') + className + ' ' || '') + classes.container}
            contentEditable="true"
            html={text}
            onKeyDown={onKeyDown}
            onFocus={() => setFocused(true)}
            onChange={(event) => {
                onInput(event)
            }}
            onBlur={(event) => {
                onBlur && onBlur(event);
                setFocused(false);
            }}
        />
    );
}, (next, prev) => {
    return !(next.text !== prev.text)
});

export default EditableText;