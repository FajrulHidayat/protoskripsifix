import React, { useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font, Canvas } from '@react-pdf/renderer';
import logo from '../logo.png';
import times from '../fonts/times.ttf'
import bold from '../fonts/bold.ttf'
import moment from 'moment'
import 'moment/locale/id'
// import ttd from 'gambar/ttd1.png'

Font.register({ family: 'TimesN', src: times });
Font.register({ family: 'TimesB', src: bold });

// Create styles
const styles = StyleSheet.create({
    page: {
        // display:"flex",
        paddingTop: "2cm",
        paddingLeft: "3cm",
        paddingRight: "2cm",
        paddingBottom: "2cm",
        backgroundColor: '#ffffff'
    },
    row: { flexDirection: 'row', },
    col: { flexDirection: 'column', },
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
        alignItems: 'center',
        //   backgroundColor: '#ffff00',
        //   flexGrow: 10


    },
    kop: {
        marginVertical: "1pt",
        fontSize: 12,
        //   fontStyle:"oblique",
        alignSelf: 'center',
        textTransform: 'uppercase',
        //   fontWeight: 'bold'
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
        textAlign: 'left',
        fontFamily: 'TimesB',
        //   backgroundColor: '#ff0000',
        fontSize: 12,
        //   fontWeight: 'bold'
    },
    text3a: {
        width: "390px",
        textAlign: 'left',
        textTransform: 'uppercase',
        fontSize: 12,
    },
    text: {
        // margin: 12,
        fontSize: 12,
        textAlign: 'justify',
        fontFamily: "TimesN"
    },
    canvas: {
        height: "50px",
        width: "200px",
        marginTop: "10px"
        //   backgroundColor:"#ff00ff"  
    },
    ttd: {
        width: "60%",
        // height:"300px",
        marginLeft: "50%",
        marginTop: "16px",
        fontSize: 11,
        // backgroundColor:"#343434"

    }
});
const Bold = (props) => {
    // console.log("bold",props);
    return (<Text style={{ fontFamily: "TimesB", fontWeight: 400 }}>{props.text}</Text>)
}
const Nomor = (props) => {
    // console.log("bold",props);
    return (<Text>{props.text}</Text>)
}

const TextPoint = props => (
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
        {props.text1 === "Menetapkan" ?
            <View style={styles.text3a} >
                <Text style={styles.text}>{props.text3}</Text>
            </View> :
            <View style={styles.text3} >
                <Text style={styles.text}>{props.text3}</Text>
            </View>}
    </View>
)

const Lembar2 = props => {
    // console.log("lembar 2 : ",props)
    if (props.datas.text1 === "pelaksana") {
        let pelaksana = ""
        switch (props.datas.point) {
            case "Ketua":
                pelaksana = props.dataSurat.ketua
                break;
            case "Sekretaris":
                pelaksana = props.dataSurat.sekretaris
                break;
            case "Penguji 1":
                pelaksana = props.dataSurat.penguji1
                break;
            case "Penguji 2":
                pelaksana = props.dataSurat.penguji2
                break;
            case "Penguji 3":
                pelaksana = props.dataSurat.penguji3
                break;
            case "Pelaksana":
                pelaksana = props.dataSurat.pelaksana
                break;

            default:
                break;
        }
        return (
            <View style={styles.row}>
                <View style={styles.text1}>
                    <Text style={styles.text}></Text>
                </View>
                <View style={styles.text2}>
                    <Text style={styles.text}></Text>
                </View>
                <View style={{ width: "100px" }} >
                    <Text style={styles.text}>{props.datas.point}</Text>
                </View>
                <View style={styles.text3} >
                    <Text style={styles.text}>: {pelaksana}</Text>
                </View>
            </View>
        )
    } else {
        return (
            <TextPoint text1={props.datas.text1} text2={props.datas.text2} point={props.datas.point} text3={props.datas.text3} />
        )
    }
}
const IsTtd = (ttd, ke) => {
    // console.log("ttd",ttd)
    // console.log("ke",ke)
    if (ttd) {
        if (ke === 1) {
            return process.env.PUBLIC_URL + '/gambar/ttd1.png'
        } else {
            return process.env.PUBLIC_URL + '/gambar/ttd1.png'
        }
    } else {
        return null
    }
}
const ttd1 = true;
const ttd2 = false;

