//input element for filtering the numbers to be displayed
const Filter = ({filterString, handlefilterChange}) => {
    return(
      <div>
          filter shown with<input 
          value={filterString}
          onChange={handlefilterChange}/>
      </div>
    )
};

export default Filter;