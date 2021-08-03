import React, { useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
  Canvas,
} from "@react-pdf/renderer";
import logo from "../logo.png";
import times from "../fonts/times.ttf";
import bold from "../fonts/bold.ttf";
import moment from "moment";
import "moment/locale/id";
// import ttd from 'gambar/ttd1.png'

Font.register({ family: "TimesN", src: times });
Font.register({ family: "TimesB", src: bold });

// Create styles
const styles = StyleSheet.create({
  page: {
    // display:"flex",
    paddingTop: "2cm",
    paddingLeft: "3cm",
    paddingRight: "2cm",
    paddingBottom: "2cm",
    backgroundColor: "#ffffff",
  },
  row: { flexDirection: "row" },
  col: { flexDirection: "column" },
  section: {
    //   top:"100px",
    // margin: 10,
    // padding: 10
    // ,
    flexGrow: 1,
    // backgroundColor: '#00ffff',
  },
  image: {
    width: "100%",
    height: "50px",
    alignItems: "center",
    //   backgroundColor: '#ffff00',
    //   flexGrow: 10
  },
  kop: {
    marginVertical: "1pt",
    fontSize: 12,
    fontStyle: "oblique",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  text1: {
    // flexFlow:2,
    width: "70px",
    //   backgroundColor: '#ccaa00',
    fontSize: 12,
  },
  text2: {
    //   flexFlow:1,
    // marginHorizontal:"2pt",
    width: "6px",
    //   backgroundColor: '#ff00ff',
    fontSize: 12,
  },
  text3: {
    // flexFlow:7,
    width: "390px",
    textAlign: "left",
    fontFamily: "TimesB",
    //   backgroundColor: '#ff0000',
    fontSize: 12,
    fontWeight: "bold",
  },
  text3a: {
    // flexFlow:7,
    width: "380px",
    textAlign: "left",
    fontFamily: "Times-Roman",
    //   backgroundColor: '#ff0000',
    fontSize: 12,
  },
  text: {
    // margin: 12,
    fontSize: 12,
    textAlign: "justify",
    fontFamily: "TimesN",
  },
  canvas: {
    height: "50px",
    width: "200px",
    marginTop: "10px",
    //   backgroundColor:"#ff00ff"
  },
  ttd: {
    width: "60%",
    // height:"300px",
    marginLeft: "50%",
    marginTop: "16px",
    fontSize: 11,
    // backgroundColor:"#343434"
  },
});
const Bold = (props) => {
  // console.log("bold",props);
  return (
    <Text style={{ fontFamily: "TimesB", fontWeight: 400 }}>{props.text}</Text>
  );
};
const Nomor = (props) => {
  // console.log("bold",props);
  return <Text>{props.text}</Text>;
};

const TextPoint = (props) => (
  <View style={styles.row}>
    <View style={styles.text1}>
      <Text style={styles.text}>{props.text1}</Text>
    </View>
    <View style={styles.text2}>
      <Text style={styles.text}>{props.text2}</Text>
    </View>
    <View style={styles.text}>
      <Text style={styles.text}>{props.point}</Text>
    </View>
    <View style={styles.text3}>
      <Text style={styles.text}>{props.text3}</Text>
    </View>
  </View>
);
const datas = [
  {
    text1: "Menimbang",
    text2: ":",
    point: "a. ",
    text3:
      "Bahawa untuk membantu kelancaran pelaksanaan penelitian dan penyusunan skripsi mahasiswa tersebut diatas, maka dipandang perlu untuk menerbitkan Surat Keputusan Dekan.",
  },
  {
    text1: "",
    text2: "",
    point: "b. ",
    text3:
      "Bahwa mereka yang ditetapkan dalam surat keputusan ini dipandang cakap dan memenuhi syarat untuk diserahi tugas sebagai pembimbing penyusun skripsi mahasiswa tersebut diatas.",
  },
  {
    text1: "Mengingat",
    text2: ":",
    point: "1. ",
    text3:
      "Undang-undang Nomor 20 Tahun 2003 Tentang Sistem Pendidikan Nasional.",
  },
  {
    text1: "",
    text2: "",
    point: "2. ",
    text3: "Undang-undang Nomor 17 Tahun 2003 Tentang Keuangan Negara.",
  },
  {
    text1: "",
    text2: "",
    point: "3. ",
    text3: "Undang-undang Nomor 12 Tahun 2003 Tentang Pendidikan Tinggi.",
  },
  {
    text1: "",
    text2: "",
    point: "4. ",
    text3:
      "Peraturan Menteri Agama RI Nomor 1 Tahun 2012 Tentang Perubahan Ketiga Atas Peraturan Menteri Agama Nomor 2 Tahun 2006 Tentang Mekanisme Pelaksanaan Pembayaran Atas Beban Anggaran Pendapatan dan Belanja Negara di Lingkungan Kementerian Agama;",
  },
  {
    text1: "",
    text2: "",
    point: "5. ",
    text3:
      "Peraturan Menteri Agama RI Nomor 25 Tahun 2013 Tentang Organisasi dan Tata Kerja UIN Alauddin Makassar;",
  },
  {
    text1: "",
    text2: "",
    point: "6. ",
    text3:
      "Peraturan Menteri Agama RI Nomor 20 Tahun 2014 jo Peraturan Menteri Agama Nomor 8 Tahun 2016 Tentang Statuta UIN Alauddin Makassar;",
  },
  {
    text1: "",
    text2: "",
    point: "7. ",
    text3:
      "Keputusan Menteri Agama Nomor 289 Tahun 1993 jo Nomor 202 B Tahun 1998 Tentang pemberian Kuasa dan Pendelegasian Wewenang Menandatangani Surat Keputusan;",
  },
  {
    text1: "",
    text2: "",
    point: "8. ",
    text3:
      "Keputusan Menteri Keuangan nomor: 330/KMK/05/ Tahun 2008 Tentang Penelitian UIN Alauddin Makassasr pada Depag Sebagai Institusi Pemerintah yang Menerapkan Penglolaan Badan Layanan Umum (BLU);",
  },
  {
    text1: "",
    text2: "",
    point: "9. ",
    text3:
      "Keputusan Rektor UIN Alauddin Makassar No. 200 tahun 2016 Tentang Pedoman Edukasi UIN Alauddin Makassar;",
  },
];
const datas2 = [
  {
    text1: "Menetapkan",
    text2: ":",
    point: "",
    text3:
      "KEPUTUSAN DEKAN FAKULTAS SAINS DAN TEKNOLOGI TENTANG PEMBIMBING DALAM PENELITIAN DAN PENYUSUNAN SKRIPSI FAKULTAS SAINS DAN TEKNOLOGI UIN ALAUDDIN MAKASSAR",
  },
  {
    text1: "KESATU",
    text2: "",
    point: "",
    text3: "Menetapkan dan menunjuk saudara :",
  },
  {
    text1: "Faisal Akib, S.Kom., M.Kom.",
    text2: "pembimbing",
    point: "1. ",
    text3: "sebagai Pembimbing Pertama,",
  },
  {
    text1: "Mustikasari, S.Kom., M.Kom.",
    text2: "pembimbing",
    point: "2. ",
    text3: "sebagai Pembimbing Kedua,",
  },
  {
    text1: "KEDUA",
    text2: ":",
    point: "",
    text3:
      "Tugas Pembimbing dalam penelitian dan penyusunan skripsi mahasiswa adalah memeriksa draft skripsi dan naskah skripsi, memberi bimbingan, petunjuk-petunjuk, perbaikan mengenai materi, metode, bahasa dan kemampuan menguasai masalah",
  },
  {
    text1: "KETIGA",
    text2: ":",
    point: "",
    text3:
      "Segala biaya yang ditimbulkan akibat dikeluarkannya surat keputusan ini dibebankan kepada Anggaran Belanja Fakultas Sains dan Teknologi UIN Alauddin Makassar,",
  },
  {
    text1: "KEEMPAT",
    text2: ":",
    point: "",
    text3:
      "Surat Keputusan ini mulai berlaku sejak tanggal ditetapkan dan apabila dikedian hari terdapat kekeliruan didalamnya akan diperbaiki sebagaimana mestinya,",
  },
  {
    text1: "KELIMA",
    text2: ":",
    point: "",
    text3:
      "Surat Keputusan ini disampaikan kepada masing-masing yang bersangkutan untuk diketaui dan dilaksanakan dengan penuh tanggungjawab.",
  },
];
const Lembar2 = (props) => {
  // console.log(props)
  if (props.data.text2 === "pembimbing") {
    return (
      <View style={styles.row}>
        <View style={styles.text1}>
          <Text style={styles.text}></Text>
        </View>
        <View style={styles.text2}>
          <Text style={styles.text}></Text>
        </View>
        <View style={styles.text3}>
          {props.data.point === "1. " ? (
            <Text style={styles.text}>
              <Bold text={props.data.point} />
              <Bold text={props.dataSurat.pembimbing1} /> {props.data.text3}
            </Text>
          ) : (
            <Text style={styles.text}>
              <Bold text={props.data.point} />
              <Bold text={props.dataSurat.pembimbing2} /> {props.data.text3}
            </Text>
          )}
        </View>
      </View>
    );
  } else {
    return (
      <TextPoint
        text1={props.data.text1}
        text2={props.data.text2}
        point={props.data.point}
        text3={props.data.text3}
      />
    );
  }
};
const IsTtd = (ttd, ke) => {
  // console.log("ttd",ttd)
  // console.log("ke",ke)
  if (ttd) {
    if (ke === 1) {
      return process.env.PUBLIC_URL + "/gambar/ttd1.png";
    } else {
      return process.env.PUBLIC_URL + "/gambar/ttd1.png";
    }
  } else {
    return null;
  }
};
// const ttd1 = true;
// const ttd2 = false;

const MyDocument = (props) => {
  console.log("pdf", props);
  // moment.locale()
  console.log(moment(props.data.waktu).format("DD MMMM YYYY"));
  useEffect(() => {
    datas2[2].text1 = props.dataSurat.pembimbing1;
    console.log(datas2);
    return () => {};
  });
  return (
    <Document>
      <Page size={[595.28, 935, 43]} style={styles.page} wrap={true}>
        <View style={styles.image}>
          <Image src={logo}></Image>
        </View>
        <View style={styles.col} wrap={false}>
          <View style={styles.section}>
            <Text style={styles.kop}>
              KEPUTUSAN DEKAN FAKULTAS SAINS DAN TEKNOLOGI
            </Text>
            <Text style={styles.kop}>UIN ALAUDDIN MAKASSAR</Text>
            <Text style={styles.kop}>
              NOMOR :{" "}
              <Nomor
                text={`${props.data.nomor} Tahun ${moment(
                  props.data.waktu
                ).format("YYYY")}`}
              />
            </Text>
            <Text style={[styles.kop, { marginVertical: "5pt" }]}>TENTANG</Text>
            <Text style={styles.kop}>
              <Nomor
                text={
                  props.data.tentang === "Pembimbing"
                    ? "PEMBIMBING DALAM PENELITIAN DAN PENYUSUNAN SKRIPSI MAHASISWA"
                    : "DEWAN PENGUJIAN PELAKSANA UJIAN PROPOSAL PENELITIAN"
                }
              />
            </Text>
            <Text style={styles.kop}>
              <Nomor
                text={
                  props.data.tentang === "Pembimbing"
                    ? "JURUSAN TEKNIK INFORMATIKA"
                    : `ATAS NAMA ${props.data.nama} JURUSAN ${props.data.jurusan}`
                }
              />
            </Text>
            <Text style={styles.kop}>
              FAKULTAS SAINS DAN TEKNOLOGI UIN ALAUDDIN MAKASSAR
            </Text>
            <Text style={[styles.kop, { marginVertical: "5pt" }]}>
              DENGAN RAHMAT TUHAN YANG MAHA ESA
            </Text>
            <Text style={[styles.kop, { marginBottom: "5pt" }]}>
              DEKAN FAKULTAS SAINSDAN TEKNOLOGI UIN ALAUDDIN MAKASSAR
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.text1}>
              <Text style={styles.text}>Mambaca</Text>
            </View>
            <View style={styles.text2}>
              <Text style={styles.text}>:</Text>
            </View>
            <View style={styles.text3}>
              {console.log(props)}
              <Text style={styles.text}>
                Surat Permohonan Ketua Jurusan{" "}
                <Bold text={`${props.data.jurusan}`} /> Fakultas Sains dan
                Teknologi UIN Alauddin Makassar, Nama{" "}
                <Text
                  style={{ fontFamily: "TimesB" }}
                  render={() => `${props.data.nama}`}
                />{" "}
                NIM <Bold text={`${props.data.nim}`} /> tertanggal{" "}
                <Bold
                  text={`${moment(props.data.waktu).format("DD MMMM YYYY")}`}
                />{" "}
                Untuk mendapatkan Pembimbingan Skripsi dengan Judul : "
                <Bold text={`${props.dataSurat.judul}`} />"
              </Text>
            </View>
          </View>
          {/* {console.log(datas)} */}
          {datas.map((data, index) => (
            <TextPoint
              key={index}
              text1={data.text1}
              text2={data.text2}
              point={data.point}
              text3={data.text3}
            />
          ))}
          <View>
            <Canvas
              paint={(painter) =>
                painter
                  .moveTo(0, 0)
                  .lineTo(200, 0)
                  .lineTo(200, 50)
                  .lineTo(0, 50)
                  .lineTo(0, 0)
                  .moveTo(0, 20)
                  .lineTo(200, 20)
                  .moveTo(80, 0)
                  .lineTo(80, 50)
                  .fillColor("#000000")
                  .fontSize(11)
                  .text("Pemrakarsa", 2, 1)
                  .text("Kasubag. Akademik", 82, 1)
                  .fontSize(10)
                  .text("Paraf : ", 2, 21)
                  .text("Paraf : ", 82, 21)
                  // .image(`${process.env.PUBLIC_URL}/gambar/ttd1.png`,40,21,{fit:[100,100]})
                  // .image({logo},40,21,{fit:[100,100]})
                  .stroke()
              }
              style={styles.canvas}
            ></Canvas>

            <Image
              style={{
                position: "absolute",
                width: "30px",
                marginLeft: "30px",
                marginTop: "20px",
              }}
              src={IsTtd(props.data.ktu_acc, 1)}
            ></Image>
            <Image
              style={{
                position: "absolute",
                width: "30px",
                marginLeft: "120px",
                marginTop: "20px",
              }}
              src={IsTtd(props.data.ksb_acc, 2)}
            ></Image>
          </View>
        </View>
      </Page>
      <Page size={[595.28, 935, 43]} style={styles.page} wrap={true}>
        <View>
          <Text style={styles.kop}>Memutuskan</Text>
          {datas2.map((data, index) => (
            <Lembar2 key={index} data={data} dataSurat={props.dataSurat} />
          ))}
        </View>
        <View style={styles.ttd}>
          <Bold text="Ditetapkan di Gowa" />
          <Bold
            text={`Pada Tanggal ${moment(props.data.waktu).format(
              "DD MMMM YYYY"
            )}`}
          />
          <Text style={{ marginTop: "8px" }} />
          <Bold text="DEKAN FAKULTAS SAINS DAN TEKNOLOGI" />
          {/* <Text>Kuasa No.: B339/Un.06/FST/Kp.07.6/02/2020</Text>
                    <Text>Tanggal 14 Februari 2020</Text>
                    <Text>Wakil Dekan Bidang Akademik</Text> */}
          <Text style={{ marginTop: "45px" }} />
          <Bold text="Prof. Dr. Muhammad Halifah Mustami, M.Pd" />
          <Image
            style={{
              position: "absolute",
              width: "30px",
              bottom: "0px",
              right: "30px",
            }}
            src={IsTtd(props.data.wd_acc, 1)}
          ></Image>
          <Image
            style={{
              position: "absolute",
              width: "60px",
              bottom: "-20px",
              left: "0px",
            }}
            src={IsTtd(props.data.dk_acc, 1)}
          ></Image>
        </View>
      </Page>
      {/* <Page size="A4" style={styles.page} wrap={false}>
        <View>
            <Text style={styles.kop}>Memutuskan</Text>
            {datas2.map((data) => (
                <Lembar2 data={data}/>
            ))}
        </View>
    </Page> */}
    </Document>
  );
};

export default MyDocument;
