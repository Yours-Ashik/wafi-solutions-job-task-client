import { Link } from "react-router-dom";
import BookingModal from "./BookingModal";

const Navbar = () => {
    const openModal = () => {
        document.getElementById("my_modal_3").showModal();
    };

    return (
        <div className="bg-[#FAFAFB]">
            <div className="navbar mb-5   lg:px-10 px-4 py-5">
                {/* Left Side */}
                <div className="flex-1">
                    <Link to="/" className=" text-2xl lg:text-3xl font-bold">
                        Car Wash
                    </Link>
                </div>

                {/* Right Side */}
                <div className="flex-none gap-4 flex items-center">
                    {/* Add Booking Button */}
                    <button
                        onClick={openModal}
                        className="bg-[#636AE8] hover:bg-[#636AE8] focus:bg-[#636AE8] focus:text-white text-white text-md rounded-md lg:py-3 py-2 px-2 lg:px-4 transition-all hover:scale-95 lg:mr-5 mr-2"
                    >
                        + Add Booking
                    </button>

                    {/* Notifications Icon */}

                    <div className="dropdown dropdown-end mr-3 lg:mr-5">
                        <div tabIndex={0} role="button">
                            <div className="w-8 h-8"> 
                                <img
                                    className="w-full h-full object-contain"
                                    src="https://img.icons8.com/?size=40&id=41913&format=png"
                                    alt="Notification"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <h2>No Notification</h2>
                            </li>
                        </ul>
                    </div>


                    {/* Profile Dropdown */}
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className=" rounded-full">
                                <img
                                    className=""
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                    alt="Profile"
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>

                        </ul>
                    </div>
                </div>

                {/* Add Booking Modal */}
                <BookingModal />
            </div>
        </div>
    );
};

export default Navbar;