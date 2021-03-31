import React, { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import Docu from './PDFtest'
import Proposal from './PDFproposal'
import axios from 'axios'
import {Button, Checkbox} from 'antd'
import UbahDom from '../utils/UbahDom'

const PDFView = (props) => {
  const [data, setdata] = useState({})
  const [dataSurat, setdataSurat] = useState({})
  // const [acc, setacc] = useState(false)
  const [isReady, setisReady] = useState(false)
  const [level, setlevel] = useState("")
// console.log(props.match.params);

const getData = ()=>{
  console.log(props);
  
const id =props.match.params.id
  const token = localStorage.getItem("token")
  const lvl = localStorage.getItem("level")
  setlevel(lvl)
  let headers = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    responseType: "json"
  };
  console.log(lvl);
  if(lvl==="operator jurusan"){
    axios.get(`/master/sk/${id}`, null, headers).then(res => {
      // console.log(res.data.result);
      setdata(res.data.result)
      axios.get(`/jfu/${res.data.result.tentang}/${res.data.result.id_surat}`, null, headers).then(res => {
        console.log(res.data.result);
        setdataSurat(res.data.result)
        setisReady(true)
      });
    });
  }else{
    axios.get(`/${lvl}/${id}`, null, headers).then(res => {
      // console.log(res.data.result);
      setdata(res.data.result)
      axios.get(`/jfu/${res.data.result.tentang}/${res.data.result.id_surat}`, null, headers).then(res => {
        console.log(res.data.result);
        setdataSurat(res.data.result)
        setisReady(true)
      });
    });
  }
}

useEffect(() => {
  getData()
  return () => {
    
  }
}, [])
  return(<>
  {isReady&&<PDFViewer  width="100%" height="685vh">
    {data.tentang === "Pembimbing"?<Docu data={data} dataSurat={dataSurat} />:data.tentang === "Proposal"?<Proposal data={data} dataSurat={dataSurat} />:null}
  </PDFViewer>}
  </>
  )
  
};
export default PDFView