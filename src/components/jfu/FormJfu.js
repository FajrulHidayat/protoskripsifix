import React from 'react'
import { Form, Input, Button,DatePicker } from 'antd';
import axios from 'axios'
import UbahDom from '../utils/UbahDom'
import moment from 'moment'
import FormatDate from '../utils/FormatDate'


class FormJudul extends React.Component{
  constructor(props){
    super(props)
    this.state={
      data:[
      //   {
      //   name:"nim",
      //   value:"602340"
      // },
      //   {
      //   name:"nama",
      //   value:"sdasd"
      // },
    ],
    endPointFrom:"",
    endPointTo:"",
    redirect:"",
    formEdit:false,
    forms:[
      {
        label:"NIM",
        name:"nim"
      },
      {
        label:"Nama",
        name:"nama"
      },
      {
        label:"Judul",
        name:"judul"
      },
      {
        label:"Pembimbing 1",
        name:"pembimbing1"
      },
      {
        label:"Pembimbing 2",
        name:"pembimbing2"
      },
    ]
    }
    this.form=[
      [
        {
          label:"Penguji 1" , 
          name:"penguji1"
        },
        {
          label:"Penguji 2",
          name:"penguji2"
        },
        {
          label:"Waktu",
          name:"waktu"
        }
      ],
      [
        {
          label:"Penguji 1" , 
          name:"penguji1"
        },
        {
          label:"Penguji 2",
          name:"penguji2"
        },
        {
          label:"Munaqisy 1",
          name:"munaqisy1"
        },
        {
          label:"Munaqisy 2",
          name:"munaqisy2"
        },
        {
          label:"Waktu",
          name:"waktu"
        }
      ],
    ]
  }
  async componentDidMount(){
    let id = false
    // console.log("props",this.props);
    // this.setState({pathname:this.props.history.location.pathname})
    // console.log("pathname",this.props);
    if(this.props.match){
    id = this.props.match.params.id
    // console.log(id);
    switch (this.props.match.path) {
      case "/admin/Form":
          await this.setState({redirect:"/admin/",endPointFrom:"/master/mahasiswa",endPointTo:"/master/judul"})
        break;
      case "/admin/Form/:id":
          await this.setState({redirect:"/admin/",endPointFrom:"/master/judul",endPointTo:"/master/judul",formEdit:true})
        this.getDataForm(id)
        break;

        case "/admin/Formproposal":
        // console.log("switch3",this.props.match.path);
          await this.setState({redirect:"/admin/proposal"})
          await this.setState({endPointFrom:"/master/judul"})
          await this.setState({endPointTo:"/master/proposal"})
          this.tambahForm(0)
          break;
        case "/admin/Formproposal/:id":
        // console.log("switch3",this.props.match.path);
          await this.setState({redirect:"/admin/proposal"})
          await this.setState({endPointFrom:"/master/proposal"})
          await this.setState({endPointTo:"/master/proposal",formEdit:true})
          this.tambahForm(0)
          this.getDataForm(id)
          break;
        case "/admin/Formhasil":
        // console.log("switch3",this.props.match.path);
          await this.setState({redirect:"/admin/hasil"})
          await this.setState({endPointFrom:"/master/proposal"})
          await this.setState({endPointTo:"/master/hasil"})
          this.tambahForm(1)
          break;
        case "/admin/Formhasil/:id":
        // console.log("switch3",this.props.match.path);
          await this.setState({redirect:"/admin/hasil"})
          await this.setState({endPointFrom:"/master/hasil"})
          await this.setState({endPointTo:"/master/hasil",formEdit:true})
          this.tambahForm(1)
          this.getDataForm(id)
          break;
        case "/admin/Formtutup":
        // console.log("switch3",this.props.match.path);
          await this.setState({redirect:"/admin/tutup"})
          await this.setState({endPointFrom:"/master/hasil"})
          await this.setState({endPointTo:"/master/tutup"})
          this.tambahForm(0)
          break;
        case "/admin/Formtutup/:id":
        // console.log("switch3",this.props.match.path);
          await this.setState({redirect:"/admin/tutup"})
          await this.setState({endPointFrom:"/master/tutup"})
          await this.setState({endPointTo:"/master/tutup",formEdit:true})
          this.tambahForm(0)
          this.getDataForm(id)
          break;
    
      default:
        await this.setState({redirect:"/admin/",endPointFrom:"/master/mahasiswa",endPointTo:"/master/judul"})
        break;
    }
  //   if(this.props.form){
  //     const forms = this.state.forms
  //     this.props.form.map((form)=>(
  //       forms.push(
  //         form
  //       ))
  //     )
  //     this.setState({forms:forms})
  // }
      
    }
    
  }
  tambahForm(index){
    const form= this.state.forms
          for(const f of this.form[index]){
            form.push(f)
          }
          this.setState({forms:form})

  }

