
import { Layout, Menu, Breadcrumb, Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
  PoweroffOutlined,
  FileOutlined,
  FileTextOutlined,
  ProfileOutlined,
  ContainerOutlined,
  TeamOutlined,
  InboxOutlined,
  BookOutlined,
  DeliveredProcedureOutlined,
  FolderOutlined,
  // TeamOutlined,
  // UserOutlined,
} from '@ant-design/icons';
import Tabel from './Table'
import TableSkOpjur from './TabelSkOpjur'
import Proposal from './Proposal'
import FormJudul from './FormJudul'
import Forbidden from './Forbidden'
import PDFView from './PDFView'
import PDFPreview from './PDFPreview'
import TableJfu from './jfu/TableJfu'
import TablePimpinan from './Pimpinan/Table'
import logo from '../logo.png';
import { Route } from "react-router-dom";
import axios from "axios"
import UbahDom from "../utils/UbahDom"
// import {PDFViewer} from '@react-pdf/renderer'
// const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;

export default function DashboardAdmin(props) {

  const [collapsed, setCollapsed] = useState(false);
  const [akun, setakun] = useState([])
  const [IsReady, setIsReady] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [collapsed,setCollapsed] = useState(false);
  //   onCollapse = collapsed => {
  //     console.log(collapsed);
  //     setCollapsed({ collapsed });
  //   };


  // const { collapsed } = this.state;
  useEffect(() => {
    const token = localStorage.getItem("token")
    let headers = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      responseType: "json"
    };
    axios
      .post(`/auth/verify`, null, headers)
      .then(res => {

        axios
          .get(`/akun/${res.data.result.nip}`, null, headers)
          .then(resp => {

            setakun(resp.data.result)
            console.log(resp.data.result);
            setIsReady(true)
          })
          .catch((error) => {

            console.log(error.status);
          });

      })
      .catch((error) => {

        console.log(error.status);
      });

  }, [])
  const handleOk = () => {
    const token = localStorage.getItem("token")
    let headers = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      responseType: "json"
    };
    axios
      .post(`/auth/logout`, null, headers)
      .then(res => {

        console.log(res);

      })
      .catch((error) => {

        console.log(error.status);
      });
    localStorage.removeItem("token")
    localStorage.removeItem("level")
    UbahDom(`/`, props.history)
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const logout = () => {
    setIsModalVisible(true);

  }
  const handleClick = (e) => {
    // console.log("e",e)
    // console.log("this",props)
    const { history } = props;
    history.push("/admin");
    switch (e.key) {
      case "0": {
        history.push("admin/mahasiswa");
        return;
      }
      case "1": {
        history.push("admin/");
        return;
      }
      case "2": {
        history.push("admin/proposal");
        return;
      }
      case "3": {
        history.push("admin/hasil");
        return;
      }
      case "4": {
        history.push("admin/kompren");
        return;
      }
      case "5": {
        history.push("admin/tutup");
        return;
      }
      case "6": {
        history.push("admin/sk");
        return;
      }
      case "21": {
        history.push("admin/jfu");
        return;
      }
      case "22": {
        history.push("admin/jfuProses");
        return;
      }
      case "23": {
        history.push("admin/jfuArsip");
        return;
      }
      case "31": {
        history.push("admin/ksb");
        return;
      }
      case "32": {
        history.push("admin/ksbProses");
        return;
      }
      case "33": {
        history.push("admin/ksbArsip");
        return;
      }
      case "41": {
        history.push("admin/ktu");
        return;
      }
      case "42": {
        history.push("admin/ktuArsip");
        return;
      }
      case "51": {
        history.push("admin/wd");
        return;
      }
      case "52": {
        history.push("admin/wdArsip");
        return;
      }
      case "61": {
        history.push("admin/dk");
        return;
      }
      case "62": {
        history.push("admin/dkArsip");
        return;
      }

      default:
        return "foo";
    }
  };

  const level = localStorage.getItem("level")
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        // collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} 
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}>
        <div className="logo">
          {/* <img alt="" src={`http://localhost:9000/image/${akun.foto}`} /> */}
          <img alt="" src={`http://151.106.108.85:9000/image/${akun.foto}`} />
          <h3>{akun.nama}</h3>
          <h6>{akun.jabatan === "operator jurusan" ? "Operator Jurusan" : akun.jabatan === "jfu" ? "Staf Akademik" : akun.jabatan === "ksb" ? "Kasubag" : akun.jabatan === "ktu" ? "Kabag Tata Usaha" : akun.jabatan === "wd" ? "Wakil Dekan I" : akun.jabatan === "dk" ? "Dekan" : ""}</h6>
        </div>
        {level === "operator jurusan" ?
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleClick}>

            <Menu.Item key="1" icon={<TeamOutlined />}>
              Pembimbing
            </Menu.Item>
            <Menu.Item key="2" icon={<FileTextOutlined />}>
              Seminar Proposal
            </Menu.Item>
            <Menu.Item key="3" icon={<ContainerOutlined />}>
              Seminar Hasil
            </Menu.Item>
            <Menu.Item key="4" icon={<ProfileOutlined />}>
              Ujian Komprehensif
            </Menu.Item>
            <Menu.Item key="5" icon={<BookOutlined />}>
              Munaqasyah
            </Menu.Item>
            <Menu.Item key="6" icon={<InboxOutlined />}>
              SK Jadi
            </Menu.Item>
            <Menu.Item key="0" icon={<TeamOutlined />}>
              Mahasiswa
            </Menu.Item>
            {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                  <Menu.Item key="3">Tom</Menu.Item>
                  <Menu.Item key="4">Bill</Menu.Item>
                  <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                  <Menu.Item key="6">Team 1</Menu.Item>
                  <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined />}>
                  Files
                </Menu.Item> */}
          </Menu>
          : level === "jfu" ? <Menu theme="dark" defaultSelectedKeys={['21']} mode="inline" onClick={handleClick}>
            <Menu.Item key="21" icon={<FileOutlined />}>
              Pengajuan
            </Menu.Item>
            <Menu.Item key="22" icon={<DeliveredProcedureOutlined />}>
              proses
            </Menu.Item>
            <Menu.Item key="23" icon={<FolderOutlined />}>
              Arsip
            </Menu.Item>
          </Menu> : level === "ksb" ? <Menu theme="dark" defaultSelectedKeys={['31']} mode="inline" onClick={handleClick}>
            <Menu.Item key="31" icon={<FileOutlined />}>
              Pengajuan
            </Menu.Item>
            <Menu.Item key="33" icon={<FolderOutlined />}>
              Arsip
            </Menu.Item>
          </Menu> : level === "ktu" ? <Menu theme="dark" defaultSelectedKeys={['41']} mode="inline" onClick={handleClick}>
            <Menu.Item key="41" icon={<FileOutlined />}>
              Pengajuan
            </Menu.Item>
            <Menu.Item key="42" icon={<FolderOutlined />}>
              Arsip
            </Menu.Item>
          </Menu> : level === "wd" ? <Menu theme="dark" defaultSelectedKeys={['51']} mode="inline" onClick={handleClick}>
            <Menu.Item key="51" icon={<FileOutlined />}>
              Pengajuan
            </Menu.Item>
            <Menu.Item key="52" icon={<FolderOutlined />}>
              Arsip
            </Menu.Item>
          </Menu> : level === "dk" ? <Menu theme="dark" defaultSelectedKeys={['61']} mode="inline" onClick={handleClick}>
            <Menu.Item key="61" icon={<FileOutlined />}>
              Pengajuan
            </Menu.Item>
            <Menu.Item key="62" icon={<FolderOutlined />}>
              Arsip
            </Menu.Item>
          </Menu> : null}
        <div >
          <Menu style={{ position: "relative", bottom: "0px" }} theme="dark" mode="inline" onClick={logout}>
            <Menu.Item key="99" icon={<PoweroffOutlined />}>
              Keluar
            </Menu.Item>

          </Menu>
        </div>
        {/* <Button
              type="primary"
              // theme="dark"
              icon={<PoweroffOutlined />}
              // onClick={() => this.logout}
              ghost block
            >
              Keluar
            </Button> */}
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>User</Breadcrumb.Item>
                  <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb> */}
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {level === "operator jurusan" ? <>
              <Route exact path="/admin/mahasiswa" component={Proposal}></Route>
              <Route exact path="/admin/Formmahasiswa/:id" component={FormJudul}></Route>
              <Route exact path="/admin/" component={Tabel}></Route>
              <Route exact path="/admin/Form/:id" component={FormJudul}></Route>
              <Route exact path="/admin/Form" component={FormJudul}></Route>
              <Route exact path="/admin/proposal" component={Proposal}></Route>
              <Route exact path="/admin/Formproposal" component={FormJudul}></Route>
              <Route exact path="/admin/Formproposal/:id" component={FormJudul}></Route>
              <Route exact path="/admin/hasil" component={Proposal}></Route>
              <Route exact path="/admin/Formhasil" component={FormJudul}></Route>
              <Route exact path="/admin/Formhasil/:id" component={FormJudul}></Route>
              <Route exact path="/admin/kompren" component={Proposal}></Route>
              <Route exact path="/admin/Formkompren" component={FormJudul}></Route>
              <Route exact path="/admin/Formkompren/:id" component={FormJudul}></Route>
              <Route exact path="/admin/tutup" component={Proposal}></Route>
              <Route exact path="/admin/Formtutup" component={FormJudul}></Route>
              <Route exact path="/admin/Formtutup/:id" component={FormJudul}></Route>
              <Route exact path="/admin/sk" component={TableSkOpjur}></Route>
              <Route exact path="/admin/Forbidden" component={Forbidden}></Route>
            </> : level === "jfu" ? <>
              {/* {console.log("jfu")} */}
              <Route exact path="/admin/jfu" component={TableJfu}></Route>
              <Route exact path="/admin/jfuArsip" component={TableJfu}></Route>
              <Route exact path="/admin/jfuProses" component={TableJfu}></Route>
            </> : level === "ksb" ? <>
              {/* {console.log("jfu")} */}
              <Route exact path="/admin/ksb" component={TablePimpinan}></Route>
              <Route exact path="/admin/ksbArsip" component={TablePimpinan}></Route>
            </> : level === "ktu" ? <>
              {/* {console.log("jfu")} */}
              <Route exact path="/admin/ktu" component={TablePimpinan}></Route>
              <Route exact path="/admin/ktuArsip" component={TablePimpinan}></Route>
            </> : level === "wd" ? <>
              {/* {console.log("jfu")} */}
              <Route exact path="/admin/wd" component={TablePimpinan}></Route>
              <Route exact path="/admin/wdArsip" component={TablePimpinan}></Route>
            </> : level === "dk" ? <>
              {/* {console.log("jfu")} */}
              <Route exact path="/admin/dk" component={TablePimpinan}></Route>
              <Route exact path="/admin/dkArsip" component={TablePimpinan}></Route>
            </> : null}

            {IsReady && <Route path="/admin/pdf/:id" component={PDFView}></Route>}
            {IsReady && <Route path="/admin/pdfPreview/:id" component={PDFView}></Route>}

            {/* <Route exact path="/admin/" component={Tabel}></Route>
                <Route exact path="/admin/Form/:id" component={FormJudul}></Route>
                <Route exact path="/admin/Form" component={FormJudul}></Route>
                <Route exact path="/admin/pdf" component={PDFView}></Route>
                <Route exact path="/admin/proposal" component={Proposal}></Route>
                <Route exact path="/admin/Formproposal" component={FormJudul}></Route>
                <Route exact path="/admin/Formproposal/:id" component={FormJudul}></Route>
                <Route exact path="/admin/hasil" component={Proposal}></Route>
                <Route exact path="/admin/Formhasil" component={FormJudul}></Route>
                <Route exact path="/admin/Formhasil/:id" component={FormJudul}></Route>
                <Route exact path="/admin/tutup" component={Proposal}></Route>
                <Route exact path="/admin/Formtutup" component={FormJudul}></Route>
                <Route exact path="/admin/Formtutup/:id" component={FormJudul}></Route>
                <Route exact path="/admin/Forbidden" component={Forbidden}></Route> */}

          </div>
        </Content>
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} cancelText="Tidak" okText="Ya">
          <p>Apakah Anda Ingin Keluar?</p>
        </Modal>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

