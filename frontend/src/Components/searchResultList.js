import React from "react";
import "./searchResultList.css";
import defaultProfile from "../assets/images/default_profile.jpg";
import { useNavigate } from "react-router-dom";
const SearchResultList = ({ result, user }) => {
  const navigate = useNavigate();
  const handleOpenUserProfile = (user_id) => {
    if (user === user_id) {
      navigate(`/profile/${user}`)
    }
    else navigate(`/${user_id}`);
  };
  return (
    <>
      <div className="search-result">
        {result.map((user, id) => {
          return (
            <div
              className="search-list-user"
              key={id}
              onClick={() => handleOpenUserProfile(user._id)}
            >
              <div
                className="search-list-profile-picture"
                style={
                  user.profilePicture
                    ? {
                      backgroundImage: `url(${user.profilePicture})`,
                    }
                    : {
                      backgroundImage: `url(${defaultProfile})`,
                    }
                }
              ></div>
              <div>
                <h6 style={{ margin: "0", padding: "0" }}>{user.name}</h6>
                {user.branch && (
                  <p className="searchList-branch-name">{user.branch}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SearchResultList;
