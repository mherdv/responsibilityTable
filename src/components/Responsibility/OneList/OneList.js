import React, { useRef, useEffect } from 'react';

import { List, WindowScroller } from 'react-virtualized';
import OneRow from '../OneRow';

const OneList = ({
    height,
    isScrolling,
    responsibilities,
    classes,
    usersArray,
    responsibilityArray,
    changeResponsibility,
    containerIndex,
    onDescriptionChange,
    removeResponsibility,
    scrollTop
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
                                return 30
                            }}
                            rowRenderer={
                                (props) => {

                                    if (!responsibilities[props.index]) return false
                                    const { users, description, id, removed } = responsibilities[props.index];
                                    return (
                                        props.isVisible && props.style.height != 0 ?
                                            <div
                                                style={{
                                                    ...props.style
                                                }}
                                                key={props.key} >

                                                {/* change size on typing */}
                                                <OneRow
                                                    description={description}
                                                    usersArray={usersArray}
                                                    key={`${id}__checkboxContainer`}
                                                    usersLength={Object.keys(users).length}
                                                    responsibilityArray={responsibilityArray}
                                                    users={users}
                                                    changeResponsibility={changeResponsibility}
                                                    rowIndex={props.index}
                                                    containerIndex={containerIndex}
                                                    classes={classes}
                                                    onDescriptionChange={onDescriptionChange}
                                                    removed={removed}
                                                    onInput={(event) => {
                                                        console.log(event)
                                                        console.log(event.currentTarget)
                                                    }}
                                                    removeLine={() => {
                                                        removeResponsibility(responsibilityArray, containerIndex, props.index, id);
                                                        list.current.recomputeRowHeights(props.index)
                                                    }}
                                                />


                                            </div>
                                            : false
                                    )

                                }
                            }

                            overcanRowCount={15}
                            scrollTop={scrollTop}
                            width={document.querySelector('header').offsetWidth + 300}
                        />
                    </div>
                </div>
            )}
        </WindowScroller>)
};


export default OneList;