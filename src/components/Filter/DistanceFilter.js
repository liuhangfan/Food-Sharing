import { MILES_LIST } from "../../constants/miles";
import { FormControl, InputLabel, MenuItem, ListItemText, Checkbox, Select, OutlinedInput } from '@mui/material';

const DistanceFilter = (props) => {
    const handleChange = (event) => {
        props.handleChange(event.target.value);
    };

   return ( 
  <FormControl sx={{ m: 1, width: 200}}>
        <InputLabel id="demo-simple-select-label">Miles</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.value}
            label="Miles"
            onChange={handleChange}
        >
        {MILES_LIST.map((name) => (
            <MenuItem value={name}>
                {name} miles
            </MenuItem>
        ))}
        </Select>
    </FormControl>
   )
}

export default DistanceFilter;