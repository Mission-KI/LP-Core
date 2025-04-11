import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";

const Button = ({
  variant,
  size,
  children,
  onClick,
  disabled,
  type,
  loading,
}) => {
  const classNames = `btn fw-500 d-flex hover align-items-center justify-content-center btn-${variant} ${size == "lg" ? "w-100 py-3" : "medium"}`;
  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <Spinner size="sm" variant="light" className="me-3" />}
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  loading: PropTypes.func.isRequired,
};

Button.defaultProps = {
  variant: "primary",
  size: "",
  onClick: () => {},
  disabled: false,
  type: "button",
};

export default Button;
