import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-e7975-default-rtdb.europe-west1.firebasedatabase.app/'
})