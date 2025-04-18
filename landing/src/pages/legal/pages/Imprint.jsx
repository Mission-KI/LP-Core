import { useTranslation } from "react-i18next";

function Imprint() {
  const { t } = useTranslation();

  return (
    <div className="container pt-5">
      <div dangerouslySetInnerHTML={{ __html: t("imprint.fullContent") }} />
    </div>
  );
}

export default Imprint;
