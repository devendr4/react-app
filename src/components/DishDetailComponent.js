import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
class DishDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderDish(dish) {
    if (dish != null) {
      return (
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  renderComment(comments) {
    if (comments != null) {
      const comment = comments.map((comment) => {
        return (
          <ul key={comment.id} className="list-unstyled">
            <li>{comment.comment}</li>
            <li>
              {" "}
              --{" "}
              {comment.author +
                ", " +
                Intl.DateTimeFormat("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).format(new Date(Date.parse(comment.date)))}
            </li>
          </ul>
        );
      });
      return (
        <div key={comment.id} className="col-12 col-md-5 m-1">
          <h4> Comments</h4>
          {comment}
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    const dish = this.props.dish;
    if (dish != null) {
      return (
        <div className="container">
          <div className="row">
            {this.renderDish(dish)}
            {this.renderComment(dish.comments)}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default DishDetail;
