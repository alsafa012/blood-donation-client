import { useState, useEffect } from "react";
import useLoggedUserInfo from "../../Components/hooks/useLoggedUserInfo";
import Swal from "sweetalert2";
import axios from "axios";
import { MdOutlineCancel } from "react-icons/md";

const DonorReport = ({ donorId, showReportForm, setShowReportForm }) => {
  // console.log("donor component", showReportForm);
  const [loggedUserInfo] = useLoggedUserInfo();
  const [reportReason, setReportReason] = useState("");
  const [hasReported, setHasReported] = useState(false);

  useEffect(() => {
    const checkReportStatus = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/hasReported?reported_by=${loggedUserInfo?._id}&reported_to=${donorId}`
        );
        setHasReported(res.data.reported);
      } catch (error) {
        console.error("Error checking report status:", error);
      }
    };

    if (loggedUserInfo?._id) {
      checkReportStatus();
    }
  }, [loggedUserInfo, donorId]);

  const handleReport = async (e) => {
    e.preventDefault();
    if (hasReported) {
      Swal.fire({
        title: "Warning!",
        text: "You have already reported this donor.",
        icon: "warning",
      });
      return;
    }

    const reportInfo = {
      reported_to: donorId,
      reported_by: loggedUserInfo?._id,
      phone: loggedUserInfo?.phone_number,
      email: loggedUserInfo?.user_email,
      name: loggedUserInfo?.user_name,
      report_reason: reportReason,
      report_status: false,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "Want to report this user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes.",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.post(
            "http://localhost:5000/reportDonor",
            reportInfo
          );
          if (res.data.acknowledged) {
            Swal.fire({
              title: "Good job!",
              text: "Report successfully submitted.",
              icon: "success",
            });
            setHasReported(true);
            setShowReportForm(false);
          } else {
            throw new Error("Process failed, something went wrong");
          }
        } catch (error) {
          console.error("Error reporting donor:", error);
          Swal.fire({
            title: "Error",
            text: "Something went wrong. Please try again later.",
            icon: "error",
          });
          setShowReportForm(false);
        }
      }
    });
  };

  return (
    <>
      {showReportForm && (
        <div className="fixed z-[100] flex items-center justify-center top-0 left-0 overflow-hidden h-screen w-full bg-black/20 backdrop-blur-sm">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[65%] lg:w-[30%] z-10 bg-primary overflow-y-auto max-h-[500px]">
            {/* X button */}
            <div
              onClick={() => setShowReportForm(false)}
              className="btn-bg border text-right p-2 sticky top-0 w-full"
            >
              <button className="hover:rotate-180 transition-transform duration-300 rounded-full btn-bg">
                <MdOutlineCancel size={35} fill="#B5C99A" />
              </button>
            </div>

            <form onSubmit={handleReport} className="">
              <div className="px-1 p-border relative pt-8 lg:pt-10 pb-3 md:pb-5 rounded-md mx-2 my-5 md:my-8">
                <p className="absolute -top-3 left-2 border border-[#cfe1b9] border-dashed rounded-md bg-white px-1 text-lg md:text-xl font-semibold">
                  Report Information
                </p>
                <div className="grid md:grid-cols-4 gap-2 lg:gap-5">
                  {/* Patient name */}
                  <div className="col-span-2 md:col-span-4 relative w-full">
                    <input
                      id="reported_by"
                      type="text"
                      name="reported_by"
                      placeholder=" "
                      value={loggedUserInfo?.user_name || ""}
                      onChange={(e) => e.target.value}
                      className="post-input-field w-full input-peer"
                    />
                    <label
                      htmlFor="reported_by"
                      className="post-input-label bg-white"
                    >
                      Your name
                    </label>
                  </div>
                  {/* Report Reason or  reason */}
                  <div className="col-span-2 md:col-span-4">
                    <textarea
                      className="w-full min-h-[80px] md:min-h-[100px] border border-[#CFE1B9] px-2 py-2 focus:outline-none focus:ring-1 focus:ring-[#CFE1B9]"
                      id="report_reason"
                      cols={5}
                      placeholder="Report Reason"
                      name="report_reason"
                      onChange={(e) => setReportReason(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn-bg py-1 w-full rounded-md">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DonorReport;
