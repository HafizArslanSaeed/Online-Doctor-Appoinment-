import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointment = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="pt-6 md:pt-8 lg:pt-10 ">
      <p className="text-zinc-500 font-semibold border-b pb-4 md:pb-6 text-lg md:text-xl">
        My Appointments
      </p>
      <div className="space-y-6 mt-4">
        {doctors.slice(0, 2).map((item, index) => (
          <div
            className="flex flex-col md:flex-row gap-4 py-4 border-b    "
            key={index}
          >
            {/* Doctor Image */}
            <div>
              <img className="w-48 bg-blue-50" src={item.image} alt="Doctor" />
            </div>

            {/* Doctor Details */}
            <div className="flex-1 space-y-2 md:space-y-3">
              <p className="text-lg md:text-xl font-semibold text-zinc-600 ">
                {item.name}
              </p>
              <p className="text-gray-600 text-sm md:text-base">
                {item.speciality}
              </p>
              <div className="space-y-1">
                <p className="font-semibold text-zinc-500 text-sm md:text-base">
                  Address:
                </p>
                <p className="text-gray-600 text-sm md:text-base">
                  {item.address.line1}
                </p>
                <p className="text-gray-600 text-sm md:text-base">
                  {item.address.line2}
                </p>
              </div>
              <p className="font-semibold text-zinc-500  text-sm md:text-base">
                Date & Time:{" "}
                <span className="font-normal text-gray-500 ">
                  25, July, 2024 | 8:30 PM
                </span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col justify-end gap-2 md:w-48 lg:w-56">
              <button className="bg-primary py-2 px-4 md:px-6 lg:px-8 rounded text-white text-sm md:text-base hover:bg-primary-dark transition-colors w-full">
                Pay Online
              </button>
              <button className="border py-2 px-4 md:px-6 lg:px-8 rounded text-gray-600 text-sm md:text-base hover:bg-gray-50 transition-colors w-full">
                Cancel Payment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;