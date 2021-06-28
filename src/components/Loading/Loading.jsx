import React, { Spinner } from 'reactstrap'

const Loading = () => {
    return (
        <div className="h-100 bg-secondary d-flex justify-content-center">
            <section className="align-self-center">
            <Spinner animation="grow" role="status">
                <span className="sr-only"></span>
            </Spinner>      
            </section>
        </div>
    )
}

export default Loading
