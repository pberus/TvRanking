import axios from "axios"
import {useDispatch, useState} from "react-redux"

const tvURL = "http://localhost:3001/tv/";

const SearchBar = () => {
    const dispatch = useDispatch()

    const [name, setName] = useState("")

    const onSearch = async (name) => {
        try {
          const searchURL = tvURL + `name?name=${name}`;
          const { data } = await axios(searchURL);

          dispatch(searchTv(data));
        } catch (error) {
          error.response && error.response.data
            ? alert(error.response.data)
            : alert(error.message);
        }
      };
    
      const handleChange = (event) => {
        const inputValue = event.target.value;
        setName(inputValue);
      };
    
      const handleSearch = () => {
        onSearch(name);
        setName("");
      };    

  return (
    <div>
      <input
        type='text'
        value={name}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;
