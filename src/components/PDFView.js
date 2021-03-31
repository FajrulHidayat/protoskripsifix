import React, { useEffect, useState } from 'react';
import ReactPDF ,{ PDFViewer,pdf } from '@react-pdf/renderer';
import Docu from './PDFtest'
import Proposal from './PDFproposal'
import axios from 'axios'
import {Button, Checkbox} from 'antd'
// import FormData from 'react-form-data'
// import * as emailjs from 'emailjs-com'
import UbahDom from '../utils/UbahDom'

const PDFView = (props) => {
  const [data, setdata] = useState({})
  const [dataSurat, setdataSurat] = useState({})
  // const [acc, setacc] = useState(false)
  const [isReady, setisReady] = useState(false)
  const [level, setlevel] = useState("")
  const [preview, setpreview] = useState(false)
// console.log(props.match.params);
  // const fodata = new FormData()
  // fodata.append("asd","asdasd")
  // console.log(fodata);
  const getData = ()=>{
    console.log(props);
    if (props.match.path === "/admin/pdf/:id") {
      setpreview(false)
    }else{
      setpreview(true)
    }
    
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
  const doc = ()=>{
    const documen = data.tentang === "Pembimbing"?<Docu data={data} dataSurat={dataSurat} />:data.tentang === "Proposal"?<Proposal data={data} dataSurat={dataSurat} />:<Proposal data={data} dataSurat={dataSurat} />
    console.log("doc",documen);
    return documen
  }
let acc=false
const onChange = (e)=>{
console.log(e);
acc=e.target.checked
}
const onClick = ()=>{
  const token = localStorage.getItem("token")
  let headers = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    responseType: "json"
  };
  const body = {acc:acc}
  console.log(body);
  axios.put(`/${level}/${props.match.params.id}`, body, headers).then(res => {
    console.log(res.data);
    // window.opener = null;
    // window.open("","_self","")
    window.close()
    // UbahDom(`/admin/${level}`,props.history)
  });
}
const sendEmail = async () => {
  // ReactPDF.render(doc(),`/${data.nim}`)
//   let body = new FormData()
//   body.append('ss', 'dsdsad')
//   console.log(body);
//   for (var [key, value] of body.entries()) { 
//   console.log(key, value);
// }

// //or

// console.log(...body)
  
  
  /*pdf document*/ 
  const element = doc(); 
  console.log("element",element);
  const myPdf = pdf(); 

  const a= myPdf.updateContainer(element); 
  console.log("mypdf : ",myPdf);
  console.log("a " , a);
  /*create blob*/ 
  const blob = await myPdf.toBlob();
  console.log("blob : ",blob);
  /*create file*/
  let file = new File([blob], "pdfname.pdf", {lastModified: (new Date()).getTime()});
  console.log("file : ",file);
  const formdata = new FormData();
  // let body
  await formdata.append("file", file);
  formdata.append("tes","asdasd")
    console.log("formdata :",formdata)
  let Fdata=[]
    for (var [key, value] of formdata.entries()) { 
    console.log(key, value);
    Fdata.push(value)
  }
  console.log(Fdata);
  axios.post("/email",{body:{file:Fdata[0]}},{headers: {'content-type': 'multipart/form-data' }}).then((res)=>{
    console.log(res);
  }).catch((err)=>{
    console.log(err);
  })
}
useEffect(() => {
  getData()
  return () => {
    
  }
}, [])
  return(<>
  <div></div>
  {isReady&&<PDFViewer  width="100%" height="685vh">
    {doc()}
  </PDFViewer>}
  {!preview&&<><Checkbox onChange={onChange}>ACC</Checkbox>
  <Button onClick={onClick}>Kirim</Button>
  <Button onClick={sendEmail}>Kirim Email</Button>
  </>
  }
  </>
  )
  
};
export default PDFView