const updateDatas = [
    {title: '유치원 알리미 openAPI 연동', date:'2024-05-16', auth:'pukkok', file: ''},
    {title: '검색 페이지 구현 1차', date:'2024-05-17', auth:'pukkok', file: ''},
    {title: '검색 페이지 구현 2차', date:'2024-05-20', auth:'pukkok', file: ''},
    {title: '알레르기 표 및 달력 제작', date:'2024-05-23', auth:'pukkok', file: ''},
    {title: '로그인 기능 구현', date:'2024-05-27', auth:'pukkok', file: ''},
    {title: '교사 회원가입 스키마 제작 및 유효성 검사', date:'2024-05-30', auth:'pukkok', file: ''},
    {title: 'multer를 이용한 이미지 업로드', date:'2024-06-05', auth:'pukkok', file: ''},
    {title: '카카오맵 연동', date:'2024-05-30', auth:'pukkok', file: ''},
    {title: '관리자 페이지 제작시 데이터 저장', date:'2024-05-31', auth:'pukkok', file: ''},
    {title: 'vercel 서버 배포', date:'2024-06-15', auth:'pukkok', file: ''},
    {title: 'vercel 서버 배포시 문제 해결', date:'2024-06-30', auth:'pukkok', file: ''},
    {title: '업데이트 예정', date:'2024-04-29', auth:'pukkok', file: ''},
    {title: '업데이트 예정', date:'2024-04-29', auth:'pukkok', file: ''},
    {title: '업데이트 예정', date:'2024-04-29', auth:'pukkok', file: ''},
    {title: '업데이트 예정', date:'2024-04-29', auth:'pukkok', file: ''},
    
    {title: '업데이트 예정', date:'2024-04-29', auth:'pukkok', file: ''},
    {title: '업데이트 예정', date:'2024-04-29', auth:'pukkok', file: ''},
    {title: '업데이트 예정', date:'2024-04-29', auth:'pukkok', file: ''},
    {title: '업데이트 예정', date:'2024-04-29', auth:'pukkok', file: ''},
    {title: '업데이트 예정', date:'2024-04-29', auth:'pukkok', file: ''},


]

