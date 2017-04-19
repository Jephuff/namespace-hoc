# composeNS

> Namespaces are one honking great idea -- let's
do more of those!

composeNS is namespaced compose function that can be used with recompose to avoid prop name collision. 

[![build status](https://img.shields.io/travis/Jephuff/composeNS/master.svg?style=flat-square)](https://travis-ci.org/Jephuff/composeNS)
[![npm version](https://img.shields.io/npm/v/composens.svg?style=flat-square)](https://www.npmjs.com/package/composens)
[![npm downloads](https://img.shields.io/npm/dm/composens.svg?style=flat-square)](https://www.npmjs.com/package/composens)

## Usage

```js
compose(
  namespace: string,
  propMap?: Array<string> | Object,
  ...functions: Array<Function>,
): Function
```

#### Usage with namespaced component

```js
import ReactDOM from 'react-dom'
import { withProps } from 'recompose';
import composeNS from 'composens';

const App = composeNS(
  'fooNamespace',
  withProps({ foo: 24601 })
)((props) => <div>foo: {props.fooNamespace.foo}</div>);

ReactDom.render(<App />, document.querySelector('#container'));
```

#### Usage to namespace a portion a group of HOC

```js
import ReactDOM from 'react-dom'
import { compose, withProps, mapProps } from 'recompose';
import composeNS from 'composens';

const App = compose(
  withProps({ bar: 1 }),
  composeNS(
    'fooNamespace',
    ['bar'], // you can still access props passed in using a second argument that is a array of props you want passed in, or an object `{ key: alias }`
    withProps({ foo: 24601 }),
    mapProps(props => ({ parentBar: props.bar })) 
  )
)((props) => <div>foo: {props.fooNamespace.foo} bar: {props.bar}</div>);

ReactDom.render(<App />, document.querySelector('#container'));
```
