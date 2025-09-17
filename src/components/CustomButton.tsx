import { Button } from "@mui/material";
interface CustomButtonProps {
  text: string;
  onClick?: () => void;
}
export const CustomButton = ({ text }: CustomButtonProps) => {
  return (
    <Button
      size="small"
      sx={{
        backgroundColor: "var(--tropical-indigo)",
        color: "var(--lavander)",
        borderRadius: "9999px", // arrondi max = style chip
        padding: "12px",
      }}
    >
      {text}
    </Button>
  );
};
