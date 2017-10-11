import { compose, mapProps, withProps } from 'recompose';

export const parentKey = '__parent_props__'; // If React adds support for Symbol props, this can be switched to use them.

function getParentMap(mapOpt) {
  if (Array.isArray(mapOpt)) {
    return mapOpt.map((key) => [key, key])
  } else if(mapOpt && typeof mapOpt === 'object') {
    return Object.entries(mapOpt);
  }

  return [];
}

export default function(args, ...funcs) {
  const opts = typeof args === 'string' ? { namespace: args } : args;
  const namespace = opts.namespace;
  const parentMap = getParentMap(opts.propMap);

  if (funcs.length === 0) return compose(withProps({ [namespace]: {} }));
  return compose(
    mapProps(props => ({
      [parentKey]: props,
      ...(
        parentMap
          .reduce((acc, [key, alias]) => ({
            ...acc,
            [alias]: props[key],
          }), {})
      ),
    })),
    ...funcs,
    mapProps(({ [parentKey]: parentProps, ...props }) => ({ ...parentProps, [namespace]: props }))
  );
};
