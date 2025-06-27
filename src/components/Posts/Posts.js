import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Post from "./Post.js";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { getLocalStorageUser } from "../../utils/utils.js";

const Posts = ({ setCurrentId, mode, posts, users }) => {
  const localUser = getLocalStorageUser();

  const user = useSelector((state) =>
    state?.reducers?.users.find((user) => user?._id === localUser?._id),
  );

  const filterFriendsPosts = (posts, user) => {
    // Add checks for user and user.friends to prevent errors
    if (!user || !user.friends) {
      return [];
    }
    return posts.filter(
      (post) => post?.creator && user.friends.includes(post.creator),
    );
  };

  const [friendsPosts, setFriendsPosts] = useState([]);

  useEffect(() => {
    const calculatedFriendsPosts = filterFriendsPosts(posts, user);
    setFriendsPosts(calculatedFriendsPosts);
  }, [posts, user]);

  return (
    <Row>
      {mode === "discover" ? (
        <Col className="d-flex flex-column-reverse gap-3">
          {!posts.length ? (
            <>
              <Spinner className="spinnner" animation="border" role="status" />
            </>
          ) : (
            posts.map((post) => (
              <Post
                key={post?._id}
                setCurrentId={setCurrentId}
                post={post}
                user={users.find((user) => user?._id === post?.creator)}
              />
            ))
          )}
        </Col>
      ) : (
        <Col className="d-flex flex-column-reverse gap-3">
          {friendsPosts.map((post) => (
            <Post
              key={post?._id}
              post={post}
              setCurrentId={setCurrentId}
              user={users.find((user) => user?._id === post?.creator)}
            />
          ))}
        </Col>
      )}
    </Row>
  );
};

export default Posts;
