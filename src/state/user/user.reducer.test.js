import userReducer, { initialState } from './user.reducer';
import { setAuth, setInfo } from './user.actions';

test('it has an initial state', () => {
  expect(userReducer(undefined, { type: 'foo' })).toEqual(initialState);
});
