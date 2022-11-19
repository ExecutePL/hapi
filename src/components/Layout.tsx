import { ReactNode } from "react";
import { TopMenu } from "./TopMenu";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <TopMenu />
      {children}
    </div>
  );
};
