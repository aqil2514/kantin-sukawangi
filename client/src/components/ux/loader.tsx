import "./loader.css";

interface LoadingUXProps {
  type: "spinner-loader";
}

export default function LoadingUX({ type }: LoadingUXProps) {
  return <div className={type} />;
}
