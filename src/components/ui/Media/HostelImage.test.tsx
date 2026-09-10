import { render, screen } from '@testing-library/react';
import HostelImage from './HostelImage';

describe('HostelImage', () => {
  it('renders static image with alt text', () => {
    render(<HostelImage src="/images/static/hostel.jpg" alt="Cozy hostel room" />);
    expect(screen.getByAltText('Cozy hostel room')).toBeInTheDocument();
  });

  it('renders overlay children when provided', () => {
    render(
      <HostelImage src="/images/static/hostel.jpg" alt="Hostel">
        <span>Thamel</span>
      </HostelImage>
    );
    expect(screen.getByText('Thamel')).toBeInTheDocument();
  });
});
