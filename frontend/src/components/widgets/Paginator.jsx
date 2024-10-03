import React from 'react';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight, ThreeDots } from 'react-bootstrap-icons';

function Paginator({ pageCount, handlePageChange, currentPage }) {
    return (
        <div className='container' style={{ maxWidth: 700 }}>
            <ReactPaginate
                previousLabel={<div className='btn hover-lg'><ChevronLeft /></div>}
                nextLabel={<div className='btn hover-lg'><ChevronRight /></div>}
                previousClassName="list-unstyled"
                nextClassName="list-unstyled"
                breakLabel={<ThreeDots />}
                breakClassName="d-flex align-items-center"
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={10}
                onPageChange={handlePageChange}
                containerClassName="d-flex justify-content-around align-items-center m-auto mt-5 py-3"
                pageClassName="btn pagination-btn"
                pageLinkClassName="medium"
                activeLinkClassName=""
                activeClassName="btn btn-primary text-white"
                forcePage={currentPage - 1}
            />
        </div>

    );
}

export default Paginator;
