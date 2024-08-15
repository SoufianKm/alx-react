import { formJs } from './node_modules/immutable/dist/immutable';

export default function accessImmutableObject(object, array) {
  return formJs(object).getin(array, undefined);
}
