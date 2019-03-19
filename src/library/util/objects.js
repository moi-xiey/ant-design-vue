import {is, fromJS} from 'immutable';
import _ from 'lodash';

export const merge = _.merge;

export const clone = _.cloneDeep;

export const toString = (obj) => Object.prototype.toString.call(obj);

export const isObject = (...args) => args.every((arg) => toString(arg) === '[object Object]');

export const isArray = (...args) => args.every((arg) => Array.isArray(arg));

export const isString = (...args) => args.every((arg) => toString(arg) === '[object String]');

export const isFunction = (...args) => args.every((arg) => toString(arg) === '[object Function]');

export const isDate = (...args) => args.every((arg) => arg instanceof Date && !isNaN(arg.valueOf()));

export const hasProp = (obj, ...props) => !!props.length && props.every((prop) => !Object.is(undefined, obj) && !Object.is(null, obj) && Object.prototype.hasOwnProperty.call(obj, prop));

export const isEquals = (...args) => {
  if (args.length < 2) {
    return true;
  }
  const [first, ...items] = args;
  const target = fromJS(first);
  return items.every((item) => is(target, fromJS(item)));
};

export default {
  merge,
  clone,
  toString,
  isObject,
  isArray,
  isString,
  isFunction,
  isDate,
  hasProp,
  isEquals,
};
