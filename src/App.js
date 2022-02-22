import React, { useEffect, useState } from "react";
import "./App.scss";
import SearchBar from "./components/Search";
import githubLogo from "./images/github-logo.png";

function App() {
  const [searchWord, setSearchWord] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.github.com/search/users?per_page=20&q=${searchWord}`
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);

        setUsers([]);

        return;
      }

      setError(undefined);

      setUsers(
        data.items.map(({ html_url, login, avatar_url }) => ({
          htmlUrl: html_url,
          picture: avatar_url,
          login: login,
        }))
      );
    })();
  }, [searchWord]);

  return (
    <div className="container">
      <img className="github-header-logo" src={githubLogo} alt="github logo" />

      <SearchBar users={users} search={setSearchWord} />

      {error && <div>{error}</div>}
    </div>
  );
}

export default App;
