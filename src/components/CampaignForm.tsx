import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

const CampaignForm = () => {
  const { data: session } = useSession();
  const [tweetText, setTweetText] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      alert('You must be logged in to create a campaign');
      return;
    }

    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tweetText, scheduleTime }),
      });

      if (response.ok) {
        alert('Campaign created successfully');
        setTweetText('');
        setScheduleTime('');
      } else {
        throw new Error('Failed to create campaign');
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Failed to create campaign');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={tweetText}
        onChange={(e) => setTweetText(e.target.value)}
        placeholder="Enter your tweet"
        required
      />
      <input
        type="datetime-local"
        value={scheduleTime}
        onChange={(e) => setScheduleTime(e.target.value)}
        required
      />
      <button type="submit">Schedule Tweet</button>
    </form>
  );
};

export default CampaignForm;