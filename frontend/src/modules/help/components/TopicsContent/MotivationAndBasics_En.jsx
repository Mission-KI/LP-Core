import target_architecture from "../../assets/img/target_architecture.png";

export const MotivationAndBasics_En = () => {
  return (
    <div className="col-md-10">
      <h1 className="bold mb-3">Motivation and Basics</h1>
      <h5 className="mt-5 mb-3" id="motivation">
        Motivation
      </h5>
      <p className="regular text-justify">
        Trustworthy artificial intelligence (“AI”) requires for effective
        training and precise predictions above all high-quality data. Although
        enormous amounts of data are generated every day, only part of it is
        available in a usable, curated form. One central challenge is that there
        is currently no search function that can be used to search across
        different data spaces and portals based on analytical properties and
        independently of the numerous domain-specific ontologies.
      </p>
      <p className="regular text-justify">
        This is where the Dataset Search Engine (“daseen”) in conjunction with
        the distributed microservice Extended Dataset Profile Service (“EDPS”)
        gets in action. With the help of EDPS, data assets are analyzed as
        closely as possible and as close as necessary to the data provider for
        their analytical properties. These are then standardized and summarized
        machine-readable in an Extended Dataset Profile (“EDP”). The EDP can be
        flexibly customized with data providers and ontology specific metadata
        such as a description, the processing status or data license terms.
        After approval by the data provider, the EDP can then be published on
        daseen and the data asset can be found across data portals and data
        spaces using all metadata stored in the EDP. The actual asset always
        remains with the provider.
      </p>
      <p className="regular text-justify">
        To simplify access to the world of data, the EDP are pre-sorted
        according to the following categories in an upstream landing page:
      </p>
      <ul className="regular text-justify">
        <li>Mobility and transportation</li>
        <li>Administration and public sector</li>
        <li>Industry and production</li>
        <li>Geodata and weather</li>
        <li>Environment, food and agriculture</li>
        <li>Energy</li>
        <li>Culture and Media</li>
        <li>Health, pharmaceuticals and medicine</li>
        <li>Education, research and science</li>
        <li>Real estate and finance</li>
      </ul>
      <p className="regular text-justify">
        The search can be called up directly via the link{" "}
        <a href="https://app.daseen.de/" target="_blank">
          app.daseen.de
        </a>{" "}
      </p>
      <p className="regular text-justify">
        The following graphic illustrates the underlying target
        architecture.{" "}
      </p>
      <img
        src={target_architecture}
        alt="Zielarchitektur"
        className="w-100 my-4"
      />
      <h5 className="mt-5 mb-3" id="target-groups">
        Target groups and use cases
      </h5>
      <p className="regular text-justify">
        The following paragraph describes the different target groups and use
        cases.{" "}
      </p>
      <p className="regular text-justify">
        The following three user groups and main use cases are distinguished:
      </p>
      <ul className="regular text-justify">
        <li>
          Data users: Targeted search for content-related, commercial, legal and
          analytically suitable data sets for data-based analyses, training and
          AI models or other data services.
        </li>
        <li>
          Data publishers/providers: Automated and standardized creation of a
          comprehensive metadata description for your own data sets ensures
          better findability and evaluation - without the data user having to
          access the actual data set.
        </li>
        <li>
          For operators: Listings on daseen increase reach and attract new
          customer groups through higher visibility. With closed data spaces,
          the data offering can be presented to the general public without
          access to the actual data records and without violating the data and
          the data sovereignty of the data provider.
        </li>
      </ul>
      <h6 className="bold mt-4" id="target-group-user">
        Target group data user
      </h6>
      <p className="regular text-justify">
        The data user is a person, organization or software, that actively
        searches for data to train an AI model, analyze data or provision
        another data service.
      </p>
      <h7 className="bold mt-4" id="advantages-user">
        Advantages for the data user
      </h7>
      <ul className="regular text-justify">
        <li>
          The landing page offers an easy access to the world of daseen by
          filtering via categories () [
          <a href="/help/functions#landingpage">learn more</a>].
        </li>
        <li>
          With daseen, the user can efficiently search across data spaces and
          data portals by means of descriptive, analytical, commercial and legal
          properties to dive deep into the data sets without having to load and
          analyze them themselves. The user has the choice between a simple free
          text search, filter-based searches and an expert mode [
          <a href="/help/functions#search">learn more</a>].
        </li>
        <li>
          In addition to typical descriptive meta-information, the EDP provides
          complex analytical properties, for example on the statistical
          distribution function, potential data gaps, time series and variances.
          This allows users to evaluate whether the data is suitable for their
          application without having to retrieve the data in advance [
          <a href="/help/data-formats-and-analysis#formats">learn more</a>
          ]. With the integrated data log all legally required information on
          the provenance, license and processing status of a data record are
          stored.
        </li>
      </ul>
      <h6 className="bold mt-4" id="target-group-publisher">
        Target group data publisher
      </h6>
      <p className="regular text-justify">
        A data publisher or provider is a person, organization or institution
        that makes data available in a data space or publishes it via a data
        portal [
        <a href="/help/motivation-and-basics#dataspace-dataportal">
          learn more
        </a>
        ].
      </p>
      <p className="regular text-justify">
        When publishing via a data space, access to the data and the data
        catalog is usually restricted. The data provider controls both the scope
        of access and the use of the data offered by a data user.
      </p>
      <p className="regular text-justify">
        daseen and EPDS in the current version support integration in EDC and
        Gaia-X based data rooms.
      </p>
      <p className="regular text-justify">
        In an open data portal, the data provider publishes the data via the
        portal so that other users can search, view and retrieve it.
      </p>
      <h7 className="bold mt-4" id="advantages-publisher">
        Advantages for the data publisher
      </h7>
      <ul className="regular text-justify">
        <li>
          Visibility of data offerings across data portals and data spaces
          without having to release the data sets.
        </li>
        <li>
          Feedback on the data quality and the analytical value of your own data
          offerings. The data set profiles also provide the data provider with
          valuable information that they can use to further optimize their data.
        </li>
        <li>
          Value enhancement and monetization - The refinement (creation of EDPS)
          increases their value. Carefully analyzed and prepared data has a
          significantly higher market value than unstructured raw data.
        </li>
        <li>
          Convincing sales arguments - Customers prefer well-structured and
          interpretable data as it provides them with valuable insights [
          <a href="/help/data-formats-and-analysis#formats">
            more about the comprehensive analysis
          </a>
          ].
        </li>
        <li>
          Innovative products and services - The results of the data analysis
          can be marketed in the form of reports, dashboards or AI-supported
          forecasts.
        </li>
        <li>
          Licensing and partnerships - Companies and research institutions are
          ready to pay for access to data that has already been analyzed.
        </li>
      </ul>
      <h6 className="bold mt-4" id="target-group-operator">
        Target group operators
      </h6>
      <p className="regular text-justify">
        An operator has closed data spaces [
        <a href="/help/motivation-and-basics#dataspace">learn more</a>] or open
        data portals [
        <a href="/help/motivation-and-basics#dataportal">learn more</a>].
      </p>
      <h7 className="bold mt-4" id="advantages-operator">
        Advantages for the operators
      </h7>
      <ul className="regular text-justify">
        <li>
          The visibility, awareness and reputation of its platform are
          increased.
        </li>
        <li>
          The operator can create the prerequisites so that data providers can
          have their data (asset) analyzed in order to publish the results.
        </li>
        <li>
          By becoming part of daseen, he is part of a growing data ecosystem.
        </li>
      </ul>
      <h5 className="mt-5 mb-3" id="terminology">
        Terminology briefly explained
      </h5>
      <h6 className="bold mt-4" id="what-is-an-asset">
        What is an asset?
      </h6>
      An asset (“data asset”) refers to a data offering provided in the data
      space or data portal.
      <h6 className="bold mt-4" id="what-is-a-dataset">
        What is a data set?
      </h6>
      A data asset can consist of one or more data records. A dataset is an
      object to which a unique data format can be assigned [
      <a href="/help/data-formats-and-analysis#formats">
        more on the data formats supported in daseen
      </a>
      ].
      <h6 className="bold mt-4" id="what-is-an-edp">
        What is an EDP?
      </h6>
      <p className="regular text-justify">
        An EDP ("Extended Dataset Profile“) you use in the context of data
        spaces, data catalogs or data infrastructures.
      </p>
      <p className="regular text-justify">
        An EDP is a machine-readable, comprehensive and expandable description
        of an asset based on metadata.{" "}
      </p>
      <p className="regular text-justify">
        It not only contains the name of the asset and classic meta information
        such as its creator, but also offers a wealth of additional information
        that makes it easier to find the asset and the records it contains and
        to better understand their content. Depending on the data format of the
        data records, different analyses are carried out [
        <a href="/help/data-formats-and-analysis#formats">learn more</a>].
      </p>
      <p className="regular text-justify">
        What information is usually included?
      </p>
      <ul className="regular text-justify">
        <li>
          Basic information: The name of the asset, the content, the creator as
          well as the applicable terms of use (data license and optionally a
          non-disclosure agreement and/or commissioned data processing).
        </li>
        <li>
          Quality aspects: Information on analytical value, scope, timeliness
          and completeness of the data.
        </li>
        <li>
          Technical information: The file format in which the data is available,
          the structure of the data and the access modalities.
        </li>
        <li>
          Keywords or categories for better classification of the data set.
        </li>
        <li>
          Processing status of the data and which pre-processing steps, if any,
          have have already been carried out.
        </li>
      </ul>
      Why is this important?
      <ul className="regular text-justify">
        <li>
          Data providers can demonstrate the possibilities offered by their data
          set offers.
        </li>
        <li>
          People searching for data can more quickly determine whether the data
          is analytically, legally and commercially suitable for their projects,
          for example in the field of artificial intelligence.
        </li>
        <li>
          It promotes the findability of data on extensive data platforms and
          facilitates their integrated use.
        </li>
      </ul>
      <h6 className="bold mt-4" id="dataspace-dataportal">
        What is a data space or data portal?
      </h6>
      <h7 className="bold mt-4" id="dataspace">
        Data space
      </h7>
      <p className="regular text-justify">
        A closed data space can be regarded as a shared digital space in which
        different organizations or individuals can exchange data assets - but in
        a secure, fair and controlled way. You could think of this space like a
        marketplace for data: Each participant brings their own assets, and
        there are clear rules regarding who can view, use and share which
        information. The assets remain at their place of origin, but are
        accessible as long as the corresponding digital contract is available.
      </p>
      The key features of a data space are:
      <ul className="regular text-justify">
        <li>
          Trust: All parties involved are aware of the fact that their data is
          protected and used fairly.
        </li>
        <li>
          Interoperability: The data is described and technically prepared so
          that it can be used in different systems.
        </li>
        <li>
          Self-determination: Every data provider has the freedom to decide what
          use of their data is permitted and for whom.
        </li>
        <li>
          Standardized metadata: Ths makes it easier to understand what the data
          is about and how it can be used.
        </li>
      </ul>
      What is the significance of a data space?
      <ul className="regular text-justify">
        <li>
          It supports companies, public authorities and researchers in sharing
          and and collaboratively using data without losing control over their
          data.{" "}
        </li>
        <li>
          It also enables innovations, for example in the field of artificial
          intelligence, smart cities and health research.{" "}
        </li>
        <li>It also promotes cooperation, trust and transparency.</li>
      </ul>
      <h7 className="bold mt-4" id="dataspace">
        Data portal
      </h7>
      <p className="regular text-justify">
        An open data portal is a website or platform that makes it possible to
        find, view and download data. It can be thought of as a kind of catalog
        or online store for data, whereby products are not purchased here, but
        information and data sets are searched for and used.
      </p>
      <p className="regular text-justify">What characterizes a data portal?</p>
      <ul className="regular text-justify">
        <li>It presents an overview of the available assets. </li>
        <li>
          In addition, it contains search functions and filters that enable the
          relevant data to be found quickly.
        </li>
        <li>
          It also provides information on whether and under what conditions the
          data may be used.
        </li>
        <li>
          It is often possible to download the data directly from the platform
          or obtain it via interfaces (APIs).
        </li>
      </ul>
      What is the purpose of a data portal?
      <ul className="regular text-justify">
        <li>
          A data portal enables individuals or companies to quickly find the
          data they need, for example for research purposes, the development of
          new products or for analytical purposes.{" "}
        </li>
        <li>It also promotes the visibility and accessibility of data</li>
        <li>and supports transparency and open data initiatives.</li>
      </ul>
    </div>
  );
};
