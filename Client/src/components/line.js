import React from 'react';

const Line = ({color, height}) => (
    <hr
        style={{
            border: `1px solid ${color}`,
            backgroundColor: color,
            height: height,
            width: `100%`
        }}
    />
);

export default Line;