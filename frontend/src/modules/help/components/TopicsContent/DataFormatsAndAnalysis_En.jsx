import InfoAlert from "../../../common/components/InfoAlert";

export const DataFormatsAndAnalysis_En = () => {
  return (
    <div className="col-md-10">
      <h1 className="bold mb-3">Data Formats and Analysis</h1>
      <InfoAlert text="More content for English help pages will follow soon." />
      <p className="regular text-justify mt-5">
        Essential asset properties are displayed via the EDP asset properties.
        These include the following elements:
      </p>
      <ul className="regular text-justify">
        <li className="py-2">
          <span className="fw-500">EDP Quick View:</span> Clicking on this icon
          opens the EDP Quick View, which contains all the key data science
          information about an asset (see also EDP Quick View).
        </li>
        <li className="py-2" id="open-access-section">
          <span className="fw-500">Open Access:</span> This icon indicates that
          an asset can be accessed via the EDP data source without registration.
        </li>
        <li className="py-2" id="closed-access-section">
          <span className="fw-500">Closed Access:</span> This icon indicates
          that an asset can only be accessed via the EDP data source after
          registration.
        </li>
        <li className="py-2" id="date-time-attribute-section">
          <span className="fw-500">Date Time Attribute:</span> This icon shows
          whether a time specification has been recognized in the asset. If yes,
          an attempt is made to determine the temporal coverage (from, to) and
          the frequency of the data points in the asset.
        </li>
        <li className="py-2" id="temporal-frequency-section">
          <span className="fw-500">Temporal Frequency:</span> This icon shows
          whether a frequency could be determined in which the data points in
          the asset were generated. If so, the system checks whether there are
          any gaps and if so, how many.
        </li>
        <li className="py-2" id="data-type-consistency-section">
          <span className="fw-500">Data Type Consistency:</span> This icon shows
          whether all values in a column of a structured text data asset are of
          the same type. If not, the EDP Detail View (see EDP Detail View) can
          be used to see for which attributes inconsistencies have been
          determined.
        </li>
        <li className="py-2" id="attribute-integrity-section">
          <span className="fw-500">Attribute integrity:</span> This icon shows
          whether a value exists for each column and row in a structured text
          data asset. If not, the EDP Detail View (see EDP Detail View) can be
          used to see how many values have been determined for each column and
          row.
        </li>
        <li className="py-2" id="significant-variance-section">
          <span className="fw-500">Significant Variance:</span> This icon
          indicates whether a significant variance was found in the asset data.
          If so, the asset is examined for different distributions. The results
          are documented in graphical and tabular form in the EDP Detail View
          (see EDP Detail View).
        </li>
        <li className="py-2" id="geo-location-section">
          <span className="fw-500">Geo Location Attribute:</span> This icon
          indicates whether an asset contains geolocation information.
        </li>
        <li className="py-2" id="personal-data-section">
          <span className="fw-500">Personal Data:</span> This icon indicates
          whether an asset contains personal data. If so, the order data
          agreement provided by the data provider is linked, if available.
        </li>
        <li className="py-2" id="asset-processing-status-section">
          <span className="fw-500">Asset processing status:</span> The asset
          processing status indicates the degree of data maturity. A distinction
          is made between the following states:
          <ul className="regular text-justify circles-list">
            <li className="py-2">
              <span className="fw-500">Original Data:</span> The content of the
              asset has not been changed after creation.
            </li>
            <li className="py-2">
              <span className="fw-500">Processed Data:</span> The content of the
              asset was redefined, converted, semantically cleansed and/or
              transformed in whole or in part after creation in order to improve
              the asset structure and/or increase consistency. The changes made
              are logged in the EDP Data Log (see also EDP Data Log) and the
              Original Data EDP is referenced for traceability.
            </li>
            <li className="py-2">
              <span className="fw-500">Refined Data:</span> Assets with the
              maturity level Refined Data are optimized AI training data sets
              that combine data from one or more assets. The feature engineering
              rules and aggregations performed are documented in the EDP Data
              Log and the Processed Data or Original Data EDP is referenced for
              traceability.
            </li>
            <li className="py-2">
              <span className="fw-500">AI/ML Result Data:</span> Assets with the
              maturity level AI/ML Result Data are data generated by an AI or an
              ML algorithm. Both the AI/ML information and the EDP of the
              Refined Data/Processes Data and/or Original Data Assets used for
              training or inference are referenced in the EDP Data Log.
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
