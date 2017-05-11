const INCREMENT = 'redux-example/counter/INCREMENT';
//初始状态
const initialState = {
  count: 0
};
/**
 * 更新counter
 * @param  {[type]} state  [description]
 * @param  {Object} action [description]
 * @return {[type]}        [description]
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INCREMENT:
      const {count} = state;
      return {
        count: count + 1
      };
    default:
      return state;
  }
}

export function increment() {
  return {
    type: INCREMENT
  };
}
