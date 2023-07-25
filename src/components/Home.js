import React, { Component } from "react";
import { Button, Form, Input } from "antd";
import { Space, Table } from "antd";
import { connect } from "react-redux";
import { adddata, removedata, updatedata } from "../Store/SliceData";
const { Column } = Table;

class Home extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      userdata: [],
      eid: "",
      Editbtn: true,
    };
  }

  render() {
    const onFinish = (values) => {
      const newdata = this.props.users.length;

      const eidd = this.state.eid;
      console.log("Success:", eidd);

      if (!this.state.Editbtn) {
        console.log(eidd, "Please eidd");

        this.props.updatedata({
          id: eidd,
          email: values.email,
          password: values.password,
        });

        this.formRef.current?.resetFields();
        this.setState({ Editbtn: true });
        console.log("ififififif");
      } else {
        this.props.adddata(newdata, values.email, values.password);
        this.formRef.current?.resetFields();
        console.log("else ifif");
      }
    };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    const editdata = (record) => {
      this.formRef.current?.setFieldsValue({
        email: record.email,
        password: record.password,
      });
      this.setState({ eid: record.id });
      this.setState({ Editbtn: false });
    };

    const deletedata = (record) => {
      this.props.removedata(record);
    };
    return (
      <div className="App">
        <header className="App-header">
          <div className="main">
            <Form
              ref={this.formRef}
              name="control-ref"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{ span: 16 }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                {this.state.Editbtn ? (
                  <Button id="login-btn" type="primary" htmlType="submit">
                    Submit
                  </Button>
                ) : (
                  <Button id="login-btn" type="primary" htmlType="submit">
                    Edit
                  </Button>
                )}
              </Form.Item>
            </Form>
          </div>
          <div className="antd_main">
            <div className="antd">
              <Table dataSource={this.props.users}>
                <Column title="ID" dataIndex="id" key="id " />
                <Column title="EMAIL" dataIndex="email" key="email" />
                <Column title="PASSWORD" dataIndex="password" key="password" />
                <Column
                  title="ACTION"
                  key="action"
                  render={(record) => (
                    <Space size="middle">
                      <Button onClick={() => editdata(record)}>Edit</Button>
                      <Button onClick={() => deletedata(record)}>Delete</Button>
                    </Space>
                  )}
                />
              </Table>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    adddata: (a, b, c) =>
      dispatch(
        adddata({
          id: a + 1,
          email: b,
          password: c,
        })
      ),
    removedata: (record) => {
      dispatch(removedata({ record }));
    },
    updatedata: (record) => {
      console.log(record, "record updated");
      dispatch(updatedata(record));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
