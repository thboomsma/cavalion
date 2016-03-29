# cavalion
Cavalion Run-time app IDE / Deployment framework

```js
var Cavalion = require('cavalion')
var Sequelize = require('sequelize')
var EncryptedField = require('sequelize-encrypted');

// secret key should be 32 bytes hex encoded (64 characters)
var key = process.env.SECRET_KEY_HERE;

var enc_fields = EncryptedField(Sequelize, key);

var User = sequelize.define('user', {
    name: Sequelize.STRING,
    encrypted: enc_fields.vault('encrypted'),

    // encrypted virtual fields
    private_1: enc_fields.field('private_1'),
    private_2: enc_fields.field('private_2')
})

var user = User.build();
user.private_1 = 'test';
```

## How it works

Module Cavalion add run-time JS object editing to any control, widget or DIV enclosed element in your web-app.
There is a superuser that is allowed to edit the editor tooling and accessability there-of by different layer of users by securing the API-calls.
By default all security is turned off and every user can (for only himself) alter the app as they desire. 
Tooling is scaffolded as much as possible by the engine and can also be altered for re-use.
All object settings & tooling settings are encrypted and stored in local-storage.
To Do:
- Implementation of server-side managed IDE


## Setting up the security & encryption

By default, AES-SHA256-CBC is used to encrypt data. You should generate a random key that is 32 bytes.

```
openssl rand -hex 32
```

Do not save this key with the source code, ideally you should use an environment variable or other configuration injection to provide the key during app startup.

## Tips

- Use cavalion on top of any existing CMS or web-page
-  Build your own tooling and link it up to your editor

## License

MIT
