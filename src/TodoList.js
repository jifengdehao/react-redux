import React, { Component } from 'react';
import 'antd/dist/antd.css';
import store from './store';
import { getInputChangeAction, getAddItemAction, getDeleteItemAction } from './store/actionCreators'
import TodoListUI from './TodoListUI';

class TodoList extends Component {

	constructor(props) {
		super(props);
		this.state = store.getState(); // 获取state
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleStoreChange = this.handleStoreChange.bind(this);
		this.handleBtnClick = this.handleBtnClick.bind(this);
		this.handleItemDelete = this.handleItemDelete.bind(this)
		store.subscribe(this.handleStoreChange); // 订阅store的改变,重新获取state
	}

	render() {
		return (
			<TodoListUI 
				inputValue={this.state.inputValue}
				list={this.state.list}
				handleInputChange={this.handleInputChange}
				handleBtnClick={this.handleBtnClick}
				handleItemDelete={this.handleItemDelete}
			/>
		)
	}
	// input 改变
	handleInputChange(e) {
		const action = getInputChangeAction(e.target.value);
		store.dispatch(action);
	}
	// store 改变
	handleStoreChange() {
		this.setState(store.getState());
	}
	// 按钮点击 添加数据
	handleBtnClick() {
		const action = getAddItemAction();
		store.dispatch(action);
	}
	// 删除数据
	handleItemDelete(index) {
		const action = getDeleteItemAction(index);
		store.dispatch(action);
	}

}

export default TodoList;