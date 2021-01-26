import appReducer, { initialState } from './app.reducer';
import {
  setCurrentApplet,
} from './app.actions';

test('it has an initial state', () => {
  expect(appReducer(undefined, { type: 'foo' })).toEqual(initialState);
});

test('it sets current applet', () => {
  expect(appReducer(initialState, setCurrentApplet('barfoo'))).toEqual({
    ...initialState,
    currentApplet: 'barfoo',
  });
});

test('it sets current activity', () => {
  expect(appReducer(initialState, setCurrentApplet('activity-123'))).toEqual({
    ...initialState,
    currentApplet: 'activity-123',
  });
});
