
import Notes from "./Notes"; 


export default function Home(props) {

  return (
    <div className="container">
      <Notes alert = {props.alert}/>
    </div>
  );
}
