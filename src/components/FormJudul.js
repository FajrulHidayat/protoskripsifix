import React from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  // InputNumber
} from "antd";
import axios from "axios";
import UbahDom from "../utils/UbahDom";
import moment from "moment";
import FormatDate from "../utils/FormatDate";
// import { Autocomplete } from "@material-ui/lab";
// import { TextField } from "@material-ui/core";
// import { now } from "moment";

class FormJudul extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        //   {
        //   name:"nim",
        //   value:"602340"
        // },
        //   {
        //   name:"nama",
        //   value:"sdasd"
        // },
      ],
      endPointFrom: "",
      endPointTo: "",
      redirect: "",
      formEdit: false,
      forms: [
        {
          label: "Nomor",
          name: "nomor",
        },
        {
          label: "NIM",
          name: "nim",
        },
        {
          label: "Nama",
          name: "nama",
        },
        {
          label: "Judul",
          name: "judul",
        },
      ],
      nimMahasiswa: [],
    };
    this.formMahasiswa = [
      {
        label: "NIM",
        name: "nim",
      },
      {
        label: "Nama",
        name: "nama",
      },
      {
        label: "Email",
        name: "email",
      },
      {
        label: "Jurusan",
        name: "jurusan",
      },
      {
        label: "Fakultas",
        name: "fakultas",
      },
    ];
    this.form = [
      [
        {
          label: "Pembimbing 1",
          name: "pembimbing1",
        },
        {
          label: "Pembimbing 2",
          name: "pembimbing2",
        },
      ],
      [
        {
          label: "Ketua",
          name: "ketua",
        },
        {
          label: "Sekretaris",
          name: "sekretaris",
        },
        {
          label: "Pembimbing 1",
          name: "pembimbing1",
        },
        {
          label: "Pembimbing 2",
          name: "pembimbing2",
        },
        {
          label: "Penguji 1",
          name: "penguji1",
        },
        {
          label: "Penguji 2",
          name: "penguji2",
        },
        {
          label: "Tanggal",
          name: "tanggal",
        },
        {
          label: "Jam",
          name: "jam",
        },
        {
          label: "Tempat",
          name: "tempat",
        },
        {
          label: "Pelaksana",
          name: "pelaksana",
        },
      ],

      [
        {
          label: "Ketua",
          name: "ketua",
        },
        {
          label: "Sekretaris",
          name: "sekretaris",
        },
        {
          label: "Penguji 1",
          name: "penguji1",
        },
        {
          label: "Penguji 2",
          name: "penguji2",
        },
        {
          label: "Penguji 3",
          name: "penguji3",
        },
        {
          label: "Pelaksana",
          name: "pelaksana",
        },
      ],
    ];
    this.namaPembimbing = [
      "Faisal, S.T., M.T.",
      "Ir. A. Muhammad Syafar., S.T., M.T., IPM.",
      "Dr. Ridwan Andi Kambau, S.T., M.T.",
      "Mustikasari, S.Kom., M.Kom.",
      "Nur Afif, S.T, M.T.",
      "Faisal, S.Kom., M.Kom.",
      "Antamil, S.T., M.T.",
      "Asep Indra Syahyadi, S.Kom., M.Kom.",
      "Sri Wahyuni, S.Kom, M.T.",
      "Wahyuddin Saputra, S.Kom., M.T.",
      "Hariani, S.Kom., M.Kom.",
      "Muhammad Nur Akbar, S.T., M.T.",
      "M. Hasrul H., M. Kom.",
      "Darmatasia, M.Kom.",
      "Andi Muhammad Nur Hidayat, S.Kom., M.T.",
    ];
    this.namaPenguji = [
      "Faisal, S.T., M.T.",
      "Dr. Ridwan Andi Kambau, S.T., M.T.",
      "Mustikasari, S.Kom., M.Kom.",
      "Nur Afif, S.T, M.T.",
      "Faisal, S.Kom., M.Kom.",
    ];
    this.namaPengujiAgama = [
      "Drs. H. Mahyuddin Latuconsina, S.H., M.A.",
      "Dr. Shuhufi Abdullah, M.Ag",
      "Dr. Sohra, M.Ag.",
      "Dr. Abdullah, M.Ag.",
      "Dr. Hamzah Hasan, M.H.I.",
    ];
    this.onchange = this.onchange.bind(this);
  }
  async componentDidMount() {
    let id = false;
    // console.log("props",this.props);
    // this.setState({pathname:this.props.history.location.pathname})
    // console.log("pathname",this.props);
    const data = [];
    const sekarang = moment().toObject();
    const kodeJurusan = {
      name: "kodeJurusan",
      value: "TI-UINAM",
    };
    let bulanRoman;
    switch (++sekarang.months) {
      case 1:
        bulanRoman = "I";
        break;
      case 2:
        bulanRoman = "II";
        break;
      case 3:
        bulanRoman = "III";
        break;
      case 4:
        bulanRoman = "IV";
        break;
      case 5:
        bulanRoman = "V";
        break;
      case 6:
        bulanRoman = "VI";
        break;
      case 7:
        bulanRoman = "VII";
        break;
      case 8:
        bulanRoman = "VIII";
        break;
      case 9:
        bulanRoman = "IX";
        break;
      case 10:
        bulanRoman = "X";
        break;
      case 11:
        bulanRoman = "XI";
        break;
      case 12:
        bulanRoman = "XII";
        break;

      default:
        break;
    }
    const bulan = {
      name: "bulan",
      value: bulanRoman,
    };

    const tahun = {
      name: "tahun",
      value: sekarang.years,
    };
    data.push(kodeJurusan);
    data.push(bulan);
    data.push(tahun);
    // console.log(data);
    this.setState({ data: data });

    if (this.props.match) {
      id = this.props.match.params.id;
      // console.log(id);

      switch (this.props.match.path) {
        case "/admin/Form":
          await this.setState({
            redirect: "/admin/",
            endPointFrom: "/master/mahasiswa",
            endPointTo: "/master/judul",
          });
          this.tambahForm(0);
          this.getDataMahasiswa();
          break;
        case "/admin/Form/:id":
          await this.setState({
            redirect: "/admin/",
            endPointFrom: "/master/judul",
            endPointTo: "/master/judul",
            formEdit: true,
          });
          this.tambahForm(0);
          this.getDataForm(id);
          this.getDataMahasiswa();
          break;

        case "/admin/Formproposal":
          // console.log("switch3",this.props.match.path);
          await this.setState({ redirect: "/admin/proposal" });
          await this.setState({ endPointFrom: "/master/judul" });
          await this.setState({ endPointTo: "/master/proposal" });
          this.tambahForm(1);
          this.getDataMahasiswa();
          break;
        case "/admin/Formproposal/:id":
          // console.log("switch3",this.props.match.path);
          await this.setState({ redirect: "/admin/proposal" });
          await this.setState({ endPointFrom: "/master/proposal" });
          await this.setState({
            endPointTo: "/master/proposal",
            formEdit: true,
          });
          this.tambahForm(1);
          this.getDataForm(id);
          this.getDataMahasiswa();
          break;
        case "/admin/Formhasil":
          // console.log("switch3",this.props.match.path);
          await this.setState({ redirect: "/admin/hasil" });
          await this.setState({ endPointFrom: "/master/proposal" });
          await this.setState({ endPointTo: "/master/hasil" });
          this.tambahForm(1);
          this.getDataMahasiswa();
          break;
        case "/admin/Formhasil/:id":
          // console.log("switch3",this.props.match.path);
          await this.setState({ redirect: "/admin/hasil" });
          await this.setState({ endPointFrom: "/master/hasil" });
          await this.setState({ endPointTo: "/master/hasil", formEdit: true });
          this.tambahForm(1);
          this.getDataForm(id);
          this.getDataMahasiswa();
          break;
        case "/admin/Formkompren":
          // console.log("switch3",this.props.match.path);
          await this.setState({ redirect: "/admin/kompren" });
          await this.setState({ endPointFrom: "/master/judul" });
          await this.setState({ endPointTo: "/master/kompren" });
          this.tambahForm(2);
          this.getDataMahasiswa();
          break;
        case "/admin/Formkompren/:id":
          // console.log("switch3",this.props.match.path);
          await this.setState({ redirect: "/admin/judul" });
          await this.setState({ endPointFrom: "/master/kompren" });
          await this.setState({
            endPointTo: "/master/kompren",
            formEdit: true,
          });
          this.tambahForm(2);
          this.getDataForm(id);
          this.getDataMahasiswa();
          break;
        case "/admin/Formtutup":
          // console.log("switch3",this.props.match.path);
          await this.setState({ redirect: "/admin/tutup" });
          await this.setState({ endPointFrom: "/master/hasil" });
          await this.setState({ endPointTo: "/master/tutup" });
          this.tambahForm(1);
          this.getDataMahasiswa();
          break;
        case "/admin/Formtutup/:id":
          // console.log("switch3",this.props.match.path);
          await this.setState({ redirect: "/admin/tutup" });
          await this.setState({ endPointFrom: "/master/tutup" });
          await this.setState({ endPointTo: "/master/tutup", formEdit: true });
          this.tambahForm(1);
          this.getDataForm(id);
          this.getDataMahasiswa();
          break;
        case "/admin/Formmahasiswa/:id":
          // console.log("switch3",this.props.match.path);
          await this.setState({ redirect: "/admin/mahasiswa" });
          await this.setState({ endPointFrom: "/master/mahasiswa" });
          await this.setState({
            endPointTo: "/master/mahasiswa",
            formEdit: true,
          });
          this.gantiForm(1);
          this.getDataForm("nim", id);
          this.getDataMahasiswa();
          break;

        default:
          await this.setState({
            redirect: "/admin/",
            endPointFrom: "/master/mahasiswa",
            endPointTo: "/master/judul",
          });
          break;
      }
      //   if(this.props.form){
      //     const forms = this.state.forms
      //     this.props.form.map((form)=>(
      //       forms.push(
      //         form
      //       ))
      //     )
      //     this.setState({forms:forms})
      // }
    }
  }

  getDataMahasiswa() {
    // console.log("mahasiswa");
    const nim = [];
    let headers = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: localStorage.getItem("token")
      },
      responseType: "json",
    };
    axios
      .get(`/master/mahasiswa`, headers)
      .then((res) => {
        // console.log(res.data.result);
        for (const data of res.data.result) {
          // nim.push({ value: data.nim });
          nim.push(data.nim);
        }
        // console.log(nim);
        this.setState({ nimMahasiswa: nim });
        // this.setState({ diagnostics: res.data.diagnostic });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  tambahForm(index) {
    const form = this.state.forms;
    // console.log(this.form[index]);
    for (const f of this.form[index]) {
      form.push(f);
    }
    this.setState({ forms: form });
  }
  gantiForm() {
    this.setState({ forms: this.formMahasiswa });
  }
  kembali = () => {
    UbahDom(this.state.redirect, this.props.history);
  };

  // sss = () => {
  //   let endPointFrom, redirect, endPointTo;
  //   switch (this.props.match.path) {
  //     case "/admin/Form":
  //       redirect="/admin/"
  //       endPointFrom="/master/mahasiswa"
  //       endPointTo="/master/judul"

  //       break;
  //     case "/admin/Form/:id":
  //       redirect="/admin/"
  //       endPointFrom="/master/judul"
  //       endPointTo="/master/judul"
  //       break;

  //     default:
  //       redirect="/admin/"
  //       endPointFrom="/master/mahasiswa"
  //       endPointTo="/master/judul"

  //       break;

  //   }

  //   return {redirect,endPointFrom,endPointTo }
  // }

  getDataForm = (tipe, nim) => {
    // console.log(nim);
    if (tipe === "nim") {
      const dateFormat = "YYYY-MM-DD";
      const timeFormat = "hh:mm:ss";
      axios
        .get(`${this.state.endPointFrom}/${nim}`)
        // .get(`/master/mahasiswa/${nim}`)
        .then((resp) => {
          //  console.log(resp);
          //  console.log("pajang ",Object.keys(resp.data.result));
          const data = [];
          const panjang = Object.keys(resp.data.result).length;
          for (let i = 0; i < panjang; i++) {
            const key = Object.keys(resp.data.result)[i];

            if (key === "waktu") {
              // console.log(moment(resp.data.result[key], dateFormat));
              let tanggal;
              let jam;
              if (this.state.formEdit) {
                const date = FormatDate(resp.data.result[key]);
                tanggal = moment(date, dateFormat);
                jam = moment(date, timeFormat);
              } else {
                tanggal = "";
                jam = "";
              }
              const pushTanggal = {
                name: "tanggal",
                value: tanggal,
              };
              const pushJam = {
                name: "jam",
                value: jam,
              };
              data.push(pushTanggal);
              data.push(pushJam);
            } else {
              const isi = {
                name: key,
                value: resp.data.result[key],
              };
              data.push(isi);
            }
          }
          console.log(data);
          this.setState({ data: data });
        })
        .catch((error) => {
          const datas = this.state.data;
          const data = [];
          let value = "";
          for (let i = 0; i < datas.length; i++) {
            value =
              data.name === "nim"
                ? nim
                : data.name === "kodeJurusan" ||
                  data.name === "bulan" ||
                  data.name === "tahun" ||
                  data.name === "nomorSurat"
                ? datas[i].value
                : "";
            const isi = {
              name: datas[i].name,
              value: value,
            };
            data.push(isi);
          }
          console.log(data);
          this.setState({ data: data });
          console.log(error);
        });
    } else {
      let change = false;
      const data = [...this.state.data];
      // const data = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].name === tipe) {
          data[i].value = nim;
          change = true;
          console.log(data[i]);
        }
      }
      if (!change) {
        data.push({ name: tipe, value: nim });
      }
      // console.log(typeof value);
      this.setState({ data: data });
    }
  };
  reset = () => {};
  onFinish = (values) => {
    // let headers = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     // Authorization: localStorage.getItem("token")
    //   },
    //   responseType: "json"
    // };
    console.log(values);
    const v = values;
    v.tanggal = moment(v.tanggal).format("YYYY-MM-DD");
    v.jam = moment(v.jam).format("HH:mm");
    v.waktu = `${v.tanggal} ${v.jam}`;
    v.nomor =
      v.nomorSurat + "/" + v.kodeJurusan + "/" + v.bulan + "/" + v.tahun;
    console.log("ss", v);
    if (this.props.match.params.id) {
      // console.log("update");
      axios
        .put(`${this.state.endPointTo}/${this.props.match.params.id}`, v)
        .then((res) => {
          UbahDom(this.state.redirect, this.props.history);
        });
    } else {
      // console.log("input");
      axios.post(this.state.endPointTo, v).then((res) => {
        UbahDom(this.state.redirect, this.props.history);
      });
    }
  };
  onchange(props) {
    // console.log(props);
    // console.log(typeof props[0].value);
    // console.log(props[0].value.toString().length);
    // console.log(this.state.nimMahasiswa);
    if (props[0].value.toString().length === 11) {
      this.getDataForm(props[0].value);
    }
    // console.log(values.length);
    // if (values.length === 11) {
    //   this.getDataForm(values);
    // }
  }
  autocompleteSetState = (name, value) => {
    let change = false;
    const data = this.state.data;
    for (var i = 0; i < data.length; i++) {
      if (data[i].name === name) {
        data[i].value = value;
        change = true;
      }
    }
    if (!change) {
      data.push({ name: name, value: value });
    }
    // console.log(typeof value);
    this.setState({ data: data });
    // console.log(this.state.data);
    console.log(data);
  };
  autocomplete(inp, arr, tipe) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    let getData = (tipe, nim) => {
      this.getDataForm(tipe, nim);
    };
    let setstate = (name, value) => {
      // this.setState(data)
      // console.log(value);
      this.autocompleteSetState(name, value);
    };
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
      var a,
        b,
        i,
        val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) {
        return false;
      }
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        // console.log(typeof arr[i]);
        // console.log(arr[i].substr(0, val.length));
        /*check if the item starts with the same letters as the text field value:*/
        // if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        if (arr[i].toUpperCase().includes(val.toUpperCase())) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          // b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          // b.innerHTML += arr[i].substr(val.length);
          // console.log(arr[i].toUpperCase().indexOf(val.toUpperCase()));
          if (arr[i].toUpperCase().indexOf(val.toUpperCase()) === 0) {
            b.innerHTML =
              "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
          } else {
            b.innerHTML = arr[i].substr(
              0,
              arr[i].toUpperCase().indexOf(val.toUpperCase())
            );
            b.innerHTML +=
              "<strong>" +
              arr[i].substr(
                arr[i].toUpperCase().indexOf(val.toUpperCase()),
                val.length
              ) +
              "</strong>";
            b.innerHTML += arr[i].substr(
              arr[i].toUpperCase().indexOf(val.toUpperCase()) + val.length
            );
            // b.innerHTML = arr[i];
          }
          //
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function (e) {
            /*insert the value for the autocomplete text field:*/
            // inp.value = this.getElementsByTagName("input")[0].value;
            // console.log(inp);
            // console.log(this.getElementsByTagName("input")[0].value);

            // if (tipe === "nim")
            getData(tipe, this.getElementsByTagName("input")[0].value);
            // else setstate(tipe, this.getElementsByTagName("input")[0].value);
            /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode === 40) {
        /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode === 38) {
        //up
        /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode === 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt !== x[i] && elmnt !== inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  }
  render() {
    const layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 12,
      },
    };
    const { data } = this.state;
    console.log(data);
    return (
      <Form
        {...layout}
        name="nest-messages"
        onFinish={this.onFinish}
        autoComplete="off"
        fields={data}
        onFieldsChange={() => {
          console.log(data);
          console.log();
        }}

        // onFieldsChange={(data) => {
        //   // console.log("data",data[0].name[0])
        //   if (data[0].name[0] === "nim") {
        //     this.onchange(data);
        //   }
        // }}
        //  validateMessages={validateMessages}
      >
        {/* {console.log("dsad",this.state.data)} */}
        {/* {nama} */}
        {this.state.forms.map((form, index) => {
          // console.log("form", form.name);
          let dis = false;
          let input;
          let require = true;
          if (this.props.match) {
            if (
              (this.props.match.params.id &&
                (form.name === "nim" ||
                  form.name === "jurusan" ||
                  form.name === "fakultas")) ||
              form.name === "nama"
            ) {
              dis = true;
            } else {
              dis = false;
            }
          }
          if (form.name === "tanggal") {
            input = (
              <DatePicker format="DD-MM-YYYY" placeholder="Pilih Tanggal" />
            );
          } else if (form.name === "jam") {
            input = <TimePicker format="HH-mm" placeholder="Pilih Waktu" />;
          } else if (form.name === "nim") {
            input = (
              <Input
                name={form.name}
                className="autocomplete"
                type="number"
                id={form.name}
                onChange={() =>
                  this.autocomplete(
                    document.getElementById(`${form.name}`),
                    this.state.nimMahasiswa,
                    `${form.name}`
                  )
                }
              />
            );
          } else if (
            form.name === "pembimbing1" ||
            form.name === "pembimbing2" ||
            ((this.props.match.path === "/admin/Formkompren" ||
              this.props.match.path === "/admin/Formkompren/:id") &&
              form.name === "penguji1") ||
            form.name === "penguji2"
          ) {
            // console.log(form.value);
            input = (
              <Input
                name={form.name}
                className="autocomplete"
                id={form.name}
                onChange={() =>
                  this.autocomplete(
                    document.getElementById(`${form.name}`),
                    this.namaPembimbing,
                    `${form.name}`
                  )
                }
              />
            );
          } else if (
            form.name === "penguji1"
            //  ||
            // ((this.props.match.path === "/admin/Formkompren" ||
            //   this.props.match.path === "/admin/Formkompren/:id") &&
            //   form.name === "penguji2")
          ) {
            // console.log(form.value);
            input = (
              <Input
                name={form.name}
                className="autocomplete"
                id={form.name}
                onChange={() =>
                  this.autocomplete(
                    document.getElementById(`${form.name}`),
                    this.namaPenguji,
                    `${form.name}`
                  )
                }
              />
            );
          } else if (
            form.name === "penguji2" ||
            ((this.props.match.path === "/admin/Formkompren" ||
              this.props.match.path === "/admin/Formkompren/:id") &&
              form.name === "penguji3")
          ) {
            // console.log(form.value);
            input = (
              <Input
                name={form.name}
                className="autocomplete"
                id={form.name}
                onChange={() =>
                  this.autocomplete(
                    document.getElementById(`${form.name}`),
                    this.namaPengujiAgama,
                    `${form.name}`
                  )
                }
              />
            );
          } else if (form.name === "nomor") {
            require = false;
            input = (
              <>
                <Form.Item
                  name="nomorSurat"
                  rules={[{ required: true }]}
                  style={{ display: "inline-block", width: "calc(25% - 8px)" }}
                >
                  <Input placeholder="Nomor Surat" />
                </Form.Item>
                <Form.Item
                  name="kodeJurusan"
                  rules={[{ required: true }]}
                  style={{ display: "inline-block", width: "calc(25% - 8px)" }}
                >
                  <Input placeholder="Kode Jurusan" />
                </Form.Item>
                <Form.Item
                  name="bulan"
                  rules={[{ required: true }]}
                  style={{ display: "inline-block", width: "calc(25% - 8px)" }}
                >
                  <Input placeholder="Bulan" />
                </Form.Item>
                <Form.Item
                  name="tahun"
                  rules={[{ required: true }]}
                  style={{ display: "inline-block", width: "calc(25% - 8px)" }}
                >
                  <Input placeholder="Tahun" />
                </Form.Item>
              </>
            );
          } else {
            input = <Input disabled={dis} />;
          }
          // if (form.name === "nomor") {
          //   require = false;
          // }
          return (
            <Form.Item
              key={index}
              name={form.name}
              label={form.label}
              rules={[
                {
                  required: require,
                },
              ]}
            >
              {input}
            </Form.Item>
          );
        })}
        {/* <Form.Item
        name={'nim'}
        label="NIM"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        name={'nama'}
        label="Nama"
     
        rules={[
          {
            required: true,
          },
        ]}
        // getValueFromEvent={{value:nama}}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'judul'}
        label="Judul"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'pembimbing1'}
        label="Pembimbing 1"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'pembimbing2'}
        label="Pembimbing 2"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item> */}

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "8px" }}
          >
            Simpan
          </Button>
          <Button onClick={this.kembali}>Batal</Button>
        </Form.Item>
      </Form>
    );
  }
}
export default FormJudul;
