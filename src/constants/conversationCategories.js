const conversationCategories = type => {
  switch (type) {
    case 'client':
      return [
        { value: 'futureNeed', label: '๐ค๐ผFuture need๐ค๐ผ' },
        { value: 'generalCatchup', label: 'โ๏ธ catchup โ๏ธ' },
        { value: 'partnerships', label: '๐ค Partnership ๐ค' },
        { value: 'randoms', label: '๐คก Random ๐คก' },
        { value: 'client', label: '๐ค๐ผClient๐ช๐ฝ' },
        { value: 'hotLead', label: '๐ฅHot Lead๐ฅ' },
      ];
    case 'candidate':
      return [
        { value: 'pass', label: '๐๐ปPass๐๐ฝ' },
        { value: 'rejected', label: '๐๐ปโRejected๐๐พโ' },
        { value: 'TPA', label: '๐๐ปโTP A๐๐ผโ' },
        { value: 'TPB', label: '๐๐ปโTP B๐๐ผโ' },
      ];
    default:
      return [
        { value: 'futureNeed', label: '๐ค๐ผFuture need๐ค๐ผ' },
        { value: 'generalCatchup', label: 'โ๏ธ catchup โ๏ธ' },
        { value: 'partnerships', label: '๐ค Partnership ๐ค' },
        { value: 'randoms', label: '๐คก Random ๐คก' },
        { value: 'client', label: '๐ค๐ผClient๐ช๐ฝ' },
        { value: 'hotLead', label: '๐ฅHot Lead๐ฅ' },
        { value: 'pass', label: '๐๐ปPass๐๐ฝ' },
        { value: 'rejected', label: '๐๐ปโRejected๐๐พโ' },
        { value: 'TPA', label: '๐๐ปโTP A๐๐ผโ' },
        { value: 'TPB', label: '๐๐ปโTP B๐๐ผโ' },
      ];
  }
};

export default conversationCategories;
