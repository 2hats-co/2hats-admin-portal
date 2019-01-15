import { firebaseStorage } from '../store';

//uploads to storagebucket
export function uploader(ref, blob, name, callback) {
  const documentRef = firebaseStorage.child(ref);
  documentRef.put(blob).then(snapShot => {
    firebaseStorage
      .child(snapShot.metadata.fullPath)
      .getDownloadURL()
      .then(url => {
        callback(url, name);
      });
  });
}
