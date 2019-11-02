import React, { memo } from 'react';


const Checkbox = memo(({ status, onChange }) => {
    const background = status === 1 ? '/1.svg' : status === 2 ? '/2.svg' : '/3.svg';
    return (

        <div
            className={"checkboxWrapper"}
            onClick={onChange}
            style={{
                background: `url(${background})`
            }}
        >
        </div>
    );
}, (next, prev) => {
    return !(next.status !== prev.status)

});

export default Checkbox;