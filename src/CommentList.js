import React from 'react';
import Card from 'react-bootstrap/Card';
import { formatDate, getInitials } from './utils';

export default function CommentList({ comments, nameColors }) {
  return (
    <div className="comment-container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h4>All Comments</h4>
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
  );
}
