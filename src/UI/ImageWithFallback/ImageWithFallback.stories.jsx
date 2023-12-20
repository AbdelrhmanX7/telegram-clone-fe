import React from 'react';

import { Image } from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'UI/Image-with-fallback',
  component: Image,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = () => (
  <div className='flex gap-6'>
    <Image width={48} height={48} className='rounded-full' />
    <Image
      width={48}
      height={48}
      className='rounded-full'
      src={'https://images.freeimages.com/images/large-previews/aed/three-bees-on-sunflower-1337029.jpg'}
      blurDataURL=''
    />
  </div>
);

export const Default = Template.bind({});
