'use client';

import { IStory } from '@shared/api/stories';
import React from 'react';
import { Container } from '@shared/ui';
import { cn } from '@shared/lib/utils';
import Image from 'next/image';
import { useStories } from '@shared/hooks/use-stories';
import { ItemStory } from '@widgets/stories/ui/item-story';

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
      <Container
        className={cn(
          'flex overflow-hidden items-center justify-between gap-2 my-10',
          className
        )}
      >
        {stories.length === 0 &&
          [...Array(6)].map((_, index) => (
            <div
              key={index}
              className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse"
            />
          ))}

        {stories.map((story) => (
          <Image
            alt={'story'}
            key={story.id}
            onClick={() => onClickStory(story)}
            className="rounded-md cursor-pointer"
            height={250}
            width={200}
            src={story.previewImageUrl}
          />
        ))}

        {open && selectedStory && (
          <ItemStory
            selectedStory={selectedStory}
            closeStory={() => setOpen(false)}
          />
        )}
      </Container>
    </>
  );
};
