import { GET_MSG_LIST , AFTER_MSG_SHOW } from './constants';

export const getMsgs = (list) => ({
  type: GET_MSG_LIST,
  list: list
});

export const afterMsgShow = () => ({
  type: AFTER_MSG_SHOW
});
