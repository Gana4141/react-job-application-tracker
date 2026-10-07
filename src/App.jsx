import { useState } from "react";
import "./App.css";

function App() {
  const [applications, setApplications] = useState([
    {
      id: 1,
      company: "Cognizant",
      role: "Java Developer",
      location: "Hyderabad",
      status: "Interview",
      date: "2026-10-05"
    },
    {
      id: 2,
      company: "TCS",
      role: "Software Engineer",
      location: "Pune",
      status: "Applied",
      date: "2026-10-03"
    },
    {
      id: 3,
      company: "Infosys",
      role: "React Developer",
      location: "Hyderabad",
      status: "Shortlisted",
      date: "2026-09-29"
    }
  ]);

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Applied");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const addApplication = (e) => {
    e.preventDefault();

    const newApplication = {
      id: Date.now(),
      company,
      role,
      location,
      status,
      date
    };

    setApplications([newApplication, ...applications]);

    setCompany("");
    setRole("");
    setLocation("");
    setStatus("Applied");
    setDate("");
  };

  const deleteApplication = (id) => {
    setApplications(
      applications.filter((application) => application.id !== id)
    );
  };

  const filteredApplications = applications.filter((application) => {
    const searchMatch =
      application.company.toLowerCase().includes(search.toLowerCase()) ||
      application.role.toLowerCase().includes(search.toLowerCase()) ||
      application.location.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      filter === "All" || application.status === filter;

    return searchMatch && statusMatch;
  });

  const totalApplications = applications.length;
  const appliedApplications =
    applications.filter((app) => app.status === "Applied").length;
  const interviewApplications =
    applications.filter((app) => app.status === "Interview").length;
  const selectedApplications =
    applications.filter((app) => app.status === "Selected").length;

  return (
    <div>
      <header className="header">
        <div>
          <h1>JobTrack</h1>
          <p>Career Application Manager</p>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div>
            <p className="dashboard-title">JOB APPLICATION DASHBOARD</p>
            <h2>Track your job search with confidence.</h2>
            <p>
              Manage your job applications and track your career progress
              in one place.
            </p>
          </div>
        </section>

        <section className="stats">
          <div className="card">
            <h3>Total Applications</h3>
            <strong>{totalApplications}</strong>
          </div>

          <div className="card">
            <h3>Applied</h3>
            <strong>{appliedApplications}</strong>
          </div>

          <div className="card">
            <h3>Interviews</h3>
            <strong>{interviewApplications}</strong>
          </div>

          <div className="card">
            <h3>Selected</h3>
            <strong>{selectedApplications}</strong>
          </div>
        </section>

        <section className="form-section">
          <h2>Add Job Application</h2>

          <form onSubmit={addApplication}>
            <input
              type="text"
              placeholder="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Job Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Applied">Applied</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <button type="submit">Add Application</button>
          </form>
        </section>

        <section className="application-section">
          <div className="toolbar">
            <input
              type="text"
              placeholder="Search company, role or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Applied Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredApplications.map((application) => (
                  <tr key={application.id}>
                    <td>
                      <strong>{application.company}</strong>
                    </td>
                    <td>{application.role}</td>
                    <td>{application.location}</td>
                    <td>
                      <span
                        className={
                          "status " + application.status.toLowerCase()
                        }
                      >
                        {application.status}
                      </span>
                    </td>
                    <td>{application.date}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteApplication(application.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;