<p align='right'><img src="https://s3.amazonaws.com/uploads.hipchat.com/133247/964958/yArWHi5iMIqyOmp/attn_logo--dark-01.jpg" width="80"/></p>
[![wercker status](https://app.wercker.com/status/4db7f591e664772969f650c9d1978217/s "wercker status")](https://app.wercker.com/project/bykey/4db7f591e664772969f650c9d1978217)

Generate npm modules with default tooling for ATTN:'s workflow using Yeoman.

## Quick start

Install Yeoman and this generator globally:

```
$ npm install -g yo @attn/generator-npm
```

Create a new directory for your project and run the generator:

```
$ mkdir new-module
$ cd new-module
$ yo @attn/npm
```

## API Reference

When you run the generator, you will be asked a few questions about your module's:

- name
- author's name
- author's e-mail
- package description

Most of these fields land in your module's `package.json` file. For more information on these fields see the [npm documentation](https://docs.npmjs.com/files/package.json).

### Prompts

This generator can generate modules a few different ways.

#### Open source (default)

An MIT license will be added to the project with copyright assigned to Our Time
Media, Inc. and the package.json's `license` property will be set to "MIT".

#### Closed source

No LICENSE file will be provided and the package.json's `license` property will
be set to "UNLICENSED".

#### ES6 (default)

This option adds the Babel transpiler as a dev. dependency and exposes it under
the `build` npm run script. Depending on how your module is used you may want to
call `build` during the `prepublish` script.

The following directory structure is generated:

```
.
├── .gitignore
└── src
    └── index.js
```

The `build` script outputs to an index.js file in the root of your project which
is Git ignored.

#### ES5

Vanilla ES5 projects do not package Babel or a source directory. An index.js
file is generated in the project root.

### Options

If you want to use this generator to create a module not intended for use by
ATTN: pass the `--personal` flag. This will remove the @attn scope from the
module name and, if open source, assign the license's copyright to provided
author's name and e-mail address.

## License

MIT
