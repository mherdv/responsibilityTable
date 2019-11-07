import React, { useEffect, useRef, useState } from 'react';
import classes from './hoverEffect.module.scss';

const HoverEffect = () => {

    // console.time()
    const [styles, setStyles] = useState({})
    const hoverEffectContainer = useRef(null);

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler)
        function scrollHandler() {

            setStyles({ display: 'none' });
        }



        document.body.addEventListener('mouseover', hoverHandler)
        function hoverHandler(event) {

            const target = event.target;
            const inputContainer = target.closest(".checkboxWrapper");

            const styledHeader = document.querySelector('header [data-name][style]');

            if (!inputContainer) {


                setStyles({ display: 'none' })
                if (styledHeader)
                    styledHeader.removeAttribute('style')
                return
            }

            const headerClass = inputContainer.classList[2];

            [...document.querySelectorAll('header [data-name][style]')].forEach(headName => {
                headName.removeAttribute('style')
            })


            const currentUserHeaderName = document.querySelector(`header [data-name="${headerClass}"]`);




            const { top: inputContainerTop, left: inputContainerLeft } = inputContainer.getBoundingClientRect();


            const left = inputContainerLeft + document.body.scrollLeft;
            const top = inputContainerTop + document.body.scrollTop;
            currentUserHeaderName.style.background = '#ededed';
            setStyles({
                width: left + inputContainer.offsetWidth + 'px',
                display: 'block',
                borderBottom: inputContainer.offsetHeight + 'px solid #ededed',
                height: top + inputContainer.offsetHeight + 'px',
                borderRight: inputContainer.offsetWidth + 'px solid #ededed'
            })
        }
    }, [])



    return (
        <div ref={hoverEffectContainer} className={classes.container} style={{ ...styles }} />
        // <span></span>
    );
};

export default HoverEffect;