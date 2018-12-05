export const rejectedWithFeedback ={ 
    index:1,
    templateName:'rejected with Feedback',
    subject:'Thank You For Applying!',
    elements:[
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
      replaceables:{url:'https://portal.2hats.com.au/smartLinks?slKey=#smartLink#',label:'Read Feedback'}
     },
    {  
      type:'paragraph',
      replaceables:{content:`We wish you all the best in your future endeavours!`}
    },{
      type:'signture',
      replaceables:{greeting:'Regards',title:'#senderTitle#',name:'#senderName#',company:'2hats'}
     },
  ] }
  export const outsideDemographic ={ 
    index:2,
    templateName:'rejected outside of demographic',
    subject:'2hats Mismatch :/ ',
    elements:[
    {  
      type:'paragraph',
      replaceables:{content:`Hi #firstName#,`}
    },
    {  
      type:'paragraph',
      replaceables:{content:`2hats is a talent incubator, created to help students get onto professional pathways. At this stage we look for current students or recent graduates to take through our industry readiness selection processes and training. We believe there’s a mismatch between your experience and the pathways we offer. Based on this we won’t progress your application further and wish you all the best with your job search.`}
    }, 
    {
      type:'signture',
      replaceables:{greeting:'Best of luck,',title:'#senderTitle#',name:'#senderName#',company:'2hats'}
     },
  ]}
  
  
  export const outsideIndusty ={ 
    index:3,
    templateName:'rejected outside of Industry',
    subject:'Thanks For Your Application',
    elements:[
    {  
      type:'paragraph',
      replaceables:{content:`Hi #firstName#,`}
    },
    {  
      type:'paragraph',
      replaceables:{content:`2hats is a talent incubator, created to help students get onto professional pathways. We're currently progressing students into marketing and sales only. However we'd like to keep your details so as soon as we have demand in your area we can be in touch!`}
    }, {  
      type:'paragraph',
      replaceables:{content:`In the meantime, we encourage you to keep building up your skills and experience!`}
    }, {  
      type:'paragraph',
      replaceables:{content:`Best regards`}
    },
    {
      type:'signture',
      replaceables:{greeting:'Regards',title:'#senderTitle#',name:'#senderName#',company:'2hats'}
     },
  ] }
  export const interviewAccepted ={ 
    index:4,
    templateName:'Interview Accepted',
    subject:'2hats Interview Outcome!',
    elements:[
    {  
      type:'paragraph',
      replaceables:{content:`Hey #firstName#,`}
    },
    {  
      type:'paragraph',
      replaceables:{content:`Congratulations, you have successfully progressed to the next stage of the 2hats application process!`}
    }, {  
      type:'paragraph',
      replaceables:{content:`We'd like to invite you to the final stage of the 2hats application process, an in person assessment centre in our Sydney CBD Head Office!`}
    }, {  
      type:'paragraph',
      replaceables:{content:`The assessment centre is an opportunity for you to showcase your skills. You will be required to complete an individual task that is similar to what you will be required to do during your industry placement.`}
    },
    {
  type:'paragraph',
      replaceables:{content:`If you're successful in our assessment centre, you'll join the 2hats talent pool and open the door to a huge variety of paid professional work opportunities and take the first step of your future career!`}
    }, {  
      type:'paragraph',
      replaceables:{content:`The available time slots for the assessment centre are as follows:`}
    }, {  
      type:'paragraph',
      replaceables:{content:`We expect that the assessment centre will take up to 2.5 hours to complete. Please respond to this email confirming your time slot preference, and we will book you in and send you the relevant details.`}
    },{  
      type:'paragraph',
      replaceables:{content:`Looking forward to meeting you in person,`}
    },
    {
      type:'signture',
      replaceables:{greeting:'Regards',title:'#senderTitle#',name:'#senderName#',company:'2hats'}
     },
  ] }
  export const interviewRejected ={ 
    index:5,
    templateName:'Interview Rejected',
    subject:'2hats Interview Outcome',
    elements:[
    {  
      type:'paragraph',
      replaceables:{content:`Hey #firstName#,`}
    },
    {  
      type:'paragraph',
      replaceables:{content:`Thanks for taking the time to have a chat with us here at 2hats.`}
    }, {  
      type:'paragraph',
      replaceables:{content:`It was great getting to know you better, and we hope that the experience has given you some more practice for undertaking interviews in the future.`}
    }, {  
      type:'paragraph',
      replaceables:{content:`Unfortunately at this stage we will not be able to progress any further with your application. We only invite those who we believe will pass our assessment centre to come through to the final step in the 2hats process. At this point in time we do not believe that you have the relevant industry skills and experience to move through into a paid industry placement with 2hats. We encourage you to focus on developing your soft and hard skills through other internships, societies and projects! `}
    },
    {
  type:'paragraph',
      replaceables:{content:`We wish you all the best`}
    }, 
    {  
    
      type:'signture',
      replaceables:{greeting:'Regards',title:'#senderTitle#',name:'#senderName#',company:'2hats'}
     },
  ] }
  export const acInfo ={ 
    index:5,
    templateName:'Assessment Centre Information',
    subject:'2hats Assessment Centre Information',
    elements:[
    {  
      type:'paragraph',
      replaceables:{content:`Hi #firstName#,`}
    },
    {  
      type:'paragraph',
      replaceables:{content:`Congratulations on progressing through to the 2hats assessment centre! This email includes important information about what you can expect on the day, and what you should bring.`}
    }, {  
      type:'paragraph',
      replaceables:{content:`Where and when will the assessment centre be held?`}
    },  {  
      type:'point',
      replaceables:{label:`Time`,content:'##'}
   },  {  
      type:'point',
      replaceables:{label:`Stream`,content:'##'}
   },  {  
      type:'point',
      replaceables:{label:`Location`,content:'2hats Head Office, 66 Devonshire Street, Surry Hills'}
    },{  
      type:'paragraph',
      replaceables:{content:`We expect that the assessment centre will take up to 2.5 hours to complete.`}
    },
    {
  type:'paragraph',
      replaceables:{content:`Please make sure you’re on time! If you experience any delays, let us know as soon as possible at 0424 379 980.`}
    }, 
    {  
    type:'paragraph',
      replaceables:{content:`You should dress in business casual. If you’re not sure what to wear, you can check out our dress code advice below!`}
   },{
      type:'button',
      replaceables:{url:'https://firebasestorage.googleapis.com/v0/b/production2hats.appspot.com/o/assests%2FHow%20to%20Dress%20Professionally%20MEN.png?alt=media&token=477d48c9-6bed-44d1-b417-2104b48c920d',label:'Guy dress code'}
   },{
      type:'button',
      replaceables:{url:'https://firebasestorage.googleapis.com/v0/b/production2hats.appspot.com/o/assests%2FHow%20to%20Dress%20Professionally.png?alt=media&token=b8079537-4b51-46e4-9fdc-29c4898b03b3',label:'Girl dress code'}
    }, 
    {  
  type:'paragraph',
      replaceables:{content:`What will I be doing?`}
    }, 
    {  
  type:'paragraph',
      replaceables:{content:`1. A business case study. You will be given an individual task to complete that simulates what you would be doing in your placements. You will be given time to work on the case and prepare a 10-minute presentation to showcase your work.`}
    }, 
    { 
  type:'paragraph',
      replaceables:{content:`2. A personality quiz. This helps 2hats staff match our students with the right company culture for them.`}
    }, 
    {  
  type:'paragraph',
      replaceables:{content:`3. Getting to know 2hats. There will be an opportunity for you to talk with the 2hats talent team about our process, career advice, tips and just general questions you may have.`}
    }, 
    {  
  type:'paragraph',
      replaceables:{content:`What do I need to bring?`}
    }, 
    {  
  type:'paragraph',
      replaceables:{content:`A laptop and charger. You will need these for your business case study on the day. You will also need to have the relevant software installed in your computer e.g. Adobe Creative Suite, your energy and enthusiasm!`}
    }, 
    {   
  type:'paragraph',
      replaceables:{content:`How do I confirm my attendance to the assessment centre?`}
    }, 
    {  
  type:'paragraph',
      replaceables:{content:`You should confirm your attendance by responding to this email.`}
    }, 
    {  
  type:'paragraph',
      replaceables:{content:`We’re looking forward to meeting you in person! Please don't hesitate to get in contact if you have any questions.`}
    }, 
    {  
  type:'paragraph',
      replaceables:{content:`Kind regards,`}
    }, 
    {  
      type:'signture',
      replaceables:{greeting:'Regards',title:'#senderTitle#',name:'#senderName#',company:'2hats'}
     },
  ] }
  
  export const psychSales ={ 
    index:6,
    templateName:'Psych Quiz (Sales) ',
    subject:'Psychometric Quiz',
    elements:[
    {  
      type:'paragraph',
      replaceables:{content:`Hi #firstName#,`}
    },
    {  
      type:'paragraph',
      replaceables:{content:`Please complete the following personality profiler as part of your 2hats assessment centre today. The profiler helps us match students with suitable opportunities based on their workplace preferences, and is also an opportunity for you to get exposure to personality profilers that are commonly used in industry job application processes.`}
    }, {  
      type:'link',
      replaceables:{url:'https://www.ondemandassessment.com/link/index/JB-4922A6957'}
    }, 
    {  
      type:'signture',
      replaceables:{greeting:'Regards',title:'#senderTitle#',name:'#senderName#',company:'2hats'}
     },
  ] }
  
  export const psychMarketing ={ 
    index:7,
    templateName:'Psych Quiz (Marketing) ',
    subject:'Psychometric Quiz',
    elements:[
    {  
      type:'paragraph',
      replaceables:{content:`Hi #firstName#,`}
    },
    {  
      type:'paragraph',
      replaceables:{content:`Please complete the following personality profiler as part of your 2hats assessment centre today. The profiler helps us match students with suitable opportunities based on their workplace preferences, and is also an opportunity for you to get exposure to personality profilers that are commonly used in industry job application processes.`}
    }, {  
      type:'link',
      replaceables:{url:'https://www.ondemandassessment.com/link/index/JB-55175458E'}
    }, 
    {  
      type:'signture',
      replaceables:{greeting:'Regards',title:'#senderTitle#',name:'#senderName#',company:'2hats'}
     },
  ] }
  
  export const ACAccepted ={ 
    index:8,
    templateName:'Assessment Accepted ',
    subject:'2hats Assessment Outcome',
    elements:[
    {  
      type:'paragraph',
      replaceables:{content:`Hey #firstName#,`}
    },
    {  
      type:'paragraph',
      replaceables:{content:`Congratulations, you were successful in the 2hats assessment centre! You are now a member of our select 2hats talent pool, which opens you up to a range of industry placement opportunities!`}
    }, {  
      type:'paragraph',
      replaceables:{content:`You can see attached the personalised feedback we have for you regarding the strengths and weaknesses of your assessment centre performance.`}
    },
    {  
      type:'paragraph',
      replaceables:{content:`We have now begun the process of matching you up with suitable businesses, and hope to get back to you shortly. Sometimes this process can take a little while depending on what our clients are currently looking for, and whether this aligns with your own skill-set.`}
    },
    {  
      type:'paragraph',
      replaceables:{content:`To speed up this process, we ask you to fill out a 2hats talent pool profile, which we will use as collateral to show our clients just how talented and skilful you are!`}
    },
    {  
      type:'button',
      replaceables:{url:'https://firebasestorage.googleapis.com/v0/b/production2hats.appspot.com/o/assets%2F2hats%20Profile%20Template.docx?alt=media&token=4aa2b438-d6ea-4d0c-8612-909d44fc1699',label:'Click here to access the template!'}
     },
    {  
      type:'paragraph',
      replaceables:{content:`Please keep this to a 1 page maximum, and when your done reply to this email with a copy in doc. format.`}
    },
    {  
      type:'paragraph',
      replaceables:{content:`Please don't hesitate to email me if you have any further questions.`}
    },
    {  
      type:'paragraph',
      replaceables:{content:`Stay tuned and keep an eye on your inbox for placement opportunities! `}
    },
    {  
      type:'signture',
      replaceables:{greeting:'Regards',title:'#senderTitle#',name:'#senderName#',company:'2hats'}
     },
  ] }
  
  export const ACRejected ={ 
    index:9,
    templateName:'Assessment Rejected',
    subject:'2hats Assessment Outcome',
    elements:[
    {  
      type:'paragraph',
      replaceables:{content:`Hi #firstName#,`}
    },
    {  
      type:'paragraph',
      replaceables:{content:`Thank you for coming for your assessment centre, we appreciate the time and effort that you put in to make this commitment.`}
    }, {  
      type:'paragraph',
      replaceables:{content:`Unfortunately at this stage we have decided that we will no longer be able to continue your journey with 2hats. However, we have attached some personalised feedback that will help you tackle future assessment centre tasks, and will give you a clear understanding of where you can improve.`}
    }, {  
      type:'paragraph',
      replaceables:{content:`All the best for your future endeavours, we know you'll go far!`}
    },
    {
      type:'signture',
      replaceables:{greeting:'Regards',title:'#senderTitle#',name:'#senderName#',company:'2hats'}
     },
  ] }
  
  export const ACNeedsImprovement ={ 
    index:10,
    templateName:'Assessment Needs Improvement',
    subject:'2hats Assessment Outcome',
    elements:[
    {  
      type:'paragraph',
      replaceables:{content:`Hi #firstName#,`}
    },
    {  
      type:'paragraph',
      replaceables:{content:`Thank you for coming in to our 2hats offices for your assessment centre, we appreciate the time and effort that you put in to make this commitment.`}
    }, {  
      type:'paragraph',
      replaceables:{content:`At this stage we feel that you are not quite industry ready! Although, we see that you have incredible potential, and only a few areas that need improving on. Over the next couple of months we are putting together some free training programs for students that specialise in our business and marketing segments of 2hats! So keep an eye out for these, and I will flag you as someone to inform once they're scheduled.`}
    }, {  
      type:'paragraph',
      replaceables:{content:`We have attached some personalised feedback that we suggest reading and taking on board to help with your professional development.`}
    },
    {
      type:'paragraph',
      replaceables:{content:`We hope that you have gained some great insights from your 2hats experience!`}
    },
    {
      type:'paragraph',
      replaceables:{content:`Thanks,`}
    },
    {
      type:'signture',
      replaceables:{greeting:'Regards',title:'#senderTitle#',name:'#senderName#',company:'2hats'}
     },
  ] }
  
  
  export const resumeAccepted ={ 
    index:11,
    templateName:'rejected with Feedback',
    subject:'Thank You For Applying!',
    elements:[
    { type:'paragraph',
      replaceables:{content:`Hi #firstName#,`}
    },
    { type:'paragraph',
      replaceables:{content:`Your resume has now been reviewed by a 2hats expert, congratulations!`}
    },
    { type:'paragraph',
      replaceables:{content:`We are pleased to inform you that you are among the top 20% of applicants and have progressed to an <b>online video interview</b> with a 2hats staff member. This will give us a chance to get to know you better.`}
    }, 
    { type:'paragraph',
      replaceables:{content:`If you're successful in the interview, you'll be one step closer to joining the 2hats talent pool!`}
    },
    { type:'paragraph',
      replaceables:{content:`<b>How to book:</b>`}
    },{ type:'paragraph',
    replaceables:{content:`You can view our open time slots and schedule your preferred time <a href="https://calendly.com/2hats">here</a>. You will have 5 days after receiving this email to book a time slot.`}
  },{ type:'paragraph',
  replaceables:{content:`<b>Where will the interview be held?</b>`}
},{  
      type:'paragraph',
      replaceables:{content:`The interview is online. Simply click <a href='https://appear.in/2hats'>here</a> when it is time for your interview. You will be prompted to click 'knock to enter', which will allow you to enter the chat room. Please make sure to be on time, as you would for any other interview 😊`}
    },{  
      type:'paragraph',
      replaceables:{content:`<b>What can I expect to be asked?</b>`}
    },{  
      type:'paragraph',
      replaceables:{content:`You should be prepared to talk about yourself, your interests, skills and aspirations. Consider this as great practice for your future job applications!`}
    },{  
      type:'paragraph',
      replaceables:{content:`If you have any questions, don't hesitate to send me an email.`}
    },
    {
      type:'button',
      replaceables:{url:'https://calendly.com/2hats',label:'Book an interview'}
     },{
      type:'signture',
      replaceables:{greeting:'Speak to you soon!',title:'#senderTitle#',name:'#senderName#',company:'2hats'}
     },
  ] }
