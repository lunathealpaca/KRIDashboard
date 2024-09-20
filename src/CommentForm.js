import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./CommentForm.css";

export default function CommentForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [kriItem, setKriItem] = useState("");
  const [comment, setComment] = useState("");
  const [team, setTeam] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [showError, setShowError] = useState(false);

  const convertLocalToUTC = (localTimestamp) => {
    const localDate = new Date(localTimestamp);
    return localDate.toISOString();
  };

  const handleSubmit = () => {
    if (name && kriItem && comment) {
      const commentData = {
        name,
        kriItem,
        comment,
        team,
        ticketNumber,
        timestamp: new Date().toISOString(),
        manualTimestamp: timestamp ? convertLocalToUTC(timestamp) : null,
      };
      onSubmit(commentData);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="input-container">
      {showError && (
        <Alert variant="danger">Please fill in all mandatory fields.</Alert>
      )}
      <Form.Group controlId="formNameInput">
        <Form.Label>Name *</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="custom-input"
        />
      </Form.Group>
      <Form.Group controlId="formKriItemInput">
        <Form.Label>KRI Item *</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter KRI Item"
          value={kriItem}
          onChange={(e) => setKriItem(e.target.value)}
          className="custom-input"
        />
      </Form.Group>
      <Form.Group controlId="formCommentInput">
        <Form.Label>Comment *</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Add your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="custom-input"
        />
      </Form.Group>
      <Form.Group controlId="formTeamInput">
        <Form.Label>Team/Business Group</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Team/Business Group"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          className="custom-input"
        />
      </Form.Group>
      <Form.Group controlId="formTicketNumberInput">
        <Form.Label>Ticket Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Ticket Number"
          value={ticketNumber}
          onChange={(e) => setTicketNumber(e.target.value)}
          className="custom-input"
        />
      </Form.Group>
      <Form.Group controlId="formTimestampInput">
        <Form.Label>
          If you are commenting on another time period, please specify
        </Form.Label>
        <Form.Control
          type="datetime-local"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          className="custom-input"
        />
      </Form.Group>
      <Button
        variant="primary"
        onClick={handleSubmit}
        className="submit-button"
      >
        Submit
      </Button>
    </div>
  );
}
