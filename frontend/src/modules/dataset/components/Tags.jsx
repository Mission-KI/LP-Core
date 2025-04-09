import { truncateString } from "../../common/utils/format_utils";

export const Tags = ({datasetDetails}) => {
    return (
        <>
            {datasetDetails?._source?.tags.length > 0 && (
                    <div className="d-flex align-items-center flex-wrap mt-5">
                        {datasetDetails._source.tags.map((tag) => (
                            <span
                                className="py-2 px-3 bgc-primary-lighter txt-regular small rounded-lg me-3 mb-3"
                                key={tag}
                                style={{ whiteSpace: 'nowrap' }}
                            >
                                #{truncateString(tag, 14)}
                            </span>
                        ))}
                    </div>
                )}
        </>
    );
}