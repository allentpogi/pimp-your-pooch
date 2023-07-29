import PetsRoundedIcon from "@mui/icons-material/PetsRounded";
import CakeRoundedIcon from "@mui/icons-material/CakeRounded";
import PaletteRoundedIcon from "@mui/icons-material/PaletteRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";

export const getIconComponent = (icon) => {
  switch (icon) {
    case "PetsRoundedIcon":
      return <PetsRoundedIcon />;
    case "CakeRoundedIcon":
      return <CakeRoundedIcon />;
    case "PaletteRoundedIcon":
      return <PaletteRoundedIcon />;
    case "LocalHospitalRoundedIcon":
      return <LocalHospitalRoundedIcon />;
    case "ArticleRoundedIcon":
      return <ArticleRoundedIcon />;
    default:
      return null;
  }
};
