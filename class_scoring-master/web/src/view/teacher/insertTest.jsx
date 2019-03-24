import React from 'react';
import { Form, Input, InputNumber, message, Cascader, Select, Row, Col, Button } from 'antd';
import { fetchEnd } from '../../util';

const insertDataUrl = "/student/insertData";
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const residences = [{
    value: '理科',
    label: '理科',
    children: [{
        value: '数学',
        label: '数学',
    }, {
        value: '物理',
        label: '物理',
    }]
}, {
    value: '文科',
    label: '文科',
    children: [{
        value: '语文',
        label: '语文',
    }, {
        value: '英语',
        label: '英语',
    }]
}, {
    value: 'Other',
    label: '其它',
}];
const children = [];
const Option = Select.Option
for (let i = 1; i < 51; i++) {
    children.push(<Option key={i}>{i}</Option>);
}

class InsertForm extends React.Component {
    handleChange = (value) => {
        console.log(value);
        const { getFieldDecorator, setFieldsValue } = this.props.form;
        if (value[0] === 'Other') {
            setFieldsValue({ otherItem: true });
        } else {
            setFieldsValue({ otherItem: false });
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);
                let course;
                if (values.course2 != null) {
                    course = values.course2;
                } else {
                    course = values.course1[values.course1.length - 1];
                }
                fetchEnd(insertDataUrl, {
                    className: course,
                    title: values.title,
                    studentID: values.studentIDs,
                    addScore: values.score
                }, (data) => {
                    if (data.message === 'SUCCESS') {
                        message.success('添加成功!');
                    } else if (data.message === 'not login') {
                        message.warning('请先登录!');
                    } else {
                        message.error('添加失败!');
                    }
                });
            }
        });
    }
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const otherItem = getFieldValue('otherItem') ? (<FormItem
            {...formItemLayout}
            label="其它"
        >
            {getFieldDecorator('course2', {
                rules: [{ required: true, message: '请输入科目!', whitespace: true }],
            })(
                <Input />
            )}
        </FormItem>) : null;
        return (
            <Row>
                <Col span={3}></Col>
                <Col span={15}>
                    <br /><br />
                    <Form style={{}} onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="标题"
                        >
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '请输入标题!', whitespace: true }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="科目"
                        >
                            {getFieldDecorator('course1', {
                                rules: [{ type: 'array', required: true, message: '请输入科目!', whitespace: true }],
                            })(
                                <Cascader placeholder='' options={residences} onChange={this.handleChange} />
                            )}
                        </FormItem>
                        {otherItem}
                        <FormItem
                            {...formItemLayout}
                            label="加减分"
                        >
                            {getFieldDecorator('score', {
                                rules: [{ required: true, whitespace: true, type: 'number' }],
                            })(
                                <InputNumber />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="学号列表"
                        >
                            {getFieldDecorator('studentIDs', {
                                rules: [{ type: 'array', required: true, message: '请输入学号!', whitespace: true }],
                            })(
                                <Select mode="tags" style={{ width: '100%' }} >{children}</Select>
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </FormItem>
                    </Form>
                </Col>
                <Col span={6}></Col>
            </Row>
        )
    }
}
const InsertTest = Form.create()(InsertForm);
export { InsertTest };