import React from 'react';
import classes from './ResponsibilityCheckboxes.module.scss';
import Checkbox from '../../Chechbox';
import { changeResponsibility } from '../../../store/actions/responsibility/responsibilityAction';
import { connect } from 'react-redux';
import sizes from '../../../constants/sizes'




function renderCheckboxesArray({ array, scrollLeft, rowIndex, users, containerIndex, typeIndex }) {
    let chackboxCount = 0;
    // console.time('x')
    // let checkboxes = [];

    // for (let i = 0; i < array.length; i++) {
    //     let deportment = array[i];
    //     if (!deportment.show) continue;

    //     let deportmentUsers = deportment.users;
    //     for (let j = 0; j < deportmentUsers.length; j++) {
    //         let user = deportmentUsers[j];
    //         let index = j;

    //         if (deportment.showHalf && index > sizes.halfPersonalCount) continue;
    //         chackboxCount++

    //         if (scrollLeft > ((chackboxCount) * sizes.checkboxWidth) + sizes.checkboxWidth) continue;

    //         if (scrollLeft + window.innerWidth < ((chackboxCount * sizes.checkboxWidth) + sizes.marginFromLeft)) continue

    //         checkboxes.push(<Checkbox
    //             key={`checkbox___${user.id}_`}

    //             status={users[user.id]}
    //             onChange={(event) =>
    //                 changeResponsibility({
    //                     event,
    //                     userId: user.id,
    //                     rowIndex,
    //                     containerIndex,
    //                     typeIndex
    //                 })}
    //         />)
    //     }

    // }

    let indexCheckbox = -1
    let checkboxes = array.map((deportment) => {


        return deportment.show ?
            deportment.users.map((user, index) => {
                indexCheckbox++
                if (deportment.showHalf && index > sizes.halfPersonalCount) return null
                chackboxCount++

                if (
                    scrollLeft > ((chackboxCount) * sizes.checkboxWidth) + sizes.checkboxWidth

                    || scrollLeft + window.innerWidth < ((chackboxCount * sizes.checkboxWidth) + sizes.marginFromLeft)
                ) {
                    // chackboxCount++
                    return null
                };

                return <Checkbox
                    key={`checkbox___${user.id}_`}
                    status={users[user.id]}
                    index={indexCheckbox}
                    onChange={() => {

                        changeResponsibility({
                            userId: user.id,
                            rowIndex,
                            containerIndex,
                            typeIndex
                        })
                    }}
                />
            }) : null
    })
    // console.timeEnd('x');
    return checkboxes;
}


const ResponsibilityCheckboxes = ({ array, users, rowIndex, containerIndex, disabledAll, typeIndex, scrollLeft }) => {


    let marginLeft =
        (Math.floor(scrollLeft /
            sizes.checkboxWidth) *
            sizes.checkboxWidth) -
        sizes.checkboxWidth;


    if (marginLeft < 0) {
        marginLeft = 0
    }




    return (

        <div className={classes.checkboxRow} style={{
            transform: `translateX(${marginLeft + 'px'})`
        }}>
            {renderCheckboxesArray({ array, users, rowIndex, containerIndex, disabledAll, typeIndex, scrollLeft })}
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