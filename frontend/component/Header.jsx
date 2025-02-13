
export function Header({ title, className = "" }) {
  return (
    <header
      className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 text-2xl font-extrabold 
      shadow-lg rounded-b-2xl text-center ${className}`}
    >
      {title}
    </header>
  );
}