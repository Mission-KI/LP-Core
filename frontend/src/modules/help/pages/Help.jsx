import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import TopicsList from "../components/TopicsList";
import InfoAlert from "../../common/components/InfoAlert";
import { useLocation } from "react-router";

const Help = () => {
  const { t } = useTranslation();
  const location = useLocation();
  console.log("asdasd");

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleLoad = () => {
      window.scrollTo(0, 0);

      console.log("asdasd");
      const hash = window.location.hash;
      console.log(hash);
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const headerHeight =
            document.querySelector(".navbar")?.offsetHeight || 0;
          const topOffset = element.offsetTop - headerHeight;

          window.scrollTo({
            top: topOffset,
            behavior: "smooth",
          });
        }
      }
    };

    window.addEventListener("load", handleLoad);
    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <>
      <h2 className="bold mb-4">{t("header.help")}</h2>
      <InfoAlert text={t("help.alert")} />
      <TopicsList />
    </>
  );
};

export default Help;
