import { truncateString } from "../../common/utils/format_utils";

export const Tags = ({ edp }) => {
  return (
    <>
      {edp?._source?.tags.length > 0 && (
        <div className="d-flex align-items-center flex-wrap mt-5">
          {edp._source.tags.map((tag) => (
            <span
              className="py-2 px-3 txt-regular small rounded-lg me-3 mb-3"
              style={{
                backgroundColor: "rgba(67, 174, 255, 0.67)",
                whiteSpace: "nowrap",
              }}
              key={tag}
            >
              #{truncateString(tag, 14)}
            </span>
          ))}
        </div>
      )}
    </>
  );
};
