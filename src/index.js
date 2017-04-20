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

export default function composeNS(args, ...funcs) {
  const opts = typeof args === 'string' ? { namespace: args } : args;
  const ns = opts.namespace;
  const parentMap = getParentMap(opts.propMap);

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
