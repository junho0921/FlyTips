/**
 * Created by jiajunhe.
 */
import React, {Component} from 'react';
import './index.css';
import { getMsgs, afterMsgShow } from './action.js';
import reducer from './reduces.js';

/**
 * @class FlyTips
 * @extends {Component}
 * @intro 弹出提示语组件：每个提示语以滑入的动画展示，每次最多展示4个，其余会排队展示。
 */
class FlyTips extends Component {

  constructor(props) {
    super(props);
    // 缓存：已经接收的提示语
    this.flyMsg_key = {};
    // 初始化本组件的状态
    this.state = reducer();
    // 方法：设置组件状态
    this._dispatch = action => this.setState(reducer(this.state, action));
    // 方法：展示提示语后的callback
    this.afterMsgShow = (flyMsg_list) => () => {
      this._dispatch(afterMsgShow());
      // 执行callback -- 父级传参的
      if(typeof this.props.afterShow === "function"){
        this.props.afterShow(flyMsg_list)
      }
    };
  }
  /*
  * 接收父级的提示语列表
  * @param newProps [Object] 父级属性
  * @param newProps.list [Array] 提示语内容，格式示例：[{content:'ct', key: 21}]; 注意：内容必须为对象且要有key与content属性，key是唯一标志符号，content是文案；
  * */
  componentWillReceiveProps(newProps){
    let receiveList = [];
    const {flyMsg_key} = this;
    // 接收父级组件的参数list, 对没有展示过的msg插入到本组件状态flyMsg_list
    if(newProps.list && newProps.list.length){
      newProps.list.forEach(item => {
        if(item.key && item.content && !flyMsg_key[item.key]){
          receiveList.push(item);
          // 标记本提示语已经展示
          flyMsg_key[item.key] = true;
        }
      });
    }
    // 若有新的提示语信息，更新本组件状态
    if(receiveList.length){
      this._dispatch(getMsgs(receiveList));
    }
  }

  shouldComponentUpdate(newProps, state){
    // 仅在提示语列表更新时才更新本组件
    return state.flyMsg_list !== this.state.flyMsg_list;
  }

  render() {
    const { flyMsg_list } = this.state;
    return (
      <ul className='xunbao_result_tips'>
        {flyMsg_list.map((item, index) => // 提示语列表
          <li
            key={item.key}
            // 绑定事件：最后一个提示语绑定动画结束事件
            onAnimationEnd={index === flyMsg_list.length - 1 ? this.afterMsgShow(flyMsg_list.slice()) : () => {} }
          >
            {item.content}
          </li>
        )}
      </ul>
    );
  }
}

export default FlyTips;
