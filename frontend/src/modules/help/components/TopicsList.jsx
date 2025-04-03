import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const TopicsList = () => {

    const { t } = useTranslation();

    return (
        <nav className='nav flex-column mt-5'>
            <Link to="/help/about" className='nav-link txt-primary large hover-underline w-fit'>
                {t('help.topicAbout')}
            </Link>
            <Link to="/help/motivation-and-basics" className='nav-link txt-primary large hover-underline w-fit'>
                {t('help.topicBasics')}
            </Link>
            <Link to="/help/functions" className='nav-link txt-primary large hover-underline w-fit'>
                {t('help.topicFunctions')}
            </Link>
            <Link to="/help/data-formats-and-analysis" className='nav-link txt-primary large hover-underline w-fit'>
                {t('help.topicFormats')}
            </Link>
        </nav>
    );
}

export default TopicsList;
