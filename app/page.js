import Image from "next/image";
import Register from "../components/register";
import { DeleteUser } from "../components/deleteUser";
import GetAllUser from "../components/getAllUsers";

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
    <Register />
    <hr />
    <DeleteUser />
  </section>
);

export default Home;
