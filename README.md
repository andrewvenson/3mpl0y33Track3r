# 3mpl0y33Track3r

CLI application to manage employee data.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Badges](#badges)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

Clone repository & then install dependencies

```bash
npm install 
```
Install dotenv as dev dependency

```bash
npm install dotenv --save-dev
```

## Usage

Rename the 'rename.env' file to '.env' and then enter mysql credentials in this file

```
// enter credentials for both of these variables without quotations
 MYSQL_PW=<enter mysql pw here>
 MYSQL_UN=<enter mysql username here>
```

If MySQL username is not root make sure to update username in package.json start script like so

```
// only change where it says root to your mysql username, if your username is not root
"start": "echo 'enter mysql password' && mysql -u root -p < empddlseed.sql && echo 'enter mysql password again' && mysql -u root -p < empddmseed.sql && node bin/dev"
```

```
// run npm start in root directory
npm start
```

```
// You'll be asked to enter in mysql password twice for running ddl & ddm scripts
```

## License

osl-3.0

## Badges

<img src="https://img.shields.io/badge/cool-codemonk9-green" alt="cool" />
<img src="https://img.shields.io/badge/emps-3mpl0y33Track3r-blue" alt="wow" />

## Contributing

[//]: contributor-faces

<a href="https://github.com/andrewvenson"><img src="https://avatars0.githubusercontent.com/u/14009158?v=4" title="andrewvenson" width="80" height="80"></a>

## Tests

```
// no test code for this repo

```

## Questions

If you have any questions about the repo, open an issue or contact directly @ vensoneandrew@gmail.com
