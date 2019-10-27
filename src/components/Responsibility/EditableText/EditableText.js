import React, { memo, useState, useEffect, useRef } from 'react';
import classes from './editableText.module.scss';

import ContentEditable from "react-contenteditable";

const EditableText = memo(({ text, className, onInput, onBlur, rowHeightChange }) => {

    // on height change dispatch to change parent height 


    // todo on blur height change dispatch

    const [focused, setFocused] = useState(false);

    const textArea = useRef(null)

    useEffect(() => {

        rowHeightChange && textArea.current &&
            rowHeightChange({ currentTarget: textArea.current.el.current });
    }, [])

    useEffect(() => {
        rowHeightChange && textArea.current &&
            rowHeightChange({ currentTarget: textArea.current.el.current });
    }, [
        focused
    ])
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
            onFocus={() => setFocused(true)}
            onChange={(event) => {
                onInput && onInput(event)


                rowHeightChange && rowHeightChange(event)
            }}
            onBlur={(event) => {
                setFocused(false);

                console.log('mouseBlur', rowHeightChange)

                // const { currentTarget } = event;

                onBlur && onBlur(event);

                // todo change this logic


            }}
            onMouseEnter={(event) => {
                console.log('mouseEnter')
                rowHeightChange && rowHeightChange(event)
            }}
            onMouseLeave={(event) => {

                console.log('mouseLeave')
                rowHeightChange && rowHeightChange(event)
            }}
        />
    );
}, (next, prev) => {
    return !(next.text !== prev.text)
});

export default EditableText;