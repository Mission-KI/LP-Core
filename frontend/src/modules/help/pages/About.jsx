import React from "react";
import { useTranslation } from "react-i18next";
import About_De from "../components/TopicsContent/About_De";
import About_En from "../components/TopicsContent/About_En";
import { renderToStaticMarkup } from "react-dom/server";
import { TableOfContents } from "../components/TableOfContents";

const About = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  if (currentLanguage === "de") {
    const htmlContent = renderToStaticMarkup(<About_De />);

    return (
      <>
        <TableOfContents content={htmlContent} />
        <About_De />
      </>
    );
  } else if (currentLanguage === "en") {
    const htmlContent = renderToStaticMarkup(<About_En />);

    return (
      <>
        <TableOfContents content={htmlContent} />
        <About_En />;
      </>
    );
  }
};

export default About;
