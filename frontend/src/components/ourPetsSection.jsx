import PetCard from "./petCard";
import "./ourPetsSection.css";
import "./style.css"
export default function OurPetsSection(props) {
  return (
    <div className="container">
      <h1 className="text-center loving-text">{props.header? props.header: "Take a Look at Some of Our Pets"}</h1>
      <div className="row">
        <div className="col-md-3 col-sm-6 col-12">
          <PetCard petName="Card 1" petDescription="This is card 1"  />
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