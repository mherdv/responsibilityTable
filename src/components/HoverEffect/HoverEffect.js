import React, { useEffect, useRef, useState } from 'react';
import classes from './hoverEffect.module.scss';

const HoverEffect = () => {

    // console.time()
    const [styles, setStyles] = useState({})
    const hoverEffectContainer = useRef(null);

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler)
        console.log(1)
        function scrollHandler() {

            setStyles({ display: 'none' });
        }
    }, [])


    document.body.addEventListener('mouseover', hoverHandler)
    function hoverHandler(event) {

        const target = event.target;
        const inputContainer = target.closest(".checkboxWrapper")
        if (!inputContainer) {
            setStyles({ display: 'none' })
            document.body.removeEventListener('mouseover', hoverHandler)
            return
        }
        const { top: inputContainerTop, left: inputContainerLeft } = inputContainer.getBoundingClientRect();


        const left = inputContainerLeft + document.body.scrollLeft;
        const top = inputContainerTop + document.body.scrollTop;

        setStyles({
            width: left + inputContainer.offsetWidth + 'px',
            // top: top + 'px',
            borderBottom: inputContainer.offsetHeight + 'px solid  rgb(121, 193, 218)',
            height: top + inputContainer.offsetHeight + 'px',
            borderRight: inputContainer.offsetWidth + 'px solid rgb(121, 193, 218)'
        })
        document.body.removeEventListener('mouseover', hoverHandler);
    }
    return (
        <div ref={hoverEffectContainer} className={classes.container} style={{ ...styles }} />
        // <span></span>
    );
};

export default HoverEffect;