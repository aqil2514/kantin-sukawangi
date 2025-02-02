import "./loader.css";

interface LoadingUXProps {
  type: "spinner-loader" | "simple-spinner";
}

export const LoadingSimpleSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
    </div>
  );
};

export default function LoadingUX({ type }: LoadingUXProps) {
  return <div className={type} />;
}
