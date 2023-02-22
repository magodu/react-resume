import { FastLearning, Mentoring, ProblemSolving, Support, TeamWork } from './svg-icons';
import './CustomIcon.scss';

const Icons = {
    fastLearning: () => <FastLearning />,
    problemSolving: () => <ProblemSolving />,
    teamWork: () => <TeamWork />,
    mentoring: () => <Mentoring />,
    support: () => <Support />,
} as const;

type IconNames = keyof typeof Icons;

interface IconProperties {
    className?: string;
    viewBox?: string;
    title?: string;
    style?: any;
    //fill?: string;
    role?: string;
    size?: string;
    name: IconNames;
}

const CustomIcon: React.FC<IconProperties> = ({ viewBox, title, size, name, className, ...props }) => {
    //const fill = props.fill ? props.fill : 'none';
    return (
        <svg width={size} height={size} viewBox={viewBox} className={className ? `custom-icons ${className}` : 'custom-icons'} xmlnsXlink="http://www.w3.org/1999/xlink" {...props}>
            {title && <title>{title}</title>}
            {Icons[name]()}
            <use data-variant="default" xlinkHref={`#icon-${name}`} x="0" y="0" />
            <view id="default" viewBox="0 0 24 24" />
        </svg>
    );
};

CustomIcon.defaultProps = {
    viewBox: '0 0 24 24',
    size: '24',
    role: 'img',
};

export default CustomIcon;
