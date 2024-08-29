import "./App.css";
import React, { useState, useRef, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TableauViz from './TableauViz';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import FilterModal from './FilterModal';

const colors = ['#aa47bc', '#7a1fa2', '#ec407a', '#c2175b', '#5c6bc0', '#0288d1', '#00579c', '#0098a6', '#00887a', '#004c3f', '#689f39', '#33691e', '#33691e', '#ef6c00', '#ef6c00', '#bf360c'];

export default function App() {
  const [comments, setComments] = useState([]);
  const [originalComments, setOriginalComments] = useState([]);
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

  const handleSend = (newComment) => {
    if (!names.includes(newComment.user)) {
      const newNameColors = { ...nameColors };
      newNameColors[newComment.user] = colors[names.length % colors.length];
      setNames([...names, newComment.user]);
      setNameColors(newNameColors);
    }
    setComments([...comments, newComment]);
    setOriginalComments([...originalComments, newComment]);
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
            <h1>Tableau Visualization</h1>
            <div className="tableau-container">
            <TableauViz />
            </div>
          </Col>
          <Col sm={4}>
            <Container align='left' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '700px' }}>
              <CommentList comments={comments} nameColors={nameColors} />
              <CommentForm 
                userName={userName}
                setUserName={setUserName}
                showNameInput={showNameInput}
                setShowNameInput={setShowNameInput}
                names={names}
                userNameInputRef={userNameInputRef}
                onSend={handleSend}
              />
            </Container>
          </Col>
        </Row>
      </Container>

      <FilterModal 
        show={showFilterModal} 
        onHide={() => setShowFilterModal(false)} 
        filterUser={filterUser} 
        setFilterUser={setFilterUser}
        filterStartDate={filterStartDate}
        setFilterStartDate={setFilterStartDate}
        filterEndDate={filterEndDate}
        setFilterEndDate={setFilterEndDate}
        names={names}
        onFilter={handleFilter}
        onReset={handleReset}
      />
    </div>
  );
}
