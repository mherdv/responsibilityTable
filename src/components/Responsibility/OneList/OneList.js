import React, { useRef, useEffect, useState } from 'react';

import { List } from 'react-virtualized';

import sizes from '../../../constants/sizes'
import OneRow from '../OneRow';
import { descriptionHeightChange } from '../../../store/actions/responsibility/description';
import { removeResponsibilityLine } from '../../../store/actions/responsibility/responsibilityLine';

import { connect } from 'react-redux';




function elementInViewport(el, containerHeight) {

    const elTop = el.getBoundingClientRect().top
    const scrollTop = document.documentElement.scrollTop
    const relativeTop = elTop + scrollTop;


    return (
        (
            relativeTop + containerHeight >= scrollTop &&
            relativeTop - containerHeight <= scrollTop
        )
        || (elTop >= 0 && elTop <= window.innerHeight));

}




let lastScrollTop = 0;
let direction = 1
// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
window.addEventListener("scroll", function () { // or window.addEventListener("scroll"....
    let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > lastScrollTop) {
        // downscroll code
        direction = 1
    } else {
        // upscroll code
        direction = 0
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
});




const OneList = ({
    responsibilities,
    containerIndex,
    openAllDescriptions,
    typeIndex,
    containerHeight,
    counter

}) => {
    const list = useRef(null);
    const scrollContainer = useRef(null);
    const [containerLoad, setContainerLoad] = useState(false);


    useEffect(() => {
        setContainerLoad(true);



        const updateList = () => {

            // todo think about this condition removing 
            if (elementInViewport(scrollContainer.current, containerHeight)) {
                list.current.forceUpdateGrid()
            }
        };




        document.addEventListener('scroll', updateList);

        return () => {
            document.removeEventListener('scroll', updateList);




            setTimeout(() => {

                document.dispatchEvent(new Event('scroll'))
            })

        }
    }, [])

    return (
        <>
            <div ref={scrollContainer} style={{ marginLeft: '87px' }}>
                {containerLoad ? <List

                    autoHeight
                    height={containerHeight}
                    ref={list}

                    rowCount={responsibilities.length}

                    rowHeight={({ index }) => {
                        if (responsibilities[index].removed) {
                            return 0;
                        }
                        return responsibilities[index].height || sizes.rowHeight; //row height

                    }}

                    rowRenderer={
                        (props) => {
                            const containerTop = scrollContainer.current.getBoundingClientRect().top;
                            const elementTop = containerTop + props.style.top;

                            if (direction === 0) {
                                // up

                                if (elementTop < -(sizes.owerscreenLargPixels) || elementTop > window.innerHeight + sizes.owerscreenLowPixels) return;


                            } else {
                                // down
                                if (elementTop < (sizes.owerscreenLowPixels) || elementTop > window.innerHeight + sizes.owerscreenLargPixels) return;
                            }

                            if (!responsibilities[props.index]) return false;

                            const { users, description, id, removed, name } = responsibilities[props.index];

                            return (
                                props.style.height !== 0 ?
                                    <div
                                        className={'rowContainer'}
                                        style={{
                                            ...props.style
                                        }}
                                        key={props.key} >


                                        <OneRow
                                            description={description}
                                            name={name}
                                            key={`${id}__checkboxContainer`}
                                            usersLength={Object.keys(users).length}
                                            users={users}
                                            rowIndex={props.index}
                                            containerIndex={containerIndex}
                                            removed={removed}
                                            openAllDescriptions={openAllDescriptions}
                                            onInput={() => { }}
                                            typeIndex={typeIndex}
                                            rowHeightChange={(event) => {

                                                const currentTarget = event.currentTarget;
                                                const parentRow = currentTarget.closest('.rowContainer');
                                                const parentContainer = parentRow.querySelector('div');

                                                const parentRowHeight = parentRow.offsetHeight;
                                                const parentContainerHeight = parentContainer.offsetHeight;

                                                if (parentRowHeight !== parentContainerHeight) {


                                                    descriptionHeightChange({ containerIndex, rowIndex: props.index, height: parentContainerHeight, typeIndex });
                                                    const rowIndex = props.index > 0 ? props.index - 1 : 0;
                                                    list.current.recomputeRowHeights(rowIndex);

                                                }
                                            }}

                                            removeLine={() => {

                                                removeResponsibilityLine({ containerIndex, rowIndex: props.index, rowId: id, typeIndex });
                                                const rowIndex = props.index > 0 ? props.index - 1 : 0;
                                                list.current.recomputeRowHeights(rowIndex);
                                            }}
                                        />


                                    </div>
                                    : <div style={props.style} key={props.key} />
                            )

                        }
                    }
                    // overscanRowCount={12}

                    // todo change this solution 
                    width={document.querySelector('header').offsetWidth + 300}
                /> : null}
            </div>

        </>)
};

function mapStateToProps(state) {

    let counter = 0;

    state.responsibility.responsibilityArray.forEach(resp => {
        if (resp.show && !resp.removed) counter++
    })
    return {
        counter
    }
}
export default connect(mapStateToProps)(OneList);