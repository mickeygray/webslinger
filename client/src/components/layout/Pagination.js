const Pagination = ({
 postsPerPage,
 totalPosts,
 paginate,
 toggleGrid,
 setPageId,
 pages,
}) => {
 const pageNumbers = [];

 for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
  pageNumbers.push(i);
 }
 return (
  <nav>
   <ul style={{ display: "flex" }}>
    {pageNumbers.map((number) => (
     <li key={number}>
      <a
       onClick={() => {
        paginate(number);
        toggleGrid && toggleGrid();
        setPageId && setPageId(pages[parseInt(number) - 1].id);
       }}
       className='btn btn-light btn-sm'>
       {number}
      </a>
     </li>
    ))}
   </ul>
  </nav>
 );
};

export default Pagination;
