import { Link } from "react-router-dom";

function Reports() {
  const reports = [1, 2, 3, 4, 5];

  return (
    <>
      <h1>Reports</h1>
      {reports.map((_) => (
        <p key={_}>
          <Link to={`${_}`}>Report {_}</Link>
        </p>
      ))}
    </>
  );
}

export default Reports;
