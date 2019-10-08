var fs = require('fs');
var gitHash = require('git-rev-sync');

console.log('Getting build details...');

const metadata = {
  hash: gitHash.short(),
  date: new Date(),
};

fs.writeFile('src/metadata.json', JSON.stringify(metadata), function(err) {
  if (err) throw err;
  console.log('Current build hash: ' + metadata.hash);
});
