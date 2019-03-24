import React from 'react';
import { Table, Popconfirm, message, Button, Select, DatePicker, InputNumber} from 'antd';
import {EditableFormRow, EditableCell} from '../../util/';
import { fetchEnd } from '../../util';

const courseUrl = '/collection/inquireCou';
const inquireTestUrl = '/student/inquire';
const alterTestUrl = '/teacher/alterTest';
const deleteTestUrl = '/teacher/deleteTest';
const Option = Select.Option;

export class AlterTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            optionData: [],
            dataSource: [],
            columns: []
        }
        this.course = null;
        this.date = null;
        this.studentID = null;

        this.columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            editable: true
        }, {
            title: '分数',
            dataIndex: 'score',
            key: 'score',
            editable: true
        }, {
            title: '操作',
                    key: 'action',
                    render: (text, record) => {
                        return (
                            this.state.dataSource.length >= 1
                                ? (
                                    <Popconfirm title="确定删除吗?" onConfirm={() => this.handleDelete(record)}>
                                        <a href="javascript:;">删除</a>
                                    </Popconfirm>
                                ) : null
                        );
                    },
        }
        ];
    }

    handleSelect = (value, option) => {
        this.course = option.props.children;
        //console.log(this.course);
    }

    handleChange = (date, dateString) => {

        this.date = dateString;
        //console.log(dateString);
    }

    handleInput = (value) => {

        this.studentID = value;
        //console.log(value);
    }

    handleClick = () => {
        if (this.course != null && this.date != null && this.studentID != null) {
            fetchEnd(inquireTestUrl,{
                className: this.course,
                date: this.date,
                studentID: this.studentID
            },(data)=>{
                if (data.message === 'not login') {
                    message.warning('请先登录!');
                } else {
                    message.success('查询成功!');
                    let dataSource = [];
                    for (let d of data) {
                        let obj = {};
                        obj.key = d.id;
                        obj.title = d.title;
                        obj.score = d.add_score;
                        dataSource.push(obj);
                    }
                    this.setState({ dataSource: dataSource });
                }
            })
        } else {
            message.warning('请输入科目/日期/学号!');
        }
    }

    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        //console.log(row);
        let obj = {
            title:row.title,
            addScore:row.score,
            id:row.key
        };
        //console.log(obj);
        fetchEnd(alterTestUrl,obj,(data)=>{
            if(data.message==='SUCCESS'){
                this.setState({ dataSource: newData });
                message.success('修改成功!');
                console.log(data);
                }else if(data.message === 'not login'){
                    message.warning('请先登录!');
                }else{
                    message.error('修改失败!');
                }
        });
    }

    handleDelete = (record) => {
        const key = record.key;
        const dataSource = [...this.state.dataSource];
        //console.log(record);key ID name
        const obj = { id: record.key };
        fetchEnd(deleteTestUrl,obj,(data)=>{
            if(data.message==='SUCCESS'){
                this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
                message.success('删除成功!');
                }else if(data.message === 'not login'){
                    message.warning('请先登录!');
                }else{
                    message.error('删除失败!');
                }
        });
    };

    loadCourse = () => {
        fetchEnd(courseUrl,{},(data)=>{
            let arr = [];
                        for (let d of data) {
                            arr.push(<Option key={d.id}>{d.name}</Option>);
                        }
                        this.setState({ optionData: arr });
        });
    }

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });

        return (
            <div>
                <Select
                    placeholder="选择科目"
                    style={{ width: 120 }}
                    onDropdownVisibleChange={this.loadCourse}
                    onChange={this.handleSelect}
                >
                    {this.state.optionData}
                </Select>
                <DatePicker placeholder="选择一个日期" onChange={this.handleChange} />
                <InputNumber
                    min={1}
                    max={50}
                    placeholder="输入学号"
                    onChange={this.handleInput}
                />
                <Button
                    type="primary"
                    style={{ float: 'right' }}
                    onClick={this.handleClick}
                >
                    查询
                </Button>
                <br /><br />
                <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
            />
            </div>
        )
    }
}