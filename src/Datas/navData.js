const navData = {
    service : {
        main: '유치원 모으미란',
        sub: '유치원 모으미 사이트를 소개합니다.',
        list : [
            {active : 'info', link: '/service/info', description: '서비스안내'},
            {active : 'introduce', link: '/service/introduce', description: '공시항목 소개'},
            {active : '', link: '', description: '관련법령'},
            {active : '', link: '', description: '홍보자료'},
        ]
    },
    search : {
        main: '유치원 정보',
        sub: '유치원의 정보공시를 조회 할 수 있습니다.',
        list : [
            {active : 'find', link: '/search/find', description: '유치원 조회'},
            {active : '', link: '', description: '유치원 비교'},
            {active : '', link: '', description: '정보공시지표'},
        ]
    },
    notice : {
        main: '공지사항',
        sub: '유치원 모으미의 정보 및 공지사항을 확인해보세요.',
        list : [
            {active : 'update', link: '/notice/update', description: '업데이트'},
            {active : 'event', link: '', description: '이벤트'},
            {active : 'qna', link: '', description: 'QnA'},
        ]
    }

}

export default navData