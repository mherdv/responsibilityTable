import React, { memo } from 'react';



const Checkbox = memo(({ status = 3, onChange, index }) => {


    return (

        <div
            className={`checkboxWrapper b_${status} header_${index}`}
            onClick={onChange}
        />
    );
}, (next, prev) => {

    if (next.index !== prev.index) return false
    return !(next.status !== prev.status)

});

export default Checkbox;