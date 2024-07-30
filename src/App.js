import "./App.css";
import React, { useState, useRef, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form, Button, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaFilter, FaSync } from 'react-icons/fa';

const colors = ['#aa47bc', '#7a1fa2', '#ec407a', '#c2175b', '#5c6bc0', '#0288d1', '#00579c', '#0098a6', '#00887a', '#004c3f', '#689f39', '#33691e', '#33691e', '#ef6c00', '#ef6c00', '#bf360c'];

export default function App() {
  const [comments, setComments] = useState([]);
  const [originalComments, setOriginalComments] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [userName, setUserName] = useState("");
  const [names, setNames] = useState([]);
  const [nameColors, setNameColors] = useState({});
  const [showNameInput, setShowNameInput] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterUser, setFilterUser] = useState("Any User");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  const userNameInputRef = useRef(null);

  useEffect(() => {
    if (originalComments.length === 0) {
      setOriginalComments(comments);
    }
  }, [comments, originalComments]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim() !== "" && userName.trim() !== "" && userName !== "Any User") {
      if (!names.includes(userName)) {
        const newNameColors = { ...nameColors };
        newNameColors[userName] = colors[names.length % colors.length];
        setNames([...names, userName]);
        setNameColors(newNameColors);
      }
      const newComment = {
        title: inputValue,
        date: new Date(),
        text: "",
        user: userName
      };
      setComments([...comments, newComment]);
      setOriginalComments([...originalComments, newComment]);
      setInputValue("");
      setUserName("");
      setShowNameInput(false);
    }
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: undefined, hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const getInitials = (name) => {
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials.substring(0, 2).toUpperCase();
  };

  const handleFilter = () => {
    setShowFilterModal(false);
    let filteredComments = originalComments;

    if (filterUser && filterUser !== "Any User") {
      filteredComments = filteredComments.filter(comment => comment.user === filterUser);
    }

    if (filterStartDate) {
      filteredComments = filteredComments.filter(comment => new Date(comment.date) >= new Date(filterStartDate));
    }

    if (filterEndDate) {
      filteredComments = filteredComments.filter(comment => new Date(comment.date) <= new Date(filterEndDate));
    }

    setComments(filteredComments);
  };

  const handleReset = () => {
    setFilterUser("Any User");
    setFilterStartDate("");
    setFilterEndDate("");
    setComments(originalComments);
  };

  return (
    <div className="App">
      <Container style={{ marginTop: '15px' }}>
        <Row>
          <Col sm={8}>
            <iframe width="100%" height="700px" src="https://public.tableau.com/views/Regional_16766597857820/GlobalTemperatures?:showVizHome=no&:tabs=no">
            </iframe>
          </Col>
          <Col sm={4}>
            <Container align='left' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '700px' }}>
              <div className="comment-container">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h4>All Comments</h4>
                  <Button variant="outline-secondary" className="filter-button" onClick={() => setShowFilterModal(true)}>
                    <FaFilter style={{ marginRight: '5px' }} /> Filter
                  </Button>
                </div>
                {comments.map((comment, index) => (
                  <Card key={index} className="comment-card">
                    <Card.Body>
                      <div className="card-header">
                        <span className="user-initial" style={{ backgroundColor: nameColors[comment.user] }}>
                          {getInitials(comment.user)}
                        </span>
                        <div className="user-details">
                          <span className="comment-user">{comment.user}</span>
                          <div className="comment-date">{formatDate(comment.date)}</div>
                        </div>
                      </div>
                      <Card.Text className="comment-text">
                        {comment.title}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>
              <div className="input-container">
                <Form.Group controlId="formUserNameInput">
                  {showNameInput ? (
                    <Form.Control
                      ref={userNameInputRef}
                      className="user-name-input"
                      type="text"
                      placeholder="Enter Your Name or Organization"
                      value={userName}
                      onChange={handleUserNameChange}
                      onBlur={() => setShowNameInput(false)}
                      style={{ marginBottom: '10px' }}
                    />
                  ) : (
                    <DropdownButton
                      className="custom-dropdown"
                      title={userName || "Select"}
                      onSelect={(e) => {
                        if (e === "addNew") {
                          setShowNameInput(true);
                          setUserName("");
                          setTimeout(() => {
                            userNameInputRef.current?.focus();
                          }, 0);
                        } else {
                          setUserName(e);
                        }
                      }}
                    >
                      {names.map((name, index) => (
                        name !== "Any User" && (
                          <Dropdown.Item key={index} eventKey={name}>
                            {name}
                          </Dropdown.Item>
                        )
                      ))}
                      <Dropdown.Item eventKey="addNew">+ New User</Dropdown.Item>
                    </DropdownButton>
                  )}
                </Form.Group>
                <Form.Group controlId="formBasicInput" style={{ marginTop: '10px' }}>
                  <InputGroup>
                    <Form.Control as="textarea" className="comment-input" placeholder="Add your comment" value={inputValue} onChange={handleInputChange} />
                    <Button variant="outline-secondary" id="button-addon2" onClick={handleSend} className="custom-button">
                      Add
                    </Button>
                  </InputGroup>
                </Form.Group>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>

      <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)}>
        <Modal.Header closeButton>
        <Modal.Title className="custom-modal-title">Filter Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="filterUser">
            <Form.Label className="custom-form-label">Filter by User</Form.Label>
            <Form.Control as="select" value={filterUser} onChange={(e) => setFilterUser(e.target.value)}>
              <option value="Any User">Any User</option>
              {names.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="filterStartDate" style={{ marginTop: '10px' }}>
            <Form.Label className="custom-form-label">Start Date</Form.Label>
            <Form.Control type="date" value={filterStartDate} onChange={(e) => setFilterStartDate(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="filterEndDate" style={{ marginTop: '10px' }}>
            <Form.Label className="custom-form-label">End Date</Form.Label>
            <Form.Control type="date" value={filterEndDate} onChange={(e) => setFilterEndDate(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleReset}>
            <FaSync style={{ marginRight: '5px' }} /> Reset
          </Button>
          <Button variant="primary" onClick={handleFilter}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
