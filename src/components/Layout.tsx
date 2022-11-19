import { ReactNode } from "react";
import { TopMenu } from "./TopMenu";
import Box from "@mui/material/Box";
import { BottomBar } from "./BottomBar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <TopMenu />
      <Box sx={{ padding: "10px" }}>{children}</Box>
      <BottomBar />
    </Box>
  );
};
