function Card({ className, children }) {
  return <div className={`border rounded-lg shadow-md p-4 bg-white ${className}`}>{children}</div>;
}

function CardContent({ children }) {
  return <div className="p-2">{children}</div>;
}

export { Card, CardContent };
