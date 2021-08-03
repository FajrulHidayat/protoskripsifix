import React from "react";
import {
  Modal,
  Table,
  Input,
  Button,
  Space,

  //  Form
} from "antd";
import Highlighter from "react-highlight-words";
import {
  SearchOutlined,
  FilePdfOutlined,
  SendOutlined,
  ExceptionOutlined,
  // PlusOutlined
} from "@ant-design/icons";
// import UbahDom from '../utils/UbahDom'
import axios from "axios";
import FormatDate from "../utils/FormatDate";
// import moment from 'moment'
// import { PDFViewer } from '@react-pdf/renderer';
import { Link } from "react-router-dom";
import Docu from "./PDFtest";
import Proposal from "./PDFproposal";
import Kompren from "./PDFkompren";
import { pdf } from "@react-pdf/renderer";

class TabelSkOpjur extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    data: [],
    komen: [],
    kolom: [],
    history: [],
    modalKey: "",
    nomor: "",
    pelaksana: "",
    route: "",
    endPoint: ``,
    isModalVisible: false,
    dataModal: [],
    tentang: "",
  };

  async componentDidMount() {
    // console.log(this.props);
    // const level = localStorage.getItem("level")
    // if (this.props.match.path === `/admin/${level}`) {
    //   await this.setState({ endPoint: "baru",route:`/${level}` })
    this.getData();
    // }
    // if (this.props.match.path === `/admin/${level}Arsip`) {
    //   // console.log("2",this.props.match.path);
    //   await this.setState({ endPoint: "arsip",route:`/${level}` })
    //   this.getData()
    // }
  }

  getData = () => {
    let headers = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: localStorage.getItem("token")
      },
      responseType: "json",
    };
    axios.get(`/master/sk`, headers).then((res) => {
      // console.log(res.data.result);
      this.setState({ diagnostics: res.data.diagnostic });
      if (this.state.diagnostics.status === 200) {
        // let index = 0;
        let datas = [];
        for (const qd of res.data.result) {
          const data = {};
          data.key = qd.id;
          data.nomor = qd.nomor;
          data.nim = qd.nim;
          data.nama = qd.nama;
          data.jurusan = qd.jurusan;
          data.tentang = qd.tentang;
          data.pelaksana = qd.pelaksana;
          data.id_surat = qd.id_surat;
          data.waktu = FormatDate(qd.waktu);

          // index++
          datas.push(data);
        }
        this.setState({
          data: datas,
        });
      }
    });
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  getCatatan = async (id) => {
    const token = localStorage.getItem("token");

    // const dateFormat = 'YYYY-MM-DD'
    let headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      responseType: "json",
    };
    await axios.get(`/komen/${id}`, null, headers).then((res) => {
      // UbahDom(this.state.redirect,this.props.history)
      console.log(res.data.result);
      const data = res.data.result;

      this.setState({ dataModal: data, isModalVisible: true });
    });
    // console.log("record : ", record);
    // this.setState({ isModalVisible: true });
  };

  handleOk = (e) => {
    this.setState({ isModalVisible: false });
    console.log("submin", e);
    let pelaksana = "-";
    if (e.pelaksana) pelaksana = e.pelaksana;
    const body = {
      nomor: e.nomor,
      pelaksana: pelaksana,
    };
    axios
      .put(`${this.state.route}/${this.state.modalKey}`, body)
      .then((res) => {
        // UbahDom(this.state.redirect,this.props.history)
        console.log(res);
        this.getData();
      });
    console.log("state : ", this.state);
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
    console.log(this.state[name]);
  };

  sendEmail = async (id) => {
    let data, dataSurat;
    const token = localStorage.getItem("token");
    let headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      responseType: "json",
    };
    await axios.get(`/master/sk/${id}`, null, headers).then(async (res) => {
      console.log(res.data.result);
      data = res.data.result;
      await axios
        .get(
          `/jfu/${res.data.result.tentang}/${res.data.result.id_surat}`,
          null,
          headers
        )
        .then((res) => {
          console.log(res.data.result);
          dataSurat = res.data.result;
        });
    });
    const element =
      data.tentang === "Pembimbing" ? (
        <Docu data={data} dataSurat={dataSurat} />
      ) : data.tentang === "Proposal" ? (
        <Proposal data={data} dataSurat={dataSurat} />
      ) : (
        <Proposal data={data} dataSurat={dataSurat} />
      );
    console.log("element", element);
    const myPdf = pdf();

    const a = myPdf.updateContainer(element);
    console.log("mypdf : ", myPdf);
    console.log("a ", a);
    /*create blob*/
    const blob = await myPdf.toBlob();
    console.log("blob : ", blob);
    /*create file*/
    let file = new File([blob], "pdfname.pdf", {
      lastModified: new Date().getTime(),
    });
    console.log("file : ", file);
    const formdata = new FormData();
    // let body
    await formdata.append("file", file);
    formdata.append("nim", data.nim);
    console.log(data);
    let sk =
      data.tentang === "judul"
        ? `SK Pembimbing ${data.nim}`
        : data.tentang === "proposal"
        ? `SK Seminar Proposal ${data.nim}`
        : data.tentang === "hasil"
        ? `SK Seminar Hasil ${data.nim}`
        : data.tentang === "Kompren"
        ? `SK Ujian Komprehensif ${data.nim}`
        : data.tentang === "tutup"
        ? `SK Ujian Munaqasyah ${data.nim}`
        : `SK Pembimbing ${data.nim}`;
    formdata.append("sk", sk);
    console.log("formdata :", formdata);
    let Fdata = [];
    for (var [key, value] of formdata.entries()) {
      console.log(key, value);
      Fdata.push(value);
    }
    console.log(Fdata[0]);
    // axios.post(`/email`, { body: { file: Fdata, pdf: "asdasd" } }, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
    axios
      .post(`/email`, formdata, {})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const columns = [
      [
        {
          title: "Nomor",
          dataIndex: "nomor",
          key: "nomor",
          ...this.getColumnSearchProps("nomor"),
        },
        {
          title: "NIM",
          dataIndex: "nim",
          key: "nim",
          ...this.getColumnSearchProps("nim"),
        },
        {
          title: "Nama",
          dataIndex: "nama",
          key: "nama",
          ...this.getColumnSearchProps("nama"),
        },
        {
          title: "Jurusan",
          dataIndex: "jurusan",
          key: "jurusan",
          ...this.getColumnSearchProps("jurusan"),
        },
        {
          title: "Tentang",
          dataIndex: "tentang",
          key: "tentang",
          ...this.getColumnSearchProps("tentang"),
        },
        {
          title: "Pelaksana",
          dataIndex: "pelaksana",
          key: "pelaksana",
          ...this.getColumnSearchProps("pelaksana"),
        },
        {
          title: "Waktu",
          dataIndex: "waktu",
          key: "waktu",
          ...this.getColumnSearchProps("waktu"),
        },
        {
          title: "Aksi",
          dataIndex: "aksi",
          key: "aksi",
          render: (text, record) => (
            <Link
              target="_blank"
              to={{
                pathname: `/admin/pdf/${record.key}`,
                // search:`?id=${record.id_surat}`
              }}
            >
              Edit
            </Link>
          ),
        },
      ],
      [
        {
          title: "Nomor",
          dataIndex: "nomor",
          key: "nomor",
          ...this.getColumnSearchProps("nomor"),
        },
        {
          title: "NIM",
          dataIndex: "nim",
          key: "nim",
          ...this.getColumnSearchProps("nim"),
        },
        {
          title: "Nama",
          dataIndex: "nama",
          key: "nama",
          ...this.getColumnSearchProps("nama"),
        },
        {
          title: "Jurusan",
          dataIndex: "jurusan",
          key: "jurusan",
          ...this.getColumnSearchProps("jurusan"),
        },
        {
          title: "Tentang",
          dataIndex: "tentang",
          key: "tentang",
          ...this.getColumnSearchProps("tentang"),
        },
        {
          title: "Pelaksana",
          dataIndex: "pelaksana",
          key: "pelaksana",
          ...this.getColumnSearchProps("pelaksana"),
        },
        {
          title: "Waktu",
          dataIndex: "waktu",
          key: "waktu",
          ...this.getColumnSearchProps("waktu"),
        },
        {
          title: "Aksi",
          dataIndex: "aksi",
          key: "aksi",
          render: (text, record) => (
            <>
              <Link
                target="_blank"
                to={{
                  pathname: `/SkPreview/${record.key}`,
                  // search:`?id=${record.id_surat}`
                }}
              >
                <Button
                  style={{
                    backgroundColor: "#FF4D4F",
                    color: "white",
                  }}
                  icon={<FilePdfOutlined />}
                >
                  Lihat
                </Button>
              </Link>

              <Button
                style={{
                  backgroundColor: "#1890FF",
                  color: "white",
                }}
                icon={<SendOutlined />}
                onClick={() => this.sendEmail(record.key)}
              >
                email
              </Button>

              <Button
                style={{
                  backgroundColor: "#17A2B8",
                  color: "white",
                }}
                icon={<ExceptionOutlined />}
                onClick={() => this.getCatatan(record.key)}
              >
                Catatan
              </Button>
            </>
          ),
        },
      ],
    ];
    const col =
      this.props.match.path === `/admin${this.state.route}`
        ? columns[0]
        : columns[1];

    // const layout = {
    //   labelCol: {
    //     span: 6,
    //   },
    //   wrapperCol: {
    //     span: 12,
    //   },
    // };
    // const { dataModal } = this.state
    return (
      <div>
        {/* table */}
        <Table columns={col} dataSource={this.state.data} />
        <Modal
          title="Catatan"
          closable={true}
          visible={this.state.isModalVisible}
          bodyStyle={{ backgroundColor: "#f1f1f1" }}
          footer={null}
          // onOk={handleOk}
          onCancel={() => this.setState({ isModalVisible: false })}
          // cancelText="Tidak"
          // okText="Ya"
        >
          {/* {console.log(this.state.dataModal)} */}
          {this.state.dataModal.map((item, index) => {
            // {
            //   console.log(item);
            // }
            let jabatan;
            switch (item.level) {
              case "ksb":
                jabatan = "Kasubag Akademik";
                break;
              case "ktu":
                jabatan = "Kabag Tata Usaha";
                break;
              case "wd":
                jabatan = "Wakil Dekan I";
                break;
              case "dk":
                jabatan = "Dekan";
                break;

              default:
                break;
            }
            return (
              <div
                style={{
                  backgroundColor: "white",
                  padding: "16px",
                  marginBottom: "8px",
                }}
              >
                <h1>dari {jabatan}</h1>
                <p key={index}>{item.komen}</p>
              </div>
            );
          })}
          {/* <p>halo</p> */}
          {/* <p>Apakah Anda Ingin Keluar?</p> */}
        </Modal>
      </div>
    );
  }
}
export default TabelSkOpjur;
