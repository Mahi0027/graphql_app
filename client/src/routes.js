import { Login } from "./components/Login.js";
import { Signup } from "./components/Signup.js";
import { Profile } from "./components/Profile.js";
import { CreateQuote } from "./components/CreateQuote.js";
import { Home } from "./components/Home.js";
import { OtherUserProfile } from "./components/OtherUserProfile.js";
import { NotFound } from "./components/NotFound.js";


export const routes = [
  { path: "/", element: <Home /> },
  { path: "/create", element: <CreateQuote /> },
  { path: "/profile", element: <Profile /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/profile/:userId", element: <OtherUserProfile /> },
  { path: "*", element: <NotFound />}
];