import { useTranslation } from 'react-i18next';
import autobahn from '../assets/img/dataspace_logos/logo_autobahn-gmbh.png';
import bast from '../assets/img/dataspace_logos/logo_bast.png';
import flugsicherung from '../assets/img/dataspace_logos/logo_deutsche_flugsicherung.png';
import govdata from '../assets/img/dataspace_logos/logo_govdata.png';
import mobilithek from '../assets/img/dataspace_logos/logo_mobilithek.png';
import mobility from '../assets/img/dataspace_logos/logo_mobility-data-space.png';
import collect from '../assets/img/dataspace_logos/logo_toll-collect.png';

export const useDataSpaces = () => {
    const { t } = useTranslation();

    return [
        { id: 1, name: "GovData", image: govdata, shortName: "GovData" },
        { id: 2, name: "Autobahn GmbH", image: autobahn, shortName: "Autobahn" },
        { id: 3, name: "Toll Collect GmbH", image: collect, shortName: "Toll Collect" },
        { id: 4, name: "Mobility Data Space", image: mobility, shortName: "Mobility" },
        { id: 5, name: "Deutschlands Plattform für Daten, die etwas bewegen", image: mobilithek, shortName: "Deutschlands Plattform für Daten" },
        { id: 6, name: "Deutsche Flugsicherung", image: flugsicherung, shortName: "Deutsche Flugsicherung" },
        { id: 7, name: "Bundesanstalt für Straßenwesen", image: bast, shortName: "Bundesanstalt für Straßenwesen" },
    ];
};
