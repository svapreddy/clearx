### Contributing

Thanks for using `ClearX` and contributing to its development. Following is a initial set of guidelines designed to make your contributions smooth.

#### Security Issues

If you think you've found a security vulnerability, please create an issue immediately in git repo. We will take a look immediately

#### Issues

Issues can be questions, feature requests, enhancements, optimizations and more. Please use git repo issues to inform the same.  

When filing a bug, please provide a reproducible demonstration of the bug in the form of a demo.

### Development

#### Required software

- Git
- An editor with the following integrations:
  - [standardJS](https://standardjs.com/)  
  - [EditorConfig](http://editorconfig.org/)
- A shell

#### Hacking ClearX

Fork the repository to your Github account by clicking the "Fork" button on the [ClearX repository page](https://github.com/Autodesk/clearx). Then do the following:

```bash
# Clone your fork of the repo
git clone https://github.com/YOUR_USERNAME/clearx

# Move into the repo directory
cd clearx

# Install the dependencies
npm install

npm run build

# The ./dist folder contains the IIFE distribution
```

Now to make changes and run todo example application do the following:

```bash
npm run todo

# The ./example/bundle folder contains build output.
# Now http://localhost:8719 serves the example todo application
```

Note: Please remember to run `npm run build` before pushing your changes. The bundle need to be updated with the latest code. 

#### Style guide

Code should be simple, readable, and commented where necessary.

Most of the coding standards are handled by standardJS and EditorConfig. When using an editor with standardJS and EditorConfig support, the editor will guide you in writing code. In addition, builds will throw error messages if the coding standards are not met.

If you want to fix any code or formatting issues that are automatically fixable, you can do the following

```
npm install -g standard
standard --fix
```

#### Testing

Tests use [AVA](https://www.npmjs.com/package/ava). Check out their documentation.

Tests can be found in the `test.js` file.

A sample test file will look like this:

```js
test('#get(key, defaultValue)', (t) => {
  t.deepEqual(appStore.get(['a', 'b'], 'default'), 'default')
})
```
Note: Currently tests needs revisit. Contributors are more than welcome to help add more tests

#### Tests Guidelines

- Tests should be isolated, portable, and readable.
- Tests and assertions should be described properly.

#### Pull requests

All pull requests are welcome. To create a pull request, simply build your code on a branch using ClearX's [`master` branch](https://github.com/Autodesk/clearx) as base. Then push that branch to your Github repo and submit a PR of that branch against ClearX's `master` branch. 

#### Contributor License Agreement

ClearX is distributed under the Apache-2.0 license following Autodesk's Opensource governance rules, which means your contributions are also subject to Autodesk's opensource governance policy.

If you have any questions please create an issue with information, we will provide clarification.
