import { useTranslation } from 'react-i18next';
import TopicsList from '../components/TopicsList';
import InfoAlert from '../../common/components/InfoAlert';

const Help = () => {

    const { t } = useTranslation();

    return (
        <>
            <h2 className='bold mb-4'>{t('header.help')}</h2>

            <InfoAlert text={t('help.alert')} />
            <TopicsList />
        </>
    );
};

export default Help;
