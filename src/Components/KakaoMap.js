import React, { useEffect, useRef } from "react";
const {kakao} = window // 카카오 맵 사용


function KakaoMap ({addr='세종특별자치시 나리로 38' ,pinName = '핀네임'}) {

    const mapRef = useRef()

    useEffect(()=>{
        const container = mapRef.current

        const options = {
            center: new kakao.maps.LatLng(0,0), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        }
        const map = new kakao.maps.Map(container, options); 

        const geocoder = new kakao.maps.services.Geocoder();
        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(addr, function(result, status) {

    // 정상적으로 검색이 완료됐으면 
    if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        const marker = new kakao.maps.Marker({
            map: map,
            position: coords
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${pinName}</div>`
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
    } 
    });    
    }, [])

    const mapStyle = {
        width: '600px',
        height: '500px'
    }

    return(
        <div ref={mapRef} className="map" style={mapStyle}></div>
    )
    
}

export default KakaoMap
