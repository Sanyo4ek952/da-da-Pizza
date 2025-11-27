import React from 'react';
import { X } from 'lucide-react';
import ReactStories from 'react-insta-stories';
import { IStory } from '@shared/api/stories';
import { cn } from '@shared/lib/utils';

interface Props {
  className?: string;
  closeStory: VoidFunction;
  selectedStory: IStory;
}

export const ItemStory = ({ closeStory, className, selectedStory }: Props) => {
  return (
    <div
      className={cn(
        'absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30',
        className
      )}
    >
      <div className="relative" style={{ width: 520 }}>
        <button className="absolute -right-10 -top-5 z-30" onClick={closeStory}>
          <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
        </button>

        <ReactStories
          onAllStoriesEnd={closeStory}
          stories={
            selectedStory?.items.map((item) => ({
              url: item.sourceUrl,
            })) || []
          }
          defaultInterval={3000}
          width={520}
          height={800}
        />
      </div>
    </div>
  );
};
