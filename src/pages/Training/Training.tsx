/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';
import { Waypoint } from 'react-waypoint';

import classes from './Training.module.scss';

interface imageList {
    name: string;
    image: any;
  }

const DUMMY_DATA = [
    {
        description: 'Udemy',
        image: 'course-react.png',
        title: 'React',
    },
    {
        description: 'Udemy',
        image: 'course-angular2.png',
        title: 'Angular',
    },
    {
        description: 'Udemy',
        image: 'course-typescript.png',
        title: 'Typescript',
    },
    {
        description: 'Formación interna. Adesis.',
        image: 'course-angular-js.png',
        title: 'AngularJS',
    },
    {
        description: 'Formación interna. Adesis.',
        image: 'course-angularjs-directives.png',
        title: 'Directivas de AngularJS',
    },
    {
        description: 'Udemy',
        image: 'course-lwc.png',
        title: 'Lightning Web Components',
    },
    {
        description: 'Formación interna. Adesis.',
        image: 'course-clean-code.png',
        title: 'Código limpio',
    },
    {
        description: 'Formación interna. Adesis.',
        image: 'course-node-js.png',
        title: 'NodeJS',
    },
    {
        description: 'Formación interna. Adesis.',
        image: 'course-closures.png',
        title: 'Closures',
    },
    {
        description: 'Formación interna. Adesis.',
        image: 'course-memory-leaks.png',
        title: 'Memory Leaks',
    },
    {
        description: 'Formación interna. Adesis.',
        image: 'course-functional-programming.png',
        title: 'Programación funcional',
    },
    {
        description: 'Formación interna. Adesis.',
        image: 'course-polymer.png',
        title: 'Polymer',
    },
    {
        description: 'ESINE. 300 horas. Educación a distancia.',
        image: 'course-e-commerce.png',
        title: 'Curso superior de Internet y Comercio electrónico.',
    },
    {
        description: 'UNED. 3 creditos. Ávila',
        image: 'course-web-design.png',
        title: 'Curso práctico de diseño web',
    },
    {
        description: 'Formanet, Santander',
        image: 'course-photoshop.png',
        title: 'Curso de retoque fotográfico con Adobe Photoshop',
    },
    {
        description: 'Universidad de Cantabria. Cursos de verano',
        image: 'course-java.png',
        title: 'Java. Cursos de verano',
    },
    {
        description: 'MSL Formación. 60 horas. Madrid',
        image: 'course-dot-net.png',
        title: 'Curso certificado por Microsoft para el desarrollo e implentación de aplicaciones web con Microsoft Visual Basic .NET .MOC 6463A',
    },
];


const Training = () => {
    const [sectionAnimationClasses, setSectionAnimationClasses] = useState<string>('section');
    const [coursesAnimationClasses, setCoursesAnimationClasses] = useState<string>('list-courses');

    const addAnimationSectionClasses = () => {
        setSectionAnimationClasses('section fadeInUp animated');
    };

    const addAnimationCoursesClasses = () => {
        setCoursesAnimationClasses(`${classes['list-courses']} fadeInUp animated`);
    };

    const images: Array<imageList> =  DUMMY_DATA.map((item, i) => (    
        {
            name: item.image,
            image: require(`../../assets/images/courses/${item.image}`)
        }
    ));

    const getImage = (name: string) => {
        const found = images.find(e => e.name === name);
        return found ? found.image : null;
    };
    

    return (
        <section id="training" className={sectionAnimationClasses}>
            <Waypoint onEnter={() => addAnimationSectionClasses()} />
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
                            
                            <ul className={coursesAnimationClasses}>
                                <Waypoint onEnter={() => addAnimationCoursesClasses()} />
                                {DUMMY_DATA.map((item, i) => (
                                    <li key={i}>
                                        <img src={getImage(item.image)} alt={item.title} />
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Training;
