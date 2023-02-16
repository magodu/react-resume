import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Pie from '../components/Pie/Pie';

describe('Pie component', () => {
    test('renders Pie component', () => {
        render(<Pie percentage={50} title="Test Pie" config={{}} />);
        const titleElement = screen.getByText(/Test Pie/i);
        expect(titleElement).toBeInTheDocument();
    });
});
