import React, { useState, useEffect, useCallback } from 'react';

import classes from './Pie.module.scss';

import { pieChartConfigType } from '../../models/appTypes';

const cleanPercentage = (percentage: number) => {
    const tooLow = !Number.isFinite(+percentage) || percentage < 0;
    const tooHigh = percentage > 100;
    return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

const Circle: React.FC<{ colour: string, pct?: number }> = ({ colour, pct }) => {
    const r = 70;
    const circ = 2 * Math.PI * r;
    const strokePct = pct ? ((100 - pct) * circ) / 100 : 0; // where stroke will start, e.g. from 15% to 100%.
    return (
        <circle
            r={r}
            cx={100}
            cy={100}
            fill="transparent"
            stroke={strokePct !== circ ? colour : ''} // remove colour as 0% sets full circumference
            strokeWidth={'1rem'}
            strokeDasharray={circ}
            strokeDashoffset={strokePct}
        ></circle>
    );
};

const Text: React.FC<{ percentage: number, config: any }> = ({ percentage, config }) => {

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

const Pie: React.FC<{ percentage: number, title: string, config: pieChartConfigType }> = ({ percentage, title, config  }) => {

    const [percentageBar, setPercentageBar] = useState(1);
    const timer = config && config.delay ? config.delay : 0;
    
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
