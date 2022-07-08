import "./Post.css";

const Post = ({ title, content, date, user, published, id }) => {
  const formatedDate = new Date(Number(date));
  return (
    <div className="post">
      <div className="post__header">
        <h3>{title}</h3>
        <h4>Created At {`${formatedDate}`.split(" ").splice(0, 3).join(" ")} by{" "}{user}</h4>
      </div>
      <p>{content}</p>
    </div>
  );
}

export default Post