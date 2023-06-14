import Comment from "./comment"
const Comments = () => {
  return (
    <div className="row d-flex">
        <div className="col-md-8 px-3">
    <div className="mb-5">
    <h5 className="egg mt-5">Join the conversation</h5>
    <hr className="green mb-3" />
    <Comment />
    </div>
    </div>
    </div>
  )
}

export default Comments