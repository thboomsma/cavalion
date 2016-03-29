# cavalion
DO NOT DOWNLOAD YET ... EXPERIMENTAL

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
