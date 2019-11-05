import React, { memo } from 'react';



const Checkbox = memo(({ status = 3, onChange }) => {


    return (

        <div
            className={"checkboxWrapper"}
            onClick={onChange}
            style={{
                backgroundImage: `url(${status}.svg)`
            }}
        />
    );
}, (next, prev) => {
    return !(next.status !== prev.status)

});

export default Checkbox;