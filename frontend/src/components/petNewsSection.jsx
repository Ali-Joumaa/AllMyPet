import PetCard from "./petCard";
import "./petNewsSection.css";
import newsPet from "../images/newsPet.png";
export default function PetNewsSection(props) {
  return (
    <div className="container">
      <h1 className="text-center">Pet News</h1>
      <div className="row">
        <div className="col-md-3 col-sm-6 col-12">
          <PetCard petName="Pet News1" petImage={newsPet} petDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor..." isNews={true}/>
        </div>
        <div className="col-md-3 col-sm-6 col-12">
          <PetCard petName="Pet News2" petImage={newsPet} petDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor..."  isNews={true}/>
        </div>
        <div className="col-md-3 col-sm-6 col-12">
          <PetCard petName="Pet News3" petImage={newsPet}petDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor..." isNews={true} />
        </div>
        <div className="col-md-3 col-sm-6 col-12">
          <PetCard petName="Pet News4" petImage={newsPet}petDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor..." isNews={true} />
        </div>

      </div>
    </div>
  );
}