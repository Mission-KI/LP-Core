import { useTranslation } from "react-i18next";
import { Functions_En } from "../components/TopicsContent/Functions_En";
import { Functions_De } from "../components/TopicsContent/Functions_De";
import { renderToStaticMarkup } from "react-dom/server";
import { TableOfContents } from "../components/TableOfContents";

const Functions = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  if (currentLanguage === "de") {
    const htmlContent = renderToStaticMarkup(<Functions_De />);

    return (
      <>
        <TableOfContents content={htmlContent} />
        <Functions_De />
      </>
    );
  } else if (currentLanguage === "en") {
    const htmlContent = renderToStaticMarkup(<Functions_En />);

    return (
      <>
        <TableOfContents content={htmlContent} />
        <Functions_En />
      </>
    );
  }
};

export default Functions;
