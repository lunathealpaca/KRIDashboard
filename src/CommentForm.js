import React, { useState } from 'react';
import { Form, Button, Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';

export default function CommentForm({
  userName,
  setUserName,
  showNameInput,
  setShowNameInput,
  names,
  userNameInputRef,
  onSend
}) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim() !== "" && userName.trim() !== "" && userName !== "Any User") {
      const newComment = {
        title: inputValue,
        date: new Date(),
        text: "",
        user: userName
      };
      onSend(newComment);
      setInputValue("");
      setUserName("");
      setShowNameInput(false);
    }
  };

  return (
    <div className="input-container">
      <Form.Group controlId="formUserNameInput">
        {showNameInput ? (
          <Form.Control
            ref={userNameInputRef}
            className="user-name-input"
            type="text"
            placeholder="Enter Your Name or Organization"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
  );
}
