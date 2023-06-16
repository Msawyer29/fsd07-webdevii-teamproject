import Categories from "@components/categories";
import ProjectDetails from "@components/projectDetails";
import SignUp from "@components/signUpNew";
import Footer from "@components/footer";
import CategorySearch from "@components/categorySearch";
const SingleProject = ({ params }) => {
  return (
    <div className="container px-5">
      <Categories />
      <CategorySearch category={params} />
      {/* <ProjectDetails pId={params} /> */}
      <SignUp />
      {/* <Footer /> */}
    </div>
  );
};

export default SingleProject;
