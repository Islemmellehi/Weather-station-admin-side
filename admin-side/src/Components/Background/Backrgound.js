import "./Background.css"

import bg from "./assets/bg.mp4"; 


function Background() {
    return (
        <div className="background">
        <video key={bg} className="background-video" autoPlay loop muted>
            <source src={bg} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    </div>
    );
  }
  
export default Background;
  