import { useEffect, useState } from "react";

export default function useFetch(url){ // 자주사용하는 함수를 커스텀화 시킴
    const[data, setData] = useState([]);

    useEffect(()=>{
        fetch(url)
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            setData(data);
        });
    }, [url]);

    return data
}

