import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import logo from "../assets/images/graduation-cap.png";
import message from "../assets/images/message.png";
import notification from "../assets/images/notification.png";
import home from "../assets/images/home.png";
import book from "../assets/images/book-pages.png";
import speaker from "../assets/images/speaker.png";
import live from "../assets/images/live-stream.png";
import link from "../assets/images/link.png";
import user from "../assets/images/profile.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../redux/features/login/authAction";
import Loading from "./../Components/Loading";
import SearchBar from "../Components/SearchBar";
import SearchResultList from "./../Components/searchResultList";
import API from "../Services/API";
import moment from 'moment';
import { BiLike, BiMessageRounded } from "react-icons/bi";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [userCache, setUserCache] = useState({});
  const { data } = useSelector((state) => state.auth);
  const [result, setResult] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  const fetchPostData = async () => {
    try {
      const response = await API.get("/post/get-all-posts");
      const postData = response.data.posts;
      const updatedPosts = await Promise.all(
        postData.map(async (post) => {
          if (!userCache[post.createdBy]) {
            const userResponse = await API.post("/auth/current-user-post", {
              userId: post.createdBy,
            });
            const userData = userResponse.data.user;
            setUserCache((prev) => ({ ...prev, [post.createdBy]: userData }));
            return { ...post, user: userData };
          }
          return { ...post, user: userCache[post.createdBy] };
        })
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.log("error: " + error);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  const likePost = async (postId) => {
    try {
      const response = await API.patch(`/post/${postId}/like`, { userId: data.user._id });

      if (response.data.success) {
        // Check if the user has already liked the post
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                ...post,
                likes: post.likes.includes(data.user._id)
                  ? post.likes.filter((like) => like !== data.user._id) // Remove user ID if already liked
                  : [...post.likes, data.user._id], // Add user ID if not already liked
              }
              : post
          )
        );
      }
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };




  if (!data || !data.user) {
    return <Loading />;
  }

  return (
    <>
      <div className="container-fluid h-container">
        <div className="h-navbar">
          <div className="h-logo">
            <img src={logo} alt="logo-image" />
            <h5>CAMPUS LINK</h5>
          </div>
          <div className="h-search-bar">
            <SearchBar setResult={setResult} />
            <SearchResultList result={result} user={data.user._id} />
          </div>
          <div className="h-other-icons">
            <div className="h-other-img">
              <img alt="notification" src={notification} />
            </div>
            <div className="h-other-img">
              <img alt="message" src={message} />
            </div>
            <Link
              to={`/profile/${data.user._id}`}
              className="h-other-img"
              style={{ border: "2px solid #fff" }}
            >
              <div
                className="h-other-img-profile"
                style={{ backgroundImage: `url(${data.user.profilePicture})` }}
              ></div>
            </Link>
          </div>
        </div>
        <div className="main-content">
          <div className="h-sidebar">
            <div className="h-menu">
              <img alt="menu-img" src={home} />
              <h3>Home</h3>
            </div>
            <Link to={`/profile/${data.user._id}`} className="h-menu">
              <img alt="menu-img" src={user} />
              <h3>Profile</h3>
            </Link>
            <Link to={"/notes/courses"}>
              <div className="h-menu">
                <img alt="menu-img" src={book} />
                <h3>Notes</h3>
              </div>
            </Link>
            <Link to={"/user/connections"}>
              <div className="h-menu">
                <img alt="menu-img" src={link} />
                <h3>Connect</h3>
              </div>
            </Link>
            <div className="h-menu">
              <img alt="menu-img" src={speaker} />
              <h3>Events & Announcement</h3>
            </div>
            <div className="h-menu">
              <img alt="menu-img" src={live} />
              <h3>Live Feed</h3>
            </div>
          </div>
          <div className="user-post-feed">
            {posts.length ? (
              posts.map((post) => {
                const isLikedByUser = post.likes.includes(data.user._id); // Check if the current user has liked the post

                return (
                  <div className="huser-post-box" key={post._id}>
                    <div className="user-post-header">
                      <div
                        className="user-pro"
                        style={{
                          backgroundImage: `url(${post.user?.profilePicture || ""})`,
                        }}
                      ></div>
                      <div className="user-hdetail">
                        <p style={{ fontSize: '17px', fontWeight: 'bold' }}>{post.user.name}</p>
                        <p style={{ fontSize: '12px', color: 'gray' }}>{moment(post.createdAt).fromNow()}</p>
                      </div>
                    </div>
                    <p className="user-hcaption">{post.caption}</p>
                    <div className="user-post-image" style={{ backgroundImage: `url(${post.image})` }}></div>
                    <p className="like-count">{post.likes.length} Likes</p>
                    <div className="likeFooter">
                      <div
                        className="h-icon"
                        onClick={() => likePost(post._id)}
                        style={isLikedByUser ? { backgroundColor: '#2B3467', color: '#fff' } : { backgroundColor: '#fff', color: '#000' }}
                      >
                        <BiLike style={{ fontSize: '20px' }} />
                      </div>
                      <div className="h-icon">
                        <BiMessageRounded style={{ fontSize: '20px' }} />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Empty posts...</p>
            )}
          </div>;

        </div>
      </div>
    </>
  );
};

export default HomePage;
