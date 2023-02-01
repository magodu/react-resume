import { useTranslation } from 'react-i18next';

import classes from './ErrorLoading.module.scss';

const ErrorLoading = () => {
    const [translate] = useTranslation('global');

    return (
        <div className={classes['loading-error']}>
            <div className={`alert alert-danger  ${classes.banner}`} role="alert">
                <i className="bi bi-exclamation-triangle"></i> <span>{translate('common.loadingError')}</span>
            </div>
            <div className={classes.web}>www.mariogonzalezduarte.es</div>
            <div className={classes.text}>{translate('common.loadingError2')}</div>
        </div>
    );
};

export default ErrorLoading;
