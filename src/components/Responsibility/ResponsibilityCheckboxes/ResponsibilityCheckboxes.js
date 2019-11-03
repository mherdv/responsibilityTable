import React from 'react';
import classes from './ResponsibilityCheckboxes.module.scss';
import Checkbox from '../../Chechbox';
import { changeResponsibility } from '../../../store/actions/responsibility/responsibilityAction';
import { connect } from 'react-redux';
import sizes from '../../../constants/sizes'

const ResponsibilityCheckboxes = ({ array, users, rowIndex, containerIndex, disabledAll, typeIndex, scrollLeft }) => {

    let chackboxCount = 0;
    let marginLeft =
        (Math.floor(scrollLeft /
            sizes.checkboxWidth) *
            sizes.checkboxWidth) -
        sizes.checkboxWidth;

    if (marginLeft < 0) {
        marginLeft = 0
    }


    function renderCheckboxesArray() {
        // console.time('x')

        let checkboxes = [];

        for (let i = 0; i < array.length; i++) {
            let deportment = array[i];
            if (!deportment.show) continue;

            let deportmentUsers = deportment.users;
            for (let j = 0; j < deportmentUsers.length; j++) {
                let user = deportmentUsers[j];
                let index = j;

                if (deportment.showHalf && index > sizes.halfPersonalCount) continue;
                chackboxCount++

                if (scrollLeft > ((chackboxCount) * sizes.checkboxWidth) + sizes.checkboxWidth) continue;

                if (scrollLeft + window.innerWidth < ((chackboxCount * sizes.checkboxWidth) + sizes.marginFromLeft)) continue

                checkboxes.push(<Checkbox
                    key={`checkbox___${user.id}_`}
                    rowIndex={rowIndex}
                    responsibilityIndex={index}
                    status={users[user.id]}
                    disabled={disabledAll}
                    onChange={(event) =>
                        !disabledAll ? changeResponsibility({
                            event,
                            userId: user.id,
                            rowIndex,
                            containerIndex,
                            typeIndex
                        }) : null}
                />)
            }

        }

        // return checkboxes;

        // let checkboxes = array.map((deportment) => {


        //     return deportment.show ?
        //         deportment.users.map((user, index) => {
        //             chackboxCount++

        //             if (scrollLeft > ((chackboxCount) * sizes.checkboxWidth) + sizes.checkboxWidth) return null;

        //             if (scrollLeft + window.innerWidth < ((chackboxCount * sizes.checkboxWidth) + sizes.marginFromLeft)) return null
        //             if (deportment.showHalf && index > 4) return null;
        //             return <Checkbox
        //                 key={`checkbox___${user.id}_`}
        //                 rowIndex={rowIndex}
        //                 responsibilityIndex={index}
        //                 status={users[user.id]}
        //                 disabled={disabledAll}
        //                 onChange={(event) =>
        //                     !disabledAll ? changeResponsibility({
        //                         event,
        //                         userId: user.id,
        //                         rowIndex,
        //                         containerIndex,
        //                         typeIndex
        //                     }) : null}
        //             />
        //         }) : null
        // })
        // console.timeEnd('x');
        return checkboxes;
    }

    return (

        <div className={classes.checkboxRow} data-selector={'row'} style={{
            marginLeft: marginLeft + 'px'
        }}>
            {renderCheckboxesArray()}
        </div>
    );
};

function mapStateToProps(state) {

    return {
        array: state.users.usersArray,
        scrollLeft: state.events.scrollLeft
    }
}

export default connect(mapStateToProps)(ResponsibilityCheckboxes);