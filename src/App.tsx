import React, { useEffect } from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import Header from "./components/Header";
import Photo from "./components/Photo";
import Navbar from "./components/Navbar";

interface Animals {
  id: string;
  url: string;
  width: number;
  height: number;
}

function App(): JSX.Element {
  //읽어올 사진 갯수
  const SiZE: number = 10;
  const [petType, setPetType] = React.useState<string>("dog");
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  //axios api 호출
  // const getDogs = async ({ pageParam = 1 }) => {
  //   const { data } = await axios.get<Animals[]>(
  //     `https://api.thedogapi.com/v1/images/search?limit=${SiZE}&page=${pageParam}`
  //   );
  //   return data;
  // };

  //axios api 호출
  const getPets = async ({ pageParam = 1 }) => {
    const { data } = await axios.get<Animals[]>(
      `https://api.the${petType}api.com/v1/images/search?limit=${SiZE}&page=${pageParam}`
    );
    return data;
  };

  //useInfiniteQuery를 이용하여 api 호출
  const {
    data, //데이터
    fetchNextPage, //다음 페이지 호출
    hasNextPage, //다음 페이지가 있는지 여부 => 이건 back엔드에서 t/f 값을 넘겨주는거 => 여기선 계속 true만줌
    isFetchingNextPage, //다음 페이지를 호출하는 중인지 여부
    isLoading, //데이터를 불러오는 중인지 여부
    isError, //에러가 발생했는지 여부
    error, //에러 내용
    refetch, //데이터를 다시 불러오는 함수
  } = useInfiniteQuery<Animals[], Error>(["pets", petType], getPets, {
    getNextPageParam: (_lastPage, allPages) => allPages.length + 1,

    onSuccess: (data) => {
      console.log("data", data);
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  console.log(data, hasNextPage, inView);

  return (
    // <div className="flex flex-col justify-center items-center">
    //   <Header />
    //   <Photo />
    //   <h1 className="text-3xl font-bold underline">Hello world!</h1>
    // </div>

    <div className="flex flex-col justify-center items-center">
      <Header />
      <div className="flex w-full">
        <div className="flex-none w-14 mx-10">
          <Navbar setPetType={setPetType} refetch={refetch} />
        </div>
        <div className=" flex flex-auto flex-row flex-wrap gap-3 ">
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.map((item) => (
                <Photo
                  key={item.id}
                  url={item.url}
                  width={300}
                  height={300}
                  alt="dog"
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      {isFetchingNextPage ? (
        <div>로딩중입니다1!!!!</div>
      ) : (
        <div ref={ref} style={{ height: "100px" }}></div>
      )}
    </div>
  );
}

export default App;
