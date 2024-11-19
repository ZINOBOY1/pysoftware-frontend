import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card,Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomNavbar from '../components/Navbar'; 
import { fetchMenuItems } from '../api/Api';

function Homepage() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function loadMenuItems() {
      const data = await fetchMenuItems();
      setMenuItems(data);
    }
    loadMenuItems();
  }, []);

  return (
    <div>
      {/* Custom Navbar Component */}
      <CustomNavbar />

      {/* Hero Section */}
      <div className="hero-section bg-primary text-white text-center py-5">
        <Container>
          <h1>Welcome to Pysoftware</h1>
          <p>Your trusted partner for educational technology solutions.</p>
          <Button variant="light" size="lg" as={Link} to="/">
            Get Started
          </Button>
        </Container>
      </div>

      {/* Main Content Section */}
      <Container className="mt-5">
        <Row>
          <Col md={3}>
            <h3 className="text-center">Quick Links</h3>
            <Nav defaultActiveKey="/home" className="flex-column">
              {menuItems.map((item) => (
                <Nav.Link key={item.id} as={Link} to={item.href}>
                  {item.menu_item}
                </Nav.Link>
              ))}
            </Nav>
          </Col>

          <Col md={9}>
            <h2>Welcome to Pysoftware</h2>
            <p>Choose an option from the menu to get started. Whether you're a student, teacher, or parent, we provide the best educational tools and services to enhance your learning experience.</p>

            {/* Featured Cards or Sections */}
            <Row className="mt-4">
              <Col sm={12} md={4}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Student Portal</Card.Title>
                    <Card.Text>
                      Access all your educational materials, grades, and assignments through the student portal.
                    </Card.Text>
                    <Button variant="primary" as={Link} to="/students">Go to Student Portal</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={12} md={4}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Tutor Services</Card.Title>
                    <Card.Text>
                      Find the right tutor for your needs and book online sessions.
                    </Card.Text>
                    <Button variant="primary" as={Link} to="/tutor">Find a Tutor</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={12} md={4}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Pricing Plans</Card.Title>
                    <Card.Text>
                      Learn more about our pricing and packages for schools and institutions.
                    </Card.Text>
                    <Button variant="primary" as={Link} to="/pricing">View Pricing</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-4 mt-5">
        <p>© 2024 Pysoftware Services Ltd, Owerri, Imo State, Nigeria</p>
        <p>
          <Link to="/contact" className="text-white">Contact Us</Link> | <Link to="/help" className="text-white">Help</Link>
        </p>
      </footer>
    </div>
  );
}

export default Homepage;
