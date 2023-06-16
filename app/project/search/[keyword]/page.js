import Categories from "@components/categories";
import SignUp from "@components/signUpNew";
import Footer from "@components/footer";
import KeyWordSearch from "@components/keyWordSearch";
const SingleProject = ({ params }) => {
  return (
    <div className="container px-5">
      <Categories />
      <KeyWordSearch keyWord={params} />
      {/* <ProjectDetails pId={params} /> */}
      <SignUp />
      <Footer />
    </div>
  );
};

export default SingleProject;
