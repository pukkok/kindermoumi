import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_RESTAPI_URL

async function axiosKinderData (sidoCode, sggCode, setFunc) {
    const { data } = await axios.post(`/api/kinder`, { sidoCode, sggCode })
    return setFunc(data)
}

// 전체 데이터 불러오기
async function axiosKinderAllData (allData, setFunc) {
    const success = await Promise.all(
        allData.map( item => {
            const {sidoCode, code} = item
            return axios.post('/api/kinder', {
                sidoCode, sggCode : code
            })
        })
    )
    const flat = await success.reduce((acc, r)=>acc.concat(r.data), [])
    return setFunc(flat)

}



export {axiosKinderData, axiosKinderAllData}