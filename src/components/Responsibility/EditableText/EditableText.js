import React, { memo, useState } from 'react';
import classes from './editableText.module.scss';

import ContentEditable from "react-contenteditable";

const EditableText = memo(({ text, className, onInput, onBlur }) => {

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
            onInput={onInput || null}
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