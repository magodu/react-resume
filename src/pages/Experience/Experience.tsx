/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';
import { Waypoint } from 'react-waypoint';

import classes from './Experience.module.scss';

interface experienceBlock {
    id: number,
    blockClasses: string,
    contentClasses: string,
    expanded: boolean
}

const Experience = () => {

    const initialBlockClasses = classes['timeline-block'];
    const initialContentClasses = classes['timeline-content'];

    const jobs = [ 
        { id: 0, blockClasses: initialBlockClasses, contentClasses: initialContentClasses, expanded: false},
        { id: 1, blockClasses: initialBlockClasses, contentClasses: initialContentClasses, expanded: false},
        { id: 2, blockClasses: initialBlockClasses, contentClasses: initialContentClasses, expanded: false},
        { id: 3, blockClasses: initialBlockClasses, contentClasses: initialContentClasses, expanded: false},
        { id: 4, blockClasses: initialBlockClasses, contentClasses: initialContentClasses, expanded: false},
        { id: 5, blockClasses: initialBlockClasses, contentClasses: initialContentClasses, expanded: false}  
    ];

    const [sectionAnimationClasses, setSectionAnimationClasses] = useState<string>('section');
    const [blockAnimationClasses, setBlockAnimationClasses] = useState<experienceBlock[]>(jobs);

    const addAnimationSectionClasses = () => {
        setSectionAnimationClasses('section fadeInUp animated');
    };

    const addAnimationBlockClass = (index: number) => {
        const animationDirection = index % 2 === 0 ? 'fadeInLeft' : 'fadeInRight';

        setBlockAnimationClasses(
            blockAnimationClasses.map((job, j) => 
                j === index
                ? {...job, blockClasses: `${initialBlockClasses} ${animationDirection} animated`}
                : job
            )
        );
    };

    const addExpandedBlockClass = (index: number) => {

        setBlockAnimationClasses(
            blockAnimationClasses.map((job, j) => 
                j === index
                ? {...job, expanded: !job.expanded, contentClasses: !job.expanded ? `${initialContentClasses} ${classes.expanded}` : initialContentClasses }
                : job
            )
        );
    };


    return (
        <section className={sectionAnimationClasses}>
            <Waypoint onEnter={() => addAnimationSectionClasses()} />
            <div className="container-section">
                <div className="title">
                    <div className="section-title">
                        <h4>Experience</h4>
                    </div>
                </div>
                <div className="resume-section experience">
                    <div className={classes['timeline-container']}>
                        <div className={blockAnimationClasses[0].blockClasses}>
                            <Waypoint onEnter={() => addAnimationBlockClass(0)} />
                            <div className={classes['timeline-year']}>
                                <i>2016</i>
                            </div>
                             <div className={blockAnimationClasses[0].contentClasses}>
                                <h2>
                                    <span>Google Inc.</span>
                                </h2>
                                <p>Intern ( July 2016 - Present) 6 months | Madrid </p>
                                <span className={classes.arrow} title="Show more" onClick={addExpandedBlockClass.bind(null, 0)}></span>
                                <div className={classes['job-description']}>
                                    Desarrollador Javascript en ISBAN USA, en Boston (Massachussets, USA), desarrollando diferentes aplicaciones internas del banco con AngularJS, JQuery, Lo-Dash.js/Underscore.js, TDD, HTML5, Bootstrap y herramientas
                                    como Git, NodeJS, Jenkins y JIRA.
                                </div>
                            </div>
                        </div>

                        <div className={blockAnimationClasses[1].blockClasses}>
                            <Waypoint onEnter={() => addAnimationBlockClass(1)} />
                            <div className={classes['timeline-year']}>
                                <i>2014</i>
                            </div>
                             <div className={blockAnimationClasses[1].contentClasses}>
                                <h2>
                                    <span>Apple Inc.</span>
                                </h2>
                                <p>Front End Developer ( Jan 2014 - Dec 2015 ) 12 months | Madrid</p>
                                <span className={classes.arrow} title="Show more" onClick={addExpandedBlockClass.bind(null, 1)}></span>
                                <div className={classes['job-description']}>Job description</div>
                            </div>
                        </div>

                        <div className={blockAnimationClasses[2].blockClasses}>
                            <Waypoint onEnter={() => addAnimationBlockClass(2)} />
                            <div className={classes['timeline-year']}>
                                <i>2013</i>
                            </div>
                             <div className={blockAnimationClasses[2].contentClasses}>
                                <h2>
                                    <span>Facebook co.</span>
                                </h2>
                                <p>Manager Web Development ( Jan 2013 - Dec 2013 ) 2 years | Madrid</p>
                                <span className={classes.arrow} title="Show more" onClick={addExpandedBlockClass.bind(null, 2)}></span>
                                <div className={classes['job-description']}>Job description</div>
                            </div>
                        </div>

                        <div className={blockAnimationClasses[3].blockClasses}>
                            <Waypoint onEnter={() => addAnimationBlockClass(3)} />
                            <div className={classes['timeline-year']}>
                                <i>2012</i>
                            </div>
                             <div className={blockAnimationClasses[3].contentClasses}>
                                <h2>
                                    <span>DDB Worldwide</span>
                                </h2>
                                <p>Intern ( July 2012 - Dec 2013 ) 3 years, 4 months | Madrid</p>
                                <span className={classes.arrow} title="Show more" onClick={addExpandedBlockClass.bind(null, 3)}></span>
                                <div className={classes['job-description']}>Job description</div>
                            </div>
                        </div>
                        <div className={blockAnimationClasses[4].blockClasses}>
                            <Waypoint onEnter={() => addAnimationBlockClass(4)} />
                            <div className={classes['timeline-year']}>
                                <i>2010</i>
                            </div>
                             <div className={blockAnimationClasses[4].contentClasses}>
                                <h2>
                                    <span>Maronia Software</span>
                                </h2>
                                <p>Intern ( July 2009 - Dec 2010 ) 2 years | Madrid</p>
                                <span className={classes.arrow} title="Show more" onClick={addExpandedBlockClass.bind(null, 4)}></span>
                                <div className={classes['job-description']}>Job description</div>
                            </div>
                        </div>

                        <div className={blockAnimationClasses[5].blockClasses}>
                            <Waypoint onEnter={() => addAnimationBlockClass(5)} />
                            <div className={classes['timeline-year']}>
                                <i>2010</i>
                            </div>
                             <div className={blockAnimationClasses[5].contentClasses}>
                                <h2>
                                    <span>Marosoft</span>
                                </h2>
                                <p>Intern ( July 2008 - Dec 2009 ) 2 months | Madrid</p>
                                <span className={classes.arrow} title="Show more" onClick={addExpandedBlockClass.bind(null, 5)}></span>
                                <div className={classes['job-description']}>Job description</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
