export interface colorThemeType {
    description: string,
    color: string
} ;

export interface localStorageDataType {
    language: string,
    colorTheme: colorThemeType
};

export type SiteContextObj = {
    language: string;
    colorTheme: colorThemeType;
    data: any;
    isLoading: boolean,
    errorLoading: boolean,
    setLanguageHandler: (language: string) => void;
    setThemeHandler: (color: colorThemeType) => void;
    setData: (data: any) => void;
};

export interface InputProps {
    children: React.ReactElement;
}

export interface aboutBlocks {
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    address: string;
    nationality: string;
}

export interface experienceBlock {
    id: number,
    blockClasses: string,
    contentClasses: string,
    expanded: boolean
}

export interface course {
    description: string,
    imageName: string,
    imageSrc?: any,
    title: string

}

export interface contactBlock {
    phone: string,
    whatsapp: string,
    email: string,
    downloadLink: string,
    social: string
};

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

export type contactFormType = {
    subject: string;
    name: string;
    email: string;
    phone: string;
    message: string;
}
