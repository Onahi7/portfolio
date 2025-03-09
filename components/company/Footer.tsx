const Footer = () => {
  return (
    <footer className="w-full py-6 px-6 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-600">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
