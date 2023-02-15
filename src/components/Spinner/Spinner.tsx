import classes from './Spinner.module.scss';

const Spinner = () => {
   
    return (
        <div className="text-center" style={{'margin': '2rem 0'}} data-testid="loading">
            <div className={`spinner-border ${classes['spinner-color']}`} role="status"></div>
        </div>
    );
};

export default Spinner;
