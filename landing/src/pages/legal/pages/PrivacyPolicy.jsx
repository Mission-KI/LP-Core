import { useTranslation } from "react-i18next";

function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="container pt-5">
      <div
        dangerouslySetInnerHTML={{ __html: t("privacyPolicy.fullContent") }}
      />
    </div>
  );
}

export default PrivacyPolicy;
