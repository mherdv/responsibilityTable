import React, { memo } from 'react';

const DescriptionText = memo(({ text, className }) => {
    return (
        <p className={className || null}>
            {text}
        </p>
    );
}, (next, prev) => {
    return !(next.text !== prev.text)
});

export default DescriptionText;