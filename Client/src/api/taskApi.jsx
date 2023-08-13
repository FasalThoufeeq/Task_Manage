import axios from 'axios'

const MyAxios= axios.create({
    baseURL:'https://taskmanagement-7fhl.onrender.com/api/'
})
export default MyAxios