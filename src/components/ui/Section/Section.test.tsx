import { render, screen } from '@testing-library/react';
import { Section, SectionHeader, CTABanner, CTAButton } from './index';
import { HostelLoader } from '../Loader';

describe('Section UI kit', () => {
  it('renders Section with tone and container', () => {
    render(
      <Section tone="gray" container="md">
        <p>hello</p>
      </Section>
    );
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('renders SectionHeader eyebrow + title + description', () => {
    render(<SectionHeader eyebrow="Services" title="What We Offer" description="desc" />);
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('What We Offer')).toBeInTheDocument();
    expect(screen.getByText('desc')).toBeInTheDocument();
  });

  it('renders CTABanner with primary link', () => {
    render(
      <CTABanner title="Ready?" description="go" primaryLabel="Start" primaryHref="/register" />
    );
    expect(screen.getByText('Ready?')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /start/i })).toHaveAttribute('href', '/register');
  });

  it('renders CTAButton as link and button', () => {
    const { rerender } = render(
      <CTAButton href="/hostels" variant="dark">
        Explore
      </CTAButton>
    );
    expect(screen.getByRole('link', { name: /explore/i })).toHaveAttribute('href', '/hostels');
    rerender(<CTAButton variant="lime">Click</CTAButton>);
    expect(screen.getByRole('button', { name: /click/i })).toBeInTheDocument();
  });

  it('renders unique HostelLoader with label', () => {
    render(<HostelLoader label="Finding cozy stays…" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Finding cozy stays…');
  });
});
