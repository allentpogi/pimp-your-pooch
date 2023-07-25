import React from "react";
import { Link } from "react-router-dom";

const PetList = ({ pets, title, showTitle = true, showUsername = true }) => {
  //   if (!pets.length) {
  //     return <h3>No pets yet.</h3>;
  //   }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {pets &&
        pets.map((pet) => (
          <div key={pet._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link className="text-light" to={`/pets/${pet.name}`}>
                  {pet.name} {pet.breed} <br />
                  <span style={{ fontSize: "1rem" }}>had this on</span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: "1rem" }}>You had this on</span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{pet.name}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/pets/${pet._id}`}
            >
              Join the discussion on this
            </Link>
          </div>
        ))}
    </div>
  );
};

export default PetList;
