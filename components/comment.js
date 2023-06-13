const Comment = () => {
  return (
    <div>
        <img
                  src="/assets/images/avatar.jpg"
                  className="avatar"
                  alt="..."
                />
                <div className="ms-4">
                <p className="green m-0">posted by <strong>John</strong> on <strong>12.03.2023</strong> @ <strong>12:45</strong></p>
                <p className="egg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
    </div>
  )
}

export default Comment