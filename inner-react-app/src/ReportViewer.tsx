import { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { TeamsContext } from "./App";

function subscribeToParentIframe(eventListener: any) {
  window.addEventListener("message", eventListener, false);
}

function unsubscribeFromParentIframe(eventListener: any) {
  window.removeEventListener("message", eventListener, false);
}

function updateParentUrl(filters: any) {
  window.parent.postMessage({ filters }, "http://localhost:5173");
}

function ReportViewer() {
  let { reportId } = useParams();
  const teams = useContext(TeamsContext);
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState<string>(searchParams.get("filter") || "");

  function parentEventListener(event: any) {
    if (event.origin === "http://localhost:5173" && event.data) {
      const filter = event.data;
      const params = Object.fromEntries(new URLSearchParams(filter));
      setFilter(params.filter);
    }
  }

  useEffect(() => {
    subscribeToParentIframe(parentEventListener);
    return () => {
      unsubscribeFromParentIframe(parentEventListener);
    };
  }, []);

  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    let filter = e.target.value;
    if (filter) {
      setFilter(filter);
    } else {
      setFilter("");
    }
    updateParentUrl(filter);
  }

  const filteredTeams = teams.filter((team) => team.toLowerCase().startsWith(filter.toLowerCase()));

  return (
    <>
      <h1>Report {reportId}</h1>

      <input type="text" value={filter} onChange={handleFilterChange} />

      {filteredTeams.length > 0 ? (
        filteredTeams.map((team) => <p key={team}>{team}</p>)
      ) : (
        <p>No teams found</p>
      )}
    </>
  );
}

export default ReportViewer;
