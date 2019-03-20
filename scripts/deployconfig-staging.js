var fs = require('fs');

console.log('Running staging deploy config script...');

fs.writeFile(
  './.env',
  `REACT_APP_ALGOLIA_APP_ID='755HO7BO2Y'
REACT_APP_ALGOLIA_API_KEY='0051c34046557fa048fd1f89ccee8ae8'
REACT_APP_ENV='STAGING'
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
        "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
        "rewrites": [
          {
            "source": "**",
            "destination": "/index.html"
          }
        ]
      }
    ]
  }
  `,
  function(err) {
    if (err) throw err;
    console.log('Successfully wrote .firebase.json');
  }
);
