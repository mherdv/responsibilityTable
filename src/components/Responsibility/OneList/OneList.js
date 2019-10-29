import React, { useRef } from 'react';

import { List, WindowScroller } from 'react-virtualized';
import OneRow from '../OneRow';
import { descriptionHeightChange } from '../../../store/actions/responsibility/description';
import { removeResponsibilityLine } from '../../../store/actions/responsibility/responsibilityLine';

const OneList = ({
    responsibilities,
    classes,
    usersArray,

    containerIndex,
    openAllDescriptions
}) => {


    const list = useRef(null)

    return (

        <WindowScroller >
            {({ height, isScrolling, registerChild, scrollTop }) => (
                <div>
                    <div
                        ref={registerChild}
                    >
                        <List
                            autoHeight
                            height={height}
                            ref={list}
                            isScrolling={isScrolling}
                            rowCount={responsibilities.length}

                            rowHeight={({ index }) => {
                                if (responsibilities[index].removed) {
                                    return 0;
                                }

                                return responsibilities[index].height || 30
                            }}

                            rowRenderer={
                                (props) => {

                                    if (!responsibilities[props.index]) return false;

                                    const { users, description, id, removed } = responsibilities[props.index];
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
                                                    usersArray={usersArray}
                                                    key={`${id}__checkboxContainer`}
                                                    usersLength={Object.keys(users).length}
                                                    users={users}
                                                    rowIndex={props.index}
                                                    containerIndex={containerIndex}
                                                    classes={classes}
                                                    removed={removed}
                                                    openAllDescriptions={openAllDescriptions}
                                                    onInput={() => { }}
                                                    rowHeightChange={(event) => {

                                                        const currentTarget = event.currentTarget;
                                                        const currentTargetHeight = currentTarget.offsetHeight;
                                                        const parentRowHeight = currentTarget.closest('.rowContainer').offsetHeight;

                                                        if (currentTargetHeight > parentRowHeight || currentTargetHeight < parentRowHeight - 2) {

                                                            descriptionHeightChange({ containerIndex, rowIndex: props.index, height: currentTargetHeight + 2 })
                                                            list.current.recomputeRowHeights(props.index)
                                                        }
                                                    }}

                                                    removeLine={() => {
                                                        removeResponsibilityLine({ containerIndex, rowIndex: props.index, rowId: id });
                                                        list.current.recomputeRowHeights(props.index)
                                                    }}
                                                />


                                            </div>
                                            : false
                                    )

                                }
                            }

                            overscanRowCount={25}
                            scrollTop={scrollTop}
                            // todo change this solution 
                            width={document.querySelector('header').offsetWidth + 300}
                        />
                    </div>
                </div>
            )}
        </WindowScroller>)
};


export default OneList;