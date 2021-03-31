import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios'
import UbahDom from '../utils/UbahDom'
// import Verify from '../utils/Verify'
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class Demo extends React.Component {
  constructor(props){
    super(props)
    this.state={}
  }
   async componentDidMount(){
    // const verify =await Verify()
    // console.log(verify);
    const token = localStorage.getItem("token")
    // console.log(token);
    if(token){
      let headers = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        responseType: "json"
      };      
      axios
        .post(`/auth/verify`, null, headers)
        .then(res => {
            // console.log(res.data);
          if (res.data.diagnostic.status=== 200) {
            // console.log(res.data.diagnostic.status);
            if(res.data.result.type === 'operator jurusan'){
              UbahDom(`/admin`,this.props.history)
          }
          if(res.data.result.type === 'jfu'){
            UbahDom(`/admin/jfu`,this.props.history)
        }
          if(res.data.result.type === 'ksb'){
            UbahDom(`/admin/ksb`,this.props.history)
        }if(res.data.result.type === 'ktu'){
          UbahDom(`/admin/ktu`,this.props.history)
      }
        if(res.data.result.type === 'wd'){
          UbahDom(`/admin/wd`,this.props.history)
      }
        if(res.data.result.type === 'dk'){
          UbahDom(`/admin/dk`,this.props.history)
      }
          }
        })
        .catch(function(error) {
        console.log(error);
        });
    }else{
      console.log("tidak",token);
    }
  }
  onFinish = (values) => {
    console.log('Success:', values);
    // console.log('Success:', props);
    let headers = {
        headers: {
          "Content-Type": "application/json",
          nip: values.nip,  
          password: values.pass
        },
        responseType: "json"
      };
    //   const { history } = this.props;
  
      axios
        .post(`/auth/login`, null, headers)
        .then(res => {
        //   this.setState({ diagnostics: res.data.diagnostic });
            console.log(res.data);
          if (res.data.diagnostic.status=== 200) {
              const result=res.data.result
            localStorage.setItem("token", res.headers.authorization);
            localStorage.setItem("level", result.jabatan);
            // this.setState({ results: result });
            console.log(result);
            if(result.jabatan === 'operator jurusan'){
                UbahDom(`/admin`,this.props.history)
            }
            if(result.jabatan === 'jfu'){
                UbahDom(`/admin/jfu`,this.props.history)
            }
            if(result.jabatan === 'ksb'){
              UbahDom(`/admin/ksb`,this.props.history)
            }
              if(result.jabatan === 'ktu'){
                UbahDom(`/admin/ktu`,this.props.history)
            }
              if(result.jabatan === 'wd'){
                UbahDom(`/admin/wd`,this.props.history)
            }
              if(result.jabatan === 'dk'){
                UbahDom(`/admin/dk`,this.props.history)
            }
              // Cookies.set("token", res.headers.authorization, { path: "/" });
          }
          
         
          // console.log(`react cookies : ${Cookies.load("token")}`);
        })
        .catch(function(error) {
          // handle error
        //   info();
          console.log(error);
        });
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  render(){
    return (
        <div className="loginConteiner">
          <div className="login">
              <Form
              {...layout}
              name="basic"
              initialValues={{
                  remember: true,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              >
              <Form.Item
                  label="NIP"
                  name="nip"
                  rules={[
                  {
                      required: true,
                      message: 'NIP Harus Di Isi',
                  },
                  ]}
              >
                  <Input />
              </Form.Item>

              <Form.Item
                  label="Password"
                  name="pass"
                  rules={[
                  {
                      required: true,
                      message: 'Password Harus Di Isi',
                  },
                  ]}
              >
                  <Input.Password />
              </Form.Item>

              <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                  <Checkbox>Ingat Saya!</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                  Masuk
                  </Button>
              </Form.Item>
              </Form>
          </div>
      </div>
    );
  }
};
export default Demo