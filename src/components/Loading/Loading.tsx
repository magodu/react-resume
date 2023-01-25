import classes from './Loading.module.scss';

const Loading = () => {

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

export default Loading;
