/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import { useTranslation } from 'react-i18next';

import { SiteContext } from '../../store/site-context';
import { isEmptyObject } from '../../utils';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import Pie from '../../components/Pie/Pie';
import Spinner from '../../components/Spinner/Spinner';
import CustomIcon from '../../components/CustomIcon/CustomIcon';

import classes from './Skills.module.scss';
import { pieChartConfigType } from '../../models/appTypes';

const Skills = () => {
    const { colorTheme, data } = useContext(SiteContext);
    const [loadedData, setLoadedData] = useState<boolean>(false);
    const [sectionData, setSectionData] = useState<any>(null);
    const navigate = useNavigate();
    const [sectionAnimationClasses, setSectionAnimationClasses] = useState<string>('section');
    const [translate] = useTranslation('global');
    const { height, width } = useWindowDimensions();
    const isMobile = useRef<boolean>(false);

    const pieChartConfig: pieChartConfigType = {
        delay: 1000,
        color: colorTheme.color,
        percentText: {
            color: '#58666e',
        },
    };

    useEffect(() => {
        isMobile.current = width && width <= 400 ? true : false;
    }, [height, width]);

    useEffect(() => {
        if (!isEmptyObject(data)) {
            setLoadedData(true);

            setSectionData({
                skills: data.skills,
                languages: data.languages.map((obj: any) => ({ ...obj, initialValue: '1' })),
            });
        }
    }, [data]);

    const setSkillBarValues = () => {
        const identifier = setTimeout(() => {
            document.querySelectorAll('.progress-bar').forEach((barElem) => {
                if (barElem instanceof HTMLElement) {
                    const value = `${barElem.dataset.progress}%`;
                    barElem.style.width = value;
                }
            });
            clearTimeout(identifier);
        }, 1000);
    };

    const setLanguageValues = () => {
        setSectionData((prevData: any) => {
            const newData = { ...prevData };
            newData.languages = newData.languages && newData.languages.map((lng: any) => ({ ...lng, initialValue: lng.level }));
            return newData;
        });
    };

    const addRouteAnimationSectionClass = () => {
        setSectionAnimationClasses('section fadeInUp animated');
        navigate('#skills');

        setSkillBarValues();
    };

    return (
        <section id="skills" className={sectionAnimationClasses}>
            <Waypoint onEnter={() => addRouteAnimationSectionClass()} />
            <div className="container-section">
                <div className="title">
                    <div className="section-title">
                        <h4>{translate('common.title_skills')}</h4>
                    </div>
                </div>

                <div className={classes['skills-wrapper']}>
                    {!loadedData && <Spinner />}
                    {loadedData && (
                        <ul className={classes.skills}>
                            {sectionData.skills.map((skill: any, i: number) => (
                                <li key={i}>
                                    {!isMobile.current && (
                                        <div className={`progress ${classes['progress-wrapper']}`}>
                                            <div className={classes.lead}>{skill.skill}</div>
                                            <div className={`progress-bar ${classes['progress-color']}`} role="progressbar" data-progress={skill.level}>
                                                <span className={classes.percentage}>{skill.level}%</span>
                                            </div>
                                        </div>
                                    )}

                                    {isMobile.current && (
                                        <div className={`progress ${classes['progress-wrapper']}`}>
                                            <div className={classes.lead}>
                                                <span>{skill.skill}</span>
                                                <span className={classes['percentage']}>{skill.level}%</span>
                                            </div>
                                            <div className={`progress-bar ${classes['progress-color']}`} role="progressbar" data-progress={skill.level}></div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <Waypoint onEnter={() => setLanguageValues()} />
                <div className={classes['skill-language']}>
                    <h2>{translate('skills.languages_subtitle')}</h2>
                    {!loadedData && <Spinner />}
                    {loadedData && (
                        <div className="col-sm-12">
                            <div className="skills">
                                <div className="row">
                                    {sectionData.languages.map((language: any, i: number) => (
                                        <div key={i} className="col-md-4 col-xs-4">
                                            <Pie percentage={language.initialValue} title={`${language.language}`} config={pieChartConfig} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className={classes['soft-skills']}>
                    <h2>{translate('skills.softSkills_subtitle')}</h2>
                    <div className={`row no-gutters ${classes.wrapper}`}>
                        <div className={`col-md-2 col-sm-4 col-xs-2 ${classes.box}`}>
                            <div className={classes['interest-icon']}>
                                <CustomIcon name="fastLearning" size="60" className="icon-white" />
                                <span>{translate('skills.softSkills.fastLearner')}</span>
                            </div>
                        </div>
                        <div className={`col-md-2 col-sm-4 col-xs-2 ${classes.box}`}>
                            <div className={classes['interest-icon']}>
                                <CustomIcon name="teamWork" size="60" className="icon-black" />
                                <span>{translate('skills.softSkills.teamPlayer')}</span>
                            </div>
                        </div>
                        <div className={`col-md-2 col-sm-4 col-xs-2 ${classes.box}`}>
                            <div className={classes['interest-icon']}>
                                <CustomIcon name="problemSolving" size="60" className="icon-white" />
                                <span>{translate('skills.softSkills.problemSolving')}</span>
                            </div>
                        </div>
                        <div className={`col-md-2 col-sm-4 col-xs-2 ${classes.box}`}>
                            <div className={classes['interest-icon']}>
                                <CustomIcon name="mentoring" size="60" className="icon-black" />
                                <span>{translate('skills.softSkills.mentoring')}</span>
                            </div>
                        </div>
                        <div className={`col-md-2 col-sm-4 col-xs-2 ${classes.box}`}>
                            <div className={classes['interest-icon']}>
                                <CustomIcon name="support" size="60" className="icon-white" />
                                <span>{translate('skills.softSkills.support')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
