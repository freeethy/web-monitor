import React from "react";

declare enum Type {
  UnLogin = 0,
  Login = 1
}

export interface PwdContentProps {
  type: Type;
  username?: string;
  usernum?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default class PwdContent extends React.Component<PwdContentProps, any> {}
