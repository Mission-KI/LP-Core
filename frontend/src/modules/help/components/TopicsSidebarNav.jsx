import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { topics } from './Topics';

const TopicsSidebarNav = () => {
    const { t } = useTranslation();

    return (
        <aside className="sidebar">
            <ul className="px-5 list-group" style={{ listStyle: 'none' }}>
                {topics.map((topic, index) => (
                    <li key={index} className="nav-item py-2">
                        <Link to={topic.path} className="txt-primary regular hover-underline">
                            {t(topic.name)}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default TopicsSidebarNav;
