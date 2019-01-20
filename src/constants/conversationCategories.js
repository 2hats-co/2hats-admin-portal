const conversationCategories = type => {
  switch (type) {
    case 'client':
      return [
        { value: 'futureNeed', label: '🤞🏼Future need🤞🏼' },
        { value: 'generalCatchup', label: '☕️ catchup ☕️' },
        { value: 'partnerships', label: '🤝 Partnership 🤝' },
        { value: 'randoms', label: '🤡 Random 🤡' },
        { value: 'client', label: '🤙🏼Client💪🏽' },
        { value: 'hotLead', label: '🔥Hot Lead🔥' },
      ];
    case 'candidate':
      return [
        { value: 'pass', label: '👍🏻Pass👏🏽' },
        { value: 'rejected', label: '🙅🏻‍Rejected🙅🏾‍' },
        { value: 'TPA', label: '🏊🏻‍TP A🏊🏼‍' },
        { value: 'TPB', label: '🏊🏻‍TP B🏊🏼‍' },
      ];
    default:
      return [
        { value: 'futureNeed', label: '🤞🏼Future need🤞🏼' },
        { value: 'generalCatchup', label: '☕️ catchup ☕️' },
        { value: 'partnerships', label: '🤝 Partnership 🤝' },
        { value: 'randoms', label: '🤡 Random 🤡' },
        { value: 'client', label: '🤙🏼Client💪🏽' },
        { value: 'hotLead', label: '🔥Hot Lead🔥' },
        { value: 'pass', label: '👍🏻Pass👏🏽' },
        { value: 'rejected', label: '🙅🏻‍Rejected🙅🏾‍' },
        { value: 'TPA', label: '🏊🏻‍TP A🏊🏼‍' },
        { value: 'TPB', label: '🏊🏻‍TP B🏊🏼‍' },
      ];
  }
};

export default conversationCategories;
