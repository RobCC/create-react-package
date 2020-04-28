# create-react-package-lib
> An environment generator to publish React packages to npm

## Features
- Exposed rollup configuration. You can change it to your taste after.
- Typescript support
- CSS modules
- Style injection for build files
- Source maps
- Development server bootstrapped from [CRA](https://github.com/facebook/create-react-app).
- `gh-pages` ready from dev server.

## How to use it

### Globally

```bash
npm install -g create-react-package-lib
```

### With npx

```bash
npx create-react-package-lib
```


## What's next

- Add optional testing libraries (enzyme, react-test-renderer)
- Rollup configuration options
- Support for initiating repo after installing everything

## Notes

- You will see `prop-types` as a dependency on the Javascript template. This is [recommended](https://github.com/facebook/prop-types#how-to-depend-on-this-package) (see [here](https://github.com/facebook/prop-types/issues/44)).


## License

MIT © [Roberto Chavez](https://github.com/RobCC).
