import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-500 to-white py-16 lg:py-24">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Book Appointments
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Book appointments with specialist doctors online
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/find-a-doctor"
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Book Appointment"
                height={480}
                width={480}
                className="rounded-md shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
