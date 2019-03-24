import React from 'react';
import { Form, Icon, Input, Button,InputNumber, message } from 'antd';
import {fetchEnd} from '../../util';

const FormItem = Form.Item;
const addStudentUrl = "/student/insert";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontaladdForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      let obj = {studentName:values.studentName,studentId:values.studentID};
      
      let addStudentOpt = {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
        body:JSON.stringify(obj)
      };
      if (!err) {
        fetchEnd(addStudentUrl,obj,(data)=>{
          if(data.message==="SUCCESS"){
            message.success('添加成功');
            const {resetFields} = this.props.form;
            resetFields(['studentName', 'studentID']);
          }else{
            message.error('添加失败,请检查学号是否正确以及是否重复添加!')
          }
        });
      console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const studentNameError = isFieldTouched('studentName') && getFieldError('studentName');
    const studentIDError = isFieldTouched('studentID') && getFieldError('studentID');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={studentNameError ? 'error' : ''}
          help={studentNameError || ''}
        >
          {getFieldDecorator('studentName', {
            rules: [{ required: true, message: '请输入姓名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="姓名" />
          )}
        </FormItem>
        <FormItem
          validateStatus={studentIDError ? 'error' : ''}
          help={studentIDError || ''}
        >
          {getFieldDecorator('studentID', {
            rules: [{ required: true, message: '请输入学号!' }],
          })(
            <InputNumber min={1} max={50}  placeholder="学号" />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            添加
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const AddStudent = Form.create()(HorizontaladdForm);
export {AddStudent};