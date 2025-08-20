const Header = () => {
  return (
    <header className="bg-glass border-b border-glass p-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg"></div>
          <h1 className="text-xl font-semibold text-primary">CommandR</h1>
        </div>
        
        {/* Simple Status */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-accent rounded-full"></div>
          <span className="text-sm text-secondary">Ready</span>
        </div>
      </div>
    </header>
  );
};

export default Header;