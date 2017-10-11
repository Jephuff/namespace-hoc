import React from 'react';
import { mapProps, withState, compose } from 'recompose'
import { mount } from 'enzyme'
import sinon from 'sinon'
import namespace from '../src/index.js'

test('namespace-hoc doesn\'t collide with parent props', () => {
  const component = sinon.spy(() => null)
  component.displayName = 'component'

  const StateContainer = compose(
    withState('state', 'setState', { init: true }),
    namespace(
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

test('namespace-hoc props are available', () => {
  const component = sinon.spy(() => null)
  component.displayName = 'component'

  const StateContainer = compose(
    withState('state', 'setState', { init: true }),
    namespace(
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

test('namespace-hoc parentMap passed in specified props', () => {
  const component = sinon.spy(() => null)
  component.displayName = 'component'

  const StateContainer = compose(
    withState('state', 'setState', { num: 5 }),
    namespace(
      {
        namespace: 'namespace',
        propMap: ['state'],
      },
      mapProps(props => ({
        ...props,
        num: props.state.num * 10,
      }))
    ),
    mapProps(({ state, ...rest }) => ({
      ...rest,
      state,
      val: state.val,
    }))
  )(component)

  mount(<StateContainer />)
  const { setState } = component.firstCall.args[0]
  setState(state => ({ ...state, num: 2 }));

  expect(component.firstCall.args[0].namespace.num).toBe(50)
  expect(component.secondCall.args[0].namespace.num).toBe(20)
})

test('namespace-hoc parentMap does not pass in unspecified props', () => {
  const component = sinon.spy(() => null)
  component.displayName = 'component'

  const StateContainer = compose(
    withState('state', 'setState', { num: 5 }),
    namespace(
      'namespace',
      mapProps(({ state = {}, ...props }) => ({
        ...props,
        num: state.num,
      }))
    ),
    mapProps(({ state, ...rest }) => ({
      ...rest,
      state,
      val: state.val,
    }))
  )(component)

  mount(<StateContainer />)
  const { setState } = component.firstCall.args[0]
  setState(state => ({ ...state, num: 2 }));

  expect(component.firstCall.args[0].namespace.num).toBe(undefined)
  expect(component.secondCall.args[0].namespace.num).toBe(undefined)
})

test('namespace-hoc parentMap uses aliases', () => {
  const component = sinon.spy(() => null)
  component.displayName = 'component'

  const StateContainer = compose(
    withState('state', 'setState', { num: 5 }),
    namespace(
      {
        namespace: 'namespace',
        propMap: { 
          state: 'parentState',
        },
      },
      mapProps(({ parentState = {}, ...props }) => ({
        ...props,
        num: parentState.num,
      }))
    ),
    mapProps(({ state, ...rest }) => ({
      ...rest,
      state,
      val: state.val,
    }))
  )(component)

  mount(<StateContainer />)
  const { setState } = component.firstCall.args[0]
  setState(state => ({ ...state, num: 2 }));

  expect(component.firstCall.args[0].namespace.num).toBe(5)
  expect(component.secondCall.args[0].namespace.num).toBe(2)
})