import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            AppointDoc
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/find-a-doctor" className="font-medium">
              Find a Doctor
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
