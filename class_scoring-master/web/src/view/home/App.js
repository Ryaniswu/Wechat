import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Row, Col, Icon } from 'antd';
import './App.css';
import LeftSide from './sider.jsx';
import {InsertTest,AlterTest} from "../teacher";
import {AddStudent,AlterStudent} from "../student";
import {CollTable,Release} from "../collection";
import User from "./user";

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout >
    <Header className="header">
    <Row>
    <Col span={4}>
      <div className="logo">学分统计系统</div>
      </Col>
      <Col span={10}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
      </Col>
      <Col span={6}></Col>
      <Col span={4}><User/></Col>
      </Row>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
      <LeftSide />
        <Content style={{ padding: '0 24px', minHeight: 420 }}>
        <Route path="/addStudent" exact component={AddStudent}></Route>
        <Route path="/alterStudent" exact component={AlterStudent}></Route>
        <Route path="/insertTest" exact component={InsertTest}></Route>
        <Route path="/alterTest" exact component={AlterTest}></Route>
        <Route path="/table" exact component={CollTable}></Route>
        <Route path="/release" exact component={Release}></Route>
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center'}}>
      Made in 114
    </Footer>
  </Layout>
    );
  }
}

export default App;