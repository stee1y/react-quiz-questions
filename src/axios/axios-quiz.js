import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-b0ec2-default-rtdb.europe-west1.firebasedatabase.app/'
})