import { useRoutes } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/NavBar.js";
import { routes } from "./routes.js";

function App() {
  const elements = useRoutes(routes);
  return (
    <div className="App">
      <NavBar />
      {elements}
    </div>
  );
}

export default App;
