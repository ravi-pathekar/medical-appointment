import DoctorList from "../../components/findADoctor/doctorsList";

const FindADoctorPage = () => {
  return (
    <div className="min-h-screen bg-slate-300 pt-15 pb-12">
      <div className="container mx-auto px-4 pt-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Find a Doctor</h2>
        <p className="text-gray-600 mb-8">
          Connect with Trusted Experts for Personalized Care
        </p>

        <DoctorList />
      </div>
    </div>
  );
};

export default FindADoctorPage;
