import React, { memo } from 'react';



const Checkbox = memo(({ status = 3, onChange }) => {


    return (

        <div
            className={`checkboxWrapper b_${status}`}
            onClick={onChange}
        />
    );
}, (next, prev) => {
    return !(next.status !== prev.status)

});

export default Checkbox;