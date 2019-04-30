import React from 'react';

import ImageUploader from './ImageUploader';
import CroppedImageUploader from './CroppedImageUploader';

const Uploader = props => {
  if (props.aspectRatio) return <CroppedImageUploader {...props} />;
  return <ImageUploader {...props} />;
};

export default Uploader;
