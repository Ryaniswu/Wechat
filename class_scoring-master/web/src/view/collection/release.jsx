import React from 'react';
import { Form, Select, DatePicker, List, Button } from 'antd';
import { fetchEnd } from '../../util';

const FormItem = Form.Item;
const courseUrl = '/collection/inquireCou';
const releaseUrl = '/collection/release';
const Option = Select.Option;

export class Release extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            optionData: [],
            releaseData: [],
            releaseHeader: <div>发布内容</div>
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
        console.log(this.date);
        this.obtain();
    }

    obtain = () => {
        if (this.course != null && this.date != null) {
            fetchEnd(releaseUrl, {
                className: this.course,
                date: this.date
            }, (data) => {
                let arr = [];
                for (let d of data) {
                    arr.push(d.title_name + d.student_id);
                }
                this.setState({
                    releaseData: arr,
                    releaseHeader: <div>{this.date + '/' + this.course + ':'}</div>
                });
            });
        }
    }


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
        return (
            <div>
                <Select
                    placeholder="选择科目"
                    style={{ width: 120 }}
                    onChange={this.handleSelect}
                    onDropdownVisibleChange={this.loadCourse}
                >
                    {this.state.optionData}
                </Select>

                <DatePicker placeholder="选择一个日期" onChange={this.handleChange} />

                <Button
                    style={{ float: "right" }}
                    type="primary"
                >发布</Button>

                <br /><br />
                <List
                    header={this.state.releaseHeader}
                    bordered
                    dataSource={this.state.releaseData}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                />
            </div>
        )
    }
}

