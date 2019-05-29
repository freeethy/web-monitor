import React from "react";
export interface MainContentProps {
  header: string | React.ReactElement;
  footer: React.ReactElement;
  children: React.ReactElement;
  className?: string;
  style?: React.CSSProperties;
}

export default class MainContent extends React.Component<
  MainContentProps,
  any
> {}
