const React = require('react');
const reactI18next = require('react-i18next');
let root = __dirname;
var fs = require('fs');

//console.log(root.replace("src\\__mocks__","public\\assets\\i18n\\{{ns}}.json"))
const hasChildren = (node) => node && (node.children || (node.props && node.props.children));

const getChildren = (node) =>
    node && node.children ? node.children : node.props && node.props.children;

const renderNodes = (reactNodes) => {
    if (typeof reactNodes === 'string') {
        return reactNodes;
    }

    return Object.keys(reactNodes).map((key, i) => {
        const child = reactNodes[key];
        const isElement = React.isValidElement(child);

        if (typeof child === 'string') {
            return child;
        }
        if (hasChildren(child)) {
            const inner = renderNodes(getChildren(child));
            return React.cloneElement(child, { ...child.props, key: i }, inner);
        }
        if (typeof child === 'object' && !isElement) {
            return Object.keys(child).reduce((str, childKey) => `${str}${child[childKey]}`, '');
        }

        return child;
    });
};

let language = 'es';
const useMock = [(k) => k, {}];
let traduccions = root.replace('src\\__mocks__', `public\\assets\\i18n\\commons\\${language}.json`)

let changeLanguage = (lng = 'es') => {
    useMock.language = lng;
}

useMock.i18n = { 
    ns: ['commons'],
    defaultNS: 'commons',
    changeLanguage,
    language,
};
useMock.t = (k) => { 
    const result =()=> fs.readFileSync(traduccions,'utf8', function (err, data) {
        if (err) {
           return console.error(err);
        }
       return data.toString()
     });  
    let termsToSearch = k.replace(`${useMock.i18n.defaultNS}:`,'').split('.')
    let res =JSON.parse(result());
    termsToSearch.forEach(element => {
         res=res[element];
    });
    return res;
};



/**
 * commons:language.language
 */



module.exports = {
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    withTranslation: () => (Component) => (props) => <Component t={(k) => k} {...props} />,
    Trans: ({ children }) =>
        Array.isArray(children) ? renderNodes(children) : renderNodes([children]),
    Translation: ({ children }) => children((k) => k, { i18n: {} }),
    useTranslation: () => useMock,

    // mock if needed
    I18nextProvider: reactI18next.I18nextProvider,
    initReactI18next: reactI18next.initReactI18next,
    setDefaults: reactI18next.setDefaults,
    getDefaults: reactI18next.getDefaults,
    setI18n: reactI18next.setI18n,
    getI18n: reactI18next.getI18n,
};