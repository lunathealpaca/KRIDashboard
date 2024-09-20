import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TableauViz from "./TableauViz";
import CommentForm from "./CommentForm";

export default function App() {
  const handleSubmit = async (commentData) => {
    try {
      const response = await fetch("http://localhost:3001/submit-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error(error);
      alert("Error submitting comment.");
    }
  };

  return (
    <div className="App">
      <Container style={{ marginTop: "15px" }}>
        <Row>
          <Col sm={8}>
            <h1>Tableau Visualization</h1>
            <div className="tableau-container">
              <TableauViz />
            </div>
          </Col>
          <Col sm={4}>
            <Container
              align="left"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "700px",
              }}
            >
              <CommentForm onSubmit={handleSubmit} />
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
