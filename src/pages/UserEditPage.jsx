import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"; // Import Firebase Storage functions
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { updateUser } from "../../api/api";
import { storage } from "../firebase/firebase"; // Import your Firebase storage instance (adjust the path as needed)
import { setUser } from "../redux/slices/userSlice";
import "./UserEditPage.css";

const UserEditPage = () => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user.name || ""); // Default to current name if available
  const [bio, setBio] = useState(user.bio || ""); // Default to current bio if available
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let newPhotoURL = user.photoURL; // Default to existing photo URL

      // Upload new photo if selected
      if (photo) {
        const photoPath = `profile_photos/${user._id}/${Date.now()}_${
          photo.name
        }`; // Unique path for each upload
        newPhotoURL = await uploadFile(photoPath, photo); // Upload to Firebase Storage
      }

      // Update user data
      const updatedUserData = {
        userId: user._id,
        name,
        bio,
        photoURL: newPhotoURL,
      };
      await updateUser(updatedUserData);
      setLoading(false);

      // Dispatch updated user state
      dispatch(setUser({ name, bio, photoURL: newPhotoURL }));
      // Show success toast
      toast.success("Updated Profile Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: "linear-gradient(to right, #4caf50, #45a049)",
          color: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "300px",
          padding: "12px 20px",
          fontSize: "14px",
        },
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile", {
        position: "bottom-right",
        autoClose: 3000,
        style: {
          background: "linear-gradient(to right, #dc3545, #c82333)",
          color: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "300px",
          padding: "12px 20px",
          fontSize: "14px",
        },
      
      });
    }
      finally {
          setLoading(false);
        }
  };

  // Upload file function (exported separately)
  const uploadFile = async (path, file) => {
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div
        className="d-flex justify-content-center align-items-center min-vh-100 position-relative"
        style={{
          background: "linear-gradient(to bottom, #1c2526, #2e3b3e)",
        }}
      >
        {/* Dark Overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1 }}
        ></div>

        {/* Main content */}
        <div className="w-100 position-relative" style={{ zIndex: 2 }}>
          <div className="container py-5">
            <section
              className="card p-4 border-0 mx-auto animate__animated animate__fadeIn"
              style={{
                maxWidth: "450px",
                backgroundColor: "rgba(40, 44, 52, 0.95)",
                borderRadius: "15px",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
              }}
            >
              <h2
                className="h4 text-white mb-4 text-center"
                style={{ fontWeight: "600" }}
              >
                Edit Profile
              </h2>
              <form onSubmit={handleSubmit}>
                {/* Profile Photo */}
                <div className="mb-4 text-center">
                  <img
                    src={user.photoURL || "/default-profile.png"} // Fallback to default image if no photoURL
                    alt="Profile"
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <div className="mt-4">
                    <input
                      type="file"
                      className="form-control form-control-sm bg-dark text-white border-secondary"
                      style={{
                        padding: "8px",
                        borderRadius: "8px",
                        fontSize: "0.9rem",
                      }}
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="mb-4 position-relative">
                  <label
                    className="form-label text-white"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Name
                  </label>
                  <div className="input-group">
                    <span
                      className="input-group-text bg-dark border-secondary text-white"
                      style={{ borderRight: "none" }}
                    >
                      <i className="bi bi-person"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control bg-dark text-white border-secondary"
                      style={{
                        borderLeft: "none",
                        padding: "10px",
                        transition: "border-color 0.3s",
                      }}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-4 position-relative">
                  <label
                    className="form-label text-white"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Bio
                  </label>
                  <div className="input-group">
                    <span
                      className="input-group-text bg-dark border-secondary text-white"
                      style={{ borderRight: "none" }}
                    >
                      <i className="bi bi-chat-text"></i>
                    </span>
                    <textarea
                      className="form-control bg-dark text-white border-secondary"
                      style={{
                        borderLeft: "none",
                        padding: "10px",
                        transition: "border-color 0.3s",
                        minHeight: "100px",
                      }}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-success"
                    style={{
                      background: "linear-gradient(to right, #28a745, #218838)",
                      border: "none",
                      padding: "12px",
                      fontWeight: "500",
                      transition: "transform 0.2s, background 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.background =
                        "linear-gradient(to right, #218838, #1e7e34)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.background =
                        "linear-gradient(to right, #28a745, #218838)")
                    }
                    onMouseDown={(e) =>
                      (e.target.style.transform = "scale(0.98)")
                    }
                    onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
                  >
                    {loading ? (
                      <>
                        <ClipLoader color="var(--secondary-color)" size={20} />
                        <span className="ms-2">Loading...</span>
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

// Export the uploadFile function

export default UserEditPage;
