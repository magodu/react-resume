import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import { useTranslation } from 'react-i18next';

import { SiteContext } from '../../store/site-context';
import { isEmptyObject } from '../../utils';

import Spinner from '../../components/Spinner/Spinner';

import classes from './Training.module.scss';

import { course } from '../../models/appTypes';


const Training = () => {
    const { data } = useContext(SiteContext);
    const [loadedData, setLoadedData] = useState<boolean>(false);
    const [sectionData, setSectionData] = useState<any>(null);
    const navigate = useNavigate();
    const [sectionAnimationClasses, setSectionAnimationClasses] = useState<string>('section');
    const [coursesAnimationClasses, setCoursesAnimationClasses] = useState<string>(`${classes['list-courses']} hide`);
    const [translate] = useTranslation('global');

    const sectionDataRef = useRef<any>([]);

    const loadCourseData = (courseData: course) => {
        return new Promise((resolve, reject) => {
            const cData: course = {
                description: courseData.description,
                imageName: courseData.imageName,
                imageSrc: require(`../../assets/images/courses/${courseData.imageName}`),
                title: courseData.title
            }

            const image = new Image();
            image.src = cData.imageSrc;
            
            image.onload = () =>
                resolve(cData);
           image.onerror = (error) => reject(error);
        });
    };

    useEffect(() => {
        if (!isEmptyObject(data)) {
            setLoadedData(true);
            const info = {
                training: data.training,
                complementaryTraining: data.complementaryTraining
            };

            setSectionData(info);
            sectionDataRef.current = info;

            Promise.all(sectionDataRef.current.complementaryTraining.map((courseData: any) => loadCourseData(courseData)))
                .then((response: any) => {
                    sectionDataRef.current.complementaryTraining = response;

                    setSectionData((prevData: any) => {
                        const newData = {...prevData};
                        newData.complementaryTraining = response;
                        
                        return newData;
                    });
                    
                })
                .catch((error) => {
                    console.log('Failed to load images', error);
                });

        }
    }, [data]);

    const addRouteAnimationSectionClass = () => {
        setSectionAnimationClasses('section fadeInUp animated');
        navigate('#training');
    };

    const addAnimationCoursesClasses = () => {
        setCoursesAnimationClasses(`${classes['list-courses']} fadeInUp animated show`);
    };

    return (
        <section id="training" className={sectionAnimationClasses}>
            <Waypoint onEnter={() => addRouteAnimationSectionClass()} />
            <div className="container-section">
                <div className="title">
                    <div className="section-title">
                        <h4>{translate('common.title_training')}</h4>
                    </div>
                </div>

                <div className={`row ${classes.training}`}>
                    <div className="col-md-12 col-xs-12">
                        <h2>{translate('training.education_subtitle')}</h2>
                        {!loadedData && (<Spinner />)}
                        {loadedData && (
                            <React.Fragment>
                                {sectionData.training.map((item: any, i: number) => (
                                    <article key={i}>
                                        <div className={classes['training-section']}>
                                            <div className={classes.degree}>{item.degree}</div>
                                            <div className={classes.place}>{item.place}</div>
                                        </div>
                                    </article>
                                ))}
                                <h2>{translate('training.courses_subtitle')}</h2>
                                <div className={classes.courses}>
                                    <ul className={coursesAnimationClasses}>
                                        <Waypoint onEnter={() => addAnimationCoursesClasses()} />
                                        {sectionData.complementaryTraining.map((item: any, i: number) => (
                                            <li key={i}>
                                                <img src={item.imageSrc} alt={item.title} />
                                                <h3>{item.title}</h3>
                                                <p>{item.description}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Training;
