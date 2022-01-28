import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import './ProgBar.css';

const ProgBar = props => {
    const [offset, setOffset] = useState(0);
    const circleRef = useRef(null);
    const {size, progress, strokeWidth, circleOneStroke, circleTwoStroke} = props;
    const mid = size / 2;
    const rad = size / 2 - strokeWidth / 2;
    const circ = 2 * Math.PI * rad;

    useEffect(() => {
        const progressOffset = ((100 - progress) / 100) * circ;
        setOffset(progressOffset);
        circleRef.current.style = 'transition: stroke-dashoffset 850ms ease-in-out';

    }, [setOffset, progress, circ, offset]);

    return (
        <>
            <svg className="svg" width={size} height={size}>
                <circle
                    className="svg-circle-bg"
                    stroke={circleOneStroke}
                    cx={mid}
                    cy={mid}
                    r={rad}
                    strokeWidth={strokeWidth}
                />
                <circle
                    className="svg-circle"ß
                    ref={circleRef}
                    stroke={circleTwoStroke}
                    cx={mid}
                    cy={mid}
                    r={rad}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circ}
                    strokeDashoffset={offset}
                />
                <text x={`${mid}`} y={`${mid}`} className="svg-circle-text">
                        {progress}%
                </text>
            </svg>
        </>
    );
}

ProgBar.propTypes = {
    size: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
    strokeWidth: PropTypes.number.isRequired,
    circleOneStroke: PropTypes.string.isRequired,
    circleTwoStroke: PropTypes.string.isRequired
}

export default ProgBar;