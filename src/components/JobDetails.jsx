import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { Card, Typography, Spin, Button, Divider, message, Row, Col } from 'antd';
import { PhoneOutlined, ShareAltOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const location = useLocation();
  const {state} = location;
  const jobData = state?.data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        setError('Failed to fetch job details');
        message.error('Failed to load job details.');
      }
      setLoading(false);
    };

    fetchJobDetails();
  }, [id]);

  if (loading) return <Spin tip="Loading..." />;
  if (error) return <Typography.Text type="danger">{error}</Typography.Text>;
  if (!job) return <Typography.Text>Job not found</Typography.Text>;

  return (
    <Card title={<Title level={3}>{jobData?.title}</Title>} style={{ maxWidth: 800, margin: '0 auto' }}>
      <Row gutter={16}>
        <Col span={16}>
          {/* Conditionally render Job Description if available */}
          {jobData?.content && (
            <>
              <Title level={4}>Job Description</Title>
              <Paragraph>{jobData?.content}</Paragraph>
              <Divider />
            </>
          )}
          
          <Title level={4}>Job Details</Title>
          <Paragraph><strong>Company:</strong> {jobData?.company_name}</Paragraph>
          <Paragraph><strong>Location:</strong> {jobData?.primary_details?.Place}</Paragraph>
          <Paragraph><strong>Salary:</strong> {jobData?.primary_details?.Salary}</Paragraph>
          <Paragraph><strong>Experience:</strong> {jobData?.primary_details?.Experience}</Paragraph>
          <Paragraph><strong>Job Type:</strong> {jobData?.primary_details?.Job_Type}</Paragraph>
          <Paragraph><strong>Qualifications:</strong> {jobData?.primary_details?.Qualification}</Paragraph>
          
          <Divider />
          
          <Title level={4}>Contact Details</Title>
          <Paragraph><strong>Phone:</strong> <a href={`tel:${jobData?.custom_link}`}>{jobData?.custom_link.replace('tel:', '')}</a></Paragraph>
          <Paragraph><strong>WhatsApp:</strong> <a href={jobData?.contact_preference?.whatsapp_link}>Message on WhatsApp</a></Paragraph>
          
          <Divider />
          
          <Row gutter={16}>
            <Col>
              <Button type="primary" icon={<PhoneOutlined />} href={`tel:${jobData?.custom_link}`}>Call HR</Button>
            </Col>
            <Col>
              <Button type="default" icon={<ShareAltOutlined />}>Share</Button>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          {jobData?.creatives[0]?.file && (
            <Card cover={<img alt="Job" src={jobData?.creatives[0]?.file} />} />
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default JobDetails;
