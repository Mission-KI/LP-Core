import { useTranslation } from "react-i18next";
import { DataFormatsAndAnalysis_De } from "../components/TopicsContent/DataFormatsAndAnalysis_De";
import { DataFormatsAndAnalysis_En } from "../components/TopicsContent/DataFormatsAndAnalysis_En";
import { TableOfContents } from "../components/TableOfContents";
import { renderToStaticMarkup } from "react-dom/server";

export const DataFormatsAndAnalysis = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  if (currentLanguage === "de") {
    const htmlContent = renderToStaticMarkup(<DataFormatsAndAnalysis_De />);

    return (
      <>
        <TableOfContents content={htmlContent} />
        <DataFormatsAndAnalysis_De />
      </>
    );
  } else {
    const htmlContent = renderToStaticMarkup(<DataFormatsAndAnalysis_En />);

    return (
      <>
        <TableOfContents content={htmlContent} />
        <DataFormatsAndAnalysis_En />
      </>
    );
  }
};
