const About_En = () => {
  return (
    <div className="col-md-10">
      <h1 className="bold mb-5">About daseen</h1>
      <h5 className="mt-5 mb-3" id="version-info">
        Version information
      </h5>
      <p className="regular text-justify">10.06.2025</p>
      <h5 className="mt-5 mb-3" id="latest-changes">
        Latest changes
      </h5>
      <p>
        - Added multiple new data spaces and publishers to landing page
        categories
      </p>
      <p>
        - Fixed bug in filters which led to partial results in case several
        selections were made in dropdown filters
      </p>
      <p>
        - Fixed bug which led to incorrect views in nested structures in case
        nested elements had identical names
      </p>
      <p> - Cosmetic improvements</p>
      <h5 className="mt-5 mb-3" id="registration-section">
        Registration
      </h5>
      <p>
        Data publishers as well as data space and data portal operators can
        connect via the following contact: &nbsp;
        <a href="https://beebucket.ai/en/contact/" target="_blank">
          Beebucket
        </a>
      </p>
    </div>
  );
};

export default About_En;
