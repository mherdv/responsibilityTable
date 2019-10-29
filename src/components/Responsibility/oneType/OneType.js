import React, { useRef } from 'react';
import { WindowScroller, List } from 'react-virtualized';
import OneList from '../OneList/OneList';

const OneType = ({
    section,
    containerIndex,
    descriptionsAreOpened,


}) => {

    const { types } = section;

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
                                    return (
                                        <div style={props.style} key={props.key}>

                                            <OneList
                                                responsibilities={types[props.index].responsibilities}
                                                containerIndex={containerIndex}
                                                typeIndex={props.index}
                                                openAllDescriptions={descriptionsAreOpened}
                                            />
                                        </div>
                                    )
                                }
                            }
                        />

                    </div>
                </div>)}
        </WindowScroller>
    );
};

export default OneType;