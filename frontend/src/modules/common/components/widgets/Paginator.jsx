import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

function Paginator({ pageCount, handlePageChange, currentPage }) {
  return (
    <div className="container overflow-auto" style={{ maxWidth: 450 }}>
      <ReactPaginate
        previousLabel={
          <div className="btn btn-hover txt-regular">
            <ChevronLeft />
          </div>
        }
        nextLabel={
          <div className="btn btn-hover txt-regular">
            <ChevronRight />
          </div>
        }
        previousClassName="list-unstyled"
        nextClassName="list-unstyled"
        breakLabel={"⋯"}
        breakClassName="d-flex align-items-center"
        pageCount={pageCount - 1}
        marginPagesDisplayed={1}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName="d-flex justify-content-center align-items-center m-auto mt-5 py-3 px-0"
        pageClassName="list-unstyled"
        pageLinkClassName="btn btn-hover pagination-btn txt-lighter rounded"
        activeLinkClassName="btn txt-primary medium"
        forcePage={currentPage - 3}
      />
    </div>
  );
}

export default Paginator;
