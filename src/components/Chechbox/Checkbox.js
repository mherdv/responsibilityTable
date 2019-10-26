import React, { memo } from 'react';

const Checkbox = memo(({ checked, onChange }) => {

    return (
        <div className={'checkboxWrapper'}>
            <input type="checkbox" checked={checked}
                onChange={onChange} />
        </div>
    );
}, (next, prev) => {
    // if (next.rowIndex !== prev.rowIndex) return false;
    return !(next.checked !== prev.checked)

});

export default Checkbox;