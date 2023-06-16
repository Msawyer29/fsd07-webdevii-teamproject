const Comment = ({ comment }) => {
  return (
    <div>
      {/* <img src="/assets/images/avatar.jpg" className="avatar" alt="..." /> */}
      <div className="ms-4">
        <p className="green m-0">
          posted by <strong>{`${comment.firstName} ${comment.lastName}`}</strong> on <strong>{new Date(comment.createdAt).toLocaleDateString()}</strong> @ <strong>{new Date(comment.createdAt).toLocaleTimeString()}</strong>
        </p>
        <p className="egg">{comment.text}</p>
      </div>
    </div>
  );
};

export default Comment;