import { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from "react-router-dom"
import { Waypoint } from 'react-waypoint';
import { useTranslation } from 'react-i18next';

import { SiteContext } from '../../store/site-context';
import { isEmptyObject } from '../../utils';

import Spinner from '../../components/Spinner/Spinner';
import DateFormattedText from '../../components/DateFormattedText/DateFormattedText';

import classes from './Experience.module.scss';

import { experienceBlock } from '../../models/appTypes';


const Experience = () => {
    const { data } = useContext(SiteContext);
    const [loadedData, setLoadedData] = useState<boolean>(false);
    const [sectionData, setSectionData] = useState<any>(null);
    const sectionDataRef = useRef<any>(null);
    const navigate = useNavigate();
    const [translate] = useTranslation('global');
    const initialBlockClasses = `${classes['timeline-block']} hide`;
    const initialContentClasses = classes['timeline-content'];

    const [sectionAnimationClasses, setSectionAnimationClasses] = useState<string>('section');
    const [blockAnimationClasses, setBlockAnimationClasses] = useState<experienceBlock[]>([]);

    const createClassesList = useCallback(() => {
        let jobs: experienceBlock[] = [];
        sectionDataRef.current.forEach((job: any, index: number) => {
            jobs.push({ id: index, blockClasses: classes['timeline-block'], contentClasses: classes['timeline-content'], expanded: false});
        });
        setBlockAnimationClasses(jobs);
    }, []);

    useEffect(() => {
        if (!isEmptyObject(data)) {
            setLoadedData(true);
            setSectionData(data.experience);
            sectionDataRef.current = data.experience;
            createClassesList();
        }
    }, [createClassesList, data]);

    const addRouteAnimationSectionClass = () => {
        setSectionAnimationClasses('section fadeInUp animated');
        navigate('#experience');
    };

    const addAnimationBlockClass = (index: number) => {
        const animationDirection = index % 2 === 0 ? 'fadeInLeft' : 'fadeInRight';

        setBlockAnimationClasses(
            blockAnimationClasses.map((job, j) => 
                j === index
                ? {...job, blockClasses: `${initialBlockClasses} ${animationDirection} animated show`}
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
        <section id="experience" className={sectionAnimationClasses}>
            <Waypoint onEnter={() => addRouteAnimationSectionClass()} />
            <div className="container-section">
                <div className="title">
                    <div className="section-title">
                        <h4>{translate('common.title_experience')}</h4>
                    </div>
                </div>
                {!loadedData && (<Spinner />)}
                {loadedData && (
                    <div className="resume-section experience">
                        <div className={classes['timeline-container']}>
                            { sectionData.map((experience: any, i: number) => (
                                <div key={i} className={blockAnimationClasses[i].blockClasses}>
                                    <Waypoint onEnter={() => addAnimationBlockClass(i)} />
                                    <div className={classes['timeline-year']}>
                                        <i>{experience.yearFrom}</i>
                                    </div>
                                    <div className={blockAnimationClasses[i].contentClasses}>
                                        <h2>
                                            <a href={experience.url} target="_blank" rel="noreferrer"><span>{experience.company}</span></a>
                                        </h2>
                                        <p>{experience.position} ( <DateFormattedText from={experience.dateFrom} to={experience.dateTo}/> <br /> {experience.place} </p>
                                        <span className={classes.arrow} title={`${translate('experience.showMoreAlt')}`} onClick={addExpandedBlockClass.bind(null, i)}></span>
                                        <div className={classes['job-description']}>
                                            <div className={classes.collapsible}>
                                                { experience.description.map((paragraph: any, j: number) => (
                                                    <p key={j}>{paragraph.text}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Experience;
