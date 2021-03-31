import React from 'react'
import {Modal} from 'antd'
import FormatDate from '../../utils/FormatDate'
import axios from 'axios'

class ModalJfu extends React.Component{
    state = {
        isModalVisible:true,
        // record:this.props.record
    }

    componentDidMount(){
        console.log(this);
        // this.getData(this.props.record)
    }
     getData=async (record)=>{
        await this.setState({isModalVisible: true,modalKey:record.key,nomor:record.nomor,pelaksana:record.pelaksana})
        const token = localStorage.getItem("token")
        let headers = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
          responseType: "json"
        }; 
        axios.get(`/jfu/${record.tentang}/${record.id_surat}`, null,headers).then(res => {
          // UbahDom(this.state.redirect,this.props.history)
          console.log(res);
          // this.getData()
        });
    }
    handleOk = () => {
        this.setState({ isModalVisible: false });
        // console.log(this.state.nomor);
        const body = {
          nomor:this.state.nomor,
          pelaksana:this.state.pelaksana
        }
        axios.put(`/jfu/${this.state.modalKey}`,body ).then(res => {
          // UbahDom(this.state.redirect,this.props.history)
          console.log(res);
          this.getData()
        });
        console.log("state : ",this.state);
      };
    
      handleCancel = () => {
        this.setState({ isModalVisible: false });
      };

    render(){
        return(
            <Modal title="Basic Modal" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                {/* <Input name="nomor" value={this.state.nomor} onChange={this.onChange} placeholder="Nomor Surat Keputusan"/>
                <Input name="pelaksana" value={this.state.pelaksana} onChange={this.onChange} placeholder="Nama Pelaksana"/> */}
                <h1>tes Modal</h1>
            </Modal>
        )
    }
}
export default ModalJfu
