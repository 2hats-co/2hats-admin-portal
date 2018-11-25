export const rejectedWithFeedback = [
    {   
        type:'paragraph',
        replaceables:{content:`Hi #firstName#,`}
    },
    {   
        type:'paragraph',
        replaceables:{content:`Thank you for submitting your profile to 2hats! We've now finished reviewing it.`}
    },
    {   
        type:'paragraph',
        replaceables:{content:`You can now take a look at your dashboard for personalised feedback on your resume. This includes what you've done well and the areas of your resume that could be improved.`}
    }, 
    {   
        type:'paragraph',
        replaceables:{content:`At this stage we feel there is a mismatch between the opportunities that 2hats has available and the skill-set and interests that you've demonstrated in your resume. As such we will not be progressing your application to the next stage. `}
    },{
        type:'button',
        replaceables:{url:'https://portal.2hats.com.au/?slink=#smartLink#',label:'Read Feedback'}
      },
    {   
        type:'paragraph',
        replaceables:{content:`We wish you all the best in your future endeavours!`}
    },{
        type:'signture',
        replaceables:{greeting:'Regards',title:'#senderTitle#',name:'#senderName#',company:'2hats'}
      },
] 

export const outsideDemographic = [
    {   
        type:'paragraph',
        replaceables:{content:`Hi #firstName#,`}
    },
    {   
        type:'paragraph',
        replaceables:{content:`2hats is a talent incubator, created to help students get onto professional pathways. At this stage we look for current students or recent graduates to take through our industry readiness selection processes and training. We believe there’s a mismatch between your experience and the pathways we offer. Based on this we won’t progress your application further and wish you all the best with your job search.`}
    },  {   
        type:'paragraph',
        replaceables:{content:`Best of luck,`}
    },
    {
        type:'signture',
        replaceables:{greeting:'Regards',title:'#senderTitle#',name:'#senderName#',company:'2hats'}
      },
]
export const outsideIndusty = [
    {   
        type:'paragraph',
        replaceables:{content:`Hi #firstName#,`}
    },
    {   
        type:'paragraph',
        replaceables:{content:`2hats is a talent incubator, created to help students get onto professional pathways. We're currently accepting students into marketing and sales, however wish to keep your details in case we experience demand from businesses in your area - we may be in touch!`}
    },  {   
        type:'paragraph',
        replaceables:{content:`In the meantime, we encourage you to keep building up your skills and experience as well as to seek out other opportunities!`}
    }, {   
        type:'paragraph',
        replaceables:{content:`Best regards,`}
    },
    {
        type:'signture',
        replaceables:{greeting:'Regards',title:'#senderTitle#',name:'#senderName#',company:'2hats'}
      },
] 