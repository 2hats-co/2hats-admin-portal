var fs = require('fs');

console.log('Running staging deploy config script...');

fs.writeFile(
  './.env',
  `REACT_APP_ENV='STAGING'
SKIP_PREFLIGHT_CHECK=true
`,
  function(err) {
    if (err) throw err;
    console.log('Successfully wrote .env');
  }
);

fs.writeFile(
  './.firebaserc',
  `{
    "projects": {
      "default": "staging2hats"
    },
    "targets": {
      "staging2hats": {
        "hosting": {
          "admin": [
            "staging2hatsadmin"
          ]
        }
      }
    }
  }
  `,
  function(err) {
    if (err) throw err;
    console.log('Successfully wrote .firebaserc');
  }
);

fs.writeFile(
  './firebase.json',
  `{
    "hosting": [
      {
        "target": "admin",
        "public": "build",
        "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
      }
    ]
  }
  `,
  function(err) {
    if (err) throw err;
    console.log('Successfully wrote .firebase.json');
  }
);
