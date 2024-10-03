const LoadingAnimation = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="text-5xl">
        <span className="loading loading-bars loading-sm text-warning bg-primary"></span>
        <span className="loading loading-bars loading-md text-warning bg-primary"></span>
        <span className="loading loading-bars text-warning bg-primary"></span>
      </div>
    </div>
  );
};
export default LoadingAnimation;
