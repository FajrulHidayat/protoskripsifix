import React, { useEffect, useState } from "react";
import {
  //  ReactPDF,
  PDFViewer,
  pdf,
} from "@react-pdf/renderer";
import Docu from "./PDFtest";
import Proposal from "./PDFproposal";
import axios from "axios";
import { Button, Checkbox, Input, Modal } from "antd";

// import FormData from 'react-form-data'
// import * as emailjs from 'emailjs-com'
import UbahDom from "../utils/UbahDom";
const { TextArea } = Input;
const PDFView = (props) => {
  // const inputRef = React.useRef < "" > null;
  const [data, setdata] = useState({});
  const [dataSurat, setdataSurat] = useState({});
  // const [acc, setacc] = useState(false)
  const [isReady, setisReady] = useState(false);
  const [level, setlevel] = useState("");
  const [preview, setpreview] = useState(false);
  const [IsModalVisible, setIsModalVisible] = useState(false);
  const [komen, setkomen] = useState("");
  // console.log(props.match.params);
  // const fodata = new FormData()
  // fodata.append("asd","asdasd")
  // console.log(fodata);
  // let komen;
  const getData = () => {
    console.log(props);
    if (props.match.path === "/admin/pdf/:id") {
      setpreview(false);
    } else {
      setpreview(true);
    }

    const id = props.match.params.id;
    const token = localStorage.getItem("token");
    const lvl = localStorage.getItem("level");
    setlevel(lvl);
    let headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      responseType: "json",
    };

    axios.get(`/${lvl}/${id}`, null, headers).then((res) => {
      // console.log(res.data.result);
      setdata(res.data.result);
      axios
        .get(
          `/jfu/${res.data.result.tentang}/${res.data.result.id_surat}`,
          null,
          headers
        )
        .then((res) => {
          console.log(res.data.result);
          setdataSurat(res.data.result);
          setisReady(true);
        });
    });
  };
  const doc = () => {
    const documen =
      data.tentang === "Pembimbing" ? (
        <Docu data={data} dataSurat={dataSurat} />
      ) : data.tentang === "Proposal" ? (
        <Proposal data={data} dataSurat={dataSurat} />
      ) : (
        <Proposal data={data} dataSurat={dataSurat} />
      );
    console.log("doc", documen);
    return documen;
  };
  let acc = false;
  const onChange = (e) => {
    console.log(e);
    acc = e.target.checked;
  };
  const onClick = () => {
    const token = localStorage.getItem("token");
    let headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      responseType: "json",
    };
    const body = { acc: true };
    console.log(body);
    axios
      .put(`/${level}/${props.match.params.id}`, body, headers)
      .then((res) => {
        console.log(res.data);
        // window.opener = null;
        // window.open("","_self","")
        // if (acc) {
        //   sendEmail()
        // }
        // window.close()
        UbahDom(`/admin/${level}`, props.history);
      });
  };
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
    console.log("element", element);
    const myPdf = pdf();

    const a = myPdf.updateContainer(element);
    console.log("mypdf : ", myPdf);
    console.log("a ", a);
    /*create blob*/
    const blob = await myPdf.toBlob();
    console.log("blob : ", blob);
    /*create file*/
    let file = new File([blob], "pdfname.pdf", { lastModified: (new Date()).getTime() });
    console.log("file : ", file);
    const formdata = new FormData();
    // let body
    await formdata.append("file", file);
    formdata.append("nim", data.nim)
    console.log(data);
    let sk = data.tentang === "judul" ? `SK Pembimbing ${data.nim}`
      :
      data.tentang === "proposal" ? `SK Seminar Proposal ${data.nim}`
        :
        data.tentang === "hasil" ? `SK Seminar Hasil ${data.nim}`
          :
          data.tentang === "Kompren" ? `SK Ujian Komprehensif ${data.nim}`
            :
            data.tentang === "tutup" ? `SK Ujian Munaqasyah ${data.nim}`
              :
              `SK Pembimbing ${data.nim}`
    formdata.append("sk", sk)
    console.log("formdata :", formdata)
    let Fdata = []
    for (var [key, value] of formdata.entries()) {
      console.log(key, value);
      Fdata.push(value)
    }
    console.log(Fdata[0]);
    // axios.post(`/email`, { body: { file: Fdata, pdf: "asdasd" } }, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
    axios.post(`/email`, formdata, {}).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }
  const kembali = () => {
    UbahDom(`/admin/${level}`, props.history);
  };
  const handleOk = () => {
    const token = localStorage.getItem("token");

    console.log(level);
    console.log(komen);
    console.log(props.match.params.id);
    let headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      responseType: "json",
    };
    const body = { acc: true };
    const bodyKomen = {
      level: level,
      komen: komen,
      id_surat: props.match.params.id,
    };
    console.log(body);
    axios
      .put(`/${level}/${props.match.params.id}`, body, headers)
      .then((res) => {
        console.log(res.data);
        axios.post(`/komen`, bodyKomen, headers).then((resp) => {
          console.log(resp.data);
          UbahDom(`/admin/${level}`, props.history);
        });
        // window.opener = null;
        // window.open("","_self","")
        // if (acc) {
        //   sendEmail()
        // }
        // window.close()
      });
    // UbahDom(`/`, props.history);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const accModal = () => {
    // console.log(document.getElementById("textarea").value);
    setkomen(document.getElementById("textarea").value);
    setIsModalVisible(true);
  };
  const onTextAreaChange = ({ target: { value } }) => {
    // console.log(value);
    komen += value;
  };
  useEffect(() => {
    getData();
    return () => {};
  }, []);
  return (
    <>
      <div></div>
      {isReady && (
        <PDFViewer width="100%" height="685vh">
          {doc()}
        </PDFViewer>
      )}
      {!preview && (
        <div
          style={{
            // width: "100vh",
            flex: 1,
            // alignItems: "flex-end",
            position: "relative",
            // backgroundColor: "blue",
            marginBottom: "32px",
          }}
        >
          <h1>Catatan : </h1>
          <TextArea id="textarea" />
          <div
            style={{
              // width: "100vh",
              bottom: "-40px",
              right: 32,
              position: "absolute",
              // marginRight: "50px",
              // justifyContent: "right",
              // backgroundColor: "red",
            }}
          >
            {/* <Checkbox onChange={onChange}>ACC</Checkbox> */}
            <Button onClick={kembali}>Kembali</Button>
            <Button
              onClick={accModal}
              type="primary"
              style={{ marginLeft: 16 }}
            >
              ACC
            </Button>
          </div>
          {/* <Button onClick={sendEmail}>Kirim Email</Button> */}
          <Modal
            title="ACC"
            visible={IsModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelText="Tidak"
            okText="Ya"
          >
            {/* {komen = document.getElementById("textarea").value;console.log(document.getElementById("textarea").value)} */}
            <p>Apakah Anda yakin meng-ACC Surat Keputusan ini dengan</p>
            {isReady && document.getElementById("textarea")?.value === ""
              ? "tanpa catatan?"
              : `catatan \"${document.getElementById("textarea")?.value}\" ?`}
          </Modal>
        </div>
      )}
    </>
  );
};
export default PDFView;
