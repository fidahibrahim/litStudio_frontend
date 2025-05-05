import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import WithoutAuth from "../hoc/WithoutAuth";
import WithAuth from "../hoc/WithAuth";
import MyBlogs from "../pages/MyBlogs";
import CreateBlog from "../pages/CreateBlog";
import Explore from "../pages/Explore";
import BlogPage from "../pages/BlogPage";
import EditBlog from "../pages/EditBlog";

const UserRouter = () => {
  return (
    <>
      <Routes>
        < Route path="/" element={<Home />} />
        < Route path="/login" element={<Login />} />
        < Route path="/register" element={<WithoutAuth component={Register} />} />
        < Route path="/myBlogs" element={<WithAuth component={MyBlogs} />} />
        < Route path="/createBlog" element={<WithAuth component={CreateBlog} />} />
        < Route path="/explore" element={<WithAuth component={Explore} />} />
        < Route path="/blog/:blogId" element={<WithAuth component={BlogPage} /> } />
        < Route path="/editBlog/:blogId" element={<WithAuth component={EditBlog} />} />
      </Routes>
    </>
  )
}

export default UserRouter