  // sss = () => {
  //   let endPointFrom, redirect, endPointTo;
  //   switch (this.props.match.path) {
  //     case "/admin/Form":
  //       redirect="/admin/"
  //       endPointFrom="/master/mahasiswa"
  //       endPointTo="/master/judul"
        
  //       break;
  //     case "/admin/Form/:id":
  //       redirect="/admin/"
  //       endPointFrom="/master/judul"
  //       endPointTo="/master/judul"
  //       break;

      
    
  //     default:
  //       redirect="/admin/"
  //       endPointFrom="/master/mahasiswa"
  //       endPointTo="/master/judul"
        
  //       break;
     
  //   }

  //   return {redirect,endPointFrom,endPointTo }
  // }

  getDataForm = (nim) => {
    // console.log(this.state);
    const dateFormat = 'YYYY-MM-DD'
    axios.get(`${this.state.endPointFrom}/${nim}`).then((resp) => {
      //  console.log(resp);
      //  console.log("pajang ",Object.keys(resp.data.result));
       const data=[]
       const panjang = Object.keys(resp.data.result).length
       for(let i = 0; i< panjang;i++){
         const key =Object.keys(resp.data.result)[i]
         
         if(key === 'waktu' ) {
          console.log(moment(resp.data.result[key], dateFormat));
          const date = FormatDate(resp.data.result[key]);
          const isi = {
            name:key,
            value:moment(date, dateFormat)
          }
            data.push(isi)
         }
         else{
          const isi = {
            name:key,
            value:resp.data.result[key]
          }
            data.push(isi)
        }
       }
       console.log(data);
       this.setState({data :data})
     })
     .catch((error) =>   {
       const datas = this.state.data
       const data=[]
       let value=""
       for(let i = 0; i< datas.length;i++){
        value=(i===1)?nim:""
         const isi = {
           name:datas[i].name,
           value:value
         }
          data.push(isi)
       }
       this.setState({data:data})
        });
  }
  reset=()=>{
    
  }
  onFinish = (values) => {
        // let headers = {
        //   headers: {
        //     "Content-Type": "application/json",
        //     // Authorization: localStorage.getItem("token")
        //   },
        //   responseType: "json"
        // };
        console.log(values)
       const v = values
       v.waktu = moment(v.waktu).format('YYYY-MM-DD')
       console.log('ss', v);
        if(this.props.match.params.id){
          // console.log("update");
          axios.put(`${this.state.endPointTo}/${this.props.match.params.id}`, v).then(res => {
            UbahDom(this.state.redirect,this.props.history)
          });
          
        }else{
          // console.log("input");
        axios.post(this.state.endPointTo, v).then(res => {
   
          UbahDom(this.state.redirect,this.props.history)

        });
      }
      };
    onchange(props){
      console.log(props);
      if(props[0].value.length === 11 ){
        this.getDataForm(props[0].value)
      }
    }
  render(){
    const layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 12,
      },
    };
    const {data} = this.state
    return(
      <Form {...layout} name="nest-messages" onFinish={this.onFinish}
      fields={data}
    //   onFieldsChange={data=>{
    //     // console.log("data",data[0].name[0])
    //     if(data[0].name[0]==="nim"){
    //     this.onchange(data)
    //     }
    //   }}
    //  validateMessages={validateMessages}
     >
       {/* {console.log("dsad",this.state.data)} */}
       {/* {nama} */}
       {/* {this.state.forms.map((form,index)=>{
        //  console.log("form",form);
         let dis = false
         let input
         if(this.props.match){
          if(this.props.match.params.id && (form.name === "nim" || form.name === "nama" )){
            dis=true
          }else{
            dis=false
          }
        }
        if (form.name === "waktu"){
          input=<DatePicker format="DD-MM-YYYY"/>
        }else{
          input=<Input disabled={dis}/>
        }
         return(
          <Form.Item
          key={index}
          name={form.name}
          label={form.label}
          rules={[
            {
              required: true,
            },
          ]}
          
          >
            {input}
          </Form.Item>
         )
      })} */}
      <Form.Item
        name={'nomor'}
        label="Nomor"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        name={'nama'}
        label="Nama"
     
        rules={[
          {
            required: true,
          },
        ]}
        // getValueFromEvent={{value:nama}}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'judul'}
        label="Judul"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'pembimbing1'}
        label="Pembimbing 1"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'pembimbing2'}
        label="Pembimbing 2"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
     
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    )
  }


}
export default FormJudul