import { useTranslation } from 'react-i18next';

import classes from './Loading.module.scss';

const Loading = () => {
    const [translate] = useTranslation('global');

    return (
        <div className={classes.loading}>
            <div className={`${classes.loader} no-select`}>{`${translate('common.loading')}`}</div>
        </div>
    );
};

export default Loading;
