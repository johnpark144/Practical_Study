import React, { useState } from 'react';
import { useQuery } from "react-query";

function Characters() {
  const [page, setPage] = useState(1)

  const fetchCharacters = async ({ queryKey }) => {
    const response = await fetch(`http://rickandmortyapi.com/api/character?page=${queryKey[1]}`)
    return response.json();
  };

  // useQuery("queryKey(고유키)", 데이터불러올함수)
  const { data, status, isPreviousData, isLoading, isError } = useQuery(["characters", page], fetchCharacters, // error, isFetching, isSuccess 등 
  {  
    keepPreviousData: true, // 다음 fetch시까지 이전 데이터들로 일처리함
  }); // onSuccess, onError, onSettled : 성공,실패,완료시 sideEffect 정의가능
  // enabled : 자동실행할지여부, retry : 동작실패시 자동 retry여부, refetchInterval : 주기적으로 refetch여부

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  const paginations = [...Array(data?.info.pages)]  // [...Array(number)] 숫자만큼 배열을 만들어줌

return (<>
{/* 페이지네이션 */}
    <button disabled={page === 1} onClick={() => setPage(page - 1)} 
    style={{ cursor: "pointer", height: "30px" }}>
      Previous
    </button>
    {paginations.map((x, idx) => (
      idx + 1 === page ? (
        <button key={idx + 1}
          style={{ border: "1px solid blue", color: "black", backgroundColor: "blue", cursor: "pointer", height: "30px" }}
          onClick={() => { setPage(idx + 1) }} >
          {idx + 1}
        </button>
      ) : (
        idx - 4 < page && page < idx + 6 ? (
          <button key={idx + 1}
            style={{ border: "1px solid gray", color: "gray", cursor: "pointer", height: "30px" }}
            onClick={() => { setPage(idx + 1) }} >
            {idx + 1}
          </button>
        ) : (
          ""
        )
      )
    ))}
    <button disabled={ isPreviousData && (page === data?.info.pages) } onClick={() => setPage(page + 1)} 
    style={{ cursor: "pointer", height: "30px"  }}>
      Next
    </button>
    {/* 캐릭터 이미지와 이름 */}
    <div>
      {data.results.map(character => (
        <div key={character.id}>
          <img src={character.image} alt='' />
          <h3>{character.name}</h3>
        </div>
      ))}
    </div>
  </>)
}

export default Characters

