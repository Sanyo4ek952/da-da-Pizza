import { IStory } from '@shared/api/stories';
import { Api } from '@shared/api';
import React, { useEffect } from 'react';

export const useStories = () => {
  const [stories, setStories] = React.useState<IStory[]>([]);
  useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();
  }, []);
  return { stories };
};
