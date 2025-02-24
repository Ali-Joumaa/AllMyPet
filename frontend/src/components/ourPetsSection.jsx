import PetCard from "./petCard";
import "./ourPetsSection";
export default function OurPetsSection(props) {
  return (
    <div className="container">
        <h1 className="text-center">Take a Look at Some of Our Pets</h1>
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <PetCard petName="Card 1"  petDescription="This is card 1" />
        </div>
        <div className="col-md-3">
          <PetCard petName="Card 2" petDescription="This is card 2" />
        </div>
        <div className="col-md-3">
          <PetCard petName="Card 3" petDescription="This is card 3" />
        </div>
        <div className="col-md-3">
          <PetCard petName="Card 4" petDescription="This is card 4" />
        </div>
      </div>
    </div>
    </div>
  );
}
