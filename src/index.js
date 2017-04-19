import React from 'react'

export default function composeNS(ns, ...funcs) {
  if (funcs.length === 0) return arg => arg;

  return [
    Wrapped => (props) => <Wrapped parentProps={props} />,
    ...funcs,
    Wrapped => ({ parentProps, ...props }) => <Wrapped {...{ ...parentProps, [ns]: props }} />,
  ] 
    .reduce((a, b) => (...args) => a(b(...args)));
};
