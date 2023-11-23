// the hook
import { useTranslation } from "react-i18next";

function LocaleSample() {
  const { t, i18n } = useTranslation("translation");
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className="App">
      <div className="App-header">
        <div>{t("title")}</div>
        <button type="button" onClick={() => changeLanguage("kr")}>
          kr
        </button>
        <button type="button" onClick={() => changeLanguage("en")}>
          en
        </button>
      </div>
      <div>{t("description.part2")}</div>
    </div>
  );
}

export default LocaleSample;
