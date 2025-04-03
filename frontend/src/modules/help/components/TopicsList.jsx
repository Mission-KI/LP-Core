import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { topics } from './Topics';

const TopicsList = () => {
    const { t } = useTranslation();

    return (
        <nav className="nav flex-column mt-5">
            {topics.map((topic, index) => (
                <Link key={index} to={topic.path} className="nav-link txt-primary large hover-underline w-fit">
                    {t(topic.name)}
                </Link>
            ))}
        </nav>
    );
}

export default TopicsList;
