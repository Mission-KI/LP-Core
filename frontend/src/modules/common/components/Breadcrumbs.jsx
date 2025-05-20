import { Breadcrumb } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";

const Breadcrumbs = ({ edp = null }) => {
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
        if (pathnames[index - 1]?.toLowerCase() === "details" && edp) {
          displayName = edp?._source.name;
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
