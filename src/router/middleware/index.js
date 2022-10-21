import axios from 'axios';

export default async function Auth (to, from ,next){
    if(to.path==='/' && to.query.code!==undefined){
        if(!localStorage.token){
            let response
            try {
                response = await axios.post('http://localhost:4000'+'/token',{code: to.query.code});   
            } catch (error) {
                response = null;
            }
            if(response!==null){
                localStorage.setItem("token", response.data.access_token)
                next({name: 'home'})
            } else {
                location.href =  `${process.env.VUE_APP_AUTH_URL}/authorize?response_type=code&client_id=${process.env.VUE_APP_CLIENT_ID}&scope=profile`
            }

        } else {
            next();
        }
    } else {
        if(!localStorage.token){
            location.href =  `${process.env.VUE_APP_AUTH_URL}/authorize?response_type=code&client_id=${process.env.VUE_APP_CLIENT_ID}&scope=profile`
        } else {
            next();
        }
    }
  }