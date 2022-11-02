import { createContext } from "react";
import { Link, Outlet } from "react-router-dom";

export const TeamsContext = createContext<string[]>([]);

function App() {
  const teams = ["Rose-Tiger", "Peach-Puffin", "Maroon-Capybara", "Tan-Goldfish", "Teal-Bass"];

  return (
    <div className="app">
      <TeamsContext.Provider value={teams}>
        <Outlet />
      </TeamsContext.Provider>
    </div>
  );
}

export default App;
