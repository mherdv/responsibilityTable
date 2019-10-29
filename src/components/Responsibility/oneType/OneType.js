import React, { useRef } from 'react';
import { WindowScroller, List } from 'react-virtualized';
import OneList from '../OneList/OneList';

const OneType = ({
    types,
    responsibilities,
    classes,
    usersArray,
    changeResponsibility,
    containerIndex,
    onDescriptionChange,
    removeResponsibility,
    descriptionsAreOpened,
    descriptionHeightChange


}) => {
    const type = useRef(null);



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
                            ref={type}
                            isScrolling={isScrolling}
                            rowCount={types.length}
                            width={100}

                            rowHeight={({ index }) => {
                                if (types[index].removed) {
                                    return 0;
                                }

                                return types[index].height || 30
                            }}

                            rowRenderer={

                                (props) => {
                                    return <OneList
                                        responsibilities={responsibilities}
                                        classes={classes}
                                        usersArray={usersArray}
                                        changeResponsibility={changeResponsibility}
                                        containerIndex={containerIndex}
                                        onDescriptionChange={onDescriptionChange}
                                        removeResponsibility={removeResponsibility}
                                        openAllDescriptions={descriptionsAreOpened}
                                        descriptionHeightChange={descriptionHeightChange}

                                    />
                                }
                            }
                        />

                    </div>
                </div>)}
        </WindowScroller>
    );
};

export default OneType;