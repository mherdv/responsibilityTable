import React from 'react';

import sizes from '../../../constants/sizes';
import classes from './oneType.module.scss';
import OneList from '../OneList/OneList';

const OneType = ({
    section,
    containerIndex,
    descriptionsAreOpened,


}) => {

    const { types } = section;
    // todo type block resizing
    // type.current.recomputeRowHeights(props.index)


    return (


        <div>


            {types.map((oneType, index) => {
                let height = 0;

                for (let i = 0; i < types[index].responsibilities.length; i++) {


                    if (!types[index].responsibilities[i].removed && types[index].responsibilities[i].height) {
                        height += types[index].responsibilities[i].height;
                    } else if (!types[index].responsibilities[i].removed) {
                        height += sizes.rowHeight
                    }
                }
                return <div style={{ height: height + 'px', position: 'relative' }} key={oneType.name + index}>

                    <h2 className={classes.typeTitle}>{oneType.name}</h2>
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