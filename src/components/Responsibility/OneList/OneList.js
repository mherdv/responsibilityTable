import React, { useRef, useEffect, useState } from 'react';

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
    const [counter, setCounter] = useState(0);



    useEffect(() => {
        list.current.forceUpdateGrid()
        console.log(list.current);

    })
    return (

        <WindowScroller counter={counter}>
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
                                    // console.log(props)
                                    return props.isVisible ?
                                        <div
                                            className={removed ? classes.removed : null}
                                            style={{
                                                ...props.style
                                            }}

                                            key={props.key} >


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
                                                removeLine={() => {
                                                    removeResponsibility(responsibilityArray, containerIndex, props.index, id);
                                                    setCounter(counter + 1)


                                                }}
                                            />


                                        </div> : false
                                }
                            }

                            overcanRowCount={10}
                            scrollTop={scrollTop}
                            width={document.querySelector('header').offsetWidth + 300}
                        />
                    </div>
                </div>
            )}
        </WindowScroller>)
};


export default OneList;