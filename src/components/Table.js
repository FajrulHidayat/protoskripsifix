import React from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import UbahDom from '../utils/UbahDom'
import axios from "axios";
import FormatDate from '../utils/FormatDate'
import moment from 'moment-timezone'
// import { Route } from "react-dom";

// const data = [
//   {
//     nim: '60200115001',
//     nama: 'Baco Tang',
//     judul: 'Pengaruh sesuatu terhadap sesuatu',
//     pembimbing1: 'Faisal Akib, S.Kom., M.Kom.',
//     pembimbing2: 'Mustikasari, S.Kom., M.Kom.'
//   },
//   {
//     nim: '60200115001',
//     nama: 'Baco Tang',
//     judul: 'Pengaruh sesuatu terhadap sesuatu',
//     pembimbing1: 'Faisal Akib, S.Kom., M.Kom.',
//     pembimbing2: 'Mustikasari, S.Kom., M.Kom.'
//   },
//   {
//     nim: '60200115001',
//     nama: 'Baco Tang',
//     judul: 'Pengaruh sesuatu terhadap sesuatu',
//     pembimbing1: 'Faisal Akib, S.Kom., M.Kom.',
//     pembimbing2: 'Mustikasari, S.Kom., M.Kom.'
//   },
//   {
//     nim: '60200115001',
//     nama: 'Baco Tang',
//     judul: 'Pengaruh sesuatu terhadap sesuatu',
//     pembimbing1: 'Faisal Akib, S.Kom., M.Kom.',
//     pembimbing2: 'Mustikasari, S.Kom., M.Kom.'
//   },
//   {
//     nim: '60200115001',
//     nama: 'Baco Tang',
//     judul: 'Pengaruh sesuatu terhadap sesuatu',
//     pembimbing1: 'Faisal Akib, S.Kom., M.Kom.',
//     pembimbing2: 'Mustikasari, S.Kom., M.Kom.'
//   },
//   {
//     nim: '60200115001',
//     nama: 'Baco Tang',
//     judul: 'Pengaruh sesuatu terhadap sesuatu',
//     pembimbing1: 'Faisal Akib, S.Kom., M.Kom.',
//     pembimbing2: 'Mustikasari, S.Kom., M.Kom.'
//   },


// ];

class Tabel extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    data: [],
    kolom: [],
    history: [],
    route: "/admin/Form",
    endPoint: `/master/judul`
  };
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
    console.log(this.props);
    if (this.props.route) {
      this.setState({ route: this.props.route })

    }
    if (this.props.history) {
      this.setState({ history: this.props.history })
      console.log(this.props.history.location.pathname);
      switch (this.props.history.location.pathname) {
        case "/admin/proposal":
          await this.setState({ endPoint: `/master/proposal` })
          break;
        
        case "/admin/hasil":
          await this.setState({ endPoint: `/master/hasil` })
          break;
        case "/admin/kompren":
          await this.setState({ endPoint: `/master/kompren` })
          break;
        case "/admin/tutup":
          await this.setState({ endPoint: `/master/tutup` })
          break;

        default:
          await this.setState({ endPoint: `/master/judul` })
          break;
      }
    } else {
      this.setState({ history: this.props })
    }
    if (this.props.kolom) {
      const kolom = []
      this.props.kolom.map((kol) => (
        kolom.push(
          {
            title: kol.title,
            dataIndex: kol.data,
            key: kol.data,
            // ...this.getColumnSearchProps(kol.data)
          }
        )
      ))
      kolom.push(this.columns[5])
      console.log("kolom table",this.columns );
      this.setState({ kolom: kolom })

    } else {
      this.setState({ kolom: this.columns })
    }
    let headers = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: localStorage.getItem("token")
      },
      responseType: "json"
    };
    console.log(this.state.endPoint);
    axios.get(this.state.endPoint, headers).then(res => {
      this.setState({ diagnostics: res.data.diagnostic });
      if (this.state.diagnostics.status === 200) {
        let index = 0;
        let datas = [];
        for (const qd of res.data.result) {
          const data = {}
          const ind = Object.keys(qd)
          for (let i = 0; i <= ind.length; i++) {
            if (i === ind.length)
              data.key = index
            else if (ind[i] === "waktu"){
              data[ind[i]] =moment(qd[ind[i]]).format  ("DD MMMM YYYY HH:mm:ss")
              // data[ind[i]] = moment(qd[ind[i]], "DD-MM-YYYY HH:mm:ss")
              // console.log( moment(qd[ind[i]], "DD-MM-YYYY HH:mm:ss"));
              
            }
            else
              data[ind[i]] = qd[ind[i]]
          }
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


  render() {
    console.log(this.props);
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary"
            onClick={() => UbahDom(this.state.route, this.props.history)}
            //  {...console.log(this.props)}
            icon={<PlusOutlined />}>
            Tabmah
          </Button>

        </div>
        <Table columns={this.state.kolom} dataSource={this.state.data} />
      </div>
    );
  }
}
export default Tabel;