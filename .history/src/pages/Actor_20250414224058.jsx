import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./actor.css";

const ActorPage = () => {

  
  return (
    <>
      <main className="container my-5">
        <div className="row">
          <div className="col-lg-8">
            <div className="mb-4">
              <p className="text-muted mb-1">Films Starring</p>
              <h1 className="mb-4">Cillian Murphy</h1>
              <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
                {[1, 2, 3, 4, 5].map((filmNumber) => (
                  <div className="col" key={filmNumber}>
                    <div className="card h-100 border-0 shadow-sm">
                      <img 
                        src={`./images/Film ${filmNumber}.jpg`} 
                        alt={`Film ${filmNumber}`} 
                        className="card-img-top img-fluid"
                      />
                      <div className="card-body p-2">
                        <h5 className="card-title fs-6 mb-0">Film Title {filmNumber}</h5>
                        <p className="card-text text-muted small">202{filmNumber}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <aside className="col-lg-4">
            <div className="card mb-4 border-0 shadow-sm">
              <img 
                src="./images/actor.jpg" 
                className="card-img-top rounded-top" 
                alt="Cillian Murphy" 
              />
              <div className="card-body">
                <h3 className="h5 card-title">Cillian Murphy (born May 25, 1976) is an Irish actor.</h3>
                <p className="card-text">
                  He made his professional debut in Enda Walsh's 1996 play Disco Pigs, a
                  role he later reprised in the 2001 screen adaptation. His notable films
                  include 28 Days Later, The Dark Knight Trilogy, and Peaky Blinders.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

    </>
  );
};

export default ActorPage;