import axios from "axios";
import Swal from "sweetalert2";

const BookingModal = () => {


    const formData = (e) => {
        e.preventDefault()
        const form = e.target;
        const notes = form.notes.value;
        const carName = form.carName.value;
        const startDate = form.startDate.value;
        const endDate = form.endDate.value;
        const startTime = form.startTime.value;
        const endTime = form.endTime.value;

        const data = {
            notes,
            carName,
            startDate,
            endDate,
            startTime,
            endTime
        }
        console.log(data)
        axios.post("https://job-task-server-six-tau.vercel.app/schedule", data)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    Swal.fire({
                        title: 'Booking Added',
                        text: 'Your Booking Added In The Schedule',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    form.reset()
                    document.getElementById("my_modal_3").close();


                }
            })
    }

    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box lg:w-[50%] w-[90%] rounded-xl max-w-none p-7 ">
                <form method="dialog">

                    <button className="btn btn-sm btn-circle btn-ghost m-5 lg:m-7 absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-xl">Add Car Booking</h3>
                <div className="divider"></div>
                <h1 className="font-bold text-xl mb-4 text-[#636AE8]">Basic Information</h1>

                <form onSubmit={formData} className="w-full pb-5">
                    {/* Subject Input */}
                    <div className="flex items-center gap-5 w-full mb-5 ">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Notes</span>
                            </label>
                            <input type="text" name="notes" placeholder="Write Your Notes" className="input input-bordered w-full bg-[#F3F4F6] rounded-full border-none" required />
                        </div>
                        {/* Select Car Input */}
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-bold">Select Car</span>
                            </label>
                            <select name="carName" className="select select-bordered w-full rounded-full bg-[#F3F4F6] border-none">
                                <option value={''}>Select Car</option>
                                <option>Toyota</option>
                                <option>Honda</option>
                                <option>BMW</option>
                            </select>
                        </div>
                    </div>
                    {/* booking Input */}
                    <div className="flex items-center gap-5 w-full mb-5">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Booking Date</span>
                            </label>
                            <input name="startDate" type="date" placeholder="Write a short note" className="input input-bordered w-full bg-[#F3F4F6] rounded-full border-none" required />
                        </div>
                        {/* booking end Input */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">End Date</span>
                            </label>
                            <input name="endDate" type="date" placeholder="Write a short note" className="input input-bordered w-full bg-[#F3F4F6] rounded-full border-none" required />
                        </div>
                    </div>
                    {/* Start time */}
                    <div className="flex items-center gap-5 w-full">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Start Time</span>
                            </label>
                            <input name="startTime" type="time" placeholder="Write a short note" className="input input-bordered w-full bg-[#F3F4F6] rounded-full border-none" required />
                        </div>
                        {/*end Time */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">End Time</span>
                            </label>
                            <input type="time" name="endTime" placeholder="Write a short note" className="input input-bordered w-full bg-[#F3F4F6] rounded-full border-none" required />
                        </div>
                    </div>
                    <button className="btn mt-10 w-full bg-[#636AE8] text-white">Add Booking</button>
                </form>
            </div>
        </dialog>
    );
};

export default BookingModal;
