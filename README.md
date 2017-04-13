# composeNS
composeNS is namespaced compose function that can be used with recompose to avoid prop name collision. 

## Usage

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
    withProps({ foo: 24601 }),
    mapProps(props => ({ parentBar: props.parentProps.bar })) // you can still access props passed in with the parentProps object.
  )
)((props) => <div>foo: {props.fooNamespace.foo} bar: {props.bar}</div>);

ReactDom.render(<App />, document.querySelector('#container'));
```