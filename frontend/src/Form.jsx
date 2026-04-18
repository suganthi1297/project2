import { useState, useEffect } from "react";

function Form() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [savedData, setSavedData] = useState([]);

  // Load saved data from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("users")) || [];
    setSavedData(data);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validation
  const validate = () => {
    if (form.name.trim() === "") {
      alert("Name is required");
      return false;
    }

    if (!form.email.includes("@")) {
      alert("Enter valid email");
      return false;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (submitted) {
      alert("Already submitted!");
      return;
    }

    if (!validate()) return;

    const existingData = JSON.parse(localStorage.getItem("users")) || [];

    // Prevent duplicate email
    const duplicate = existingData.find(
      (item) => item.email === form.email
    );

    if (duplicate) {
      alert("Email already exists!");
      return;
    }

    const newData = [...existingData, form];

    localStorage.setItem("users", JSON.stringify(newData));

    setSavedData(newData);
    setSubmitted(true);

    alert("Form submitted successfully!");

    // Reset form
    setForm({
      name: "",
      email: "",
      password: ""
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Smart Form</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <input
          className="form-control mb-3"
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
        />

        <button className="btn btn-primary">Submit</button>
      </form>

      {/* Display stored data */}
      <div className="mt-5">
        <h4>Submitted Users</h4>

        {savedData.length === 0 ? (
          <p>No data available</p>
        ) : (
          <table className="table table-bordered mt-3">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {savedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Form;
