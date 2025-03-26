import PetCard from "./petCard";
import "./ourPetsSection.css";
import "./style.css";
import DogAndCatImage from "../images/raiseAPet.png";

export default function OurPetsSection(props) {
  return (
    <div className="container">
      <h1 className="text-center loving-text">{props.header? props.header: "Take a Look at Some of Our Pets"}</h1>
      <div className="row">
        <div className="col-md-3 col-sm-6 col-12">
          <PetCard petName="Card 1" petDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."  />
        </div>
        <div className="col-md-3 col-sm-6 col-12">
          <PetCard petName="Card 2" petDescription="This is card 2" />
        </div>
        <div className="col-md-3 col-sm-6 col-12">
          <PetCard petName="Card 3" petDescription="This is card 3" />
        </div>
        <div className="col-md-3 col-sm-6 col-12">
          <PetCard petName="Card 3" petDescription="This is card 3" />
        </div>

      </div>
    </div>
  );
}