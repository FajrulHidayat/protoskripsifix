import axios from 'axios'
const Verify = () =>{
    const token=localStorage.getItem("token")
    if (token){
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
                console.log(res.data);
              if (res.data.diagnostic.status=== 200) {
                console.log(res.data.diagnostic.status);
                  return res.data.result
              }
            })
            .catch(function(error) {
            console.log(error);
            });
    }else{
      return false
    }
    
}
export default Verify