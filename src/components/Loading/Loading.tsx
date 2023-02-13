import { useTranslation } from 'react-i18next';

import i18n from '../../i18n';
import classes from './Loading.module.scss';
import loadingImage from '../../assets/images/loading.gif';

const Loading = () => {
    const [translate] = useTranslation('global', { i18n });

    return (
        <div className={classes.loading}>
            <img src={loadingImage} alt={`${translate('common.loading')}`} />
            {/* <img src={loadingImage} alt="Cargando" /> */}
        </div>
    );
};

export default Loading;
