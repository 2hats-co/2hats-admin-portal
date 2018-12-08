var fs = require('fs');
var gitHash = require('git-rev-sync');

console.log('Getting build details...');
fs.readFile('src/metadata.json', function(err,content) {
    if (err) throw err;
    var metadata = JSON.parse(content);
    metadata.build = metadata.build + 1;
    metadata.hash = gitHash.short();
    metadata.date = new Date();

    fs.writeFile('src/metadata.json',JSON.stringify(metadata),function(err){
        if(err) throw err;
        console.log('Current build number: ' + metadata.build);
        console.log('Current build hash: ' + metadata.hash);
    })
});
