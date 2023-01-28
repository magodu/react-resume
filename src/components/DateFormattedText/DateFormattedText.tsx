import { useTranslation } from 'react-i18next';

import { getMonthName, getYear, calculatePeriod } from '../../utils';

interface dataTextProps {
    from: string;
    to: string;
}

const DateFormattedText: React.FC<dataTextProps> = ( {from, to} ) => {
    const [translate] = useTranslation('global');
    let dateTo: string = '';
    let period: string = calculatePeriod(from, to);

    const monthNameFrom: string = translate(`common.monthNames.${getMonthName(from)}`);
    const dateFrom: string = `${monthNameFrom} ${getYear(from)}`;
    if (to) {
        const monthNameTo: string = translate(`common.monthNames.${getMonthName(to)}`);
        dateTo = `${monthNameTo} ${getYear(to)}`;
    } else {
        dateTo = translate('experience.dates.today');
    }
    
    period = period
        .replace(/LIT_YEARS/, translate('experience.dates.years'))
        .replace(/LIT_YEAR/, translate('experience.dates.year'))
        .replace(/LIT_MONTHS/, translate('experience.dates.months'))
        .replace(/LIT_MONTH/, translate('experience.dates.month'));

    return ( <span>{`${dateFrom} - ${dateTo} | ${period}`}</span> );
};

export default DateFormattedText;
