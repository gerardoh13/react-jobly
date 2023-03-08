import React from "react";

function Pagination({
  totalPages,
  idx,
  goToIdx,
  hasPreviousPage,
  hasNextPage,
  nextPage,
  prevPage,
}) {
  const createPageBar = () => {
    let pageList = [];
    if (totalPages < 6) {
      for (let i = 0; i < totalPages; i++) {
        pageList.push(
          <li key={i} className={"page-item" + (i === idx ? " active" : "")}>
            <button
              className="page-link"
              name={i}
              disabled={i === idx}
              onClick={goToIdx}
            >
              {i + 1}
            </button>
          </li>
        );
      }
    } else {
      pageList.push(
        <li
          key={idx + 1}
          className={"page-item" + (idx === 0 ? " active" : "")}
        >
          <button
            className="page-link"
            onClick={goToIdx}
            disabled={!hasPreviousPage}
            name={
              idx === totalPages - 1 ? idx - 2 : idx === 0 ? idx + 1 : idx - 1
            }
          >
            {idx === totalPages - 1 ? idx - 1 : idx === 0 ? idx + 1 : idx}
          </button>
        </li>
      );
      pageList.push(
        <li
          key={idx + 2}
          className={
            "page-item" + (idx === totalPages - 1 || idx === 0 ? "" : " active")
          }
        >
          <button
            className="page-link"
            onClick={goToIdx}
            disabled={idx === totalPages - 1 ? false : idx}
            name={
              idx === totalPages - 1 ? idx - 1 : idx === 0 ? idx + 1 : idx - 1
            }
          >
            {idx === 0 ? idx + 2 : idx === totalPages - 1 ? idx : idx + 1}
          </button>
        </li>
      );
      pageList.push(
        <li
          key={idx + 3}
          className={"page-item" + (idx === totalPages - 1 ? " active" : "")}
        >
          <button
            className="page-link"
            onClick={goToIdx}
            disabled={hasNextPage}
            name={idx === 0 ? idx + 2 : idx === totalPages - 1 ? idx : idx + 1}
          >
            {idx === 0 ? idx + 3 : idx === totalPages - 1 ? idx + 1 : idx + 2}
          </button>
        </li>
      );
    }
    return pageList;
  };

  if (totalPages < 6)
    return (
      <nav>
        <div className="pagination justify-content-center">
          <li className="page-item">
            <button
              className="page-link"
              disabled={!hasPreviousPage}
              aria-label="Previous"
              onClick={prevPage}
            >
              <span aria-hidden="true">&laquo;</span> Previous
            </button>
          </li>
          {createPageBar()}
          <li className="page-item">
            <button
              className="page-link"
              disabled={hasNextPage}
              aria-label="Next"
              onClick={nextPage}
            >
              Next <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </div>
      </nav>
    );
  else
    return (
      <nav>
        <div className="pagination justify-content-center">
          <li className="page-item">
            <button
              className="page-link"
              disabled={!hasPreviousPage}
              aria-label="Previous"
              onClick={prevPage}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {idx > 1 ? (
            <li className="page-item">
              <button
                className="page-link"
                disabled={!hasPreviousPage}
                onClick={goToIdx}
                name="0"
              >
                1
              </button>
            </li>
          ) : null}
          {idx > 2 ? (
            <li className="page-item">
              <button className="page-link" disabled>
                ...
              </button>
            </li>
          ) : null}
          {createPageBar()}
          {idx < totalPages - 3 ? (
            <li className="page-item">
              <button className="page-link" disabled>
                ...
              </button>
            </li>
          ) : null}
          {idx < totalPages - 2 ? (
            <li className="page-item">
              <button
                className="page-link"
                disabled={hasNextPage}
                onClick={goToIdx}
                name={totalPages - 1}
              >
                {totalPages}
              </button>
            </li>
          ) : null}
          <li className="page-item">
            <button
              className="page-link"
              disabled={hasNextPage}
              aria-label="Next"
              onClick={nextPage}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </div>
      </nav>
    );
}

export default Pagination;
