import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

function subscribeToChildIframe(eventListener: any) {
  window.addEventListener("message", eventListener, false);
}

function unsubscribeFromChildIframe(eventListener: any) {
  window.removeEventListener("message", eventListener, false);
}

function subscribeToPopState(event: any) {
  window.addEventListener("popstate", event);
}

function unsubscribeFromPopState(event: any) {
  window.removeEventListener("popstate", event);
}

function Report() {
  const { reportId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("filter") || "";
  const [initialFilter] = useState(searchQuery);

  function updateUrlState(event: any) {
    if (event.origin === "http://localhost:5174") {
      const filter = event.data.filters;
      if (filter) {
        setSearchParams({ filter });
      } else {
        setSearchParams({});
      }
    }
  }

  function notifyChild(location: PopStateEvent) {
    const iframe = document.getElementById("report-viewer-iframe");
    if (iframe !== null) {
      (iframe as HTMLIFrameElement).contentWindow?.postMessage(
        window.location.search, // or use location.target.location.search
        "http://localhost:5174"
      );
    }
  }

  useEffect(() => {
    subscribeToChildIframe(updateUrlState);
    subscribeToPopState(notifyChild);
    return () => {
      unsubscribeFromChildIframe(updateUrlState);
      unsubscribeFromPopState(notifyChild);
    };
  }, []);

  const reportUrl = `http://localhost:5174/reportviewer/${reportId}${
    initialFilter ? "?filter=" + initialFilter : ""
  }`;

  return (
    <iframe
      id="report-viewer-iframe"
      src={reportUrl}
      height={"100%"}
      width={"100%"}
      style={{ marginTop: "20px" }}
    />
  );
}

export default Report;
