var fs = require('fs');

console.log('Running production deploy config script...');

fs.writeFile(
  './.env',
  `REACT_APP_ENV='PRODUCTION'
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
      "default": "production2hats"
    },
    "targets": {
      "production2hats": {
        "hosting": {
          "admin": [
            "admin2hat"
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
