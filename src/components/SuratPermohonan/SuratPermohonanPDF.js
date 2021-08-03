import React from // , { useEffect, useState }
"react";
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
import logo from "../../logo.png";
import times from "../../fonts/times.ttf";
import bold from "../../fonts/bold.ttf";
import arial from "../../fonts/ArialCE.ttf";
import arialBold from "../../fonts/ArialCEBold.ttf";
import arialBoldItalic from "../../fonts/ArialCEBoldItalic.ttf";
import moment from "moment";
import "moment/locale/id";
// import ttd from 'gambar/ttd1.png'

Font.register({ family: "TimesN", src: times });
Font.register({ family: "TimesB", src: bold });
Font.register({ family: "Arial", src: arial });
Font.register({ family: "ArialB", src: arialBold });
Font.register({ family: "ArialBI", src: arialBoldItalic });

// Create styles
const styles = StyleSheet.create({
  page: {
    // display:"flex",
    paddingTop: "1cm",
    paddingLeft: "3cm",
    paddingRight: "2cm",
    paddingBottom: "1cm",
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
    alignItems: "flex-start",
    position: "absolute",
    top: "1cm",
    left: "1cm",
    //   backgroundColor: '#ffff00',
    //   flexGrow: 10
  },
  kop: {
    marginVertical: "1pt",
    fontFamily: "ArialB",
    alignSelf: "center",
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
    fontFamily: "Arial",
    fontSize: "10pt",
  },
  textB: {
    fontFamily: "ArialB",
    fontSize: "10pt",
  },
  textBI: {
    fontFamily: "ArialBI",
    fontSize: "10pt",
  },
  canvas: {
    height: "10px",
    width: "60vh",
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
  if (props.font === "arial")
    return <Text style={styles.arial}>{props.text}</Text>;
  if (props.font === "arialB")
    return <Text style={styles.arialB}>{props.text}</Text>;
};
// const Nomor = (props) => {
//     // console.log("bold",props);
//     return (<Text>{props.text}</Text>)
// }

const TextPoint = (props) => {
  // console.log(props)
  return (
    <View style={styles.row}>
      <Text style={[styles.text, { width: "100px", lineHeight: "1.5pt" }]}>
        <Bold font={"arial"} text={props.text1} />
      </Text>

      <Text style={[styles.text, { width: "10px" }]}>
        <Bold font={"arial"} text={props.text2} />
      </Text>
      {props.text1 === "Jurusan/Prodi" ? (
        <Text style={[styles.text, { width: "300px" }]}>
          {" "}
          <Bold font={"arial"} text={props.text3} />
        </Text>
      ) : props.text3 === "tanggal" ? (
        <Text style={[styles.text, { width: "300px" }]}>
          {" "}
          {moment(props.data.waktu).format("dddd,DD MMMM YYYY")}
        </Text>
      ) : props.text3 === "waktu" ? (
        <Text style={[styles.text, { width: "300px" }]}>
          {" "}
          {`${moment(props.data.waktu).format("HH:mm")} - ${moment(
            props.data.waktu
          )
            .add(1, "hours")
            .format("HH:mm")} Wita`}
        </Text>
      ) : (
        <Text style={[styles.text, { width: "300px" }]}>
          {" "}
          <Bold font={"arial"} text={props.data[props.text3]} />
        </Text>
      )}
    </View>
  );
};
const dataMahasiswa = [
  {
    text1: "Nama",
    text2: ":",
    text3: "nama",
  },
  {
    text1: "NIM",
    text2: ":",
    text3: "nim",
  },
  {
    text1: "Jurusan/Prodi",
    text2: ":",
    text3: "Teknik Informatika",
  },
  {
    text1: "Judul Skripsi",
    text2: ":",
    text3: "judul",
  },
];
const dataPanitias = {
  judul: [
    {
      text1: "Pembimbing I",
      text2: ":",
      text3: "pembimbing1",
    },
    {
      text1: "Pembimbing II",
      text2: ":",
      text3: "pembimbing2",
    },
  ],
  seminar: [
    {
      text1: "Ketua",
      text2: ":",
      text3: "ketua",
    },
    {
      text1: "Sekretaris",
      text2: ":",
      text3: "sekretaris",
    },
    {
      text1: "Pembimbing I",
      text2: ":",
      text3: "pembimbing1",
    },
    {
      text1: "Pembimbing II",
      text2: ":",
      text3: "pembimbing2",
    },
    {
      text1: "Penguji I",
      text2: ":",
      text3: "penguji1",
    },
    {
      text1: "Penguji II",
      text2: ":",
      text3: "penguji2",
    },
    {
      text1: "Pelaksana",
      text2: ":",
      text3: "pelaksana",
    },
    {
      text1: "Hari dan Tanggal",
      text2: ":",
      text3: "tanggal",
    },
    {
      text1: "Waktu",
      text2: ":",
      text3: "waktu",
    },
    {
      text1: "Tempat Pelaaksanaan",
      text2: ":",
      text3: "tempat",
    },
  ],
  kompren: [
    {
      text1: "Ketua",
      text2: ":",
      text3: "ketua",
    },
    {
      text1: "Sekretaris",
      text2: ":",
      text3: "sekretaris",
    },
    {
      text1: "Penguji I (JARKOM)",
      text2: ":",
      text3: "penguji1",
    },
    {
      text1: "Penguji II (RPL)",
      text2: ":",
      text3: "penguji2",
    },
    {
      text1: "Penguji III (AGAMA)",
      text2: ":",
      text3: "penguji3",
    },
  ],
};
// const datas2 = [
//     {
//         text1: "Menetapkan",
//         text2: ":",
//         point: "",
//         text3: "KEPUTUSAN DEKAN FAKULTAS SAINS DAN TEKNOLOGI TENTANG PEMBIMBING DALAM PENELITIAN DAN PENYUSUNAN SKRIPSI FAKULTAS SAINS DAN TEKNOLOGI UIN ALAUDDIN MAKASSAR"
//     },
//     {
//         text1: "KESATU",
//         text2: "",
//         point: "",
//         text3: "Menetapkan dan menunjuk saudara :"
//     },
//     {
//         text1: "Faisal Akib, S.Kom., M.Kom.",
//         text2: "pembimbing",
//         point: "1. ",
//         text3: "sebagai Pembimbing Pertama,"
//     },
//     {
//         text1: "Mustikasari, S.Kom., M.Kom.",
//         text2: "pembimbing",
//         point: "2. ",
//         text3: "sebagai Pembimbing Kedua,"
//     },
//     {
//         text1: "KEDUA",
//         text2: ":",
//         point: "",
//         text3: "Tugas Pembimbing dalam penelitian dan penyusunan skripsi mahasiswa adalah memeriksa draft skripsi dan naskah skripsi, memberi bimbingan, petunjuk-petunjuk, perbaikan mengenai materi, metode, bahasa dan kemampuan menguasai masalah"
//     },
//     {
//         text1: "KETIGA",
//         text2: ":",
//         point: "",
//         text3: "Segala biaya yang ditimbulkan akibat dikeluarkannya surat keputusan ini dibebankan kepada Anggaran Belanja Fakultas Sains dan Teknologi UIN Alauddin Makassar,"
//     },
//     {
//         text1: "KEEMPAT",
//         text2: ":",
//         point: "",
//         text3: "Surat Keputusan ini mulai berlaku sejak tanggal ditetapkan dan apabila dikedian hari terdapat kekeliruan didalamnya akan diperbaiki sebagaimana mestinya,"
//     },
//     {
//         text1: "KELIMA",
//         text2: ":",
//         point: "",
//         text3: "Surat Keputusan ini disampaikan kepada masing-masing yang bersangkutan untuk diketaui dan dilaksanakan dengan penuh tanggungjawab."
//     },
// ]
// const Lembar2 = props => {
//     // console.log(props)
//     if (props.data.text2 === "pembimbing") {
//         return (
//             <View style={styles.row}>
//                 <View style={styles.text1}>
//                     <Text style={styles.text}></Text>
//                 </View>
//                 <View style={styles.text2}>
//                     <Text style={styles.text}></Text>
//                 </View>
//                 <View style={styles.text3} >
//                     {props.data.point === "1. " ? <Text style={styles.text}><Bold text={props.data.point} /><Bold text={props.dataSurat.pembimbing1} /> {props.data.text3}</Text> : <Text style={styles.text}><Bold text={props.data.point} /><Bold text={props.dataSurat.pembimbing2} /> {props.data.text3}</Text>}

//                 </View>
//             </View>
//         )
//     } else {
//         return (
//             <TextPoint text1={props.data.text1} text2={props.data.text2} point={props.data.point} text3={props.data.text3} />
//         )
//     }
// }
// const IsTtd = (ttd, ke) => {
//     // console.log("ttd",ttd)
//     // console.log("ke",ke)
//     if (ttd) {
//         if (ke === 1) {
//             return process.env.PUBLIC_URL + '/gambar/ttd1.png'
//         } else {
//             return process.env.PUBLIC_URL + '/gambar/ttd1.png'
//         }
//     } else {
//         return null
//     }
// }
// const ttd1 = true;
// const ttd2 = false;
// let jenis = ""

const MyDocument = (props) => {
  // const [dataPanitia, setdataPanitia] = useState([])
  console.log("pdf", props);
  // console.log(dataPanitia.["seminar"]);

  // // moment.locale()
  // console.log(moment(props.data.waktu).format('DD MMMM YYYY'))
  // useEffect(() => {
  //     if ((props.jenis === "hasil") || (props.jenis === "proposal") || (props.jenis === "tutup")) {
  //         jenis = "seminar"
  //         setdataPanitia(dataPanitias.seminar)
  //         console.log(dataPanitias.seminar);
  //         console.log(dataPanitia);
  //     }
  //     else {
  //         jenis = props.jenis
  //         setdataPanitia(dataPanitias.[jenis])
  //         console.log(dataPanitias.[jenis]);
  //     }
  //     return () => {

  //     }
  // }, [props.jenis, dataPanitia]
  // )
  return (
    <Document>
      <Page size={[595.28, 935, 43]} style={styles.page} wrap={true}>
        <View style={styles.image}>
          <Image src={logo}></Image>
        </View>
        <View>
          <Text style={[styles.kop, { fontSize: "18pt" }]}>
            KEMENTERIAN AGAMA REPUBLIK INDONESIA
          </Text>
          <Text style={[styles.kop, { fontSize: "14pt" }]}>
            UNIVERSITAS ISLAM NEGERI ALAUDDIN MAKASSAR
          </Text>
          <Text style={[styles.kop, { fontSize: "14pt" }]}>
            FAKULTAS SAINS & TEKNOLOGI
          </Text>
          <Text style={[styles.kop, { fontSize: "14pt" }]}>
            JURUSAN TEKNIK INFORMATIKA
          </Text>
          <Text style={[styles.kop, { fontSize: "8pt" }]}>
            Kampus I : Jl. Sultan Alauddin Nomor 63 Telp. 864924 (Fax 864923)
          </Text>
          <Text style={[styles.kop, { fontSize: "8pt" }]}>
            Kampus II : Jl. H.M. Yasin Limpo No. 36 Romang Polong Gowa Telp.
            1500363, (0411) 841879, Fax 8221400
          </Text>
          <Text style={[styles.kop, { fontSize: "8pt" }]}>
            Website : fst.uin-alauddin.a.id
          </Text>
        </View>
        <Canvas
          paint={(painter) =>
            painter
              .moveTo(0, 0)
              .lineTo(450, 0)

              .stroke()
          }
          style={styles.canvas}
        ></Canvas>
        <View style={styles.col}>
          <View style={styles.row}>
            <Text style={[styles.text, { width: "40px", lineHeight: "1.5pt" }]}>
              Nomor
            </Text>
            <Text style={[styles.text, { width: "10px" }]}>:</Text>
            <Text style={[styles.text, { width: "230px" }]}>
              <Bold text={props.data.nomor} font={"arial"} />
            </Text>
            <Text style={[styles.text, { width: "200px" }]}>
              Romang Polong,{" "}
              <Bold
                text={`${moment(props.data.createAt).format("DD MMMM YYYY")}`}
                font={"arial"}
              />{" "}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.text, { width: "40px" }]}>Hal</Text>
            <Text style={[styles.text, { width: "10px" }]}>:</Text>
            <Text style={[styles.textB, { width: "200px" }]}>
              {props.jenis === "judul" ? (
                <Bold
                  text={`Permohonan Penerbitan SK Pembimbing Skripsi`}
                  font={"arialB"}
                />
              ) : props.jenis === "proposal" ? (
                <Bold
                  text={`Permohonan Penerbitan SK Seminar Proposal dan Undangan`}
                  font={"arialB"}
                />
              ) : props.jenis === "hasil" ? (
                <Bold
                  text={`Permohonan Penerbitan SK Seminar hasil dan Undangan`}
                  font={"arialB"}
                />
              ) : props.jenis === "tutup" ? (
                <Bold
                  text={`Permohonan Penerbitan SK Seminar Munaqasyah dan Undangan`}
                  font={"arialB"}
                />
              ) : props.jenis === "kompren" ? (
                <Bold
                  text={`Permohonan Penerbitan SK Seminar Komprehensif`}
                  font={"arialB"}
                />
              ) : (
                <Bold
                  text={`Permohonan Penerbitan SK Seminar Proposal dan Undangan`}
                  font={"arialB"}
                />
              )}
            </Text>
          </View>
        </View>
        <View style={[{ marginTop: "16px" }]}>
          <Text style={styles.text}>Kepada Yth,</Text>
          <Text style={styles.text}>Dekan Fakultas Sains dan Teknologi</Text>
          <Text style={styles.text}>Cq. Wakil Dekan Bidang Akademik,</Text>
          <Text style={styles.text}>Di-</Text>
          <Text style={[styles.text, { marginLeft: "50px" }]}>Tempat</Text>
        </View>
        <View style={[{ marginTop: "30px" }]}>
          <Text style={styles.textBI}>
            Assalamualaikum Warahmatullahi Wabarakatuh
          </Text>
        </View>
        <View style={[{ marginTop: "16px" }]}>
          <Text style={[styles.text, { lineHeight: "1.5pt" }]}>
            Dalam rangka penyelesaian Tugas Akhir mahasiswa Fakultas Sains dan
            Teknologi UIN Alauddin Makassar, maka bersama dengan ini kami
            memohon kepada Dekan kiranya menerbitkan Surat Keputusan{" "}
            {props.jenis === "judul" ? (
              <Bold font={"arial"} text={"Pembimbing Skripsi"} />
            ) : props.jenis === "proposal" ? (
              <Bold
                font={"arial"}
                text={"beserta undanga pelaksanaan Seminar Proposal"}
              />
            ) : props.jenis === "hasil" ? (
              <Bold
                font={"arial"}
                text={"beserta undanga pelaksanaan Seminar Hasil"}
              />
            ) : props.jenis === "tutup" ? (
              <Bold
                font={"arial"}
                text={"beserta undanga pelaksanaan Seminar Munaqasyah"}
              />
            ) : props.jenis === "kompren" ? (
              <Bold font={"arial"} text={"pelaksanaa Seminar Komprehensif"} />
            ) : (
              <Bold font={"arial"} text={"Pembimbing Skripsi"} />
            )}{" "}
            Mahasiswa dibawah ini :
          </Text>
        </View>
        <View style={[{ marginTop: "32px" }]}>
          {dataMahasiswa.map((data, index) => (
            <TextPoint
              key={index}
              text1={data.text1}
              text2={data.text2}
              text3={data.text3}
              data={props.data}
            />
          ))}
        </View>
        {props.jenis !== "judul" ? (
          <View style={[{ marginTop: "30px" }]}>
            <Text style={styles.textBI}>
              Adapun Komposisi Dewan Penguji dan Pelaksana Seminar{" "}
              {props.judul === "hasil"
                ? "Hasil"
                : props.judul === "proposal"
                ? "Proposal"
                : props.judul === "tutup"
                ? "Munaqasyah"
                : props.judul === "kompren"
                ? "Komprehensif"
                : "Hasil"}{" "}
              tersebut sebagai berikut :
            </Text>
          </View>
        ) : (
          <View></View>
        )}
        <View style={[{ marginTop: "32px" }]}>
          {props.jenis === "hasil" ||
          props.jenis === "proposal" ||
          props.jenis === "tutup"
            ? dataPanitias.seminar.map((data, index) => (
                <TextPoint
                  key={index}
                  text1={data.text1}
                  text2={data.text2}
                  text3={data.text3}
                  data={props.data}
                />
              ))
            : props.jenis === "judul"
            ? dataPanitias.judul.map((data, index) => (
                <TextPoint
                  key={index}
                  text1={data.text1}
                  text2={data.text2}
                  text3={data.text3}
                  data={props.data}
                />
              ))
            : props.jenis === "kompren"
            ? dataPanitias.kompren.map((data, index) => (
                <TextPoint
                  key={index}
                  text1={data.text1}
                  text2={data.text2}
                  text3={data.text3}
                  data={props.data}
                />
              ))
            : dataPanitias.judul.map((data, index) => (
                <TextPoint
                  key={index}
                  text1={data.text1}
                  text2={data.text2}
                  text3={data.text3}
                  data={props.data}
                />
              ))}
        </View>
        <View style={[{ marginTop: "32px" }]}>
          <Text style={styles.text}>
            Demikian, atas perhatian dan dukungan Bapak, kami ucapkan terima
            kasih
          </Text>
        </View>
        <View style={[{ marginLeft: "250px", marginTop: "32px" }]}>
          <Text style={[styles.textBI, { lineHeight: "2pt" }]}>Wassalam</Text>
          <Text style={[styles.textB, { lineHeight: "1.5pt" }]}>
            Ketua/Sekretaris
          </Text>
          <Text style={styles.textB}>Jurusan Teknik Informatika</Text>
          <Text style={[styles.textB, { marginTop: "32px" }]}>
            Faisal, S.T., M.T.
          </Text>
          <Text style={styles.textB}>NIP. 19720721 201101 1 001</Text>
        </View>
        {/* <View style={styles.col} wrap={false}> 
                <View style={styles.section}>
                <Text style={styles.kop}>KEPUTUSAN DEKAN FAKULTAS SAINS DAN TEKNOLOGI</Text>
                <Text style={styles.kop}>UIN ALAUDDIN MAKASSAR</Text>
                <Text style={styles.kop}>NOMOR : <Nomor text={`${props.data.nomor} Tahun ${moment(props.data.waktu).format('YYYY')}`}/></Text>
                <Text style={[styles.kop,{marginVertical:"5pt"}]}>TENTANG</Text>
                <Text style={styles.kop}><Nomor text={props.data.tentang === "Pembimbing"?"PEMBIMBING DALAM PENELITIAN DAN PENYUSUNAN SKRIPSI MAHASISWA":"DEWAN PENGUJIAN PELAKSANA UJIAN PROPOSAL PENELITIAN"}/></Text>
                <Text style={styles.kop}><Nomor text={props.data.tentang === "Pembimbing"?"JURUSAN TEKNIK INFORMATIKA":`ATAS NAMA ${props.data.nama} JURUSAN ${props.data.jurusan}`}/></Text>
                <Text style={styles.kop}>FAKULTAS SAINS DAN TEKNOLOGI UIN ALAUDDIN MAKASSAR</Text>
                <Text style={[styles.kop,{marginVertical:"5pt"}]}>DENGAN RAHMAT TUHAN YANG MAHA ESA</Text>
                <Text style={[styles.kop,{marginBottom:"5pt"}]}>DEKAN FAKULTAS SAINSDAN TEKNOLOGI UIN ALAUDDIN MAKASSAR</Text>
            
            </View> */}
        {/* <View style={styles.row}>
                <View style={styles.text1}>
                    <Text style={styles.text}>Mambaca</Text>
                </View>
                <View style={styles.text2}>
                    <Text style={styles.text}>:</Text>
                </View>
                <View style={styles.text3} >
                    {console.log(props)}
                    <Text style={styles.text}>Surat Permohonan Ketua Jurusan <Bold text={`${props.data.jurusan}`}/> Fakultas Sains dan Teknologi UIN Alauddin Makassar, Nama <Text style={{fontFamily: "TimesB"}} render={()=>(`${props.data.nama}`)}/> NIM <Bold text={`${props.data.nim}`}/> tertanggal <Bold text={`${moment(props.data.waktu).format('DD MMMM YYYY')}`}/> Untuk mendapatkan Pembimbingan Skripsi dengan Judul : "<Bold text={`${props.dataSurat.judul}`}/>"</Text>

                </View>           
            </View>
            {datas.map((data,index) => (
                <TextPoint key={index} text1={data.text1} text2={data.text2} point={data.point} text3={data.text3}/>
            ))}
            <View>
            <Canvas paint={painter => 
                painter.moveTo(0,0)
                .lineTo(200,0)
                .lineTo(200,50)
                .lineTo(0,50)
                .lineTo(0,0)
                .moveTo(0,20)
                .lineTo(200,20)
                .moveTo(80,0)
                .lineTo(80,50)
                .fillColor("#000000")
                .fontSize(11)
                .text("Pemrakarsa",2,1)
                .text("Kasubag. Akademik",82,1)
                .fontSize(10)
                .text("Paraf : ",2,21)
                .text("Paraf : ",82,21)
                // .image(`${process.env.PUBLIC_URL}/gambar/ttd1.png`,40,21,{fit:[100,100]})
                // .image({logo},40,21,{fit:[100,100]})
                .stroke()
                } style={styles.canvas}>
                    
                </Canvas>
                
                <Image style={{position:'absolute', width:"30px",marginLeft:"30px",marginTop:"20px"}} src={IsTtd(props.data.ktu_acc,1)}></Image>
                <Image style={{position:'absolute', width:"30px",marginLeft:"120px",marginTop:"20px"}} src={IsTtd(props.data.ksb_acc,2)}></Image>
                </View>
        </View>
    
        <View style={{marginTop:"50px"}}>
            <Text style={styles.kop}>Memutuskan</Text>
            {datas2.map((data,index) => (
                <Lembar2 key={index} data={data} dataSurat={props.dataSurat}/>
            ))}
        </View>
        <View style={styles.ttd}>
            <Bold text="Ditetapkan di Gowa"/>
            <Bold text={`Pada Tanggal ${moment(props.data.waktu).format('DD MMMM YYYY')}`}/>
            <Text style={{marginTop:"8px"}}/>
            <Bold text="DEKAN FAKULTAS SAINS DAN TEKNOLOGI"/>
            <Text>Kuasa No.: B339/Un.06/FST/Kp.07.6/02/2020</Text>
            <Text>Tanggal 14 Februari 2020</Text>
            <Text>Wakil Dekan Bidang Akademik</Text>
            <Text style={{marginTop:"45px"}}/>
            <Bold text="SJAMSIAH"/>
            <Image style={{position:'absolute', width:"30px",bottom:"0px",right:"30px"}} src={IsTtd(props.data.wd_acc,1)}></Image>
            <Image style={{position:'absolute', width:"60px",bottom:"-20px",left:"0px"}} src={IsTtd(props.data.dk_acc,1)}></Image>

        </View>*/}
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
