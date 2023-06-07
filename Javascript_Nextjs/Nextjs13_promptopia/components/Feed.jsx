"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  // 검색창 타이핑 변경
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // 검색창 타이핑시 글, 태그, 유저이름과 포함되있는 것만 데이터 불러오기
  useEffect(() => {
    const searchPosts = async () => {
      const response = await fetch("/api/prompt");
      const datas = await response.json();
      const newDatas = datas.filter(
        (data) =>
          data.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
          data.tag.toLowerCase().includes(searchText.toLowerCase()) ||
          data.creator.username.toLowerCase().includes(searchText.toLowerCase())
      );
      setPosts(newDatas);
    };
    searchPosts();
  }, [searchText]);

  // 모든 데이터 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        {/* 태그나 유저이름 검색 */}
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {/* 모든 POST 나열 */}
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
}

export default Feed;
