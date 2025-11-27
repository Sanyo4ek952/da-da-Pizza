'use client';

import React from 'react';
import { useStories } from '@shared/hooks/use-stories';
import { IStory } from '@shared/api/stories';
import SwiperStories from '@widgets/stories/ui/swiper-stories';
import { ItemStory } from '@widgets/stories/ui/item-story';
import { Container } from '@shared/ui';

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
  const { stories } = useStories();
  const [open, setOpen] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<IStory>();
  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };
  return (
    <>
      {stories.length === 0 &&
        [...Array(6)].map((_, index) => (
          <div
            key={index}
            className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse"
          />
        ))}
      <Container className={className}>
        <SwiperStories stories={stories} onClickStory={onClickStory} />
      </Container>
      {open && selectedStory && (
        <ItemStory
          selectedStory={selectedStory}
          closeStory={() => setOpen(false)}
        />
      )}
    </>
  );
};
