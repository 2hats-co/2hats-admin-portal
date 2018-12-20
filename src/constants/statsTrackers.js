export const trackers = {
    signup: { type:'candidate', name:'signup', label:'Sign ups', itemType:'tracker' },
    signup3rdParty: { type:'candidate', name:'signup-3rdParty', label:'3rd party sign ups', itemType:'tracker' },
    signupPassword: { type:'candidate', name:'signup-password', label:'Password sign ups', itemType:'tracker' },
    signupSpeedy: { type:'candidate', name:'signup-speedy', label:'Speedy sign ups', itemType:'tracker' },
    submission: { type:'candidate', name:'submission', label:'Submissions', itemType:'tracker' },

    discussionGroup: { type:'link', name:'DiscussionGroup', label:'Discussion Group links', itemType:'tracker' },

    submissionAccepted: { type:'talentTeam', name:'submissionAccepted', label:'Accepted submissions', itemType:'tracker' },
    submissionProcessed: { type:'talentTeam', name:'submissionProcessed', label:'Processed submissions', itemType:'tracker' },
    submissionRejected: { type:'talentTeam', name:'submissionRejected', label:'Rejected submissions', itemType:'tracker' },
    submissionReviewed: { type:'talentTeam', name:'submissionReviewed', label:'Reviewed submissions', itemType:'tracker' },
    submissionFeedbacked: { type:'talentTeam', name:'feedbacked', label:'Feedbacked submissions', itemType:'tracker' },

    feedbacked: { type:'me', name:'feedbacked', label:'Feedbacked by you', itemType:'tracker' },

    toBeFeedbacked: { label:'to be feedbacked', filters: [{ property: 'outcome', operation: '==', value: 'rejected' }, { property: 'feedbacked', operation: '==', value: false }], collection:'submissions', itemType:'query' },
    toBeInvited: { label:'to be invited', filters: [{ property: 'outcome', operation: '==', value: 'accepted' }, { property: 'feedbacked', operation: '==', value: false }], collection:'submissions', itemType:'query' },
    toBeScreened: { label:'to be screened', filters: [{ property: 'outcome', operation: '==', value: 'pending' }], collection:'submissions', itemType:'query' },
}

export const trackersList = Object.keys(trackers)
    .map(x => ({ name:x, itemType:trackers[x].itemType, label:trackers[x].label }));
