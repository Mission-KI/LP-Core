import { Breadcrumb } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";

const Breadcrumbs = ({ edp = null, dataset_name = null }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const nonLinkPaths = ["details", "monitoring"];

  const formatName = (name) =>
    name.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  if (pathnames.length <= 1) return null;

  return (
    <Breadcrumb>
      {pathnames.map((name, index) => {
        let displayName = formatName(name);

        // Check for `/details/{edp_id}` or `/details/{edp_id}/{dataset_id}`
        if (pathnames[0]?.toLowerCase() === "details") {
          if (edp && index === 1) {
            // Replace edp_id with edp._source.name
            displayName = edp?._source.name;
          } else if (dataset_name && index === 2) {
            // Replace dataset_id with dataset_name
            displayName = dataset_name;
          }
        }

        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLink = !nonLinkPaths.includes(name.toLowerCase());

        return (
          <Breadcrumb.Item
            key={index}
            linkAs={isLink ? Link : "span"}
            linkProps={isLink ? { to: routeTo } : undefined}
            className={!isLink ? "txt-lighter" : ""}
          >
            {displayName}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
