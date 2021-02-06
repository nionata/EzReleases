# EzReleases

Automated releases with semantic versioning

![Build and Tag Action](https://github.com/nionata/EzTag/workflows/Build%20and%20Tag%20Action/badge.svg) ![Test Action](https://github.com/nionata/EzTag/workflows/Test%20Action/badge.svg)

<br/>

## Input

``` yaml
repo_token:
  required: true
  description: 'The GITHUB_TOKEN secret'
```

<br/>

## Output

``` yaml
version:
  description: 'The created release's version'
```

<br/>

## Use

``` yaml
# ./github/workflows/tag.yml

name: Tag

on:
  pull_request:
    branches: [ master ]
    types: [ closed ]

jobs:
  tag-master:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        
      - name: Tag Master
        uses: nionata/EzReleases@vX.X
        with:
          repo_token: "${{ secrets.GITHUB_TOKEN }}"
```

The release and tag are dependent on the pull request. The tag follows [semantic versioning](https://semver.org/), `vMAJOR.MINOR.PATCH`, and gets generated based on the title:

1. if it includes `hotfix`, it will increment the patch version of the last tag
2. if it includes a version `vX.X` or `vX.X.X`, it will use that
3. else, it will increment the minor version

Once the tag is generated, the action will create a release with the tag and the pull request body.

<br/>

## Contributing

### Dependencies

All dependencies are managed in `package.json`

### Scripts

#### `yarn test` - Runs the test suite

> Runs on all PR to `master`

Test the action

#### `yarn build` - Uses [ncc](https://www.npmjs.com/package/@zeit/ncc) to compile the action into an optimized `src/build/index.js `bundle

> Runs on all PRs merged into `master`