import React, { Spinner } from "reactstrap";

const Loading = () => {
  return (
    <div className="bg-secondary d-flex justify-content-center" style={{height:"100vh"}}>
      <section className="align-self-center">
        <Spinner animation="grow" role="status">
          <span className="sr-only"></span>
        </Spinner>
      </section>
    </div>
  );
};

export default Loading;
