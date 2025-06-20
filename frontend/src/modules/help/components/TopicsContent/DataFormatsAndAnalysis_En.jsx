import analysisImg from "../../assets/img/analysis.png";

export const DataFormatsAndAnalysis_En = () => {
  return (
    <div className="col-md-10">
      <h1 className="bold mb-5">Data Formats and Analyses</h1>
      <h4 className="mt-5 mb-3" id="supported-data-formats">
        Supported data formats
      </h4>
      A distinction is made between the following data formats:
      <ul className="regular text-justify">
        <li>Archive</li>
        <li>Documents</li>
        <li>Structured Text</li>
        <li>Semi-structured Text</li>
        <li>Unstructured Text</li>
        <li>Images</li>
        <li>Videos</li>
        <li>Audio</li>
        <li>Graphs (not supported yet, roadmap)</li>
      </ul>
      <p className="regular text-justify">
        A data asset is analyzed in EDPS on the basis of the analysis procedures
        shown in the following illustration:
      </p>
      <img src={analysisImg} className="w-100" alt="Analysis procedures" />
      <h4 className="mt-5 mb-3" id="data-structures">
        Data structures
      </h4>
      <p className="regular text-justify">
        Archives and documents can contain additional elements of any of the
        formats listed above.
      </p>
      <p className="regular text-justify">
        Semi-structured text can contain further structured text elements. Text
        can contain further structured text elements.
      </p>
      <h4 className="mt-5 mb-3" id="analyses">
        Analyses
      </h4>
      <p className="regular text-justify">
        For all data formats the corresponding EDP contains a basis of
        standardized. There are also additional analyses and information
        provided depending on the data format.
      </p>
      <h5 className="mt-4" id="general-analyses">
        General analyses for all data formats
      </h5>
      <h6 className="bold mt-4" id="asset-properties-general">
        Asset Properties
      </h6>
      <p className="fw-500 regular mt-3" id="open-access-section">
        Open Access
      </p>
      <p className="regular text-justify">
        This icon indicates that an asset can be accessed via the EDP data
        source without registration.
      </p>
      <p className="fw-500 regular mt-3" id="closed-access-section">
        Closed Access
      </p>
      <p className="regular text-justify">
        This icon indicates that an asset can only be accessed after
        registration via the EDP data source.
      </p>
      <p className="fw-500 regular mt-3" id="asset-processing-status-section">
        Asset Processing Status
      </p>
      <p className="regular text-justify">
        The Asset Processing Status indicates the degree of data maturity.
      </p>
      <p className="regular text-justify">
        A distinction is made between the following states:
      </p>
      <ul className="regular text-justify">
        <li>
          <span className="fw-500">Original Data:</span> The content of the
          asset has not been changed after creation.
        </li>
        <li>
          <span className="fw-500">Processed Data:</span> The content of the
          asset has been completely or partially redefined, converted,
          semantically cleansed and/or transformed after creation in order to
          improve the asset structure and/or increase consistency.
        </li>
        <li>
          <span className="fw-500">Refined Data:</span> Assets with the maturity
          level Refined Data are optimized AI training data sets that combine
          data from one or more assets.
        </li>
        <li>
          <span className="fw-500">AI/ML Result Data:</span> Assets with the
          maturity level AI/ML Result Data are data generated by an AI or an ML
          algorithm.
        </li>
      </ul>
      <p className="fw-500 regular mt-3" id="allowed-for-ai-section">
        Allowed for AI Training
      </p>
      <p className="regular text-justify">
        This icon indicates whether the asset may be used for AI training.
        Licenses such as Deutschland 2.0-Zero, PDDL and cc-zero are recommended
        for AI/KI training with publicly provided data (eGov data), as they
        allow the necessary analysis and processing of the data to ensure AI
        compliance. This requires qualitatively validated / curated data: For
        simple AI systems according to Recital 27 of the AI Regulation; or for
        high-risk according to Art. 10 AI Regulation.{" "}
      </p>
      <p className="fw-500 regular mt-3" id="version-information">
        Version information
      </p>
      <p className="regular text-justify">
        Different version information can be distinguished for an asset:
      </p>
      <ul className="regular text-justify">
        <li>
          <span className="fw-500">EDP Version:</span> Version number within
          daseen. This indicates how often the EDP has been successfully
          uploaded/updated in daseen (initial version: 1).
        </li>
        <li>
          <span className="fw-500">Asset Version:</span>Version number of the
          asset in the data space transmitted by the data publisher. This is
          optional.
        </li>
        <li>
          <span className="fw-500">Schema Version:</span> Version of the EDP
          schema that was used to create the EDP. The corresponding schema can
          be downloaded from the EDP details page.
        </li>
        <li>
          <span className="fw-500">EDP Service Version:</span> Version of the
          toolchain used to generate the EDP.
        </li>
      </ul>
      <p className="fw-500 regular mt-3">
        Data format specific asset properties
      </p>
      <p className="regular text-justify">
        For structured data additional asset properties are evaluated [
        <a href="/help/data-formats-and-analysis#asset-properties-structured">
          learn more
        </a>
        ].
      </p>
      <h6 className="bold mt-4" id="data-science-info-general">
        Data Science Info
      </h6>
      <p className="fw-500 regular mt-3">Data format</p>
      <p className="regular text-justify">
        The data format of the EDP or, in the case of nested structures, the
        selected element is displayed here.
      </p>
      <p className="fw-500 regular mt-3">File type</p>
      <p className="regular text-justify">
        In addition to the categorization of the data format, the actual file
        type is also displayed.
      </p>
      <p className="fw-500 regular mt-3">Volume</p>
      <p className="regular text-justify">
        Here you see the size of the original asset, in case of an archive it is
        therefore the compressed size.
      </p>
      <p className="fw-500 regular mt-3">Languages</p>
      <p className="regular text-justify">
        The asset is checked for the languages it contains.
      </p>
      <p className="fw-500 regular mt-3">Transfer type</p>
      <p className="regular text-justify">
        A distinction is made here between static and inflationary data.
      </p>
      <p className="fw-500 regular mt-3">Immutability</p>
      <p className="regular text-justify">
        This is the semantic information as to whether it can be expected that
        the data set will be changed in the future ("mutable") or not
        ("immutable").
      </p>
      <p className="fw-500 regular mt-3">
        Data format specific information in the Data Science Info
      </p>
      <p className="regular text-justify">
        For the following data formats, there is additional information
        available in the Data Science Info:
        <ul className="regular text-justify">
          <li>
            <a href="/help/data-formats-and-analysis#data-science-info-archive">
              Archives
            </a>
          </li>
          <li>
            <a href="/help/data-formats-and-analysis#data-science-info-structured">
              Structured Data
            </a>
          </li>
        </ul>
      </p>
      <h5 className="mt-4" id="additonal-analyes-archives">
        Additional Analyses for Archives
      </h5>
      <h6 className="bold mt-4" id="data-science-info-archive">
        Data Science Info
      </h6>
      <p className="fw-500 regular mt-3">Compression</p>
      <p className="regular text-justify">
        Here you can see the algorithm applied for compression.
      </p>
      <p className="fw-500 regular mt-3">Uncompressed Volume</p>
      <p className="regular text-justify">
        In addition to the volume shown above, which shows the compressed size,
        the size of the unzipped archive is visible at this point.
      </p>
      <h6 className="bold mt-4" id="tab-asset-structure-archive">
        Tab: Asset Structure
      </h6>
      <p className="regular text-justify">
        This tab provides an overview of the structure of the archive. By
        clicking on the embedded files, you jump to the respective details of
        the selected element (view according to the respective data format). The
        breadcrumb navigation allows the user to return to the parent element.
      </p>
      <h5 className="mt-4" id="additonal-analyes-documents">
        Additional Analyses for Documents
      </h5>
      <h6 className="bold mt-4" id="tab-document">
        Tab: Document
      </h6>
      <p className="regular text-justify">
        This tab provides an overview with the following details:
        <ul className="regular text-justify">
          <li>Title of the document</li>
          <li>Subject</li>
          <li>Author</li>
          <li>Toolchain</li>
          <li>Creation Date</li>
          <li>Date of Last Modification</li>
          <li>Tags</li>
          <li>Document Type</li>
          <li>Number of Pages</li>
          <li>Number of Images</li>
          <li>Modified</li>
          <li>Encrypted</li>
        </ul>
      </p>
      <h6 className="bold mt-4" id="tab-asset-structure-documents">
        Tab: Asset Structure
      </h6>
      <p className="regular text-justify">
        This tab provides an overview of the structure of the document. By
        clicking on the embedded tables and images, you jump to the respective
        tab, which contains further details. By clicking on other embedded
        elements, you jump to the respective detail view of the selected
        element.
      </p>
      <h6 className="bold mt-4" id="tab-embedded-tables-documents">
        Tab: Embedded Tables
      </h6>
      <p className="regular text-justify">
        If available, this tab provides more details about the tables contained
        in the document.
      </p>
      <h6 className="bold mt-4" id="tab-embedded-images-documents">
        Tab: Embedded Images
      </h6>
      <p className="regular text-justify">
        If available, this tab provides further details about the images
        contained in the document (data analogous to
        <a href="/help/data-formats-and-analysis#tab-image">
          data format Images - Tab: Image
        </a>
        ).
      </p>
      <h5 className="mt-4" id="additonal-analyes-structured">
        Additional Analyses for Structured Data
      </h5>
      <h6 className="bold mt-4" id="asset-properties-structured">
        Asset Properties
      </h6>
      <p className="fw-500 regular mt-3" id="date-time-attribute-section">
        Date Time Attribute
      </p>
      <p className="regular text-justify">
        This icon indicates whether a time has been detected in the asset. If
        so, it tries to determine the temporal coverage (from, to) and frequency
        of the data points in the asset.{" "}
      </p>
      <p className="fw-500 regular mt-3" id="temporal-frequency-section">
        Temporal Frequency
      </p>
      <p className="regular text-justify">
        This icon indicates whether a frequency could be determined at which the
        data points in the asset were generated. If so, it is examined whether
        there are gaps and, if so, how many.{" "}
      </p>
      <p className="fw-500 regular mt-3" id="data-type-consistency-section">
        Data Type Consistency
      </p>
      <p className="regular text-justify">
        This icon indicates whether all values in a column in a structured data
        asset are of the same type. If not, the corresponding tab in the detail
        view can be used to see for which attributes inconsistencies have been
        determined.
      </p>
      <p className="fw-500 regular mt-3" id="attribute-integrity-section">
        Attribute Integrity
      </p>
      <p className="regular text-justify">
        This icon indicates whether a value exists for each column and row in a
        structured text data asset. If not, you can use the corresponding tab in
        the detail view to see how many values are missing for per column.
      </p>
      <p className="fw-500 regular mt-3" id="significant-variance-section">
        Significant Variance
      </p>
      <p className="regular text-justify">
        This icon indicates whether a significant variance could be found in the
        asset's data. If so, the asset is scanned for different distributions.
        The results are documented in the corresponding tab in the detail view
        in graphical and tabular form.{" "}
      </p>
      <h6 className="bold mt-4" id="data-science-info-structured">
        Data Science Info
      </h6>
      <p className="regular text-justify">
        In addition to the general information in the Data Science Info section
        for all data formats, further information is highlighted in the case of
        structured data.{" "}
      </p>
      <p className="fw-500 regular mt-3">Data types</p>
      <p className="regular text-justify">
        This shows how many columns of this type are contained in the asset for
        each type of numeric, string, and date/time that exists in the asset. A
        detailed view of the individual columns can be found in the Attribute
        List tab.
      </p>
      <p className="fw-500 regular mt-3">Temporal Cover</p>
      <p className="regular text-justify">
        If there are date/time columns in the asset, the time period covered in
        the data is specified here.
      </p>
      <p className="fw-500 regular mt-3">Temporal Consistency</p>
      <p className="regular text-justify">
        If there are date/time columns in the asset, the lowest, gapless unit of
        time is highlighted here. More detailed information can be found in the
        corresponding tab of the same name.{" "}
      </p>
      <p className="fw-500 regular mt-3">Number of Columns</p>
      <p className="regular text-justify">
        Here you can find the number of all columns contained in the asset.
      </p>
      <p className="fw-500 regular mt-3">Number of Lines</p>
      <p className="regular text-justify">
        Here you can find the number of all rows contained in the asset.
      </p>
      <p className="fw-500 regular mt-3">Top 3 Numeric Distributions</p>
      <p className="regular text-justify">
        The most common numerical value distributions that occurred in this
        asset will emerge here. A complete overview of the value distributions
        per numeric column can be found in the{" "}
        <i>Numerical Value Distributions</i> tab.{" "}
      </p>
      <p className="fw-500 regular mt-3">String Value Distribution</p>
      <p className="regular text-justify">
        Here it is summarized whether the string columns contained in the asset
        are completely ("all") or predominantly ("many") homogeneous or
        heterogeneous distributed. Detailed information can be found in the
        corresponding tab.
      </p>
      <p className="fw-500 regular mt-3">Numeric Correlation Analysis</p>
      <p className="regular text-justify">
        The detailed pairwise correlations between numeric attributes in an
        asset can be found in the corresponding tab. In the Data Science Info, a
        summary is formed for simplified search and filtering:
      </p>
      <ul className="regular text-justify">
        <li>“no correlation”: There is no such correlation in the EDP.</li>
        <li>
          “partial correlation”: There is at least one correlation that is above
          0.5 or below -0.5.
        </li>
        <li>
          “strong correlation”: There is at least one correlation that is above
          0.8 or below -0.8.
        </li>
      </ul>
      <p className="fw-500 regular mt-3">Numeric Outlier Analysis</p>
      <p className="regular text-justify">
        For easier search and filtering, the <i>outlierRelativeCount</i>{" "}
        provides the average percentage of anomalies across the percentile,
        zScore, and IQR, the details of which can be viewed in the corresponding
        tab.
      </p>
      <ul className="regular text-justify">
        <li>“no outliers”: There are no anomalies.</li>
        <li>
          “few outliers”: The average proportion of anomalies is up to 5%.
        </li>
        <li>
          “many outliers”: The average proportion of anomalies is more than 5%.
        </li>
      </ul>
      <h6 className="bold mt-4" id="tab-attribute-list">
        Tab: Attribute List
      </h6>
      <p className="regular text-justify">
        The attribute list specifies the name, type (
        <i>numeric, string, date/time</i>), the specification, and any
        periodicity determined for each column contained in the asset.
        Periodicity describes an interval determined for date/time columns in
        which data is collected.
      </p>
      <h6 className="bold mt-4" id="tab-attribute-integrity">
        Tab: Attribute Integrity
      </h6>
      <p className="regular text-justify">
        The attribute integrity table indicates whether and how many values are
        missing for each column contained in the asset.
      </p>
      <h6 className="bold mt-4" id="tab-temporal-consistency">
        Tab: Temporal Consistency
      </h6>
      <p className="regular text-justify">
        The temporal consistency table provides gap-free information per unit of
        time for all date/time columns contained in the asset.
      </p>
      <h6 className="bold mt-4" id="tab-numeric-value-distribution">
        Tab: Numeric Value Distribution
      </h6>
      <p className="regular text-justify">
        This tab contains graphs and a table for the statistical distribution of
        values per numeric attribute. In each case, the determined statistical
        distribution is given as well as a counter of how many different values
        per attribute were found in an asset. The most common value
        distributions that occurred in this asset are also highlighted in the
        Data Science Info.
      </p>
      <p className="regular text-justify">
        The following distributions are examined:
        <ul className="regular text-justify">
          <li>Cauchy</li>
          <li>Exponpow</li>
          <li>Gamma</li>
          <li>Norm</li>
          <li>Powerlaw</li>
          <li>Rayleigh</li>
          <li>Uniform</li>
          <li>Maxwell</li>
        </ul>
      </p>
      <h6 className="bold mt-4" id="tab-string-value-distribuion">
        Tab: String Value Distribution
      </h6>
      <p className="regular text-justify">
        This tab contains graphs and a table of the categorical frequency of
        values per string-based attribute in an asset. A distinction is made
        between a homogeneous or heterogeneous distribution. A summed up
        information on the prevailing value distribution in the entire asset is
        also highlighted in the Data Science Info.
      </p>
      <h6 className="bold mt-4" id="tab-numeric-correlation-analysis">
        Tab: Numeric Correlation Analysis
      </h6>
      <p className="regular text-justify">
        This tab contains a graph for determining pairwise correlations between
        numeric attributes in an asset. A pink tint indicates a strong positive
        correlation, the values of both attributes move in the same direction.
        With a blue coloration, there is a strong negative correlation, the
        values of the attributes move in opposite directions. In the case of
        gray coloration, there is no or hardly any correlation.
      </p>
      <h6 className="bold mt-4" id="tab-numeric-outlier-analysis">
        Tab: Numeric Outlier Analysis
      </h6>
      <p className="regular text-justify">
        This tab contains graphs as well as a table for detecting anomalies in
        the values of the asset's numeric attributes. Several methods were
        carried out to determine these (percentile-based, Z-score and
        inter-quartile range). The list provides the statistical, quantized
        anomaly distributions per procedure as well as the number of anomalies
        detected per attribute in an asset.
      </p>
      <h6 className="bold mt-4" id="tab-data-seasonality">
        Tab: Data Seasonality
      </h6>
      <p className="regular text-justify">
        Dieser Tab bietet Grafiken, welche den zeitlichen Verlauf numerischer
        Attribute visuallisieren (Original Data). Des Weiteren werden
        periodische Aktivitäten innerhalb dieser Daten analysiert und
        visualisiert (seasonality). Dies sind Schwankungen eines Attributes,
        welche in zeitlich regelmäßigen Abständen wiederkehren. Der grobe
        Verlauf eines Attributes ohne die periodischen Einflüsse, wird als Trend
        bezeichnet und ist ebenso einsehbar. Alle Anteile eines Attributes,
        welche nicht von Trend und Saisonalität hergeleitet werden können, sind
        die so genannten “Residuals”.
      </p>
      <h5 className="mt-4" id="additional-analyses-semi-structured">
        Additional Analyses for semi-structured Texts
      </h5>
      <h6 className="bold mt-4" id="tab-asset-structure-semi-structured">
        Tab: Asset Structure
      </h6>
      <p className="regular text-justify">
        This tab provides an overview of the structure of the asset. A
        semi-structured text can contain any number of structured texts. By
        clicking on one of these embedded structured elements, you jump to the
        respective detailed view.
      </p>
      <h6 className="bold mt-4" id="tab-schema-semi-structured">
        Tab: Schema
      </h6>
      <p className="regular text-justify">
        This tab provides an overview of the schema of the asset.{" "}
      </p>
      <h5 className="mt-4" id="additional-analyses-unstructured">
        Additional Analyses for unstructured Texts
      </h5>
      <h6 className="bold mt-4" id="tab-unstructured">
        Tab: Unstructured Text
      </h6>
      <p className="regular text-justify">
        This tab provides an overview with the following details:
        <ul className="regular text-justify">
          <li>Languages</li>
          <li>Number of lines</li>
          <li>Numbers of words</li>
          <li>
            Word-Cloud - Graphical representation of the frequency of keywords
            in the text
          </li>
        </ul>
      </p>
      <h6 className="bold mt-4" id="tab-embedded-tables-unstructured">
        Tab: Embedded Tables
      </h6>
      <p className="regular text-justify">
        If available, this tab provides more details about the tables contained
        in the document.
      </p>
      <h5 className="mt-4" id="additional-analyses-images">
        Additional Analyses for Images
      </h5>
      <h6 className="bold mt-4" id="tab-image">
        Tab: Image
      </h6>
      <p className="regular text-justify">
        This tab provides an overview with the following details:
        <ul className="regular text-justify">
          <li>Codec</li>
          <li>Color Mode</li>
          <li>Resolution</li>
          <li>Width</li>
          <li>Height</li>
          <li>DPI (dots per inch)</li>
          <li>Brightness</li>
          <li>Blurriness</li>
          <li>Sharpness</li>
          <li>Brisque</li>
          <li>Noise</li>
          <li>Low Contrast (true or false)</li>
          <li>elaScore</li>
        </ul>
      </p>
      <h5 className="mt-4" id="additional-analyses-videos">
        Additional Analyses for Videos
      </h5>
      <h6 className="bold mt-4" id="tab-video">
        Tab: Video
      </h6>
      <p className="regular text-justify">
        This tab provides an overview with the following details:
        <ul className="regular text-justify">
          <li>Codec</li>
          <li>Resolution</li>
          <li>FPS (frames per second)</li>
          <li>Duration (in seconds)</li>
          <li>Pixel Format</li>
        </ul>
      </p>
      <h5 className="mt-4" id="additional-analyses-audio">
        Additional Analyses for Audio Data
      </h5>
      <h6 className="bold mt-4" id="tab-audio">
        Tab: Audio
      </h6>
      <p className="regular text-justify">
        This tab provides an overview with the following details:
        <ul className="regular text-justify">
          <li>Codec</li>
          <li>Channels</li>
          <li>Duration (in seconds)</li>
          <li>Sample Rate (in seconds)</li>
          <li>Bit Rate (per second)</li>
          <li>Bits per Sample</li>
          <li>Spectogram (diagram of the frequency distribution over time)</li>
        </ul>
      </p>
    </div>
  );
};
