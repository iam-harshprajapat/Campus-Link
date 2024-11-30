import React, { useEffect, useState } from "react";
import API from "../../Services/API";
import "./AdminPanel.css";
import { MdDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/");
    }

    const fetchData = async () => {
      try {
        const res = await API.get("/admin/pending-for-approval");
        console.log(res.data);
        setUserData(res.data.unapprovedUser);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const approveUser = async (id, email) => {
    if (window.confirm(`Do you want to approve with ${email}?`)) {
      try {
        toast.success("user approved successfully");
        setUserData(userData.filter((user) => user._id !== id));
        const res = await API.post("/admin/approve-user", { id, email });
      } catch (error) {
        console.error("Error approving user:", error);
      }
    }
  };

  const rejectUser = async (id, email) => {
    if (window.confirm(`Do you want to reject with ${email}?`)) {
      try {
        toast.success("user rejected successfully");
        setUserData(userData.filter((user) => user._id !== id));
        const res = await API.post("/admin/reject-user", { id, email });
      } catch (error) {
        console.error("Error approving user:", error);
      }
    }
  };

  return (
    <>
      <h3 className="heading">List of Unapproved Users</h3>
      <table className="users-table">
        <thead>
          <tr className="schema">
            <th className="table-heading">SN</th>
            <th className="table-heading" style={{ paddingLeft: "0px" }}>
              Email
            </th>
            <th className="table-heading">Enrollment</th>
            <th className="table-heading">Mobile</th>
            <th className="table-heading">Name</th>
            <th className="table-heading">Role</th>
            <th className="table-heading">Semester</th>
            <th className="table-heading">Username</th>
            <th className="table-heading">Id</th>
            <th className="table-heading">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((data, index) => (
            <tr key={data._id} className="user-row-data">
              <td>{index + 1}</td>
              <td>{data.email}</td>
              <td>{data.enrollmentNumber}</td>
              <td>{data.mobile}</td>
              <td>{data.name}</td>
              <td>{data.role}</td>
              <td>{data.semester}</td>
              <td>{data.username}</td>
              <td>{data._id}</td>
              <td>
                <div className="button-group">
                  <button
                    className="admin-btn"
                    onClick={() => approveUser(data._id, data.email)}
                    style={{
                      backgroundColor: "rgb(89, 236, 59)",
                      color: "black",
                    }}
                  >
                    <MdDone />
                  </button>
                  <button
                    className="admin-btn"
                    onClick={() => rejectUser(data._id, data.email)}
                    style={{
                      backgroundColor: "rgb(245, 67, 67)",
                      color: "white",
                    }}
                  >
                    <RxCross2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminPanel;
