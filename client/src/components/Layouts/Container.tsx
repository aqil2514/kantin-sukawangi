import React from "react";

type ContainerType = "main";

interface ContainerProps {
  children: React.ReactNode;
  type: ContainerType;
  className?: string;
}

export default function Container({ children, type, className }: ContainerProps) {
  if (type === "main") {
    return <MainContainer className={className}>{children}</MainContainer>;
  }

  return null;
}

const MainContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={`px-4 pt-40 pb-12 min-h-screen bg-gray-50 ${className || ""}`}>
      {children}
    </div>
  );
};
