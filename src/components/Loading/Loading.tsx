import { useTranslation } from 'react-i18next';

import classes from './Loading.module.scss';
import loadingImage from '../../assets/images/loading.gif';


const Loading = () => {
    const [translate] = useTranslation('global');

    return (
        <div className={classes.loading}><img src={loadingImage} alt={`{${translate('loading')}`} /></div>
    );
};

export default Loading;
