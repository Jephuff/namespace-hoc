import React from 'react'

const parentKey = '__parent_props__'; // If React adds support for Symbol props, this can be switched to use them.

function getParentMap(mapOpt) {
  if (Array.isArray(mapOpt)) {
    return mapOpt.map((key) => [key, key])
  } else if(mapOpt && typeof mapOpt === 'object') {
    return Object.entries(mapOpt);
  }

  return [];
}

export default function composeNS(ns, ...args) {
  const hasParentMap = Array.isArray(args[0]) || typeof args[0] === 'object';
  const parentMap = getParentMap(hasParentMap && args[0]);
  const funcs = hasParentMap ? args.slice(1) : args;

  if (funcs.length === 0) return arg => arg;

  return [
    Wrapped => (props) => (
      <Wrapped
        {...{
          [parentKey]: props,
          ...(
            parentMap
              .reduce((acc, [key, alias]) => ({
                ...acc,
                [alias]: props[key],
              }), {})
          ),
        }}
      />
    ),
    ...funcs,
    Wrapped => ({ [parentKey]: parentProps, ...props }) => <Wrapped {...{ ...parentProps, [ns]: props }} />,
  ] 
    .reduce((a, b) => (...args) => a(b(...args)));
};
