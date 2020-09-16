import React from "react";
import { Card, CardImg, CardText, CardBody } from "reactstrap";
import { Loading } from "./LoadingComponent";
const RenderCard = ({ item, isLoading, errMess }) => {
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  } else
    return (
      <Card>
        <CardImg src={item.image} alt={item.name} />
        <CardBody>
          <h4>{item.name}</h4>
          <h6> {item.designation ? item.designation : null}</h6>
          <CardText>{item.description}</CardText>
        </CardBody>
      </Card>
    );
};

const Home = (props) => {
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.dish}
            isLoading={props.dishesLoading}
            errMess={props.dishesErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={props.promotion} />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={props.leader} />
        </div>
      </div>
    </div>
  );
};
export default Home;
