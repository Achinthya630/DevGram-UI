import React from "react";

const UserCard = ({ user }) => {
//   console.log(user);
  const {firstName, lastName, age, gender, about, skills} = user;
  return (
    <div className="flex justify-center">
      <div className="card bg-base-200 w-96 shadow-sm mb-10 mt-8">
        <figure>
          <img
            src={user.photoUrl}
            alt="photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && (<p>{age}, {gender}</p>)}
          <p>{about}</p>
          <p>Skills: {skills}</p>

          <div className="card-actions justify-end">
            <button className="btn btn-error">Skip</button>
            <button className="btn btn-success">Interested</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
