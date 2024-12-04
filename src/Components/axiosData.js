import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_RESTAPI_URL

async function axiosKinderData (sidoCode, sggCode, setFunc) {
    const { data } = await axios.get(`/api/kinder`, { sidoCode, sggCode })
    return setFunc(data)
}

// 전체 데이터 불러오기
async function axiosKinderAllData(allData, setFunc) {
    const chunkSize = 40 // 각 청크의 크기 설정
    const chunks = []

    for (let i = 0; i < allData.length; i += chunkSize) {
        chunks.push(allData.slice(i, i + chunkSize));
    }

    const success = []

    for (const chunk of chunks) {
        const results = await Promise.all(
            chunk.map(item => {
                const { sidoCode, code } = item
                return axios.get(`/api/kinder?sidoCode=${sidoCode}&sggCode=${code}`)
            })
        );

        success.push(...results)
    }

    const flat = success.reduce((acc, r) => acc.concat(r.data), []);
    return setFunc(flat)
}



export {axiosKinderData, axiosKinderAllData}