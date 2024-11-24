import Background from "../../Components/Background/Backrgound.js";
import MySidebar from "../../Components/Sidebar/MySidebar.js";
import TimeDate from "../../Components/Time/TimeDate.js";
import Card from "../../Components/Cards/Card.js"
import './Home.css'



function Home() {
    return (
      <div className="App">
        <Background/>
        <div className="time-date">
        <TimeDate/>
        </div>
        <MySidebar/>
        <Card/>
      </div>
    );
  }
  
export default Home;
  