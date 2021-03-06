import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Label,
  Col,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const RenderDish = ({ dish }) => {
  if (dish != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
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
};

const RenderComment = ({ comments, postComment, dishId }) => {
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

        <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    );
  } else {
    return <div></div>;
  }
};
const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComment
            comments={props.comments}
            postComment={props.postComment}
            dishId={props.dish.id}
          />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

const required = (val) => val && val.length;
const minLength = (len) => (val) => val && val.length >= len;
const maxLength = (len) => (val) => !val || val.length <= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.name,
      values.comment
    );
  }

  render() {
    return (
      <>
        <Button outline className="btn" onClick={this.toggleModal}>
          <i className="fa fa-pencil"></i> Submit Comment
        </Button>
        <div className="row">
          <div className="col-12 col-md-9">
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader>Submit Comment</ModalHeader>
              <ModalBody>
                <LocalForm
                  onSubmit={(values) => {
                    this.handleSubmit(values);
                  }}
                >
                  <Row className="form-group">
                    <Label htmlFor="rating" md={12}>
                      Rating
                    </Label>
                    <Col md={12}>
                      <Control.select
                        model=".rating"
                        className="form-control"
                        name="rating"
                        id="rating"
                        defaultValue="3"
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Control.select>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="rating" md={12}>
                      Your Name
                    </Label>
                    <Col md={12}>
                      <Control.text
                        model=".name"
                        className="form-control"
                        placeholder="Your name"
                        validators={{
                          required,
                          minLength: minLength(3),
                          maxLength: maxLength(15),
                        }}
                      ></Control.text>
                      <Errors
                        className="text-danger"
                        model=".name"
                        show="touched"
                        messages={{
                          required: "Required",
                          minLength: "Must be greater than 2 chracters",
                          maxLength: "Must be 15 characters or less",
                        }}
                      ></Errors>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="rating" md={12}>
                      Comment
                    </Label>
                    <Col md={12}>
                      <Control.textarea
                        model=".comment"
                        className="form-control"
                        rows="6"
                        validators={{
                          required,
                          minLength: minLength(3),
                        }}
                      ></Control.textarea>
                      <Errors
                        className="text-danger"
                        model=".comment"
                        show="touched"
                        messages={{
                          required: "Required \n",
                          minLength: "Must be greater than 2 chracters",
                        }}
                      ></Errors>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={10}>
                      <Button type="submit" color="primary">
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </LocalForm>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </>
    );
  }
}

export default DishDetail;
