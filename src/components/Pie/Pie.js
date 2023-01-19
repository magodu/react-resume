import React from 'react';
import './Pie.scss';

const cleanPercentage = (percentage) => {
    const tooLow = !Number.isFinite(+percentage) || percentage < 0;
    const tooHigh = percentage > 100;
    return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

const Circle = ({ colour, pct }) => {
    const r = 70;
    const circ = 2 * Math.PI * r;
    const strokePct = ((100 - pct) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
    return (
        <circle
            r={r}
            cx={100}
            cy={100}
            fill="transparent"
            stroke={strokePct !== circ ? colour : ''} // remove colour as 0% sets full circumference
            strokeWidth={'1rem'}
            strokeDasharray={circ}
            strokeDashoffset={pct ? strokePct : 0}
        ></circle>
    );
};

const Text = ({ percentage, config }) => {
    return (
        <React.Fragment>
            <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize={config.size || '2.5em'} fill={config.color || 'black'}>
                {percentage.toFixed(0)}
            </text>
            <text dx="10%" dy="4%" x="50%" y="50%" dominantBaseline="central" fontSize={"1.5em"}>%</text>
        </React.Fragment>
    );
};

const Pie = ({ percentage, title, config }) => {
    const pct = cleanPercentage(percentage);

    return (
        <React.Fragment>
            <div style={{textAlign: 'center'}}>
                <svg width={config.width || 200} height={config.height || 200}>
                    <g transform={`rotate(270 ${'100 100'})`}>
                        <Circle colour={config.trackColor || 'lightgrey'} />
                        <Circle colour={config.color} pct={pct} />
                    </g>
                    <Text percentage={pct} config={config.percentText || {}}/>
                </svg>
            </div>
            <small>{title || ''}</small>
        </React.Fragment>
    );
};

export default Pie;
