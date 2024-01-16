import "./pagination.css";

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
    const generatedPages = [];
   
    
    for(let i=1; i<= pages; i++){
        generatedPages.push(i);
    }
    
    
    return ( 
        <div className="pagination">
           
           {/* ki nenzl ala previous arj3li lel page eli 9blha ya3ni cuurrentpage -1  */}
           <button
           className="page previous"
           onClick={() => setCurrentPage(current => current - 1)}
           disabled= {currentPage === 1}
           
           > 
           Previous 
           </button>
            {generatedPages.map(page => (
                <div 
                onClick={() => setCurrentPage(page)} 
                key = {page} 
                className={currentPage === page ? "page active" : "page"} //bch yb9a ra9m mt3 page active y3ni eni fi page hadhika 
                >
                    {page}
                </div>

            ))}
           <button
            className="page next"
            onClick={() => setCurrentPage(current => current + 1)}
            disabled= {currentPage === pages}
            > 
            Next 
            </button> 
        </div>
     );
}
 
export default Pagination;