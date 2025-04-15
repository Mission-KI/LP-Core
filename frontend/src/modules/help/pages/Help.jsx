import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import TopicsList from "../components/TopicsList";
import InfoAlert from "../../common/components/InfoAlert";
import { useLocation } from "react-router";

const Help = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const id = hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    }
  }, [location]);

  return (
    <>
      <h2 className="bold mb-4">{t("header.help")}</h2>
      <InfoAlert text={t("help.alert")} />
      <TopicsList />
    </>
  );
};

export default Help;
