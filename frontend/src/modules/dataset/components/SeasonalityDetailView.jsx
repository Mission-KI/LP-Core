import { Modal } from "react-bootstrap";
import { imageBasePath } from "../../common/api/config";

const SeasonalityDetailView = ({
  showDetailViewModal,
  setShowDetailViewModal,
  selectedAttribute,
  edp,
}) => {
  const handleClose = () => setShowDetailViewModal(false);

  return (
    <div>
      <Modal show={showDetailViewModal} onHide={handleClose} centered size="lg">
        <Modal.Header className="border-0" closeButton>
          <Modal.Title>Attribute {selectedAttribute.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className="txt-lighter bold">
            {selectedAttribute.name} Original time series
          </span>
          {selectedAttribute?.original_series?.map((graph) => (
            <div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <img
                    src={imageBasePath + edp?._id + "/" + graph.file}
                    className="w-100 pointer"
                  />
                </div>
              </div>
            </div>
          ))}
          <span className="txt-lighter bold">
            {selectedAttribute.name} Trend
          </span>
          {selectedAttribute?.trends?.map((graph) => (
            <div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <img
                    src={imageBasePath + edp?._id + "/" + graph.file}
                    className="w-100 pointer"
                  />
                </div>
              </div>
            </div>
          ))}
          <span className="txt-lighter bold">
            {selectedAttribute.name} Seasonality
          </span>
          {selectedAttribute?.seasonalities?.map((graph) => (
            <div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <img
                    src={imageBasePath + edp?._id + "/" + graph.file}
                    className="w-100 pointer"
                  />
                </div>
              </div>
            </div>
          ))}
          <span className="txt-lighter bold">
            {selectedAttribute.name} Residuals/Outlier
          </span>
          {selectedAttribute?.residuals?.map((graph) => (
            <div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <img
                    src={imageBasePath + edp?._id + "/" + graph.file}
                    className="w-100 pointer"
                  />
                </div>
              </div>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SeasonalityDetailView;
