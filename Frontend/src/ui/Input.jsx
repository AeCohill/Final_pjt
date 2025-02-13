function Input({ className, ...props }) {
    return (
      <input
        className={`border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    );
  }
  export { Input };