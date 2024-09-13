import React, { useEffect, useState } from 'react';
import { List, Card, Typography, Spin } from 'antd';
import { Link } from 'react-router-dom';

const Bookmarks = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarkedJobs(bookmarks);
  }, []);

  if (bookmarkedJobs.length === 0) {
    return <Typography.Text>No bookmarks found</Typography.Text>;
  }

  return (
    <div>
      <h1>Bookmarked Jobs</h1>
      
        {bookmarkedJobs?.map((ele) => (
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
            
            </Card>
          </div>
        ))}
      
    </div>
  );
};

export default Bookmarks;
