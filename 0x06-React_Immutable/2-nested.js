import { formJs } from './node_modules/immutable/dist/immutable';

export default function accessImmutableObject(object, array) {
  const nested = formJs(object);

  return nested.getIn(array);
}
