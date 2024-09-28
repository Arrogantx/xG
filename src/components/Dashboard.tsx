import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import CampaignForm from './CampaignForm';

interface Campaign {
  id: string;
  tweetText: string;
  scheduleTime: string;
  status: string;
}

const Dashboard = () => {
  const { data: session } = useSession();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (session) {
        try {
          const response = await fetch('/api/campaigns');
          if (response.ok) {
            const data = await response.json();
            setCampaigns(data);
          } else {
            throw new Error('Failed to fetch campaigns');
          }
        } catch (error) {
          console.error('Error fetching campaigns:', error);
        }
      }
    };

    fetchCampaigns();
  }, [session]);

  return (
    <div>
      <h1>Dashboard</h1>
      <CampaignForm />
      <h2>Your Campaigns</h2>
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign.id}>
            {campaign.tweetText} - Scheduled for: {new Date(campaign.scheduleTime).toLocaleString()} - Status: {campaign.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;