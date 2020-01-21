
# cavalion
DO NOT DOWNLOAD YET ... EXPERIMENTAL

<img src="http://relluf.nl/cavalion-icon.png" alt="LoopBack4 logo" width="400"/>

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/strongloop/loopback)
[![Travis Build Status](https://travis-ci.com/strongloop/loopback-next.svg?branch=master)](https://travis-ci.com/strongloop/loopback-next)
[![AppVeyor Build status](https://ci.appveyor.com/api/projects/status/q8vp7wrdn2ak6801/branch/master?svg=true)](https://ci.appveyor.com/project/strongloop/loopback-next/branch/master)
[![Coverage Status](https://coveralls.io/repos/github/strongloop/loopback-next/badge.svg?branch=master)](https://coveralls.io/github/strongloop/loopback-next?branch=master)

Cavalion platform builds widgets into modern web & mobile applications in a snap.

- Powerful extensible core
- Handles all head and tail infrastructure
- Generate real APIs and reverse engineer databases into syncable datamodels


## Status: Currently BETA

Cavalion 0.1 (BETA) has not been released yet, expected release data september 2020 [check announcements](http://cavalion.org).

The documentation website is https://cavalion.org/doc/en/cav1/.

Learn about the latest and greatest
[features and technologies in Cavalion 1](https://cavalion.org/doc/en/cav1/Crafting-LoopBack-4.html)
by using it for your next project. Start by having a look at
[Getting Started](https://cavalion.org/doc/en/cav1/Getting-started.html).

Check the [API documentation](https://cavalion.org/doc/en/cav1/apidocs.index.html)
for all the API usages in each package.


| Version    | Status      | Published | EOL                  |
| ---------- | ----------- | --------- | -------------------- |
| Cavalion 1 | Launch      | jun 2020  | Apr 2021 _(minimum)_ |
| Cavalion A | Development | Dec 2016  | Dec 2020             |


## Installation

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) >= 8.9.0

Install Cavalion CLI to help create new projects as follows:

```shell
npm i -g @cavalion/cli
```

To create your first Cavalion application, see
[Getting Started](http://cavalion.org/doc/en/cav1/Getting-started.html).

## Documentation

- [Official documentation](http://cavalion.org/doc/en/cav1/)
- [API documentation](http://apidocs.cavalion.org/#cavalion1)
- [FAQ](http://cavalion.org/doc/en/cav1/FAQ.html)
- [Tutorials](http://cavalion.org/doc/en/cav1/Tutorials.html)
- [Examples](http://cavalion.org/doc/en/cav1/Examples.html)

## Contributing

See the following resources to get you started:

- [Contributing Guidelines](./docs/CONTRIBUTING.md)



## Team

### Project Architects

|                  Ralph Kazemier                 |            Theo Boomsma               | 
| :---------------------------------------------: | :-----------------------------------: | 
| [![Ralph Kazemier]](http://github.com/relluf) | [![Theo Boomsma]](http://github.com/thboomsma) | 



## License

[MIT](LICENSE)



Cavalion Run-time app IDE / Deployment framework

FIRST RELEASE EXPECTED 1 MAY 2016

```js
var Cavalion = require('cavalion')

// secret key should be 32 bytes hex encoded (64 characters)
Cavalion.key = process.env.SECRET_KEY_HERE;

// Security users/group: super, editor, user
Cavalion.users = {}; // Object with Cavalion security structure

Cavalion.bindings = {};  // Object containing run-time config object bindings

```

## How it works

Module Cavalion add run-time JS object editing to any control, widget or DIV enclosed element in your web-app.
There is a superuser that is allowed to edit the editor tooling and accessability thereof.
Access control to Cavalion controlled objects is done by securing the API-calls.
User can alter app's accessible object parameters using configurator/tooling.
Editor user can alter these object parameters globally.
Tooling is scaffolded by the engine as much as possible but it can also be altered by super.
All object settings & tooling settings are encrypted and stored in local-storage.
By default the security setting is disabled!

To Do:
- Implementation of server-side managed IDE
- Profile/setting roaming
- Off-line storage
- Sync via log-shipping

## Setting up the security & encryption

By default, AES-SHA256-CBC is used to encrypt data. You should generate a random key that is 32 bytes.

```
openssl rand -hex 32
```

Do not save this key with the source code, ideally you should use an environment variable or other configuration injection to provide the key during app startup.

## Tips

- Use cavalion on top of any existing CMS or web-page
- Build your own tooling and link it up to your editor
- Bind Cavalion ...

## License

MIT
