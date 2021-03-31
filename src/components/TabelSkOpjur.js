import React from 'react';
import { Modal, Table, Input, Button, Space, Form } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
// import UbahDom from '../utils/UbahDom'
import axios from "axios";
import FormatDate from '../utils/FormatDate'
// import moment from 'moment'
import { PDFViewer } from '@react-pdf/renderer';
import {Link} from 'react-router-dom';


class TabelSkOpjur extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    data: [],
    kolom: [],
    history: [],
    modalKey: '',
    nomor: "",
    pelaksana: "",
    route: "",
    endPoint: ``,
    isModalVisible: false,
    dataModal:[],
    tentang: ""
  };
 

  async componentDidMount() {
    // console.log(this.props);
    // const level = localStorage.getItem("level")
    // if (this.props.match.path === `/admin/${level}`) {
    //   await this.setState({ endPoint: "baru",route:`/${level}` })
      this.getData()
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
      responseType: "json"
    };
    axios.get(`/master/sk`, headers).then(res => {
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
    
    await this.setState({ isModalVisible: true, modalKey: record.key })
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
      console.log(res.data.result);
      const data = res.data.result
      
      this.setState({ dataModal: data , tentang: record.tentang})
    });
    console.log("record : ", record);
  };

  handleOk = (e) => {
    this.setState({ isModalVisible: false });
    console.log("submin",e);
    let pelaksana="-"
    if(e.pelaksana) pelaksana=e.pelaksana
    const body = {
      nomor: e.nomor,
      pelaksana: pelaksana
    }
    axios.put(`${this.state.route}/${this.state.modalKey}`, body).then(res => {
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
          render: (text, record) => (<Link target="_blank" to={
            {
              pathname: `/admin/pdf/${record.key}`,
              // search:`?id=${record.id_surat}`
            }
           } >Edit</Link>),
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
                pathname: `/SkPreview/${record.key}`,
                // search:`?id=${record.id_surat}`
              }
             } >Lihat</Link>),
          }


      ],
    ]
    const col = this.props.match.path === `/admin${this.state.route}` ? columns[0] : columns[1]


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
        
      </div>
    );
  }
}
export default TabelSkOpjur;