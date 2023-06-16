"use client";
import Image from "next/image";
import SignUp from "@components/signUpNew";
import Categories from "@components/categories";
import Featured from "@components/featured";
import Successful from "@components/successful";
import Discover from "@components/discover";
import DiscoverPagination from "@components/discoverPagination";
import Footer from "@components/footer";

const Home = () => (
  <div className="container px-5">
    <Categories />
    <Featured />
    <Successful />
    <DiscoverPagination />
    <SignUp />
    <Footer />
  </div>
);
export default Home;
