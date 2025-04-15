import { useTranslation } from "react-i18next";
import { MotivationAndBasics_De } from "../components/TopicsContent/MotivationAndBasics_De";
import { MotivationAndBasics_En } from "../components/TopicsContent/MotivationAndBasics_En";
import { renderToStaticMarkup } from "react-dom/server";
import { TableOfContents } from "../components/TableOfContents";

export const MotivationAndBasics = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  if (currentLanguage === "de") {
    const htmlContent = renderToStaticMarkup(<MotivationAndBasics_De />);

    return (
      <>
        <TableOfContents content={htmlContent} />
        <MotivationAndBasics_De />
      </>
    );
  } else if (currentLanguage === "en") {
    const htmlContent = renderToStaticMarkup(<MotivationAndBasics_En />);

    return (
      <>
        <TableOfContents content={htmlContent} />
        <MotivationAndBasics_En />;
      </>
    );
  }
};