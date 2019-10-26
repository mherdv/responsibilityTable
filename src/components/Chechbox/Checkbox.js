import React, { memo } from 'react';


const Checkbox = memo(({ checked, onChange }) => {

    return (

        <div
            className={"checkboxWrapper"}
        >
            <input type="checkbox" checked={checked}
                onChange={onChange} />
        </div>
    );
}, (next, prev) => {
    return !(next.checked !== prev.checked)

});

export default Checkbox;