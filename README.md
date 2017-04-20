# composeNS

> Namespaces are one honking great idea -- let's do more of those!

composeNS is namespaced compose function that can be used with recompose to avoid prop name collision. 

[![build status](https://img.shields.io/travis/Jephuff/composeNS/master.svg?style=flat-square)](https://travis-ci.org/Jephuff/composeNS)
[![npm version](https://img.shields.io/npm/v/composens.svg?style=flat-square)](https://www.npmjs.com/package/composens)
[![npm downloads](https://img.shields.io/npm/dm/composens.svg?style=flat-square)](https://www.npmjs.com/package/composens)

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
import composeNS from 'composens';

const App = compose(
  withState('state', 'setState', { location: 'france' }),
  composeNS(
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