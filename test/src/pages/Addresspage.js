import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Pagination, InputGroup, FormControl } from 'react-bootstrap';
import { fetchCustomerAddresses, deleteAddress } from '../api/Api';

function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadAddresses() {
      setLoading(true);
      const data = await fetchCustomerAddresses(currentPage);
      setAddresses(data.results);
      setTotalPages(Math.ceil(data.total / 10));
      setLoading(false);
    }
    loadAddresses();
  }, [currentPage]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredAddresses(addresses);
    } else {
      const filtered = addresses.filter(address =>
        address.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        address.last_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAddresses(filtered);
    }
  }, [searchQuery, addresses]);

  const handleDelete = async (addressId) => {
    await deleteAddress(addressId);
    setAddresses(addresses.filter(address => address.id !== addressId));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <h1>Address List</h1>

      {/* Search Bar */}
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search addresses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>

      {/* Loading State */}
      {loading ? (
        <p>Loading addresses...</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Street</th>
                <th>Postcode</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAddresses.map((address) => (
                <tr key={address.id}>
                  <td>{address.first_name} {address.last_name}</td>
                  <td>{address.street}</td>
                  <td>{address.postcode}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(address.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
          <Pagination>
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          </Pagination>
        </>
      )}
    </Container>
  );
}

export default AddressPage;
