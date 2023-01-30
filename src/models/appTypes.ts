

interface piePercentText {
    color?: string;
    size?: string;
}


export type pieChartConfigType = { 
    delay?: number,
    width?: number,
    height?: number,
    color: string,
    trackColor?: string,
    percentText: piePercentText
};
