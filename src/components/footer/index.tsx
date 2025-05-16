import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center">
            Medical Appointment
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            Footer
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
