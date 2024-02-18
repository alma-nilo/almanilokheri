import { GA4React } from "ga-4-react";

const measurementId = process.env.REACT_APP_measurementId;
const ga4react = new GA4React(measurementId).initialize();

const trackPathForAnalytics = (path, search, title) => {
  ga4react
    .then((ga) => {
      ga.pageview(path, search, title);
    })
    .catch((err) => console.error(`Analytics failed: ${err}`));
};

export default trackPathForAnalytics;