const updateContents = [
// 1번
`안녕하세요 신입개발자 푹곡입니다. 

시작부터 문제가 있었는데요.
유치원 알리미 api를 불러오기 위해 서버를 통해 연결 중
http에서 https에 요청을 하니 cors오류가 발생했습니다.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0을 이용하여 인증서 유효성 검증을 넘겨 해결했습니다! 

데이터는 시군구, 시도 데이터를 저장하여 불러올 때 마다 사용할수 있게 전체 데이터를 정리했습니다.
(ssgData, sidoData)

이제 데이터를 불러왔으니 데이터를 유치원조회 페이지 제작을 시작하겠습니다.
먼저 왼쪽의 체크박스를 만들었습니다. 불러온 데이터 수를 비교해보니 api연동된 데이터의 수가 실제 데이터의 수 보다 훨씬 적었습니다.
필터를 최소화 하여 같은 기능을 구현할 수 있도록 제작했습니다.
`,
//2번
`안녕하세요 신입개발자 푹곡입니다.
오늘의 업데이트 내용은 검색 페이지를 구현입니다.
1차적으로 기초 프레임을 구성하고, 필터 옆에 데이터를 불러올수 있도록 구성하였습니다.

필터를 만들던 중 필터가 클릭 될 때마다 state가 변해서 불러오는 데이터가 계속해서 바뀌었었는데,
useRef를 사용하여 일단 클릭한 데이터들의 정보를 가지고 있다가, 아래 검색 버튼을 클릭한 경우에 변할 수 있도록 클릭 후 state에 넣도록 구현하였습니다.
`,
// 3번
`안녕하세요 신입개발자 푹곡입니다.
검색페이지 구현 2차 업데이트 내용입니다.

검색을 구현하는 중 문제가 발생했습니다.
첫번째는 전체데이터에서 검색을 해야하는 경우가 있었고, 두번째는 필터링된 데이터 중에서 검색을 해야 하는 경우가 있었습니다.
이번 문제를 해결하기 위해
1. 전체데이터, 2. 지역 검색시 데이터로 구분하여 state를 나눴고,
전체데이터는 불러오는 시간이 길어서 처음에 한번만 불러오도록 구현했습니다.
시/도, 시/군/구를 통해 검색할 경우에는 유치원알리미 api의 query를 전달하는 방식으로 사용하려 했으나,
전체 데이터를 한번에 불러오는 api 방식이 없어서(지역마다 각각 불러와야 하는 방식을 사용하는 경우 계속해서 비동기 처리를 해야하기 때문에)
불러온 전체데이터에서 필터링 하는 방법으로 따로 구현하였습니다.
`,
// 4번
`안녕하세요 신입개발자 푹곡입니다.
오늘의 업데이트 내용은 알레르기표와 달력 커스터마이징 입니다.

원래는 fullCallendar라는 라이브러리를 이용하려 했으나,
사이드 바 생성 기능과, 하단에 추가 옵션 기능 등 원하는 기능이 없어 따로 제작하기로 하였습니다.
달력은 그리드 템플릿으로 제작하였고, 오늘 날을 기준으로 2중 배열을 만들어 달력을 제작했습니다.

알레르기 표는 드래그시 순서를 변경할수 있도록 제작하였고, 알래르기 종류 기본 20개를 디폴트로 두고,
새로 추가할수 있도록 제작하였습니다.

알레르기 표 제작시 문제점으로는 드래그하여 이동시 고스트이미지가 생겼었는데,
dragStart 부분에 새로운 이미지를 생성하여 드래그시 고스트 이미지가 생기지 않도록 하여 해결했습니다.
예시 코드)
const img = new Image()
img.src= ''
e.dataTransfer.setDragImage(img, 0, 0)
`,
//5번
`
안녕하세요 신입개발자 푹곡입니다.
오늘의 업데이트 내용은 로그인 기능 구현입니다.
서버는 express.js를 사용하여 제작하였습니다.

현재 홈페이지의 제작은 실제 교사들의 로그인 시 교육부, 국민건강보험과 연계하여 회원가입을 구현하고 싶었습니다.

원래의 구현 계획은
EPKI와 같은 교사 인증서 절차 과정을 통하여 
유치원 정보와 소속, 이름, 직급 등을 가져와서 회원가입을 바로 진행할 수 있도록 하고 싶었습니다.
그러나 개인정보를 끌어와 사용할 수는 없기 때문에 더미데이터로 인증서 가입절차를 만들어 사용중입니다.

* 교사정보 10명의 인증서를 더미데이터를 생성하여 만들었으며, 실제 교사와는 전혀 관련이 없습니다.
(회원 가입시에만 이용됩니다.)
`,
//6번 아이디 중복 체크
`
오늘의 업데이트 내용은 교사 회원가입 스키마 제작 및 유효성 검사 처리입니다.

데이터 저장은 mongoose를 통하여 mongoDB에 저장하는 방식을 사용했습니다.

교사 회원가입은 인증서 처리 -> 불러온 데이터 -> 이후 회원가입 완료 절차로 제작하였으며,
아이디는 영문자와 숫자를 조합하여 구성하도록 하였고,
유효성 검사 중 아이디 미입력시에도 넘어가는 문제를 해결했습니다.

비밀번호의 경우, 영문, 숫자, 특수문자를 합쳐 7 ~ 15자 이내가 되도록 제작했습니다.
또한 아이디 중복체크를 위하여 mongoose의 find함수를 이용하여 찾도록 했습니다.
회원가입은 아이디 중복체크를 한 상태로만 회원가입이 되도록 구현했습니다.
`,
//7번 multer를 이용한 이미지 업로드
`
오늘의 업데이트 내용은 이미지 업로드를 위하여 multer라는 라이브러리를 사용하였습니다.

멀터가 필요한 이유는 유치원 홈페이지 제작을 위해
로고 및 배경을 추가하는 기능을 구현할 때 사용하기 위합입니다.

처음 멀터를 사용할때 form-data형식으로 받아야 한다는 것을 몰라서,
파일을 받아올 때 부터 문제가 많았습니다.

이미지는 static으로 서버 폴더에 저장하고,
이후 파일을 찾아오기 위해서 파일명만 데이터베이스에 저장하는 방식을 이용했습니다.

현재 이미지를 받아야 하는 부분 중 로고 파트는 개별로 1개씩 받는 경우를 구현해야햇으며,
배경을 추가하는 부분은 여러개를 한번에 받을수 있는 경우를 구현해야 했습니다.
브라우저에서 파일을 받아올 때 배경은 배열인 req.files 로, 로고는 req.file 로 받아서 해결했습니다.

docs 읽는 것 너무 어려웠습니다.
`,
// 8번 카카오맵 연동
`
오늘의 업데이트 내용은 카카오맵 api 연동입니다.
카카오맵을 사용하기 위해서는 카카오 api에서 사용할 url를 연결해놓고,
index.html에 script를 추가하여 사용하면 됩니다.

이후에 배포를 했을때, 갑자기 카카오맵 연동이 안되는 에러를 발견했었는데,
나중에도 잊지 않도록 다시한번 기록합니다.
카카오맵을 사용하기 위해서는 카카오 api에서 사용할 url를 연결!

카카오맵 라이브러리는 생각보다 설명이 잘 되어있어서 사용하기 편했습니다.
주소명에 따라 지도의 좌표를 찾을수 있었고, 핀내임을 지정하여 원하는 핀네임을 넣을수 있었습니다.
`,
// 9번
`
오늘의 업데이트 내용은 관리자페이지 데이터 저장입니다.
현재 페이지 제작시
로고, 네비게이션 바, 배경이미지, 컨텐츠 등을 이용하여 페이지를 제작하고
이것을 저장하여 페이지 게시를 한 경우, 모두가 홈페이지를 볼 수 있도록 구현하였습니다.

저장할때마다 객체에 저장한 데이터가 초기화 되는 문제가 있었습니다.
왜 사라지나 찾아본 결과 a를 저장하면 b, c, d 저장해놓았던 것들이 초기화 되고 있었습니다.
아래와 같은 데이터 구조를 사용하였는데,

kinder.data = {...kinder.data, 
    headerHeight : headerHeight || kinder.data.headerHeight,
    headerGap : headerGap || kinder.data.headerGap,
    headerContainer : headerContainer && {...headerContainer} || kinder.data.headerContainer,
    logoWidth : logoWidth || kinder.data.logoWidth,
    logoHeight : logoHeight || kinder.data.logoHeight,
    navFlexStyle : navFlexStyle && {...navFlexStyle} || kinder.data.navFlexStyle,
    navDepth1 : navMainList && [...navMainList] || kinder.data.navDepth1,
    navDepth2 : navSubList && {...navSubList} || kinder.data.navDepth2,
    selectBgSrc : newSelectBgSrc || kinder.data.selectBgSrc,
    bgHeight : bgHeight || kinder.data.bgHeight,
    zoneData: zoneData && {...zoneData} || kinder.data.zoneData,
    gridMatrix : gridMatrix && {...gridMatrix} || kinder.data.gridMatrix,
    contentsContainer : contentsContainer && {...contentsContainer} || kinder.data.contentsContainer
}

이런 식으로 or을 사용하여 변하는 내용이 없을 경우엔 원본데이터로 그대로 저장되도록 구현하여 문제를 해결했습니다.
`,
// 10번
`
오늘의 업데이트 내용은 버셀 서버 배포입니다.
가장 큰 어려움이 있었습니다.

먼저 브라우저 같은 경우는 배포에 큰 문제가 없었습니다.
서버가 문제였습니다.

1. 폴더 구조도 전부다 vercel 기준에 맞춰서 변경해야 했으며,
필수 - api > index.js

2. multer가 배포시에는 static파일을 저장하는 기능이 구현되지 않았습니다.
multer의 사용은 일단 보류로 놓고, 로컬로 서버를 켜두는 방식을 일단 사용하였습니다.

3. 서버와 통신이 엄청 느린 문제가 있었습니다.
사용하는 국가 등록이 문제였는데 vercel.json에 regions를 icn1로 옮겨서 문제를 해결했습니다.

4. cors오류가 발생하였습니다..
cors 오류 같은경우는 vercel.json을 이용하여 헤더 부분옵션을 추가하여 해결했으나,

추가한 헤더 부분
© "headers": [
© ✓ { "key": "Access-Control-Allow-Credentials", "value": "true" },
© ✓ { "key": "Access-Control-Allow-Origin", "value": "*" },
© ✓ { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
© ✓ { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, 
© ✓ Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
©]

5. 처음에 로딩시 유치원알리미 api 데이터를 불러오는데 5초가 넘어서 gateway timeout문제가 생겼습니다.
브라우저에서 전체데이터를 한번에 불러오기 위하여 Promise.all을 이용하여 불러오고 있었는데, 
너무 많은 데이터 요청을 한번에 하기 때문이라고 생각했습니다. 해결책이 나오면 수정하겠습니다.

`,
//11번
`
vercel 배포시 추가 문제 해결 내용입니다.

Q. multer가 배포시에는 static파일을 저장하는 기능이 구현되지 않았습니다.
A. AWS-S3를 이용하여 파일을 저장 위치를 변경했습니다.

Q. 처음에 브라우저를 불러올 때 유치원알리미 api 데이터를 요청하는데 5초가 넘어서 gateway timeout문제가 생겼습니다.
A. 한번에 너무 많은 요청을 하기 때문에 5초가 넘게 걸렸기 때문에, 한번에 요청하는 부분을 줄였습니다.

청크를 이용하여 한번에 요청하는 수 제한 설정
© async function axiosKinderAllData(allData, setFunc) {
© ✓   const chunkSize = 40 // 각 청크의 크기 설정
© ✓   const chunks = []
©
© ✓   for (let i = 0; i < allData.length; i += chunkSize) {
© ✓✓      chunks.push(allData.slice(i, i + chunkSize));
©✓   }
©
©✓   const success = []
©
©✓  for (const chunk of chunks) {
©✓✓      const results = await Promise.all(
©✓✓✓          chunk.map(item => {
©✓✓✓✓             const { sidoCode, code } = item;
©✓✓✓✓              return axios.post('/api/kinder', {
©✓✓✓✓✓                sidoCode, sggCode: code
©✓✓✓✓              })
©✓✓✓          })
©✓✓      );
©
©✓✓     success.push(...results)
©✓  }
©
©   ✓ const flat = success.reduce((acc, r) => acc.concat(r.data), []);
©   ✓ return setFunc(flat)
©}






`,
``,
``,
``,
``,
``,
``,
``,
``,
``,
``,
``,
``,
``,
``,
``,
``,

]

export {
    updateDatas,
    updateContents
}