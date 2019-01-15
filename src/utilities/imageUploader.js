import { auth } from '../store';
import { uploader } from './firebaseStorage';
import Pica from 'pica';
const pica = Pica();
var img = new Image();
var canvas = document.createElement('canvas');
//takes in blob, callback returns download url

export const blobImageUploader = (initialBlob, callback) => {
  img.crossOrigin = 'Anonymous'; //cors support
  img.src = initialBlob.preview || initialBlob;
  const uid = auth.currentUser.uid;
  const ref = `studentPortal/${uid}/${initialBlob.name || 'image'}`;
  const minimumDimension = 500;
  img.onload = function() {
    const initialSize = { width: img.width, height: img.height };
    compressor(initialBlob.type, minimumDimension, initialSize, blob => {
      uploader(ref, blob, initialBlob.name, callback);
    });
  };
};
//compresses blob image
function compressor(fileType, minimumDimension, initialSize, callback) {
  const percentage = reductionPercentage(
    minimumDimension,
    smallest(initialSize.width, initialSize.height)
  );
  //set output dimensions
  canvas.width = initialSize.width * percentage;
  canvas.height = initialSize.height * percentage;
  pica
    .resize(img, canvas)
    .then(result => pica.toBlob(result, fileType))
    .then(blob => callback(blob));
}

//helpers
function smallest(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}
function reductionPercentage(min, val) {
  if (val < min) {
    return 0.99;
  } else {
    return min / val;
  }
}
