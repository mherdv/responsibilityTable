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
    if (next.disabled !== prev.disabled) return false;
    return !(next.checked !== prev.checked)

});

export default Checkbox;