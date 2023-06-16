const Footer = () => {
  return (
    <div>
        <hr className="green" />
        <div className="d-flex justify-content-between">
            <div>
                <p className="green m-0">&#169;2023 The Hive All Rights Reserved.</p>
            </div>
            <div>
                <span className="green me-3">Let's connect:</span>
                <i className="fa-brands fa-facebook fa-lg me-3" style={{color: "#4ecdc4"}}></i>
                <i className="fa-brands fa-instagram fa-lg me-3" style={{color: "#4ecdc4"}}></i>
                <i className="fa-brands fa-twitter fa-lg me-3" style={{color: "#4ecdc4"}}></i>
            </div>
        </div>
        <hr className="green" />
    </div>
  )
}

export default Footer