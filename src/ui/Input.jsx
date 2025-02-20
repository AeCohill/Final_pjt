function Input({ className, ...props }) {
    return (
      <input
        className={`border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
        {...props}
      />
    );
  }
  
  export default Input;