import React from 'react';
import { Table, Popconfirm, message } from 'antd';
import { EditableFormRow, EditableCell } from '../../util/';
import { fetchEnd } from '../../util';

const alterStudentUrl = "/student/output";
const deleteStudentUrl = "/student/deleteStu";
const saveStudentUrl = "/student/alterStu";

export class AlterStudent extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '学号',
            dataIndex: 'ID',
            key: 'ID',
            editable: true,
            sorter: (a, b) => a.ID - b.ID,
        }, {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            editable: true,
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

        this.state = {
            dataSource: []
        };
    };
    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        //console.log(row);
        fetchEnd(saveStudentUrl, {
            studentName: row.name,
            studentId: row.ID,
            id: row.key
        }, (data) => {
            if (data.message === 'SUCCESS') {
                this.setState({ dataSource: newData });
                message.success('修改成功!');
                console.log(data);
            } else if (data.message === 'not login') {
                message.warning('请先登录!');
            } else {
                message.error('修改失败!');
            }
        });
    }

    handleDelete = (record) => {
        const key = record.key;
        const dataSource = [...this.state.dataSource];
        //console.log(record);key ID name
        const obj = { studentName: record.name, studentId: record.ID };
        fetchEnd(deleteStudentUrl, obj, (data) => {
            if (data.message === 'SUCCESS') {
                this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
                message.success('删除成功!');
            } else if (data.message === 'not login') {
                message.warning('请先登录!');
            } else {
                message.error('删除失败!');
            }
        });
    };

    componentDidMount() {
        this.obtain();
        //console.log(this.state.dataSource);
    };
    obtain = () => {
        fetchEnd(alterStudentUrl, {}, (data) => {
            let student = [];
            for (let d of data) {
                let obj = {};
                obj.key = d.id;
                obj.ID = d.student_id;
                obj.name = d.student_name;
                student.push(obj);
            }
            this.setState({ dataSource: student });
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
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={{ pageSize: 8 }}
            />
        )
    }
}