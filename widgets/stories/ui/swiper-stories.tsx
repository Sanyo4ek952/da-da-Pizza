'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IStory } from '@shared/api/stories';
import Image from 'next/image';
import 'swiper/css';

interface Props {
  className?: string;
  stories: IStory[];
  onClickStory: (story: IStory) => void;
}

const SwiperStories = ({ stories, onClickStory }: Props) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={4}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      className={'flex'}
      breakpoints={{
        640: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 10,
        },
      }}
    >
      {stories.map((story) => (
        <SwiperSlide key={story.id}>
          <Image
            alt={'story'}
            onClick={() => onClickStory(story)}
            className="rounded-md cursor-pointer"
            height={250}
            width={200}
            src={story.previewImageUrl}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperStories;
