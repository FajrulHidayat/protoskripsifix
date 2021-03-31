import React from 'react'
import Tabel from './Table'

class Propsal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            kolom:[],
            route:""
        }
        this.koloms=[
            [
                {
                    title:"NIM",
                    data:"nim"
                },
                {
                    title:"Nama",
                    data:"nama"
                },
                {
                    title:"Judul",
                    data:"judul"
                },
                {
                    title:"Pembimbing 1",
                    data:"pembimbing1"
                },
                {
                    title:"Pembimbing 2",
                    data:"pembimbing2"
                },
                {
                    title:"Penguji 1",
                    data:"penguji1"
                },
                {
                    title:"Penguji 2",
                    data:"penguji2"
                },
                {
                    title:"Waktu",
                    data:"waktu"
                },
                {
                    title:"Tempat",
                    data:"tempat"
                },
                {
                    title:"Pelaksana",
                    data:"pelaksana"
                },
            ],
            [
                {
                    title:"NIM",
                    data:"nim"
                },
                {
                    title:"Nama",
                    data:"nama"
                },
                {
                    title:"Judul",
                    data:"judul"
                },
                {
                    title:"Pembimbing 1",
                    data:"pembimbing1"
                },
                {
                    title:"Pembimbing 2",
                    data:"pembimbing2"
                },
                {
                    title:"Penguji 1",
                    data:"penguji1"
                },
                {
                    title:"Penguji 2",
                    data:"penguji2"
                },
                {
                    title:"Waktu",
                    data:"waktu"
                },
                {
                    title:"Tempat",
                    data:"tempat"
                },
                {
                    title:"Pelaksana",
                    data:"pelaksana"
                },
                
            ],
            [
                {
                    title:"NIM",
                    data:"nim"
                },
                {
                    title:"Nama",
                    data:"nama"
                },
                {
                    title:"Judul",
                    data:"judul"
                },
                {
                    title:"Penguji 1",
                    data:"penguji1"
                },
                {
                    title:"Penguji 2",
                    data:"penguji2"
                },
                {
                    title:"Penguji 3",
                    data:"penguji3"
                },
                
            ]
        ]

    }
    
    // async componentDidMount(){
    //     console.log("props",this.koloms[0]);
    //     // this.setState({ history: this.props.history })
    //     // console.log(this.props.history.location.pathname);
    //     switch (this.props.history.location.pathname) {
    //         case "/admin/proposal":
    //             await this.setState({kolom:this.koloms[0],refresh:true})
    //              console.log("kolom = ",this.state.kolom);
    //         break;
    //         case "/admin/hasil":
    //             await this.setState({kolom:this.koloms[1],refresh:true})
    //             console.log("kolom = ",this.state.kolom);
    //             // console.log("kolom = ",this.kolom);
    //         break;

    //         default:
    //             await this.setState({kolom:this.koloms[1],refresh:true})
    //         break;
    //     }
    // }

    componentDidMount = () => {
       
        this.setState({ history: this.props.history })
        // console.log(this.props.history.location.pathname);
        // switch (this.props.history.location.pathname) {
        //     case "/admin/proposal":
        //          this.setState({kolom:this.koloms[0],refresh:true})
        //          console.log("kolom = ",this.state.kolom);
        //     break;
        //     case "/admin/hasil":
        //          this.setState({kolom:this.koloms[1],refresh:true})
        //         console.log("kolom = ",this.state.kolom);
        //         // console.log("kolom = ",this.kolom);
        //     break;
        //     case "/admin/kompren":
        //          this.setState({kolom:this.koloms[2],refresh:true})
        //         console.log("kolom = ",this.state.kolom);
        //         // console.log("kolom = ",this.kolom);
        //     break;

        //     default:
        //          this.setState({kolom:this.koloms[1],refresh:true})
        //     break;
        // }
    }

    render(){
        const kolom = this.props.history.location.pathname === '/admin/hasil' ? this.koloms[1] :  this.props.history.location.pathname === '/admin/kompren' ? this.koloms[2] :  this.koloms[0]
        const route = this.props.history.location.pathname === '/admin/hasil' ? 'Formhasil' : this.props.history.location.pathname === '/admin/tutup' ? 'Formtutup' : this.props.history.location.pathname === '/admin/kompren' ? 'Formkompren' : 'Formproposal'
        
        // console.log("asdasd",this.state.endPoint);
        return(
            <>
           <Tabel kolom={kolom} route={route} history={this.props.history} />
            
            </>
        )
    }
}
export default Propsal