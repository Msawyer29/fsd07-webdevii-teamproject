import Categories from "@components/categories";
import ProjectDetails from "@components/projectDetails";
import GetUserByEmail from "@components/getUserByEmail";
import SignUp from "@components/signUpNew";
import Footer from "@components/footer";
import Category from "@components/categorySearch";
const SingleProject = ({ params }) => {
  return (
    <div className="container px-5">
      {/*<h1>My Page</h1>
       <GetUserByEmail /> */}
      <Categories />
      <Category />
      <ProjectDetails pId={params} />
      <SignUp />
      {/* <Footer /> */}
    </div>
  );
};

export default SingleProject;
