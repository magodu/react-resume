const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

export const getMonthName = (date: string): string => {
    const splitedDate: string[] = date.split('/');
    const year: number = parseInt(splitedDate[2], 10);
    const month: number = parseInt(splitedDate[1], 10);
    const day: number = parseInt(splitedDate[0], 10);
    const formattedDate = new Date(year, month, day);

    return monthNames[formattedDate.getMonth() - 1];
};

export const getYear = (date: string): string => {
    const splitedDate: string[] = date.split('/');
    return splitedDate[2];
};


export const calculatePeriod = (dateFrom: string, dateTo: string): string => {
    let period = '',
        months = 0,
        years = 0,
        txtMonth = '',
        txtYear = '';

    const currentDate: Date = new Date(),
        currentDateFormated: string = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear(),
        dateF: any = dateFrom.split('/'),
        dateT: any = dateTo ? dateTo.split('/') : currentDateFormated.split('/'),
        fDate1: any = Date.UTC(dateF[2], dateF[1] - 1, dateF[0]),
        fDate2: any = Date.UTC(dateT[2], dateT[1] - 1, dateT[0]),
        dif: any = fDate2 - fDate1,
        days: number = Math.floor(dif / (1000 * 60 * 60 * 24));

    months = Math.ceil(days / 30);
    period = months > 1 ? months + ' LIT_MONTHS' : months + ' LIT_MONTH';

    if (months >= 12) {
        years = Math.floor(months / 12);

        if (months % 12 === 0) {
            period = years > 1 ? years + ' LIT_YEARS' : years + ' LIT_YEAR';
        } else {
            txtYear = years !== 1 ? ' LIT_YEARS' : ' LIT_YEAR';
            txtMonth = months % 12 !== 1 ? ' LIT_MONTHS' : ' LIT_MONTH';
            period =  years + txtYear + ', ' + (months % 12) + txtMonth ;
        }
    }

    return period;
};

export const isEmptyObject = (obj: any): boolean => {
    return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
};
