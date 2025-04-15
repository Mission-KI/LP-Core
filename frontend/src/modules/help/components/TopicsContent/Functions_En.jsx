export const Functions_En = () => {
  return (
    <div className="col-md-10">
      <h1 className="bold mb-5">Functions</h1>
      <h5 className="mt-4" id="landingpage">
        Landing Page
      </h5>
      <p className="regular text-justify">
        The landing page offers an easy introduction to the world of
        daseen.{" "}
      </p>
      <p className="regular text-justify">
        The user can first select a data category and in the second step a data
        space or data publisher that provides data in this category. After this
        selection, the user ends up in the corresponding pre-filtered search.
      </p>
      <h5 className="mt-4" id="search">
        Search
      </h5>
      <p className="regular text-justify">
        You can search for so-called Extended Dataset Profiles (EDP) on daseen.
        An EDP is a standardized metadata description of a data set (asset)
        offered by a data provider/publisher directly or via a data portal or
        data space (data source). An asset consists of one or more compressed
        files of a format and a data structure [
        <a href="/help/data-formats-and-analysis#formats">
          more about data formats and strcutures
        </a>
        ].
      </p>
      <p className="regular text-justify">
        In the search results, daseen typically always refers to the data source
        from which the asset referenced in the EDP can be loaded. An exception
        is the assets where the meta information provided by the data source
        only contains a direct download link. For such assets, the EDP refers to
        the direct download link of the asset.
      </p>
      <h5 className="mt-4">Free text search (simple)</h5>
      <p className="regular text-justify">
        You can search for EDP by typing any keywords into the search box. The
        entered search term is compared with the following meta information and
        searched:{" "}
      </p>
      <ul className="regular">
        <li>
          EDP title: A free text string assigned by the data provider for the
          referenced asset. If no title is specified, the EDP displays the file
          name of the asset.{" "}
        </li>
        <li>
          EDP description: A free-text string assigned by the data provider that
          describes the type and content of the asset. If no description has
          been specified, the EDP description is empty.{" "}
        </li>
      </ul>
      <h5 className="mt-4">Search in Expert Mode (Query Language)</h5>
      <p className="regular text-justify">
        Expert Mode is an advanced search feature in daseen that enhances your
        search experience by providing autocomplete suggestions for writing
        natural language queries in Elasticsearch. This allows you to create
        complex queries more efficiently and get accurate results based on
        structured search logic.
      </p>
      <p className="regular text-justify">
        By default, Expert Mode is disabled to make it easier to get started
        with daseen. Users with knowledge of the Elasticsearch Query Language
        can activate the mode via the search settings [
        <a href="/help/functions#expert-mode">learn more</a>].
      </p>
      <h5 className="mt-4" id="query-language">
        Query Language Assistance
      </h5>
      <p>
        Expert mode uses the Elasticsearch Query Language. Extensive
        documentation can be found at
        <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/esql.html">
          Elasticsearch Guide
        </a>{" "}
      </p>
      <h6 className="bold mt-4">Escaping</h6>
      <p>
        While using the standard search, escaping is applied automatically. In
        Expert mode the user needs to ensure proper escaping. The following
        characters must be escaped or avoided if not used intentially as
        operators: &#43; &#45; = && || &#62; &#60; ! &#40; &#41; &#123; &#125;
        &#91; &#93; ^ " ~ * ? : &#92; &#47;
      </p>
      <h6 className="bold mt-4">Field-specific Notes</h6>
      <ul className="regular">
        <li>
          To search for tags, they must be enclosed in quotation marks, e.g.:{" "}
          <i>tags:'BSRN'</i>
        </li>
        <li>
          • Dates follow the format YYYY-MM-DD A corresponding query would be:{" "}
          <i>publishDate: [2024-06-01 TO 2024-12-31]</i>
        </li>
      </ul>
      <h5 className="mt-4">Filter based search</h5>
      <p className="regular text-justify">
        In addition to the free text search, daseen also offers a filter-based
        search. This can be used either alone or in combination with the free
        text search. To start a filter-based search, click Filters below the
        search box. All filters are assigned to a filter category. A distinction
        is made between data structure-independent filters ("general filters")
        and data structure-specific filters.
      </p>
      <p className="regular text-justify">
        Once a filter has been selected, it will be displayed as a filter tag
        below the free text search field. A filter can be deactivated by
        deselecting the filter again or by clicking on the "x" in the filter
        tag.{" "}
      </p>
      <p className="regular text-justify">
        The following filters are currently available:
      </p>
      <h5 className="mt-4">General filters</h5>
      <ul className="regular">
        <li>
          Data Space/Data Portals: The drop-down list can be used to select one
          or more data spaces/data portals to which the search should be
          limited.
        </li>
        <li>
          Publisher: The drop-down list allows one or more publishers to select
          the publish data in a data room/data portal to which the search should
          be restricted.
        </li>
        <li>
          Asset processing: The drop-down list can be used to select one or more
          asset processing states to which the search should be limited. [
          <a href="/help/data-formats-and-analysis#asset-processing-status-section">
            more about the asset processing status
          </a>
          ]
        </li>
        <li>
          Licenses: The drop-down list can be used to select one or more
          licenses to which the search should be limited.
        </li>
        <li>
          Data format: The drop-down list can be used to select one or more data
          formats to which the search should be limited.
        </li>
        <li>
          Open/Closed Access: These icons can be used to select whether the
          search should be limited to assets that do not require (open) or
          require (closed) registration via the EDP data source.
        </li>
        <li>
          Size range: The sliders can be used to set the minimum and/or maximum
          size of an asset in order to be included in the search. In the case of
          archives, this refers to the compressed size of the asset.{" "}
        </li>
      </ul>
      <h5 className="mt-4">Filters for structured data</h5>
      <ul className="regular">
        <li>
          Lines: The sliders can be used to set the minimum and/or maximum
          number of lines an asset must have in order to be included in the
          search.
        </li>
        <li>
          Columns: The sliders can be used to set the minimum and/or maximum
          number of columns an asset must have in order to be included in the
          search.
        </li>
        <li>
          Date Time Attribute: The icon can be used to limit the search to
          assets in which a time has been recognized. [
          <a href="/help/data-formats-and-analysis#date-time-attribute-section">
            more about the Date Time Attribute
          </a>
          ]
        </li>
        <li>
          Temporal Frequency: The icon can be used to limit the search to assets
          where a frequency could be determined in which the data points in the
          asset were generated. [
          <a href="/help/data-formats-and-analysis#temporal-frequency-section">
            more about Temporal Frequency
          </a>
          ]{" "}
        </li>
        <li>
          Data Type Consistency: The icon can be used to limit the search to
          assets in which all values of a column are of the same type. [
          <a href="/help/data-formats-and-analysis#data-type-consistency-section">
            more about Data Type Consistency
          </a>
          ]
        </li>
        <li>
          Significant Variance: The icon can be used to limit the search to
          assets in which a significant variance has been detected. [
          <a href="/help/data-formats-and-analysis#significant-variance-section">
            more about Significant Variance
          </a>
          ]
        </li>
      </ul>
      <h5 className="mt-4">Search results</h5>
      <p className="regular text-justify">
        All EDP shared by a data publisher can be found on daseen using the EDP
        metadata collected. Each EDP is displayed as an EDP entry in the EDP
        Results List (EDP List). The sorting is always carried out according to
        the completeness of the meta-information that can be determined and the
        timeliness of the publication of the EDP. If EDP search or filtering has
        not been enabled, all EDPs are displayed in the EDP list. A maximum of
        12 EDP entries are displayed per page. If the EDP list is larger, you
        can scroll back and forth in the EDP list using a scroll function at the
        bottom of the page. In addition to an EDP list view, an EDP tile view
        can also be selected. This also contains a maximum of 12 EDP entries per
        page.{" "}
      </p>
      <h5 className="mt-4">EDP list view</h5>
      In the EDP list view, each EDP entry consists of the following searchable
      information:
      <ul className="regular">
        <li>
          EDP Title: The EDP title is a free text assigned by the data
          publisher. If no EDP title has been assigned, the file name of the
          asset is displayed. If you click on the EDP title, you get to the EDP
          detail view.
        </li>
        <li>
          EDP Description: The description is a free text entered by the Data
          Publisher to describe the contents of the asset. If no EDP description
          has been assigned, the field is empty.
        </li>
        <li>
          EDP Data Source: The Data Source field specifies the name and URL of
          which data source can be used to load the asset.
        </li>
        <li>
          EDP Data Publisher: The EDP Data Publisher field specifies the name
          and URL of the data provider that offers the asset and published the
          EDP.
        </li>
        <li>
          EDP Data Structure: The EDP Data Structure field specifies the
          recognized data structure of the asset and the file extension (in
          parentheses).
        </li>
        <li>
          EDP Size: The EDP Size field specifies the file size of the asset. If
          the asset is offered compressed, the size of the compressed asset is
          displayed.
        </li>
        <li>
          EDP License: The EDP License field specifies the name and, if
          available, the URL to the data license under which the asset is
          offered by the EDP Data Publisher. If no data license is specified,
          the field is None.
        </li>
        <li>
          EDP Publish Date: The EDP publish date indicates when the asset was
          published to the EDP Data Source by the EDP Data Publisher.
        </li>
        <li>
          Extended menu: The three dots on the right edge can be used to trigger
          further actions on the EDP. The following functions are currently
          supported:
          <ul className="regular">
            <li>
              Bookmark/Remove Bookmark [
              <a href="/help/functions#bookmarks">learn more</a>]
            </li>
            <li>
              Get Dataset [<a href="/help/functions#get-asset">learn more</a>]
            </li>
          </ul>
        </li>
        <li>
          EDP Quick-View: Clicking on this icon opens the EDP Quick View, which
          contains all essential data science information about an asset. [
          <a href="/help/data-formats-and-analysis#formats">
            more about the information and analyses included
          </a>
          ]{" "}
        </li>
        <li>
          EDP Asset Properties: The EDP Asset Properties display essential asset
          properties [
          <a href="/help/data-formats-and-analysis#asset-properties-general">
            more about general asset properties
          </a>{" "}
          /{" "}
          <a href="/help/data-formats-and-analysis#asset-properties-structured">
            more about specific asset properties for structured data
          </a>
          ].
        </li>
      </ul>
      <h5 className="mt-4">EDP tile view</h5>
      In the EDP tile view, each EDP entry consists of the following searchable
      information (see EDP list view for details):
      <ul className="regular">
        <li>EDP Title</li>
        <li>EDP Description</li>
        <li>EDP Data Source</li>
        <li>EDP Publisher</li>
        <li>EDP Data Structure</li>
        <li>EDP Size</li>
        <li>EDP Asset Properties</li>
        <li>Extended Menu</li>
      </ul>
      <h5 className="mt-4">Bookmarks</h5>
      <p className="regular text-justify">
        By clicking on "Bookmark" an EDP can be selected and saved in the
        bookmark list. If an EDP entry is marked with a bookmark, this is
        indicated by a star icon. All bookmarked EDPs can be viewed from the
        Bookmarks page (see Bookmarks page). By clicking on Remove bookmark, a
        bookmark for an EDP entry can be deleted.
      </p>
      <h5 className="mt-4">Functions per EDP</h5>
      <h5 className="mt-4">Detail View</h5>
      <p className="regular text-justify">
        The detailed view of an EDP provides different information depending on
        the data type. In addition to some generic metadata, which is uniformly
        available for each data type, further analyses are carried out depending
        on the structure and type and correspondingly optimized views are
        provided{" "}
        <a href="/help/data-formats-and-analysis#formats">learn more</a>].
      </p>
      <h5 className="mt-4" id="get-asset">
        Get dataset
      </h5>
      <p className="regular text-justify">
        By clicking on Get Dataset, there is a redirect (referral) to the
        download page where the asset can be loaded. The following applies:{" "}
      </p>
      <ul className="regular">
        <li>
          If no asset URL of the data source has been provided, but only the
          download link of the data provider to download the asset, the EDP is
          directly linked to the asset URL.{" "}
        </li>
        <li>
          If an asset URL of the data source has been entered, the EDP is linked
          to this page, which is accessed in the browser via a new page/tab.
        </li>
        <li>
          If no asset URL of the data source has been provided (usually the case
          with closed access data sources), the EDP is linked to the standard
          URL of the data source.
        </li>
      </ul>
      <h5 className="mt-4">Get Schema</h5>
      This button can be used to download the version of the EDP schema used to
      create the EDP.
      <h5 className="mt-4"> Get Report (pdf)</h5>A summary of the EDP data can
      be downloaded via the button "Report (pdf)".
      <h5 className="mt-4">Silimar EDP</h5>
      This function provides additional EDP that have similar characteristics to
      the currently selected EDP.
      <h5 className="mt-4"> Settings</h5>
      <h5 className="mt-4">Language</h5>
      In the language settings, you can switch between the German and English
      languages of the interface. Some EDP-specific content will continue to be
      displayed in the original English term of metadata in the German version.
      <h5 className="mt-4"> Theme</h5>
      Here, the user can choose between a light and a dark mode.
      <h5 className="mt-4"> Search settings</h5>
      <h5 className="mt-4" id="expert-mode">
        Expert Mode
      </h5>
      <h5 className="mt-5"> How to use Expert Mode</h5>
      <ul className="regular">
        <li>
          You can enable or disable Expert Mode in the <strong>Settings</strong>{" "}
          page.
        </li>
        <li>
          When <strong>Expert Mode is ON</strong>, the search bar will provide
          autocomplete suggestions to help you write more refined Elasticsearch
          queries.
        </li>
        <li>
          When <strong>Expert Mode is OFF</strong>, the search bar will only
          suggest basic asset names, making it easier for general users to find
          data assets without needing advanced query syntax.
        </li>
      </ul>
      <h5 className="mb-3 mt-5">What happens if you use the wrong syntax?</h5>
      <ul className="regular">
        <li>
          If your query is incorrectly formatted, Elasticsearch may return an
          error or unexpected results.
        </li>
        <li>
          Autocomplete suggestions aim to guide you toward valid queries, but
          it's still important to check your syntax before running a search.
        </li>
        <li>
          If you're unsure how to structure your query, you can refer to our [
          <a href="/help/functions#query-language">Query Language Assistance</a>
          ] or disable Expert Mode for a simpler search experience.
        </li>
      </ul>
      <h5 className="mb-3 mt-5">When should you use Expert Mode?</h5>
      <ul className="regular">
        <li>
          If you are familiar with Elasticsearch query syntax and want more
          control over your search results.
        </li>
        <li>
          When performing advanced searches that require filtering,
          aggregations, or custom queries.
        </li>
        <li>
          If you need more precise and powerful search capabilities beyond
          simple asset name lookups.
        </li>
      </ul>
      <h5 className="mt-4">Always expand filters</h5>
      <p className="regular text-justify">
        If the option is deactivated, the filters can be shown and hidden using
        the filter button below the search field.
      </p>
      <p className="regular text-justify">
        If the option is activated, the filters are displayed by default.
      </p>
    </div>
  );
};
