import { TextField } from "@mui/material";

function SearchBar({
  value,
  onChange
}) {
  return (
    <TextField
      fullWidth
      size="small"
      placeholder="Search..."
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
    />
  );
}

export default SearchBar;