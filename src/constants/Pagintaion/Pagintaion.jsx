import './Pagination.css';

// Function to handle page navigation
export const paginate = (pageNumber) => {
  console.log(`Navigating to page ${pageNumber}`);
};

// Function to calculate page numbers
export const getPageNumbers = (currentPage, totalItems, itemsPerPage = 10) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];
  
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);
  
  if (endPage - startPage < 4 && totalPages > 4) {
    if (startPage === 1) {
      endPage = Math.min(5, totalPages);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - 4);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return { pageNumbers, totalPages, startPage, endPage };
};

// Function to calculate item range
export const getItemRange = (currentPage, totalItems, itemsPerPage = 10) => {
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
  const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalItems);
  return { indexOfFirstItem, indexOfLastItem };
};

const Pagination = () => {
  const itemsPerPage = 10; // Default value
  const totalItems = 50;   // Default value
  const currentPage = 1;   // Default value

  const { pageNumbers, totalPages, startPage, endPage } = getPageNumbers(currentPage, totalItems, itemsPerPage);
  const { indexOfFirstItem, indexOfLastItem } = getItemRange(currentPage, totalItems, itemsPerPage);

  return (
    <div className="pagination-container">
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              Previous
            </button>
          </li>
          
          {startPage > 1 && (
            <>
              <li className="page-item">
                <button 
                  className="page-link" 
                  onClick={() => paginate(1)}
                  aria-label="First page"
                >
                  1
                </button>
              </li>
              {startPage > 2 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
            </>
          )}
          
          {pageNumbers.map(number => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <button 
                className="page-link" 
                onClick={() => paginate(number)}
                aria-label={`Page ${number}`}
                aria-current={currentPage === number ? "page" : null}
              >
                {number}
              </button>
            </li>
          ))}
          
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
              <li className="page-item">
                <button 
                  className="page-link" 
                  onClick={() => paginate(totalPages)}
                  aria-label={`Last page, page ${totalPages}`}
                >
                  {totalPages}
                </button>
              </li>
            </>
          )}
          
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      
      {true && totalItems > 0 && (
        <p className="text-center text-muted small mt-2">
          Showing {indexOfFirstItem}-{indexOfLastItem} of {totalItems} items
        </p>
      )}
    </div>
  );
};

export default Pagination;