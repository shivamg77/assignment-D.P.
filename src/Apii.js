import axios from 'axios'


export const getUersList = () => {
    return axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then((res)=>{
                return res
            })
            .catch((err)=>{
                console.log(err)
            })
}

export const getUersPost = (id) => {
    return axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            .then((res)=>{
                return res
            })
            .catch((err)=>{
                console.log(err)
            })
}