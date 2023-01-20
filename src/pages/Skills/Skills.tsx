/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';
import { Waypoint } from 'react-waypoint';

import Pie from '../../components/Pie/Pie';

import classes from './Skills.module.scss';

const DUMMY_BARS_DATA = [
    {
        skill: 'Angular',
        level: 96,
    },
    {
        skill: 'React',
        level: 89,
    },
    {
        skill: 'Javascript (nativo)',
        level: 90,
    },
    {
        skill: 'TypeScript',
        level: 85,
    },
    {
        skill: 'Lightning Web Components',
        level: 89,
    },
    {
        skill: 'AngularJS',
        level: 95,
    },
    {
        skill: 'JQuery',
        level: 90,
    },
    {
        skill: 'Webpack',
        level: 85,
    },
    {
        skill: 'HTML5',
        level: 95,
    },
    {
        skill: 'CSS / SASS / LESS',
        level: 89,
    },
    {
        skill: 'Diseño Responsive',
        level: 85,
    },
   
    {
        skill: 'API REST',
        level: 99,
    },
    {
        skill: 'Git',
        level: 95,
    },
   
    {
        skill: 'NodeJs',
        level: 75,
    },
    {
        skill: 'Arquitectura MV* ',
        level: 89,
    },
    {
        skill: 'TDD',
        level: 70,
    },
    {
        skill: 'Metodologías ágiles',
        level: 80,
    },
    {
        skill: 'Photoshop',
        level: 90,
    }
];

const Skills = () => {
    const [sectionAnimationClasses, setSectionAnimationClasses] = useState<string>('section');

    const pieChartConfig = {
        color: '#06A763',
        percentText: {
            color: '#58666e',
        },
    };

    const addAnimationSectionClass = () => {
        setSectionAnimationClasses('section fadeInUp animated');
    };

    const setBarValue = (value: number) => {
        //console.log('setBarValue', value);
    };

    return (
        <section id="skills" className={sectionAnimationClasses}>
            <Waypoint onEnter={() => addAnimationSectionClass()} />
            <div className="container-section">
                <div className="title">
                    <div className="section-title">
                        <h4>Skills</h4>
                    </div>
                </div>

                <div className={classes['skills-wrapper']}>
                    <ul className={classes.skills}>
                       {DUMMY_BARS_DATA.map((item, i) => (
                        <li key={i}>
                            <Waypoint onEnter={() => setBarValue(item.level)} />
                            <div className={`progress ${classes['progress-wrapper']}`}>
                                <div className={classes.lead}>{item.skill}</div>
                                <div className={`progress-bar ${classes['progress-color']}`} role="progressbar" style={{ width: `${item.level}%` }}>
                                    <span className={classes.percentage}>{item.level}%</span>
                                </div>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>

                <div className={classes['skill-language']}>
                    <h2>LANGUAGES</h2>

                    <div className="col-sm-12">
                        <div className="skills">
                            <div className="row">
                                <div className="col-md-4 col-xs-4">
                                    <Pie percentage={95} title="Spanish" config={pieChartConfig} />
                                </div>
                                <div className="col-md-4 col-xs-4">
                                    <Pie percentage={80} title="English" config={pieChartConfig} />
                                </div>
                                <div className="col-md-4 col-xs-4">
                                    <Pie percentage={25} title="French" config={pieChartConfig} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
