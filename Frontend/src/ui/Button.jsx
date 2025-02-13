function Button({ variant = "solid", className, ...props }) {
    const baseStyles = "px-4 py-2 rounded-lg font-semibold transition";
    const variants = {
      solid: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-blue-600 text-blue-600 hover:bg-blue-100",
      ghost: "text-gray-600 hover:bg-gray-200",
    };
    
    return (
      <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props} />
    );
  }
  export { Button };