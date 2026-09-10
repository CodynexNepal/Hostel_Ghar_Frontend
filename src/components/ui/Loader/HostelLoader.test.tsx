import { render, screen } from '@testing-library/react';
import HostelLoader, { HostelLoaderProps } from './HostelLoader';
import PageSkeleton from './PageSkeleton';

describe('HostelLoader (unique Hostel Ghar loader)', () => {
  it('renders house variant with default label', () => {
    render(<HostelLoader />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getAllByText('Finding cozy stays…').length).toBeGreaterThanOrEqual(1);
  });

  it.each([['pulse'], ['bed'], ['bars']] as HostelLoaderProps['variant'][][])(
    'renders %s variant',
    (variant) => {
      render(<HostelLoader variant={variant} label="Loading" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    }
  );

  it('renders fullscreen overlay', () => {
    const { container } = render(<HostelLoader fullScreen label="Loading Hostel Ghar…" />);
    expect(container.firstChild).toHaveClass('fixed');
  });

  it('renders PageSkeleton with shimmer cards', () => {
    render(<PageSkeleton />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
