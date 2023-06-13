import Image from "next/image";
import Register from "../components/register";
import { DeleteUser } from "../components/deleteUser";
import GetAllUser from "../components/getAllUsers";
import GetUserByEmail from "@components/getUserByEmail";
import { UpdateUser } from "@components/updateUser";
import SignUp from "@components/signUp";
import Categories from "@components/categories";
import Featured from "@components/featured";
import Successful from "@components/successful";
import Discover from "@components/discover";
import AddProject from "../components/addProject";

const Home = () => (
  <div className="container px-5">
    <Categories />
    <Featured />
    <Successful />
    <Discover />
    <AddProject />
    {/* DELETE BELOW WHEN READY */}

    {/* <h2>List of Users</h2>
    <GetAllUser />
    <hr />
    <h2>List of User By Email (Email is hardcoded for now)</h2>
    <GetUserByEmail />
    <hr />
    <Register />
    <hr />
    <DeleteUser />
    <hr />
    <UpdateUser />
    <hr />
    <h2>Firebase Auth SignUp</h2>
    <SignUp /> */}
  </div>
);

export default Home;