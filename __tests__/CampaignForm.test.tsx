import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CampaignForm from '@/components/CampaignForm';

jest.mock('next-auth/react', () => ({
  useSession: () => ({ data: { user: { id: '123' } } }),
}));

describe('CampaignForm', () => {
  it('renders the form correctly', () => {
    render(<CampaignForm />);
    expect(screen.getByPlaceholderText('Enter your tweet')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Schedule Tweet' })).toBeInTheDocument();
  });

  it('submits the form with correct data', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: true })) as jest.Mock;
    render(<CampaignForm />);
    
    fireEvent.change(screen.getByPlaceholderText('Enter your tweet'), { target: { value: 'Test tweet' } });
    fireEvent.change(screen.getByRole('input', { type: 'datetime-local' }), { target: { value: '2023-05-01T12:00' } });
    fireEvent.click(screen.getByRole('button', { name: 'Schedule Tweet' }));

    expect(global.fetch).toHaveBeenCalledWith('/api/campaigns', expect.any(Object));
  });
});