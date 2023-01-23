/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';

import classes from './Training.module.scss';


interface course {
    description: string,
    imageName: string,
    imageSrc?: any,
    title: string

}

const DUMMY_DATA = [
    {
        description: 'Udemy',
        imageName: 'course-react.png',
        title: 'React',
    },
    {
        description: 'Udemy',
        imageName: 'course-angular2.png',
        title: 'Angular',
    },
    {
        description: 'Udemy',
        imageName: 'course-typescript.png',
        title: 'Typescript',
    },
    {
        description: 'Formación interna. Adesis.',
        imageName: 'course-angular-js.png',
        title: 'AngularJS',
    },
    {
        description: 'Formación interna. Adesis.',
        imageName: 'course-angularjs-directives.png',
        title: 'Directivas de AngularJS',
    },
    {
        description: 'Udemy',
        imageName: 'course-lwc.png',
        title: 'Lightning Web Components',
    },
    {
        description: 'Formación interna. Adesis.',
        imageName: 'course-clean-code.png',
        title: 'Código limpio',
    },
    {
        description: 'Formación interna. Adesis.',
        imageName: 'course-node-js.png',
        title: 'NodeJS',
    },
    {
        description: 'Formación interna. Adesis.',
        imageName: 'course-closures.png',
        title: 'Closures',
    },
    {
        description: 'Formación interna. Adesis.',
        imageName: 'course-memory-leaks.png',
        title: 'Memory Leaks',
    },
    {
        description: 'Formación interna. Adesis.',
        imageName: 'course-functional-programming.png',
        title: 'Programación funcional',
    },
    {
        description: 'Formación interna. Adesis.',
        imageName: 'course-polymer.png',
        title: 'Polymer',
    },
    {
        description: 'ESINE. 300 horas. Educación a distancia.',
        imageName: 'course-e-commerce.png',
        title: 'Curso superior de Internet y Comercio electrónico.',
    },
    {
        description: 'UNED. 3 creditos. Ávila',
        imageName: 'course-web-design.png',
        title: 'Curso práctico de diseño web',
    },
    {
        description: 'Formanet, Santander',
        imageName: 'course-photoshop.png',
        title: 'Curso de retoque fotográfico con Adobe Photoshop',
    },
    {
        description: 'Universidad de Cantabria. Cursos de verano',
        imageName: 'course-java.png',
        title: 'Java. Cursos de verano',
    },
    {
        description: 'MSL Formación. 60 horas. Madrid',
        imageName: 'course-dot-net.png',
        title: 'Curso certificado por Microsoft para el desarrollo e implentación de aplicaciones web con Microsoft Visual Basic .NET .MOC 6463A',
    },
];

const Training = () => {
    const navigate = useNavigate();
    const [sectionAnimationClasses, setSectionAnimationClasses] = useState<string>('section');
    const [coursesAnimationClasses, setCoursesAnimationClasses] = useState<string>(classes['list-courses']);
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

    const courses = useRef<Array<course>>([]);

    const addRouteAnimationSectionClass = () => {
        setSectionAnimationClasses('section fadeInUp animated');
        navigate('#training');
    };

    const addAnimationCoursesClasses = () => {
        setCoursesAnimationClasses(`${classes['list-courses']} fadeInUp animated`);
    };

    useEffect(() => {
        const loadCourseData = (data: course) => {
            return new Promise((resolve, reject) => {
                const courseData: course = {
                    description: data.description,
                    imageName: data.imageName,
                    imageSrc: require(`../../assets/images/courses/${data.imageName}`),
                    title: data.title
                }

                const image = new Image();
                image.src = courseData.imageSrc;
                
                image.onload = () =>
                    resolve(courseData);
               image.onerror = (error) => reject(error);
            });
        };

        Promise.all(DUMMY_DATA.map((data) => loadCourseData(data)))
            .then((response: any) => {
                courses.current = response;
                setImagesLoaded(true);
            })
            .catch((error) => {
                console.log('Failed to load images', error);
            });
    }, []);

    return (
        <section id="training" className={sectionAnimationClasses}>
            <Waypoint onEnter={() => addRouteAnimationSectionClass()} />
            <div className="container-section">
                <div className="title">
                    <div className="section-title">
                        <h4>Training</h4>
                    </div>
                </div>

                <div className={`row ${classes.training}`}>
                    <div className="col-md-12 col-xs-12">
                        <h2>Education</h2>
                        <article>
                            <div className={classes['training-section']}>
                                <div className={classes.degree}>Higher Level Training Cycle (CFGS) in Management Information Systems. Computer and Information Sciences.</div>
                                <div className={classes.place}>IES Alisal. Santander (Spain)</div>
                            </div>
                        </article>
                        <h2>Courses</h2>
                        <div className={classes.courses}>
                            {
                                imagesLoaded ? (
                                <ul className={coursesAnimationClasses}>
                                    <Waypoint onEnter={() => addAnimationCoursesClasses()} />
                                    {courses.current.map((item, i) => (
                                        <li key={i}>
                                            <img src={item.imageSrc} alt={item.title} />
                                            <h3>{item.title}</h3>
                                            <p>{item.description}</p>
                                        </li>
                                    ))}
                                </ul> ) : (
                                <div className="spinner-border text-dark" role="status"></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Training;
