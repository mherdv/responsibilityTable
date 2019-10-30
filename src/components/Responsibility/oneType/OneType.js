import React, { useRef } from 'react';
import { WindowScroller, List } from 'react-virtualized';
import OneList from '../OneList/OneList';

const OneType = ({
    section,
    containerIndex,
    descriptionsAreOpened,


}) => {

    const { types } = section;


    const typesContainer = useRef(null);


    // todo type block resizing
    // type.current.recomputeRowHeights(props.index)


    return (
        // <WindowScroller >
        //     {({ height, isScrolling, registerChild, scrollTop }) => (
        //         <div>
        //             <div
        //                 ref={registerChild}
        //             >
        //                 <List
        //                     autoHeight
        //                     height={height}
        //                     ref={type}
        //                     isScrolling={isScrolling}
        //                     rowCount={types.length}
        //                     width={window.innerWidth}


        //                     rowHeight={({ index }) => {

        //                         if (types[index].removed) {
        //                             return 0;
        //                         }
        //                         let height = 0
        //                         for (let i = 0; i < types[index].responsibilities.length; i++) {


        //                             if (!types[index].responsibilities[i].removed && types[index].responsibilities[i].height) {
        //                                 height += types[index].responsibilities[i].height;
        //                             } else if (!types[index].responsibilities[i].removed) {
        //                                 height += 30
        //                             }
        //                         }

        //                         return height;


        //                         // types[index].height || 30
        //                     }}

        //                     rowRenderer={

        //                         (props) => {
        //                             console.log(props.isVisible, props.style.height)
        //                             return (
        //                                 props.style.height !== 0 ?
        //                                     <div style={{ ...props.style }} key={props.key}>
        //                                         <h1 style={{
        //                                             position: "absolute",
        //                                             zIndex: 2,
        //                                             minHeight: '150px',
        //                                             writingMode: 'vertical-lr',
        //                                             whiteSpace: 'noWrap'
        //                                         }}>{types[props.index].name}</h1>
        //                                         <OneList
        //                                             responsibilities={types[props.index].responsibilities}
        //                                             containerIndex={containerIndex}
        //                                             typeIndex={props.index}
        //                                             openAllDescriptions={descriptionsAreOpened}
        //                                             currentType={types[props.index]}
        //                                             changeTypeHeight={(index) => {
        //                                                 type.current.recomputeRowHeights(index);
        //                                             }}
        //                                         />
        //                                     </div>
        //                                     : <div style={props.style} />
        //                             )
        //                         }
        //                     }
        //                 />

        //             </div>
        //         </div>)}
        // </WindowScroller>

        <div>


            {types.map((oneType, index) => {
                let height = 0;

                for (let i = 0; i < types[index].responsibilities.length; i++) {


                    if (!types[index].responsibilities[i].removed && types[index].responsibilities[i].height) {
                        height += types[index].responsibilities[i].height;
                    } else if (!types[index].responsibilities[i].removed) {
                        height += 30
                    }
                }
                return <div style={{ height: height + 'px', position: 'relative' }}>
                    <OneList
                        responsibilities={oneType.responsibilities}
                        containerIndex={containerIndex}
                        typeIndex={index}
                        openAllDescriptions={descriptionsAreOpened}
                        currentType={oneType}
                        containerHeight={height}

                    />
                </div>
            })}
        </div>
    );
};

export default OneType;