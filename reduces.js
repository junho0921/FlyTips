import {GET_MSG_LIST, AFTER_MSG_SHOW, MAX_LENGTH} from './constants';
import initialState from './initStore';
/**
 * Action 处理
 */
export default (state = initialState, action = {}) => {
  const {flyMsg_rest, flyMsg_list} = state;
  switch (action.type) {
    case GET_MSG_LIST:
      const list = flyMsg_list.concat(flyMsg_rest, action.list);
      return Object.assign({}, state, {
        flyMsg_list: list.slice(0, MAX_LENGTH),
        flyMsg_rest: list.slice(MAX_LENGTH)
      });
    case AFTER_MSG_SHOW:
      return Object.assign({}, state, {
        flyMsg_list: flyMsg_rest.slice(0, MAX_LENGTH),
        flyMsg_rest: flyMsg_rest.slice(MAX_LENGTH)
      });
    default:
      return state;
  }
};
