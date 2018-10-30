const generalFeedback = [{
      id: '1',
      title: 'Link between industry and interest',
      labels: ['', 'No link', 'Unclear', 'Clear'],
      content: ['', 'Your resume shows your interest in a particular industry. However there is no clear link to the startup companies that 2hats work with. This indicates to us that you’re not sure about what you want or are trying to achieve. You could use a biography or objective section at the top of your resume to demonstrate how your experience is linked to our industries.',
            'Link between industry and interest is unclear',
            'No clear link between industry and interest'
      ],
      isRequired:true
}]
const contentFeedback = [{
            id: '2',
            title: 'Relevant content to Industry',
            labels: ['', 'Bad', 'Okay', 'Good'],
            content: ['', 'Clear link between industry and interest', 'Link between industry and interest is unclear', 'No clear link between industry and interest'],
            isRequired:true
      },
      {
            id: '2a',
            title: 'Use of bullet Points',
            labels: ['', 'Lengthy', 'Uncondenced', 'Readable'],
            content: ['', 'Clear link between industry and interest', 'Link between industry and interest is unclear', 'No clear link between industry and interest'],
            isRequired:false

      },
      {
            id: '2b',
            title: 'Max Two Page Length',
            labels: ['', 'Lengthy', 'Uncondenced', 'Good'],
            content: ['', 'Clear link between industry and interest', 'Link between industry and interest is unclear', 'No clear link between industry and interest'],
            isRequired:false
      },
      {
            id: '2c',
            title: 'Quantifiable Information',
            labels: ['', 'Not Quantifiable', 'Not Quantifiable', 'Quantifiable'],
            content: ['', 'Clear link between industry and interest',
                  'Link between industry and interest is unclear',
                  'No clear link between industry and interest'
            ],
            isRequired:false
      }
]
const grammarFeedback = [{
      id: '3',
      title: 'Grammar & Spelling',
      labels: ['', 'Bad', 'has issues', 'Good'],
      content: ['', 'Clear link between industry and interest',
            'Link between industry and interest is unclear',
            'No clear link between industry and interest'
      ],
      isRequired:true
}]
const formattingFeedback = [{
      id: '4',
      title: 'Formatting & Layout',
      labels: ['', 'Bad', 'has issues', 'Good'],
      content: ['', 'Clear link between industry and interest',
            'Link between industry and interest is unclear',
            'No clear link between industry and interest'
      ],
      isRequired:true
}]
const acheivementsFeedback = [{
      id: '5',
      title: 'Acheivements',
      labels: ['', 'None', 'Little', 'Good'],
      content: ['', 'Clear link between industry and interest',
            'Link between industry and interest is unclear',
            'No clear link between industry and interest'
      ],
      isRequired:true
}]
const experienceFeedback = [{
      id: '6',
      title: 'Relevant Experience',
      labels: ['', 'None', 'Unfocused', 'Focused'],
      content: ['', 'Clear link between industry and interest',
            'Link between industry and interest is unclear',
            'No clear link between industry and interest'
      ],
      isRequired:true
}]
const skillsFeedback = [{
      id: '7',
      title: 'Relevant Skills',
      labels: ['', 'None', 'Unfocused', 'Focused'],
      content: ['', 'Clear link between industry and interest',
            'Link between industry and interest is unclear',
            'No clear link between industry and interest'
      ],
      isRequired:true
}]

export const SUBMISSION_FEEDBACK = [generalFeedback, contentFeedback, grammarFeedback, formattingFeedback, acheivementsFeedback, experienceFeedback, skillsFeedback]