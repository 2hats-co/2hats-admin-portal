const generalFeedback = [{
      id: '',
      title: 'Link Between Industry and Interest',
      labels: ['', 'Low', 'Medium', 'High'],
      content: ['', 'There is no link in your resume between your career objectives, your experience and interests. You could spend time reading job descriptions online, this will give you a good indication of the profiles and skills that businesses are looking for at any exact time. You could also try talking to people who are working to see the types of pathways that you could align with.',
            'Your resume shows your interest in a particular industry. However there is no clear link to the industries that 2hats offer opportunities in. This indicates to us that you’re not sure about what you want or are trying to achieve. You could use a biography or objective section at the top of your resume to demonstrate how your experience is linked to our industries.',
            'Your resume shows a clear link between the industry which you’re interested in pursuing, your experience and interests. This shows that you are professionally focussed.'
      ],
      isRequired:true
}]
const contentFeedback = [{
            id: '',
            title: 'Relevant Content to Industry',
            labels: ['', 'Low', 'Medium', 'High'],
            content: ['', 'A large portion of the content in your resume is not focused or relevant. Re-read your resume and make edits to keep all of your content consistent and relevant to your target industry.', 
			'Some of the content in your resume could be more focused. Check your resume to ensure that your content is kept consistent and relevant to your target industry.', 
			'All of your content is focused and relevant to your industry.'],
			
            isRequired:true
      },
      {
            id: 'a',
            title: 'Use of Bullet Points',
            labels: ['', 'Low', 'Medium', 'High'],
            content: ['', 'You haven’t effectively used bullet points. You should do this to make your resume easy to read and understandable.', 
			'You can more effectively use bullet points to make your resume easier to read and more understandable.', 
			'How you’ve used bullet points is ideal;  they’ve made your resume easy to read and to understand.'],
            isRequired:false

      },
      {
            id: 'b',
            title: 'Max Two Page Length',
            labels: ['', 'Low', 'Medium', 'High'],
            content: ['', 'Your resume is too long, it should be a maximum of two pages. Remember that people only spend a few seconds judging your resume.',
			'Consider condensing your resume and think about every word that you include to check that each sentence is meaningful. Always remember to keep your resume length within two pages. Remember, people only spend a few seconds judging your resume.', 
			'Your resume is concise and is under 2-pages, which is the maximum length.'],
            isRequired:false
      },
      {
            id: 'c',
            title: 'Quantifiable Information',
            labels: ['', 'Not Quantifiable', 'Somewhat Quantifiable', 'Quantifiable'],
            content: ['', 'Experience and achievements can be quantified better to communicate the results of your efforts. For example, instead of writing “I was a high-achieving sales person who met all of my targets”, you should write “Achieved 100% of sales targets consistently over a 6-month period, contributing to 60% of total sales”. This same example can be applied to any situation. You can quantify time periods, money, tasks, people, etc. When you do this, it makes it much easier for a stranger (the person reading your resume) to understand you and what value you can bring.',
                  'Experience and achievements can be quantified better to communicate the results of your efforts. For example, instead of writing “I was a high-achieving sales person who met all of my targets”, write “Achieved 100% of sales targets consistently over a 6-month period, contributing to 60% of total sales”. This same example can be applied to any situation. You can quantify time periods, money, tasks, people, etc. When you do this, it makes it much easier for a stranger (the person reading your resume) to understand you and what value you can bring to them.',
                  'The use of quantifiable results in your resume communicates the impact of your efforts.'
            ],
            isRequired:false
      }
]
const grammarFeedback = [{
      id: '',
      title: 'Grammar & Spelling',
      labels: ['', 'Low', 'Medium', 'High'],
      content: ['', 'You should revise your spelling and grammar. Any mistake shows a lack of attention to detail. Grammarly is a free tool that you can use to improve, you can also download the extension on your browser!',
            'Revise your spelling and grammar to ensure that it is perfect. The slightest grammar or spelling mistakes shows a lack of attention to detail. Grammarly is a free tool that you can use to improve, you can also download the extension on your browser!',
            'Great spelling and grammar shows that you have good attention to detail.'
      ],
      isRequired:true
}]
const formattingFeedback = [{
      id: '',
      title: 'Formatting & Layout',
      labels: ['', 'Low', 'Medium', 'High'],
      content: ['', 'Your resume formatting is not clear. You should ensure that your sections are clear and consistent. Also ensure that dates for education and experience are in reverse chronological order (the most recent work experience first).',
            ' Your resume formatting could be clearer. Ensure that each section of your resume is consistent: headings, paragraphs, bullet points, font. Also ensure that dates for education and experience are in reverse chronological order (the most recent work experience first).',
            'Your resume has good formatting and the layout is clear.'
			
			],
	  isRequired:true
}]
const acheivementsFeedback = [{
      id: '',
      title: 'Acheivements',
      labels: ['', 'Low', 'Medium', 'High'],
      content: ['', 'You have not listed any achievements. It’s important to highlight any projects/ volunteering/ and/or extracurricular activities that you’ve undertaken as well as results; this shows passion and commitment.',
            'You have listed some achievements which is great; it’s important to highlight any projects/ volunteering/ and/or extracurricular activities that you’ve undertaken. You could include more or go out and gain more!',
            'It is essential to list achievements to demonstrate your competitiveness. You have listed some great achievements that shows your passion and commitment. You also have clear results from your projects/ volunteering/ extracurricular activities.'
      ],
      isRequired:true
}]
const experienceFeedback = [{
      id: '',
      title: 'Relevant Experience',
      labels: ['', 'Low', 'Medium', 'High'],
      content: ['', 'Think about how you can use your time to understand your interests and career pathway.You should begin to build your professional experience to build your resume content. You could join a professionally focussed university society, start working on a project independently or in a team, participate in a competition or set yourself a challenge - there are no right or wrong ways as to how you should do this.',
            'Be mindful about what experience you pursue and how you spend your time so that you can build your experience and align it with your resume and career pathway.  Think about using your time to understand your interests and start to build your professional experience. You could join a professionally focussed university society, start working on a project independently or in a team, participate in a competition or set yourself a challenge - there are no right or wrong ways as to how you should do this.',
            'Effectively using your time to understand your interests and strengths is essential, you’ve done this and as a result you’ve built your experience to a good level as a student. The experience that you have is interesting and you’ve conveyed this in your resume.'
      ],
      isRequired:true
}]
const skillsFeedback = [{
      id: '',
      title: 'Relevant Skills',
      labels: ['', 'Low', 'Medium', 'High'],
      content: ['', 'You have not listed relevant skills. This makes it hard for the person reading your resume to understand how you’ll be capable to perform and develop in your chosen industry. Note that such skills as competency in the Microsoft suite are now expected, therefore they don’t count as skills worthy of listing. Upskilling online in a good way to gain skills - there are plenty of courses, try Udemy or Youtube!',
            'You have listed some relevant skills. To make it simpler for the person assessing your resume, list more skills to help them understand how you’re capable to perform in your chosen industry. Note that such skills as competency in the Microsoft suite are now expected, therefore they don’t count as skills worthy of listing. To gain more skills, you can upskill online - there are plenty of courses, try Udemy or Youtube!',
            'Relevant and specific skills are listed in your resume, this indicates that you’ll be able to perform and develop in your chosen industry.'
      ],
      isRequired:true
}]

export const SUBMISSION_FEEDBACK = {'1':generalFeedback, '2':contentFeedback, '3':grammarFeedback, '4':formattingFeedback, '5':acheivementsFeedback, '6':experienceFeedback, '7':skillsFeedback}
export function getFeedbackContent(id,rating){
	if(id.length === 1){
      const content = SUBMISSION_FEEDBACK[id][0].content[rating]
      return content
}else{
      const sectionId = id[0]
      const subSectionId = id[1]
      console.log(id);
      const subsection = SUBMISSION_FEEDBACK[sectionId].filter(x=> x.id === subSectionId)
	const content = subsection[0].content[1]
	return content
}
  }
