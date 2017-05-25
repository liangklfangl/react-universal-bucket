const LOAD = 'redux-example/widgets/LOAD';
const LOAD_SUCCESS = 'redux-example/widgets/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/widgets/LOAD_FAIL';
const EDIT_START = 'redux-example/widgets/EDIT_START';
const EDIT_STOP = 'redux-example/widgets/EDIT_STOP';
const SAVE = 'redux-example/widgets/SAVE';
const SAVE_SUCCESS = 'redux-example/widgets/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/widgets/SAVE_FAIL';

const initialState = {
  loaded: false,
  editing: {},
  saveError: {}
};

/**
 * 这里是我们的widget对应的reducer,每一个reducer都会接收一个state和action。
 * 而这个文件中，其他的方法都是会作为mapDispatchToProps，而发出一个action
 * 最后这个action会被clientMiddleware处理
 * @param  {[type]} state  [description]
 * @param  {Object} action [description]
 * @return {[type]}        [description]
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    //如果action为LOAD_SUCCESS，
    case LOAD_SUCCESS:
      const success= {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
      // console.log("reducers中的success返回的对象为:",success);
      return success;
    //(1)其中error是一个对象，是我们通过superagent发送请求到服务端后返回的错误对象
    // next({...rest, error, type: FAILURE})
    // 此时通过该reducer我们计算得到一个新的state状态，这个state状态维持的是combineReducer中
    // widget部分的state,它会和其他的部分组合在一起，进而得到组合后的最终state对象，然后将
    // 根据这个state来重新渲染各级组件
    case LOAD_FAIL:
      const err= {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    // console.log("reducers中的err返回的对象为:",err);
      return err;
    case EDIT_START:
     //此时只是将我们的state中添加了editing属性而已，并将该id(dispatch的这个action有额外的id值)对应的
     //值设置为true。其中...state.editing就是将原来的key值原样保存而已，此时state就会发生变化
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case EDIT_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      const data = [...state.data];
      data[action.result.id - 1] = action.result;
      return {
        ...state,
        data: data,
        editing: {
          ...state.editing,
          [action.id]: false
        },
        saveError: {
          ...state.saveError,
          [action.id]: null
        }
      };
    case SAVE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : state;
    default:
      return state;
  }
}
/**
 * isLoaded传入我们store中的state的一个副本，然后如果我们以前已经dispatch了一个
 * 行为，如下面的load方法，此时我们肯定会经历LOAD_SUCCESS,进而操作我们的reducer,
 * 最后导致我们的widget.loaded属性为true,从而表示已经load过一次数据了
 * @param  {[type]}  globalState [description]
 * @return {Boolean}             [description]
 */
export function isLoaded(globalState) {
  return globalState.widgets && globalState.widgets.loaded;
}

/**
 * 获取服务端所有的widgets，后面两个参数param1,param2只是为了演示
 * @return {[type]} [description]
 */
export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/widget/load/param1/param2') 
    // params not used, just shown as demonstration
  };
}

/**
 * 接收一个widget来保存，发送请求到/widget/update
 * @param  {[type]} widget [description]
 * @return {[type]}        [description]
 */
export function save(widget) {
  console.log("保存widget为:",widget);
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: widget.id,
    promise: (client) => client.post('/widget/update', {
      data: widget
    })
  };
}
/**
 * (1)这里很显然，如果我们的mapDispatchToProps返回的是一个对象，那么这个key对应的就是一个
 * 函数，此时当你调用这个函数，就相当于直接将函数的返回值dispatch出去了，而且此时不会被
 * clientMiddleware拦截，因为它会有如下的判断：
 *    if (!promise) {
        return next(action);
      }
   所以直接会到reducer中进行处理,也就是这个文件中的reducer函数
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
export function editStart(id) {
  console.log("开始编辑widget的id为:",id);
  return { type: EDIT_START, id };
}

/**
 * 结束编辑
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
export function editStop(id) {
  return { type: EDIT_STOP, id };
}