const MyDocument = (props) => {
    { console.log("pdf", props); }
    // moment.locale()
    // console.log(moment(props.data.waktu).format('DD MMMM YYYY'))
    useEffect(() => {

        // console.log("data:",datas2);
        return () => {

        }
    })




    //perbedaan sk seminar
    let kopUjian = "DEWAN PENGUJI DAN PELAKSANA UJIAN KOMPREHENSIF"
    let jenisUjian = "Komprehensif"
    let pengujiUjian = "Penguji"

    // switch (props.data.tentang) {
    //     case "Proposal":
    //         kopUjian = "DEWAN PENGUJI DAN PELAKSANA UJIAN PROPOSAL PENELITIAN "
    //         jenisUjian = "Proposal Penelitian"
    //         break;
    //     case "Hasil":
    //         kopUjian = "DEWAN PENGUJI DAN PELAKSANA UJIAN KOMPREHENSIF"
    //         jenisUjian = "Seminar Hasil"
    //         break;
    //     case "Munaqasyah":
    //         kopUjian = "DEWAN MUNAQISY DAN PELAKSANA UJIAN MUNAQASYAH"
    //         jenisUjian = "Munaqasyah"
    //         pengujiUjian = "Munaqisy"
    //         break;

    //     default:
    //         break;
    // }
    const datas = [
        {
            text1: "Menimbang",
            text2: ":",
            point: "a. ",
            text3: `Bahawa Berdasarkan Surat Permohonan Ketua Jurusan ${props.data.jurusan} Fakultas Sains dan Teknologi Universitas Islam Negeri Alauddin Makassar Tanggal ${moment(props.data.waktu).format('DD MMMM YYYY')} tentang penerbitan Surat Keputusan Dekan untuk Pelaksanaan Ujian ${jenisUjian} atas nama ${props.data.nama}, NIM. ${props.data.nim}, dengan Judul Skripsi ${props.dataSurat.judul}.`
        },
        {
            text1: "",
            text2: "",
            point: "b. ",
            text3: `Bahwa Mahasiswa tersebut diatas telah memenuhi persyaratan Ujian ${jenisUjian} Skripsi.`
        },
        {
            text1: "",
            text2: "",
            point: "c. ",
            text3: `Bahwa untuk kelancaran pelaksanaan Ujian ${jenisUjian} maka dipandang perlu menetapkan Dewan Penguji, Pelaksana dan jadwal Pelaksana Ujian ${jenisUjian} dengan Surat Keputusan Dekan.`
        },
        {
            text1: "Mengingat",
            text2: ":",
            point: "1. ",
            text3: "Undang-undang Nomor 20 Tahun 2003 Tentang Sistem Pendidikan Nasional."
        },
        {
            text1: "",
            text2: "",
            point: "2. ",
            text3: "Undang-undang Nomor 17 Tahun 2003 Tentang Keuangan Negara."
        },
        {
            text1: "",
            text2: "",
            point: "3. ",
            text3: "Undang-undang Nomor 12 Tahun 2003 Tentang Pendidikan Tinggi."
        },
        {
            text1: "",
            text2: "",
            point: "4. ",
            text3: "Peraturan Menteri Agama RI Nomor 1 Tahun 2012 Tentang Perubahan Ketiga Atas Peraturan Menteri Agama Nomor 2 Tahun 2006 Tentang Mekanisme Pelaksanaan Pembayaran Atas Beban Anggaran Pendapatan dan Belanja Negara di Lingkungan Kementerian Agama;"
        },
        {
            text1: "",
            text2: "",
            point: "5. ",
            text3: "Peraturan Menteri Agama RI Nomor 25 Tahun 2013 Tentang Organisasi dan Tata Kerja UIN Alauddin Makassar;"
        },
        {
            text1: "",
            text2: "",
            point: "6. ",
            text3: "Peraturan Menteri Agama RI Nomor 20 Tahun 2014 jo Peraturan Menteri Agama Nomor 8 Tahun 2016 Tentang Statuta UIN Alauddin Makassar;"
        },
        {
            text1: "",
            text2: "",
            point: "7. ",
            text3: "Keputusan Menteri Agama Nomor 289 Tahun 1993 jo Nomor 202 B Tahun 1998 Tentang pemberian Kuasa dan Pendelegasian Wewenang Menandatangani Surat Keputusan;"
        },
        {
            text1: "",
            text2: "",
            point: "8. ",
            text3: "Keputusan Menteri Keuangan nomor: 330/KMK/05/ Tahun 2008 Tentang Penelitian UIN Alauddin Makassasr pada Depag Sebagai Institusi Pemerintah yang Menerapkan Penglolaan Badan Layanan Umum (BLU);"
        },
        {
            text1: "",
            text2: "",
            point: "9. ",
            text3: "Keputusan Rektor UIN Alauddin Makassar No. 200 tahun 2016 Tentang Pedoman Edukasi UIN Alauddin Makassar;"
        },
    ]
    const datas2 = [
        {
            text1: "Menetapkan",
            text2: ":",
            point: "",
            text3: `KEPUTUSAN DEKAN FAKULTAS SAINS DAN TEKNOLOGI TENTANG DEWAN ${pengujiUjian} DAN PELAKSANA UJIAN ${jenisUjian} SKRIPSI ATAS NAMA ${props.data.nama} JURUSAN ${props.data.jurusan} FAKULTAS SAINS DAN TEKNOLOGI.`
        },
        {
            text1: "KESATU",
            text2: "",
            point: "",
            text3: `Menetapkan Dewan Penguji, Pelaksana dan Jadwal Ujian ${jenisUjian} Fakultas Sains dan Teknologi UIN Alauddin Makassar dengan komposisi :`
        },
        {
            text1: "pelaksana",
            text2: ":",
            point: "Ketua",
            text3: ""
        },
        {
            text1: "pelaksana",
            text2: ":",
            point: "Sekretaris",
            text3: ""
        },
        {
            text1: "pelaksana",
            text2: ":",
            point: "Penguji 1",
            text3: ""
        },
        {
            text1: "pelaksana",
            text2: ":",
            point: "Penguji 2",
            text3: ""
        },
        {
            text1: "pelaksana",
            text2: ":",
            point: "Penguji 3",
            text3: ""
        },
        {
            text1: "pelaksana",
            text2: ":",
            point: "Pelaksana",
            text3: ""
        },
        {
            text1: "KEDUA",
            text2: ":",
            point: "",
            text3: `Tugas Penguji dan Pelaksana ujian ${jenisUjian} :`
        },
        {
            text1: "",
            text2: "",
            point: "a. ",
            text3: `Ketua adalah memimpin dan membuka sidang ujian ${jenisUjian}.`
        },
        {
            text1: "",
            text2: "",
            point: "b. ",
            text3: "Sekretaris adalah mencatat dan menghimpun hasil ujian."
        },
        {
            text1: "",
            text2: "",
            point: "c. ",
            text3: `Penguji adalah menguji Mahasiswa dalam Pelaksanaan ujian ${jenisUjian}.`
        },
        {
            text1: "",
            text2: "",
            point: "d. ",
            text3: `Pelaksana adalah mempersiapkan segala sesuatu yang berkaitan dengan pelaksanaan ujian ${jenisUjian}.`
        },
        {
            text1: "KETIGA",
            text2: ":",
            point: "",
            text3: "Biaya pelaksanaan ujian dibebankan kepada anggaran Fakultas Sains dan Teknologi UIN Alauddin Makassar"
        },
        {
            text1: "KEEMPAT",
            text2: ":",
            point: "",
            text3: "Keputusan ini mulai berlaku pada tanggal ditetapkan dengan ketentuan apabila dikemudian hari ternyata terdapat kekeliruan dalam keputusan ini akan diubah dan diperbaiki sebagimana mestinya."
        },

    ]
    return (
        <Document>
            <Page size="A4" style={styles.page} wrap={true}>
                <View style={styles.image}>
                    <Image src={logo}></Image>
                </View>
                <View style={styles.col} wrap={false}>
                    <View style={styles.section}>
                        <Text style={styles.kop}>KEPUTUSAN DEKAN FAKULTAS SAINS DAN TEKNOLOGI</Text>
                        <Text style={styles.kop}>UIN ALAUDDIN MAKASSAR</Text>
                        <Text style={styles.kop}>NOMOR : <Nomor text={`${props.data.nomor} Tahun ${moment(props.data.waktu).format('YYYY')}`} /></Text>
                        <Text style={[styles.kop, { marginVertical: "5pt" }]}>TENTANG</Text>
                        <Text style={styles.kop}><Nomor text={`${kopUjian}`} /></Text>
                        <Text style={styles.kop}><Nomor text={`ATAS NAMA ${props.data.nama} JURUSAN ${props.data.jurusan}`} /></Text>
                        <Text style={styles.kop}>FAKULTAS SAINS DAN TEKNOLOGI UIN ALAUDDIN MAKASSAR</Text>
                        <Text style={[styles.kop, { marginVertical: "5pt" }]}>DENGAN RAHMAT TUHAN YANG MAHA ESA</Text>
                        <Text style={[styles.kop, { marginBottom: "5pt" }]}>DEKAN FAKULTAS SAINSDAN TEKNOLOGI UIN ALAUDDIN MAKASSAR</Text>

                    </View>
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
            </View> */}
                    {/* {console.log(datas)} */}
                    {datas.map((data, index) => (
                        <TextPoint key={index} text1={data.text1} text2={data.text2} point={data.point} text3={data.text3} />
                    ))}
                    <View>
                        <Canvas paint={painter =>
                            painter.moveTo(0, 0)
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
                        } style={styles.canvas}>

                        </Canvas>

                        <Image style={{ position: 'absolute', width: "30px", marginLeft: "30px", marginTop: "20px" }} src={IsTtd(props.data.ktu_acc, 1)}></Image>
                        <Image style={{ position: 'absolute', width: "30px", marginLeft: "120px", marginTop: "20px" }} src={IsTtd(props.data.ksb_acc, 2)}></Image>
                    </View>
                </View>

                <View style={{ marginTop: "50px" }}>
                    <Text style={styles.kop}>Memutuskan</Text>
                    {datas2.map((data, index) => (
                        <Lembar2 key={index} datas={data} data={props.data} dataSurat={props.dataSurat} />
                    ))}
                </View>
                <View>
                    <Text style={styles.text}>Surat Keputusan ini dibuat dan disampaikan kepada yang bersangkutan untuk diketahui dan dilaksanakan dengan penuh tanggungjawab.</Text>
                </View>
                <View style={styles.ttd}>
                    <Bold text="Ditetapkan di Gowa" />
                    <Bold text={`Pada Tanggal ${moment(props.data.waktu).format('DD MMMM YYYY')}`} />
                    <Text style={{ marginTop: "8px" }} />
                    <Bold text="DEKAN FAKULTAS SAINS DAN TEKNOLOGI" />
                    <Text style={{ marginTop: "45px" }} />
                    <Bold text="SJAMSIAH" />
                    <Image style={{ position: 'absolute', width: "30px", bottom: "0px", right: "30px" }} src={IsTtd(props.data.wd_acc, 1)}></Image>
                    <Image style={{ position: 'absolute', width: "60px", bottom: "-20px", left: "0px" }} src={IsTtd(props.data.dk_acc, 1)}></Image>

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
        </Document>)
};

export default MyDocument