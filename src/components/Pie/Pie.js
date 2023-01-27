import React, { useState, useEffect, useCallback } from 'react';

import classes from './Pie.module.scss';

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

    const [percentageText, setPercentageText] = useState('1');

    const setValue = useCallback(() => {
        let increment = 0;
        const interval = setInterval(() => {
            if (increment <= percentage) {
                setPercentageText(increment.toFixed(0));
                increment++;
            } else {
                clearInterval(interval);
            }
        }, 15);

    }, [percentage]);

    useEffect(() => {
        setValue();        
    }, [setValue]);

    return (
        <React.Fragment>
            <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize={config.size || '2.5em'} fill={config.color || 'black'}>
                {percentageText}
            </text>
            <text dx="10%" dy="4%" x="50%" y="50%" dominantBaseline="central" fontSize={"1.5em"}>%</text>
        </React.Fragment>
    );
};

const Pie = ({ percentage, title, config }) => {
    const [percentageBar, setPercentageBar] = useState(1);
    const timer = config && config.delay ? parseInt(config.delay, 10) : 0;
    
    useEffect(() => {
        const identifier = setTimeout(() => {
            setPercentageBar(cleanPercentage(percentage));
        }, timer);

        return () => {
            clearTimeout(identifier);
        };
    
    }, [percentage, timer]);
  

    return (
        <React.Fragment>
            <div className={classes.pie}>
                <svg width={config.width || 200} height={config.height || 200}>
                    <g transform={`rotate(270 ${'100 100'})`}>
                        <Circle colour={config.trackColor || 'lightgrey'} />
                        <Circle colour={config.color} pct={percentageBar} />
                    </g>
                    <Text percentage={percentageBar} config={config.percentText || {}}/>
                </svg>
            </div>
            <small>{title || ''}</small>
        </React.Fragment>
    );
};

export default Pie;
