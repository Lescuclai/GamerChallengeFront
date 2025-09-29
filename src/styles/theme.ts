import { createTheme } from "@mui/material"

export const theme = createTheme({
  palette: {
    primary: {
      main: "#8585FF",
      contrastText: "#EBEBFF",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#EBEBFF",
            },
            "&:hover fieldset": {
              borderColor: "#8585FF",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#8585FF",
            },
            "& input": {
              color: "#EBEBFF",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#EBEBFF",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#EBEBFF",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "var(--lavander)",
        },
      },
    },
  },
})
