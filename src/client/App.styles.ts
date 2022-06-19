import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import { AppBar, Typography, withStyles } from "@material-ui/core";

export const Wrapper = styled.div`
  margin: 40px;
`;

export const StyledButton = withStyles({
  label: {
    flexDirection: "column",
  },
})(IconButton);

export const StyledAppBar = styled(AppBar)`
  background: white;
  margin-bottom: 15px;
  border-radius: 20px;
`;

export const HeaderTypography = withStyles({
  root: {
    color: "black",
    WebkitTextStroke: "0.5px darkgoldenrod",
    fontStyle: "italic",
  },
})(Typography);

export const StyledRecentPurchaseDialog = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 20px;
  height: 100%;
  padding: 0rem;

  img {
    max-width: 100px;
    object-fit: scale-down;
    margin-left: 40px;
    border-radius: 10px 10px 10px 10px;
  }

  div {
    font-family: Arial, Helvetica, sans-serif;
    padding: 1rem;
    height: 100%;
  }
`;

// Table styling
export const orderCellColor = { backgroundColor: "#e6e6e6" };
export const orderCellPadding = { padding: "1px" };
export const tableWidth = { width: "95%" };
