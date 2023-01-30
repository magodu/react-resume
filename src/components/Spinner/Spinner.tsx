import classes from './Spinner.module.scss';

const Spinner = () => {

    return (
        <div className={classes.loading}>
            <div className={classes.loader}>
                <div className={classes.circle}>
                    <div className={classes.inner}></div>
                </div>
                <div className={classes.circle}>
                    <div className={classes.inner}></div>
                </div>
                <div className={classes.circle}>
                    <div className={classes.inner}></div>
                </div>
                <div className={classes.circle}>
                    <div className={classes.inner}></div>
                </div>
                <div className={classes.circle}>
                    <div className={classes.inner}></div>
                </div>
            </div>
        </div>
    );
};

export default Spinner;



// const Spinner = () => {
   
//     return (
//         <div className="text-center"style={{'margin': '2rem 0'}} >
//             <div className="spinner-border text-dark" role="status"></div>
//         </div>
//     );
// };

// export default Spinner;
