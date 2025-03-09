import Link from 'next/link';

const Header = () => {
  return (
    <header className="w-full py-4 px-6 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Portfolio
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <Link href="/projects" className="hover:text-gray-600">Projects</Link>
          <Link href="/contact" className="hover:text-gray-600">Contact</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
