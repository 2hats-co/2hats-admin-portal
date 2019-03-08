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

export async function asyncUploader(ref, file) {
  const documentRef = firebaseStorage.child(ref);
  const snapShot = await documentRef.put(file);
  const downloadUrl = await firebaseStorage
    .child(snapShot.metadata.fullPath)
    .getDownloadURL();
  return downloadUrl;
}
