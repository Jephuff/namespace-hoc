# namespace-hoc

> Namespaces are one honking great idea -- let's do more of those!

namespace-hoc is namespaced compose function that can be used with recompose to avoid prop name collision. 

[![build status](https://img.shields.io/travis/Jephuff/namespace-hoc/master.svg?style=flat-square)](https://travis-ci.org/Jephuff/namespace-hoc)
[![npm version](https://img.shields.io/npm/v/namespace-hoc.svg?style=flat-square)](https://www.npmjs.com/package/namespace-hoc)
[![npm downloads](https://img.shields.io/npm/dm/namespace-hoc.svg?style=flat-square)](https://www.npmjs.com/package/namespace-hoc)

## Usage

```js
compose(
  opts: string | { namespace: string, propMap: Array<string> | { [string]: string } },
  ...functions: Array<Function>,
): Function
```

#### Usage to namespace a portion of a group of HOC

```js
import ReactDOM from 'react-dom'
import { compose, withProps, mapProps, withState } from 'recompose';
import namespace from 'namespace-hoc';

const App = compose(
  withState('state', 'setState', { location: 'france' }),
  namespace(
    {
      namespace: 'toulon',
      propMap: { 'state': 'parentState' }, // you can still access props passed in using a the propMap option that is a array of props you want passed in, or an object `{ key: alias }`
    },
    withState('state', 'setState', { prisoner: 24601 })
    mapProps(props => ({ description: `location: ${props.parentState.location}, prisoner: ${props.state.prisoner}` }))
  )
)((props) => <div>description: {props.toulon.description}</div>);

ReactDom.render(<App />, document.querySelector('#container'));
```