import {firestore} from '../store'
firestore.settings({ timestampsInSnapshots: true })
const submissionsCollection =  firestore.collection('submissions')

export async function getLastSubmission(UID,callback){
    let query = submissionsCollection.where('UID','==',UID).orderBy('createdAt','desc').limit(1)
    let results = await query.get()
    let submissionID = results.docs[0].id
    if(submissionID){
        let docRef = submissionsCollection.doc(submissionID);
        docRef.get().then(function(doc) {
            if (doc.exists) {
               callback(doc);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

}

export async function acceptSubmission(submissionID,callback){
    let submissionRef = submissionsCollection.doc(submissionID)
   /*
   WARNING: IT SEND OUT EMAILs
    submissionRef.update({isAccepted:true}).then((e)=>{callback(e)})
    */
}