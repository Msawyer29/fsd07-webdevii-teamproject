import Image from "next/image";
import Register from "../components/register";
import { DeleteUser } from "../components/deleteUser";
import GetAllUser from "../components/getAllUsers";
import GetUserByEmail from "@components/getUserByEmail";
import { UpdateUser } from "@components/updateUser";

const Home = () => (
  <section className="container-fluid">
    <h1 className="text-center">
      Discover & Share
      <br />
      <span className="text-center"> AI-Powered Prompts</span>
    </h1>
    <hr />
    <p className="text-center">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.{" "}
    </p>
    <hr />
    <h2 className="text-center">List of Users</h2>
    <GetAllUser />
    <hr />
    <h2 className="text-center">
      List of User By Email (Email is hardcoded for now)
    </h2>
    <GetUserByEmail />
    <hr />
    <Register />
    <hr />
    <DeleteUser />
    <hr />
    <UpdateUser />
  </section>
);

export default Home;
