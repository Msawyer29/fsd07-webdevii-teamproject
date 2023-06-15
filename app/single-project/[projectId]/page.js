import Categories from "@components/categories";
import ProjectDetails from "@components/projectDetails";
import GetUserByEmail from "@components/getUserByEmail";
const SingleProject = ({ params }) => {
  return (
    <div className="container px-5">
      <h1>My Page</h1>
      <GetUserByEmail />
      <Categories pId={params} />
      <ProjectDetails />
    </div>
  );
};

export default SingleProject;