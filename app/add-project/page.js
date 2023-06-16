import AddProject from "@components/addProject"
import SignUp from "@components/signUpNew";
import Footer from "@components/footer";

const NewProject = () => {
  return (
    <div className="container px-5">
        <AddProject />
        <SignUp />
    <Footer />
    </div>
  )
}

export default NewProject