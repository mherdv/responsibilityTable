import React, { useRef } from 'react';

import { List, WindowScroller } from 'react-virtualized';
import OneRow from '../OneRow';
import { descriptionHeightChange } from '../../../store/actions/responsibility/description';
import { removeResponsibilityLine } from '../../../store/actions/responsibility/responsibilityLine';

const OneList = ({
    responsibilities,
    containerIndex,
    openAllDescriptions,
    typeIndex,
    containerHeight

}) => {


    const detectVisibility = ({ props, containerIndex, typeIndex, containerHeight }) => {


        const itemTop = containerHeight

        const scrollTop = document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        console.log(scrollTop, windowHeight, props)

    }

    const list = useRef(null)

    return (

        // <WindowScroller >
        //     {({ height, isScrolling, registerChild, scrollTop }) => (
        //         <div>
        //             <div
        //                 ref={el => registerChild(el)}
        //             >

        <List
            autoHeight
            height={1500}
            ref={list}
            rowCount={responsibilities.length}

            rowHeight={({ index }) => {
                if (responsibilities[index].removed) {
                    return 0;
                }
                return responsibilities[index].height || 30;

            }}

            rowRenderer={
                (props) => {
                    if (!responsibilities[props.index]) return false;
                    const { users, description, id, removed } = responsibilities[props.index];

                    detectVisibility({ props, containerIndex, typeIndex, containerHeight })

                    return (
                        props.style.height !== 0 && props.isVisible ?
                            <div
                                className={'rowContainer'}
                                style={{
                                    ...props.style
                                }}
                                key={props.key} >

                                {/* todo adding type container think about it   */}

                                <OneRow
                                    description={description}
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
                                        const currentTargetHeight = currentTarget.offsetHeight;
                                        const parentRowHeight = currentTarget.closest('.rowContainer').offsetHeight;

                                        if (currentTargetHeight > parentRowHeight || currentTargetHeight < parentRowHeight - 2) {

                                            descriptionHeightChange({ containerIndex, rowIndex: props.index, height: currentTargetHeight + 2, typeIndex });
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
            overscanRowCount={0}
            // scrollTop={scrollTop}
            // todo change this solution 
            width={document.querySelector('header').offsetWidth + 300}
        />)
    //             </div>
    //         </div>
    //     )}
    // </WindowScroller>)
};


export default OneList;