import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h1>Home Page</h1>
      <Link to={"/books"}>hello</Link>
    </>
  );
};

export default HomePage;
