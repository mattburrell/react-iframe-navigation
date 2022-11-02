import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>Outer React App</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="reports">Reports</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
