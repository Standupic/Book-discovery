import * as React from 'react';
import { chakra, ImageProps, forwardRef } from '@chakra-ui/react';
import robots from '../robots.jpeg';

const Image = forwardRef<ImageProps, 'img'>((props, ref) => {
  const { src } = props;
  return <chakra.img src={robots} ref={ref} {...props} />;
});

export default Image;
