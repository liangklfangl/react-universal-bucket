const LOAD = 'redux-example/LOAD';
const LOAD_SUCCESS = 'redux-example/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function info(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

/**
 * isLoaded传入我们一个全局的globalState，判断auth与auth.loaded属性
 * @param  {[type]}  globalState [description]
 * @return {Boolean}             [description]
 */
export function isLoaded(globalState) {
  return globalState.info && globalState.info.loaded;
}

/**
 * 发送loadInfo到服务器
 * @return {[type]} [description]
 */
export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => {
      return client.get('/loadInfo')
    }
  };
}
