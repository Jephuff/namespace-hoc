import React from 'react';
import { mapProps, withState, compose } from 'recompose'
import { mount } from 'enzyme'
import sinon from 'sinon'
import composeNS from '../src/index.js'

test('composeNS doesn\'t collide with parent props', () => {
  const component = sinon.spy(() => null)
  component.displayName = 'component'

  const StateContainer = compose(
    withState('state', 'setState', { init: true }),
    composeNS(
      'namespace',
      withState('state', 'setState', { namespace: 'namespace' })
    ),
    mapProps(({ state, ...rest }) => ({
      ...rest,
      state,
      val: state.val,
    }))
  )(component)

  mount(<StateContainer />)
  const { setState } = component.firstCall.args[0]
  setState(state => ({ ...state, val: 2 }));

  expect(component.firstCall.args[0].val).toBe(undefined)
  expect(component.secondCall.args[0].val).toBe(2)
  expect(component.firstCall.args[0].state.init).toBe(true)
  expect(component.secondCall.args[0].state.init).toBe(true)
})

test('composeNS props are available', () => {
  const component = sinon.spy(() => null)
  component.displayName = 'component'

  const StateContainer = compose(
    withState('state', 'setState', { init: true }),
    composeNS(
      'namespace',
      withState('state', 'setState', { namespace: 'namespace' })
    ),
    mapProps(({ state, ...rest }) => ({
      ...rest,
      state,
      val: state.val,
    }))
  )(component)

  mount(<StateContainer />)
  const { setState } = component.firstCall.args[0]
  setState(state => ({ ...state, val: 2 }));

  expect(component.firstCall.args[0].namespace.state.namespace).toBe('namespace')
  expect(component.secondCall.args[0].namespace.state.namespace).toBe('namespace')
})
