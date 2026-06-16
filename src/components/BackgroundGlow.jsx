const BackgroundGlow = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full"></div>

      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[150px] rounded-full"></div>
    </>
  );
};

export default BackgroundGlow;