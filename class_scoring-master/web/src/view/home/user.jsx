import React from 'react';
import {Menu, Icon, Avatar, Dropdown, message } from 'antd';
import {withRouter} from "react-router-dom";

const identityUrl = "/teacher/identity";
const menu = (
    <Menu>
      <Menu.Item key="1">个人中心</Menu.Item>
      <Menu.Item key="2">账号设置</Menu.Item>
      <Menu.Item key="3">退出</Menu.Item>
    </Menu>
  );

class User extends React.Component {
    constructor(props){
        super(props);
        this.state={userName:"未登录"};
    }
    componentDidMount(){
        let identityOpt = {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', }
          }
          fetch(identityUrl,identityOpt)
            .then(response => {
              //成功获得身份信息
              if (response.ok) {
                response.json().then(data => {
                  //console.log(data);
                  if(data.wxopenid!=null){
                    this.setState({userName: data.wxopenid});
                    message.success(`欢迎${this.state.userName}`)
                    //console.log("1 "+this.state.userName);
                  }else{
                   this.props.history.push("/login");//未登录
                  }
                });
              } else {
                console.log("请求不成功，状态码为", response.status);
              }
            })
            .catch(error => console.log('error is', error));
    }
    render() {
        return (
            <div>
            <Avatar style={{ backgroundColor: '#87d068', marginRight: 20 }} icon="user" />
            <Dropdown overlay={menu}>
                <span className="ant-dropdown-link" href="#" style={{ color: '#fff', cursor: 'pointer' }}>
                    {this.state.userName} <Icon type="down" />
                </span>
            </Dropdown>
            </div>
        )
    }
}

export default withRouter(User);