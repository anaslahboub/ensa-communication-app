import { Outlet, Route, Routes } from "react-router-dom";
import Login from "../authentification/login";
import SignIn from "../authentification/signIn";
import About from "../pages/about/about";
import Chat from "../pages/chat/chat";
import ContactUs from "../pages/contactUs/contactUs";
import Home from "../pages/home/home";
import Footer from './../common/footer';
import Header from './../common/header';

const HeaderLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const Routing = () => (
  <Routes>
    <Route path="/" element={<HeaderLayout />}>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="contact" element={<ContactUs />} />
      <Route path="about" element={<About />} />
      <Route path="chat" element={<Chat />} />
      <Route path="login" element={<Login />} />
      <Route path="signIn" element={<SignIn />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default Routing;



const NotFound = () => <div>404 Page Not Found</div>;
