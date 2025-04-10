import { Breadcrumb } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const nonLinkPaths = ['details'];

  const formatName = (name) =>
    name
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <Breadcrumb>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLink = !nonLinkPaths.includes(name.toLowerCase());

        return (
          <Breadcrumb.Item
            key={index}
            linkAs={isLink ? Link : 'span'}
            linkProps={isLink ? { to: routeTo } : undefined}
            className={!isLink ? 'txt-lighter' : ''}
          >
            {formatName(name)}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
