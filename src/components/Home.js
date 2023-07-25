import { Component } from "react";
import { Button, Form, Input } from "antd";
import { withHooks } from 'react-redux';
import { Space, Table } from "antd";
import { connect } from "react-redux";
import { adddata, removedata } from "../Store/SliceData";
const { Column } = Table;

class Home extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userdata: [],
      formData: {
        email: "",
        password: "",
    },
      allfachData:(""),
    };
  }
  render() {
    console.log(this.props.users,"userssssssssssss")
    


    const onFinish = (values) => {
      const newdata = this.props.users.length;
      console.log("Success:", values.id);
      this.props.adddata(newdata, values.email, values.password)
      
    };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    
    const editdata = (record) => {
    const edata = this.props.users.find((e)=>e.id === record)
    }
  
    const deletedata = (record) => {
     console.log(record,"recoeds")
      this.props.removedata(record)
    }; 
    return (
        <div className="App">
          <header className="App-header">
            <div className="main">
            <Form
              name="basic"
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
              autoComplete="off"
              Form={Form}
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
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button id="login-btn" type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
        </div>
            <div className="antd_main">
              <div className="antd">
                <Table dataSource={this.props.users}>
                  <Column title="ID" dataIndex="id" key="id " />
                  <Column title="EMAIL" dataIndex="email" key="email" />
                  <Column
                    title="PASSWORD"
                    dataIndex="password"
                    key="password"
                  />
                  <Column
                    title="ACTION"
                    key="action"
                    render={(record) => (
                      <Space size="middle">
                        <Button onClick={() => editdata(record.id)}>Edit</Button>
                        <Button onClick={() => deletedata(record)}>
                          Delete
                        </Button>
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
      adddata: (a,b,c) => dispatch(
        adddata({
          id: a + 1 ,
          email: b,
          password: c,
        }),
      ),
      removedata: (record) => {dispatch(
        removedata({record}),
      )}
    };
  };
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(Home);
  
  