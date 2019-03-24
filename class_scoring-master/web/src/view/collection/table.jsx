import React from 'react';
import { Select, DatePicker, Table } from 'antd';
import { fetchEnd } from '../../util';

const { RangePicker } = DatePicker;
const Option = Select.Option;
const courseUrl = '/collection/inquireCou';//课程列表
const tableUrl = '/collection/table';//汇总表格

export class CollTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            optionData: [],
            dataSource: [],
            columns: []
        }
        this.course = null;
        this.date = null;
    }
    handleSelect = (value, option) => {
        this.course = option.props.children;
        console.log(this.course);
        this.obtain();
    }

    handleChange = (date, dateString) => {

        this.date = dateString;
        console.log(dateString);
        this.obtain();
    }

    obtain = () => {
        if (this.course != null && this.date != null) {
            fetchEnd(tableUrl, {
                className: this.course,
                dateFirst: this.date[0],
                dateLast: this.date[1]
            }, (data) => {
                let columns = [{
                    title: '学号',
                    dataIndex: 'studentId',
                    key: 'studentId',
                    sorter: (a, b) => a.studentId - b.studentId,
                }, {
                    title: '合计',
                    dataIndex: 'total',
                    key: 'total',
                    sorter: (a, b) => a.total - b.total,
                }];
                for (let d in data[0]) {
                    if (d !== "studentId" && d !== "total") {
                        let obj = {};
                        obj.title = d.substring(5);
                        obj.dataIndex = d;
                        obj.key = d;
                        columns.push(obj);
                    }
                }
                let dataSource = data
                for (let d of dataSource) {
                    d.key = d.studentId;
                }
                this.setState({
                    dataSource: dataSource,
                    columns: columns
                })
            });
        }
    }

    loadCourse = () => {
        fetchEnd(courseUrl, {}, (data) => {
            let arr = [];
            for (let d of data) {
                arr.push(<Option key={d.id}>{d.name}</Option>);
            }
            this.setState({ optionData: arr });
        });
    }
    render() {
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
                <RangePicker onChange={this.handleChange} />
                <br /><br />
                <Table
                    bordered
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    scroll={{ x: true }}
                    pagination={{ pageSize: 7 }}
                />

            </div>
        )
    }
}