import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
const { Sider } = Layout;

export default class LeftSide extends React.Component{
    constructor (props) {
		super(props)
		this.state = {
			key: 1
		}
	}
    handleClick = (e) => {
		console.log(e)
		this.props.getValue(e.key,e.item.props.children); 
    }
    render() {
        return (
            <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
             // defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <SubMenu key="sub1" title={<span><Icon type="user" />学生管理</span>}>
                <Menu.Item key="1">
                <Link to = {'/addStudent'}>增加学生</Link>
                </Menu.Item>
                <Menu.Item key="2">
                <Link to = {'/alterStudent'}>修改学生</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />教师工具</span>}>
                <Menu.Item key="3">
                <Link to = {'/insertTest'}>增加成绩</Link>
                </Menu.Item>
                <Menu.Item key="4">
                <Link to = {'/alterTest'}>修改成绩</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification" />统计信息</span>}>
                <Menu.Item key="5">
                <Link to = {'/release'}>发布成绩</Link>
                </Menu.Item>
                <Menu.Item key="6">
                <Link to = {'/table'}>筛选汇总</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
        );
    }

}