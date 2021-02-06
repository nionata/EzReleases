# actions
GitHub Actions Template

![Build and Tag](https://github.com/stream-monkey/actions/workflows/Build%20and%20Tag/badge.svg) ![Test Action](https://github.com/stream-monkey/actions/workflows/Test%20all%20actions/badge.svg)

<br/>


## Action Name

Action Description

### Inputs

``` yaml
input:
  required: true
  description: ''
```

### Use

``` yaml
uses: nionata/actions@X.X
with:
  input: "${{ secrets.INPUT }}"
```

<br/>

## Contributing

### Dependencies

All dependencies are managed in `package.json`

### Scripts

#### `yarn test`

> Runs on all PR to `master`

Test the action

#### `yarn build`

> Runs on all PRs merged into `master`

Uses [ncc](https://www.npmjs.com/package/@zeit/ncc) to compile the action into an optimized `src/build/index.js `bundle
