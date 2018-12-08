const generalFeedback = [{
    id: '',
    title: 'Link Between Industry and Interest',
    labels: ['', 'Low', 'Medium', 'High'],
    content: ['', 'Your resume doesn’t show a link between the industry that you’re interested in, your experience and interests. Spend some time reading job descriptions online, you can get a good indication of the profiles and skills businesses are looking for at any given time. You could also reach out to people in your industry of interest to find out about the type of pathways available to you.',
        'Your resume shows your interest in a particular industry. However there’s no clear link to the business functions that 2hats offers opportunities in marketing and sales. You should use your biography and/or experience section to show how your interests and past experiences relate to the opportunities that we offer.',
        'Your resume shows a clear link between the industry which you’re interested in pursuing, your experience and interests. This shows that you are professionally focussed.'
    ],
    isRequired:true
}]
const contentFeedback = [{
        id: 'a',
        title: 'Relevant Content to Industry',
        labels: ['', 'Low', 'Medium', 'High'],
        content: ['', 'A large portion of the content in your resume is not focused or relevant. Re-read your resume and make edits to ensure that all of your content is consistent and relevant to your target industry.',
            'Some of the content in your resume could be more focused. Check your resume to ensure that your content is kept consistent and relevant to your target industry.',
            'All of your content is focused and relevant to your industry.'],
        isRequired:true
    },
    {
        id: 'b',
        title: 'Use of Bullet Points',
        labels: ['', 'Low', 'Medium', 'High'],
        content: ['', 'You haven’t effectively used bullet points. You should utilise them to make your resume easier to read.', 
            'You can more effectively use bullet points throughout your resume to improve its readability.', 
            'How you’ve used bullet points is ideal;  they’ve made your resume easy to read and to understand.'],
        isRequired:false
    },
    {
        id: 'c',
        title: 'Max Two Page Length',
        labels: ['', 'Low', 'Medium', 'High'],
        content: ['', 'Your resume is too long, it should be a maximum of two pages. Remember that people only spend a few seconds judging your resume.',
            'Consider condensing your resume. Ensure that every word that you include is necessary and meaningful. Always remember to keep your resume length within two pages. Remember, people only spend a few seconds judging your resume.', 
            'Your resume is concise and is under 2-pages, which is the maximum length.'],
        isRequired:false
    },
    {
        id: 'd',
        title: 'Quantifiable Information',
        labels: ['', 'Not Quantifiable', 'Somewhat Quantifiable', 'Quantifiable'],
        content: ['', 'Your experience and achievements can be quantified better to communicate the results of your efforts. For example, instead of writing “I was a high-achieving sales person who met all of my targets”, write “Achieved 100% of sales targets consistently over a 6-month period, contributing to 60% of total sales”. This same example can be applied to any situation. You can quantify time periods, money, tasks, people, etc. When you do this, it makes it much easier for a stranger (the person reading your resume) to understand you and assess the value that you can bring.',
            'Your experience and achievements can be quantified better to communicate the results of your efforts. For example, instead of writing “I was a high-achieving sales person who met all of my targets”, write “Achieved 100% of sales targets consistently over a 6-month period, contributing to 60% of total sales”. This same example can be applied to any situation. You can quantify time periods, money, tasks, people, etc. When you do this, it makes it much easier for a stranger (the person reading your resume) to understand you and assess the value that you can bring.',
            'The use of quantifiable results in your resume communicates the impact of your efforts.'
        ],
        isRequired:false
    }
]
const grammarFeedback = [{
    id: '',
    title: 'Grammar & Spelling',
    labels: ['', 'Low', 'Medium', 'High'],
    content: ['', 'Revise your spelling and grammar to ensure that it is perfect. The slightest grammar or spelling mistakes shows a lack of attention to detail. Inconsistent use of full stops and odd use of capital letters is the most common error so watch out for this! Grammarly is a free tool that you can use to improve spelling and grammar. You can also download the extension on your browser!',
        'Revise your spelling and grammar to ensure that it is perfect. The slightest grammar or spelling mistakes shows a lack of attention to detail. Inconsistent use of full stops and odd use of capital letters is the most common error so watch out for this! Grammarly is a free tool that you can use to improve spelling and grammar. You can also download the extension on your browser!',
        'You have accurate spelling and grammar - this shows that you have good attention to detail.'
    ],
    isRequired:true
}]
const formattingFeedback = [{
    id: '',
    title: 'Formatting & Layout',
    labels: ['', 'Low', 'Medium', 'High'],
    content: ['', 'Your resume formatting is cluttered. You should ensure that your sections are clear and consistent. Also ensure that dates for education and experience are in reverse chronological order (the most recent work experience first).',
        ' Your resume formatting could be clearer. Ensure that each section of your resume is consistent: headings, paragraphs, bullet points, font. Also ensure that dates for education and experience are in reverse chronological order (the most recent work experience first).',
        'Your resume has good formatting and the layout is clear.'
            
            ],
      isRequired:true
}]
const acheivementsFeedback = [{
    id: '',
    title: 'Acheivements',
    labels: ['', 'Low', 'Medium', 'High'],
    content: ['', 'You have not listed any achievements. It’s important to highlight any projects/ volunteering/ and/or extracurricular activities that you’ve undertaken as well as the results of such activities; this shows passion and commitment.',
        'Your achievements list could be more focused; it’s important to highlight any projects/ volunteering/ and/or extracurricular activities that you’ve undertaken. You could include more relevant achievements or go out and gain more!',
        'It’s essential to include your achievements in order to demonstrate your competitiveness. You have listed some great achievements that shows your passion and commitment. You also have clear results from your projects/ volunteering/ extracurricular activities.'
    ],
    isRequired:true
}]
const experienceFeedback = [{
    id: '',
    title: 'Relevant Experience',
    labels: ['', 'Low', 'Medium', 'High'],
    content: ['', 'Think about how you can use your time to understand your interests and career pathway. You should try and gain professional experience in order to build your resume content. You could join a professionally focussed university society, start working on a project either independently or in a team, participate in a competition or set yourself a challenge. There are no right or wrong ways as to how you should gain experience.',
        'Be mindful about what experience you pursue and how you spend your time so that you can build your experience and align it with your resume and career pathway.  Try to use your time wisely to gain experience that will help you understand your interests and develop the relevant skills to ensure that you are industry ready. You could join a professionally focussed university society, start working on a project independently or in a team, participate in a competition or set yourself a challenge - there are no right or wrong ways as to how you should do this.',
        'Effectively using your time to understand your interests and develop your skills is essential. Well done on gaining some interesting industry experience outside of the classroom and conveying it well in your resume.'
    ],
    isRequired:true
}]
const skillsFeedback = [{
    id: '',
    title: 'Relevant Skills',
    labels: ['', 'Low', 'Medium', 'High'],
    content: ['', 'You have not listed relevant skills. This makes it hard for the person reading your resume to determine whether or not you have the tools to perform and develop in your chosen industry. Note that skills such  as competency in the Microsoft suite are now assumed, therefore they don’t count as skills worthy of listing. Upskilling online in a good way to gain skills - there are plenty of courses, try Udemy or Youtube!',
        'You have listed some relevant skills. To make it simpler for the person assessing your resume, edit your choices and list only relevant skills (maximum of around 6) to make it clear how you’re capable to perform in your chosen industry. Note that skills such as competency in the Microsoft suite are now assumed, therefore they don’t count as skills worthy of listing. You should always prioritise hard skills. To gain more skills, you can upskill online - there are plenty of courses, try Udemy or Youtube!',
        'Good job, only listing relevant and specific skills in your resume. This indicates that you’ll be able to perform and develop in your chosen industry.'
    ],
    isRequired:true
}]
export const feedbackSections = {
    '1': 'Professionally Focussed',
    '2': 'Written Communication',
    '3': 'Attention to Detail',
    '4': 'Achievements',
    '5': 'Experience',
    '6': 'Skills',
};

export const SUBMISSION_FEEDBACK = {'1':generalFeedback, '2':contentFeedback, '3':grammarFeedback, '4':acheivementsFeedback, '5':experienceFeedback, '6':skillsFeedback}

export function getFeedbackContent(id,rating){
    if(id.length === 1){
    const content = SUBMISSION_FEEDBACK[id][0].content[rating]
    return content
}else{
    const sectionId = id[0]
    const subSectionId = id[1]
    const subsection = SUBMISSION_FEEDBACK[sectionId].filter(x=> x.id === subSectionId)
    const content = subsection[0].content[rating]
    return content
}
}

export function getFeedbackTitle(id) {
    if (id.length === 1) {
        return SUBMISSION_FEEDBACK[id][0].title;
    } else {
        const sectionId = id[0]
        const subSectionId = id[1]
        const subsection = SUBMISSION_FEEDBACK[sectionId].filter(x => x.id === subSectionId)
        return subsection[0].title
    }
}
