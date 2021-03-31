import React from 'react';
import { Modal, Table, Input, Button, Space, Form } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import UbahDom from '../../utils/UbahDom'
import axios from "axios";
import FormatDate from '../../utils/FormatDate'
import moment from 'moment'
import {Link} from 'react-router-dom';


class TabelJfu extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    data: [],
    kolom: [],
    history: [],
    modalKey: '',
    nomor: "",
    pelaksana: "",
    route: "/jfu",
    endPoint: ``,
    isModalVisible: false,
    forms: [],
    tentang: ""
  };
  form = [
    [
      {
        label: "NIM",
        name: "nim"
      },
      {
        label: "Nama",
        name: "nama"
      },
      {
        label: "Judul",
        name: "judul"
      },
      {
        label: "Pembimbing 1",
        name: "pembimbing1"
      },
      {
        label: "Pembimbing 2",
        name: "pembimbing2"
      }
    ],
    [
      {
        label: "NIM",
        name: "nim"
      },
      {
        label: "Nama",
        name: "nama"
      },
      {
        label: "Judul",
        name: "judul"
      },
      {
        label: "Ketua",
        name: "ketua"
      },
      {
        label: "Sekretaris",
        name: "sekretaris"
      },
      {
        label: "Pembimbing 1",
        name: "pembimbing1"
      },
      {
        label: "Pembimbing 2",
        name: "pembimbing2"
      },
      {
        label: "Penguji 1",
        name: "penguji1"
      },
      {
        label: "Penguji 2",
        name: "penguji2"
      },
      {
        label: "Waktu",
        name: "waktu"
      }
    ],

    [
      {
        label: "NIM",
        name: "nim"
      },
      {
        label: "Nama",
        name: "nama"
      },
      {
        label: "Judul",
        name: "judul"
      },
      {
        label: "Ketua",
        name: "ketua"
      },
      {
        label: "Sekretaris",
        name: "sekretaris"
      },
      {
        label: "Penguji 1",
        name: "penguji1"
      },
      {
        label: "Penguji 2",
        name: "penguji2"
      },
      {
        label: "Penguji 3",
        name: "penguji3"
      },

    ],
  ]
  columns = [
    {
      title: 'NIM',
      dataIndex: 'nim',
      key: 'nim',
      // ...this.getColumnSearchProps('nim'),
    },
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama',
      // ...this.getColumnSearchProps('nama'),
    },
    {
      title: 'Judul',
      dataIndex: 'judul',
      key: 'judul',
      // ...this.getColumnSearchProps('judul'),
    },
    {
      title: 'Pembimbing 1',
      dataIndex: 'pembimbing1',
      key: 'pembimbing1',
      // ...this.getColumnSearchProps('pembimbing1'),
    },
    {
      title: 'Pembimbing 2',
      dataIndex: 'pembimbing2',
      key: 'pembimbing2',
      // ...this.getColumnSearchProps('pembimbing2'),
    },
    {
      title: 'Aksi',
      dataIndex: 'aksi',
      key: 'aksi',
      render: (text, record) => (<Button onClick={() => UbahDom(`${this.state.route}/${record.nim}`, this.props.history)}>Edit</Button>),
    }
  ]

  async componentDidMount() {
    // console.log(this.props);

    if (this.props.match.path === "/admin/jfu") {
      await this.setState({ endPoint: "baru" })
      this.getData()
    }
    if (this.props.match.path === "/admin/jfuProses") {
      await this.setState({ endPoint: "proses" })
      this.getData()
    }
    if (this.props.match.path === "/admin/jfuArsip") {
      await this.setState({ endPoint: "arsip" })
      this.getData()
    }

  }

  getData = () => {
    let headers = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: localStorage.getItem("token")
      },
      responseType: "json"
    };
    axios.get(`/jfu/${this.state.endPoint}`, headers).then(res => {
      // console.log(res.data.result);
      this.setState({ diagnostics: res.data.diagnostic });
      if (this.state.diagnostics.status === 200) {
        let index = 0;
        let datas = [];
        for (const qd of res.data.result) {
          const data = {}
          data.key = qd.id
          data.nomor = qd.nomor
          data.nim = qd.nim
          data.nama = qd.nama
          data.jurusan = qd.jurusan
          data.tentang = qd.tentang
          data.pelaksana = qd.pelaksana
          data.id_surat = qd.id_surat
          data.waktu = FormatDate(qd.waktu)

          index++
          datas.push(data)
        }
        this.setState({
          data: datas
        });
      }
    });
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
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
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
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
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
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

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  showModal = async (record) => {
    if (record.tentang === "Pembimbing") {
      await this.setState({ forms: this.form[0] })
    } else if (record.tentang === "Komprehensif") {
      await this.setState({ forms: this.form[2] })
    } else {
      await this.setState({ forms: this.form[1] })
    }
    await this.setState({ isModalVisible: true, modalKey: record.key, tentang: record.tentang })
    const token = localStorage.getItem("token")

    const dateFormat = 'YYYY-MM-DD'
    let headers = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      responseType: "json"
    };
    axios.get(`/jfu/${record.tentang}/${record.id_surat}`, null, headers).then(res => {
      // UbahDom(this.state.redirect,this.props.history)
      console.log(res);
      const data = []
      const panjang = Object.keys(res.data.result).length
      const nomor = {
        name: "nomor",
        value: record.nomor
      }
      data.push(nomor)
      if (record.tentang !== "Pembimbing") {
        const pelaksana = {
          name: "pelaksana",
          value: record.pelaksana
        }
        data.push(pelaksana)
      }
      for (let i = 0; i < panjang; i++) {

        const key = Object.keys(res.data.result)[i]
        if (key === 'waktu') {
          const date = FormatDate(res.data.result[key]);
          const isi = {
            name: key,
            value: moment(date, dateFormat)
          }
          data.push(isi)
        }
        else {
          const isi = {
            name: key,
            value: res.data.result[key]
          }
          data.push(isi)
        }
      }
      console.log("modal Data ", data);
      this.setState({ dataModal: data })
    });
    console.log("record : ", record);
  };

  handleOk = (e) => {
    this.setState({ isModalVisible: false });
    console.log("submit",e);
    console.log("tentang",this.state.tentang);
    let pelaksana="-"
    if(e.pelaksana) pelaksana=e.pelaksana
    const body = {
      nomor: e.nomor,
      pelaksana: pelaksana
    }
    axios.put(`/jfu/${this.state.tentang}/${this.state.modalKey}`, body).then(res => {
      // UbahDom(this.state.redirect,this.props.history)
      console.log(res);
      this.getData()
    });
    console.log("state : ", this.state);
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };

  onChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({ [name]: value })
    console.log(this.state[name]);
  }

  render() {
    const columns = [
      [
        {
          title: 'Nomor',
          dataIndex: 'nomor',
          key: 'nomor',
          ...this.getColumnSearchProps('nomor'),
        },
        {
          title: 'NIM',
          dataIndex: 'nim',
          key: 'nim',
          ...this.getColumnSearchProps('nim'),
        },
        {
          title: 'Nama',
          dataIndex: 'nama',
          key: 'nama',
          ...this.getColumnSearchProps('nama'),
        },
        {
          title: 'Jurusan',
          dataIndex: 'jurusan',
          key: 'jurusan',
          ...this.getColumnSearchProps('jurusan'),
        },
        {
          title: 'Tentang',
          dataIndex: 'tentang',
          key: 'tentang',
          ...this.getColumnSearchProps('tentang'),
        },
        {
          title: 'Pelaksana',
          dataIndex: 'pelaksana',
          key: 'pelaksana',
          ...this.getColumnSearchProps('pelaksana'),
        },
        {
          title: 'Waktu',
          dataIndex: 'waktu',
          key: 'waktu',
          ...this.getColumnSearchProps('waktu'),
        },
        {
          title: 'Aksi',
          dataIndex: 'aksi',
          key: 'aksi',
          render: (text, record) => (<Button onClick={() => this.showModal(record)}>Edit</Button>),
        }
      ],
      [
        {
          title: 'Nomor',
          dataIndex: 'nomor',
          key: 'nomor',
          ...this.getColumnSearchProps('nomor'),
        },
        {
          title: 'NIM',
          dataIndex: 'nim',
          key: 'nim',
          ...this.getColumnSearchProps('nim'),
        },
        {
          title: 'Nama',
          dataIndex: 'nama',
          key: 'nama',
          ...this.getColumnSearchProps('nama'),
        },
        {
          title: 'Jurusan',
          dataIndex: 'jurusan',
          key: 'jurusan',
          ...this.getColumnSearchProps('jurusan'),
        },
        {
          title: 'Tentang',
          dataIndex: 'tentang',
          key: 'tentang',
          ...this.getColumnSearchProps('tentang'),
        },
        {
          title: 'Pelaksana',
          dataIndex: 'pelaksana',
          key: 'pelaksana',
          ...this.getColumnSearchProps('pelaksana'),
        },
        {
          title: 'Waktu',
          dataIndex: 'waktu',
          key: 'waktu',
          ...this.getColumnSearchProps('waktu'),
        },
        {
          title: 'Aksi',
          dataIndex: 'aksi',
          key: 'aksi',
          render: (text, record) => (<Link target="_blank" to={
            {
              pathname: `/pdfPreview/${record.key}`,
              // search:`?id=${record.id_surat}`
            }
           } >Lihat</Link>),
        }

      ],
    ]
    const col = this.props.match.path === "/admin/jfu" ? columns[0] : columns[1]


    const layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 12,
      },
    };
    const { dataModal } = this.state
    return (
      <div>
        {/* table */}
        <Table columns={col} dataSource={this.state.data} />
        {/* modal */}
        <Modal title="Penomoran SK" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel} footer={null}>
        
          <Form {...layout} name="nest-messages" onFinish={this.handleOk}
            fields={dataModal}
          >
            <Form.Item
              key={20}
              name="nomor"
              label="Nomor"
            >
              <Input />
            </Form.Item>
            {this.state.tentang !== "Pembimbing" ? <Form.Item
              key={21}
              name="pelaksana"
              label="Pelaksana"
            >
              <Input />
            </Form.Item> : null}

            {this.state.forms.map((form, index) => {
              return (
                <Form.Item
                  key={index}
                  name={form.name}
                  label={form.label}
                >
                  <Input disabled={true} />
                </Form.Item>
              )
            })}
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
          </Form>

        </Modal>
      </div>
    );
  }
}
export default TabelJfu;