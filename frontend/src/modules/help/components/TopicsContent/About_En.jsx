const About_En = () => {
  return (
    <div className="col-md-10">
      <h1 className="bold mb-5">About daseen</h1>
      <h5 className="mt-5 mb-3" id="version-info">
        Version information
      </h5>
      <p className="regular text-justify">14.04.2025</p>
      <h5 className="mt-5 mb-3" id="latest-changes">
        Latest changes
      </h5>
      <p> - extended help area</p>
      <p> - support for data type audio</p>
      <p> - support for data type video</p>
      <p> - new function: find similar EDP</p>
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
