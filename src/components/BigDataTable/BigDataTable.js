import React, { Component } from 'react';
import classes from './bigData.module.scss';

import { WindowScroller, Grid } from 'react-virtualized';



// const BigDataTable = (props) => {
//     const [state, setState] = useState({});


//     return <div></div>
// }

class BigDataTable extends Component {

    state = {}

    render() {
        var cellRenderer = this._cellRenderer.bind(this);
        return (
            // <AutoSizer ref={'AutoSizer'} className={classes.container}>
            //     {(params) => {
            //         return <Grid
            //             columnCount={this.props.columnCount}
            //             columnWidth={100}
            //             height={window.innerHeight}
            //             ref='Grid'
            //             cellRenderer={cellRenderer}
            //             rowHeight={30}
            //             rowCount={this.props.rowCount}
            //             width={params.width}

            //         />
            //     }}
            // </AutoSizer>


            <WindowScroller ref={'windowScroller'}>
                {({ height, isScrolling, registerChild, scrollTop }) => {
                    return (


                        <Grid
                            autoHeight
                            height={height}
                            isScrolling={isScrolling}
                            scrollTop={scrollTop}
                            columnCount={this.props.columnCount}
                            columnWidth={100}
                            ref='Grid'
                            cellRenderer={cellRenderer}
                            rowHeight={30}
                            rowCount={this.props.rowCount}
                            width={3000}

                        />

                    )
                }

                }
            </WindowScroller>


        );

    }


    _cellRenderer(params) {
        const columnIndex = params.columnIndex;
        const rowIndex = params.rowIndex;
        const key = `c:${columnIndex}, r:${rowIndex}`;
        const setState = this.setState.bind(this);
        const grid = this.refs.windowScroller && this.refs.windowScroller.refs.Grid;


        const className =
            columnIndex === this.state.hoveredColumnIndex ||
                rowIndex === this.state.hoveredRowIndex
                ? `${classes.item} ${classes.hoveredItem}`
                : 'item';

        return <div
            className={className}
            key={params.key}
            onMouseOver={() => {
                setState({
                    hoveredColumnIndex: columnIndex,
                    hoveredRowIndex: rowIndex,
                })


                grid && grid.forceUpdate();

            }}
            style={params.style}
        >
            {key}
        </div>

    }
};


export default BigDataTable;
