import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Jobs from './components/Jobs';
import Bookmarks from './components/Bookmarks';
import JobDetails from './components/JobDetails';


const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/">Jobs</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/bookmarks">Bookmarks</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '20px 50px' }}>
          <Routes>
            <Route path="/" element={<Jobs />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/job/:id" element={<JobDetails />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Job Bookmark App ©2024</Footer>
      </Layout>
    </Router>
  );
}

export default App;
