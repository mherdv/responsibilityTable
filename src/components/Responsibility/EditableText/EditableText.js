import React, { memo, useState, useEffect, useRef } from 'react';
import classes from './editableText.module.scss';

import ContentEditable from "react-contenteditable";


function blockDocumentMouseDown(event) {
    event.stopImmediatePropagation()
}

const EditableText = memo(({ text, className, onInput, onBlur, rowHeightChange, openAllDescriptions, placeholder }) => {


    const [focused, setFocused] = useState(false);
    const textArea = useRef(null);


    useEffect(() => {

        rowHeightChange && textArea.current &&
            rowHeightChange({ currentTarget: textArea.current.el.current });
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        rowHeightChange && textArea.current &&
            rowHeightChange({ currentTarget: textArea.current.el.current });

        // eslint-disable-next-line
    }, [focused, openAllDescriptions])

    function onKeyDown(event) {
        if (event.keyCode === 13) {
            event.preventDefault()
        }
    }

    return (
        <ContentEditable
            ref={textArea}
            className={((focused ? classes.focused + ' ' : '') + className + ' ' || '') + classes.container}
            contentEditable="true"
            html={text}
            onKeyDown={onKeyDown}
            onFocus={() => {

                document.documentElement.addEventListener('click', blockDocumentMouseDown)
                setFocused(true)

            }}

            placeholder={placeholder || ''}
            onChange={(event) => {
                onInput && onInput(event)
                rowHeightChange && rowHeightChange(event)
            }}
            onBlur={(event) => {

                setFocused(false);
                onBlur && onBlur(event);
                rowHeightChange && rowHeightChange(event);
                setTimeout(()=>{

                    document.documentElement.removeEventListener('click', blockDocumentMouseDown)
                },100)
            }}
            onMouseEnter={(event) => {
                rowHeightChange && rowHeightChange(event)
            }}
            onMouseLeave={(event) => {
                rowHeightChange && rowHeightChange(event)
            }}
        />
    );
}, (next, prev) => {
    if (next.openAllDescriptions !== prev.openAllDescriptions) return false
    return !(next.text !== prev.text)
});

export default EditableText;