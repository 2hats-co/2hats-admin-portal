import { __await } from 'tslib';

var Intercom = require('intercom-client');
var client = new Intercom.Client({ token: 'dG9rOmE4MThjZTZiXzVmNzhfNDFiMV9hNzYzX2JkYWZmZGE0MzU4MToxOjA=' });

const getConverstation = (conversationID)=>{
    return new Promise(function (fulfilled, rejected) {
    client.conversations.find({ id: conversationID}, e=>fulfilled({id:e.body.id,intialMessage:e.body.conversation_message,createdAt:e.body.created_at,assignee:e.body.assignee,parts:e.body.conversation_parts.conversation_parts}));})
}

const getIntercomIdWithUID = (UID)=>{
    return new Promise(function (fulfilled, rejected) {
        client.users.find({ user_id: UID }, r=>
        fulfilled(r.body.id));

    })
}
const getConversationIds = (UID) =>{
    return new Promise(function (fulfilled, rejected) {
        client.conversations.list({ type: "user",user_id:UID}, e=>{
            fulfilled(e.body.conversations.map(x=>x.id))
        });})
}
export const getConverstationsWithUID = async(UID)=>{
    const conversationIDs = await getConversationIds(UID)
    const conversations = await conversationIDs.map(async(x)=> await await getConverstation(x))
    return Promise.all(conversations);
}
