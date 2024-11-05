import { ChangeSort } from '../actions/sort';

const InitialState = {
  sort: 'old',
};

export default function posts(state = InitialState, action) {
  switch (action.type) {
    case ChangeSort: {
      return {
        ...state,
        sort: action.sort
      }
    }

    default:
      return state;
  }
}
