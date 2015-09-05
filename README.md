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

### Options

This generator can generate modules that are either:

- Open or closed source
- ES6 or ES5

The former of each option is set as the default. For more full list of options browse the [templates directory](https://github.com/attn/generator-npm/tree/master/app/templates).

## License

MIT
