import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExpoRegistrationForm = () => {
  const { expoId } = useParams();
  const navigate = useNavigate();

  const [expoTitle, setExpoTitle] = useState("");
  const [booths, setAvailableBooths] = useState([]);
  const [formData, setFormData] = useState({
    boothId: "",
    companyName: "",
    logo: "",
    description: "",
    contactEmail: "",
    phone: "",
    website: "",
    exhibitions: [],
  });

  useEffect(() => {
    fetchExpoDetails();
    fetchAvailableBooths();
  }, [expoId]);

  const fetchExpoDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/expos/${expoId}`);
      setExpoTitle(res.data.title);
      setFormData((prev) => ({ ...prev, exhibitions: [res.data.title] }));
    } catch (err) {
      console.error("Failed to fetch expo details", err);
      toast.error("Could not fetch expo info.");
    }
  };

  const fetchAvailableBooths = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/booths/expo/${expoId}`, {
      withCredentials: true,
    });

    const booths = response.data; // ✅ correct variable name
    const available = booths.filter((booth) => booth.status !== 'reserved');
    setAvailableBooths(available);
  } catch (err) {
    console.error("Error fetching booths", err);
  }
};


  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Include withCredentials for protected routes
      await axios.put(
        `http://localhost:5000/api/booths/reserve/${formData.boothId}`,
        {
          exhibitions: formData.exhibitions,
        },
        { withCredentials: true }
      );

      await axios.post(
        "http://localhost:5000/api/exhibitors/profile",
        {
          companyName: formData.companyName,
          logo: formData.logo,
          description: formData.description,
          contactEmail: formData.contactEmail,
          phone: formData.phone,
          website: formData.website,
          exhibitions: formData.exhibitions,
          booth: {
            number: booths.find((b) => b._id === formData.boothId)?.number,
            size: booths.find((b) => b._id === formData.boothId)?.size,
          },
        },
        { withCredentials: true }
      );

      toast.success("Registered successfully!");
      navigate("/exhibitor-dashboard");
    } catch (err) {
      console.error("Registration error", err);
      toast.error("Failed to register. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Expo Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Select Booth</label>
          <select
            name="boothId"
            required
            onChange={handleChange}
            className="w-full border p-2 rounded"
            value={formData.boothId}
          >
            <option value="">-- Select a booth --</option>
            {booths.map((booth) => (
              <option key={booth._id} value={booth._id}>
                {booth.number} ({booth.size}) - {booth.location}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Company Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="logo"
          value={formData.logo}
          onChange={handleChange}
          placeholder="Logo URL"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="contactEmail"
          value={formData.contactEmail}
          onChange={handleChange}
          placeholder="Contact Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="Website"
          className="w-full p-2 border rounded"
        />

        <div>
          <label className="block font-medium">Exhibition</label>
          <input
            type="text"
            value={expoTitle}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default ExpoRegistrationForm;
