import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, Card, Button, Spin, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://testapi.getlokalapp.com/common/jobs?page=${page}`
        );
        setJobs((prevJobs) => [...prevJobs, ...response.data.results]);
      } catch (err) {
        setError("Failed to fetch jobs");
        message.error("Failed to load jobs.");
      }
      setLoading(false);
    };

    fetchJobs();
  }, [page]);

  const loadMore = () => setPage(page + 1);

  if (error) return <p>{error}</p>;

  const handlenavigation = (data) => {
    navigate(`/job/${data.id}`, { state: { data } });
  };

  const handleBookmark = (job) => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    localStorage.setItem("bookmarks", JSON.stringify([...bookmarks, job]));
    message.success("Job bookmarked!");
  };

  return (
    <div>
      <h1>Jobs</h1>
      <Spin spinning={loading} tip="Loading...">
        {jobs?.map((ele) => (
          <div
            key={ele.id}
            className="job_card_container"
            onClick={() => handlenavigation(ele)}
          >
            <Card title={ele?.title}>
              <div className="details_container">
                <p>Experience: {ele?.primary_details?.Experience}</p>
                <p>
                  Salary:{" "}
                  {ele?.primary_details?.Salary
                    ? ele?.primary_details?.Salary
                    : "Not Disclosed"}
                </p>
                <p>Location: {ele?.job_location_slug}</p>
              </div>
              <p>Company Name: {ele?.company_name}</p>
              <p>Other Details: {ele?.other_details}</p>
              <Button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the click event from propagating to the parent div
                  handleBookmark(ele);
                }}
                type="primary"
                style={{ marginTop: "10px" }}
              >
                Bookmark
              </Button>
            </Card>
          </div>
        ))}
      </Spin>
      <Button
        onClick={loadMore}
        disabled={loading}
        style={{ marginTop: "20px" }}
      >
        Load More
      </Button>
    </div>
  );
};

export default Jobs;
