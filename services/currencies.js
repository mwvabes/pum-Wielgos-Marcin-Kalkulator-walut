import axios from 'axios'
const baseUrl = 'https://api.exchangeratesapi.io/latest'
//const baseUrl = 'http://api.nbp.pl/api/exchangerates/tables/A/?format=json'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getByCurrencyValue = (value) => {
  const request = axios.get(`${baseUrl}?symbols=${value}`).catch(error => console.log(error))
  return request.then(response => response.data)
}

export default { getAll, getByCurrencyValue }