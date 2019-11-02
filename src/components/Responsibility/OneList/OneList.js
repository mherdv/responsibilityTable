import React, { useRef, useEffect, useState } from 'react';

import { List, WindowScroller } from 'react-virtualized';
import OneRow from '../OneRow';
import { descriptionHeightChange } from '../../../store/actions/responsibility/description';
import { removeResponsibilityLine } from '../../../store/actions/responsibility/responsibilityLine';


// window.addEventListener('scroll', function () {
//     console.log(1)
// })

const OneList = ({
    responsibilities,
    containerIndex,
    openAllDescriptions,
    typeIndex,
    containerHeight

}) => {


    const list = useRef(null);
    const scrollContainer = useRef(null);
    const [containerLoad, setContainerLoad] = useState(false);

    useEffect(() => {
        setContainerLoad(true);


        const updateList = () => list.current.recomputeRowHeights(10000);
        document.addEventListener('scroll', updateList)
        return () => {
            document.removeEventListener('scroll', updateList)
        }
    }, [])
    return (
        <>
            <div ref={scrollContainer} style={{ marginLeft: '87px' }}>
                {containerLoad ? <List

                    autoHeight
                    height={1500}
                    ref={list}
                    rowCount={responsibilities.length}

                    rowHeight={({ index }) => {
                        if (responsibilities[index].removed) {
                            return 0;
                        }
                        return responsibilities[index].height || 60; //row height

                    }}

                    rowRenderer={
                        (props) => {

                            const containerTop = scrollContainer.current.getBoundingClientRect().top;
                            const elementTop = containerTop + props.style.top;

                            if (elementTop < -400 || elementTop > window.innerHeight + 400) return;

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

                                        {/* todo adding type container think about it   */}

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
                    overscanRowCount={1002}

                    // todo change this solution 
                    width={document.querySelector('header').offsetWidth + 300}
                /> : null}
            </div>

        </>)
};


export default OneList;