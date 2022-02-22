import React, { useEffect, useState } from "react";

function Searchbar({ search, users }) {
  const [value, setValue] = useState("sudo");

  useEffect(() => search(value), [search, value]);

  return (
    <>
      <div className="search-bar-cont">
        <input
          className="search-bar"
          placeholder="type Github username"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>

      {!!users.length && (
        <ul className="users-typeahead">
          {users.map((user) => (
            <li className="users-list-item" key={user.login}>
              <a target="_blank" rel="noreferrer" href={user.htmlUrl}>
                <img
                  className="user-profile-picture"
                  src={user.picture}
                  alt="user profile"
                />
                <p>{user.login}</p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Searchbar;
