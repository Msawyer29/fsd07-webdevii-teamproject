import ProjectDescription from "./projectDescription";
import Comments from "./comments";
const ProjectDetails = () => {
  return (
    <div>
      <h1 className="egg">Project Title</h1>
      <div className="row d-flex">
        <div className="col-md-8 px-3">
          <img
            src="/assets/images/together.jpg"
            className="img-fluid"
            alt="..."
          />
          <ProjectDescription />
          <Comments />
        </div>
        <div className="col-md-4 px-3">
          <p className="text-uppercase egg">stats</p>
          <div
            className="progress mb-3"
            role="progressbar"
            aria-label="5px high"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div className="progress-bar greenBG"></div>
          </div>
          <h1 className="egg slim mb-0">
            $<span id="funds">12.800</span>
          </h1>
          <p className="green mt-0">
            pledged of{" "}
            <strong>
              CA$ <span id="goal">15.000</span>
            </strong>{" "}
            goal
          </p>
          <h1 className="egg slim mb-0" id="backers">
            193
          </h1>
          <p className="green mt-0">backers</p>
          <h1 className="egg slim mb-0" id="deadline">
            21
          </h1>
          <p className="green mt-0 mb-5">days left</p>
          <a href="#" className="myBtnEgg">
            back this project
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
