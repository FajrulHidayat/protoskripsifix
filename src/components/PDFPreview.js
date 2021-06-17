import React, { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import Docu from './PDFtest'
import Proposal from './PDFproposal'
import Kompren from './PDFkompren'
import axios from 'axios'
import { Button, Checkbox } from 'antd'
import UbahDom from '../utils/UbahDom'

const PDFView = (props) => {
  const [data, setdata] = useState({})
  const [dataSurat, setdataSurat] = useState({})
  // const [acc, setacc] = useState(false)
  const [isReady, setisReady] = useState(false)
  const [level, setlevel] = useState("")
  // console.log(props.match.params);

  const getData = () => {
    console.log(props);

    const id = props.match.params.id
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
    if (lvl === "operator jurusan") {
      axios.get(`/master/sk/${id}`, null, headers).then(res => {
        // console.log(res.data.result);
        setdata(res.data.result)
        axios.get(`/jfu/${res.data.result.tentang}/${res.data.result.id_surat}`, null, headers).then(res => {
          console.log(res.data.result);
          setdataSurat(res.data.result)
          setisReady(true)
        });
      });
    } else {
      axios.get(`/${lvl}/${id}`, null, headers).then(res => {
        // console.log(res.data.result);
        if (props.match.params.nomor) {
          let term = res.data.result
          term.nomor = props.match.params.nomor
          term.pelaksana = props.match.params.pelaksana
          console.log("term");
          console.log(term);
          setdata(term)
        } else
          setdata(res.data.result)
        axios.get(`/jfu/${res.data.result.tentang}/${res.data.result.id_surat}`, null, headers).then(res => {
          console.log(res.data.result);
          setdataSurat(res.data.result)
          setisReady(true)
        });
      });
    }
    // if (props.match.params.nomor) {
    //   let term = data
    //   term.nomor = props.match.params.nomor
    //   console.log("term");
    //   console.log(term);
    //   setdata(term)
    // }
    // if (props.match.params.pelaksana) {
    //   data.pelaksana = props.match.params.pelaksana
    // }
  }

  useEffect(() => {
    getData()
    return () => {

    }
  }, [])
  return (<>
    {isReady && <PDFViewer width="100%" height="685vh">
      {data.tentang === "Pembimbing" ? <Docu data={data} dataSurat={dataSurat} /> : data.tentang === "Komprehensif" ? <Kompren data={data} dataSurat={dataSurat} /> : <Proposal data={data} dataSurat={dataSurat} />}
    </PDFViewer>}
  </>
  )

};
export default PDFView