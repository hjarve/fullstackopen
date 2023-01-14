const FindInput = ({filterString, handleFilterChange}) => {
    return(
      <div>
        find countries <input 
        value={filterString} 
        onChange={handleFilterChange} />
      </div> 
    ) 
  };

export default FindInput;