import Sidebar from "./Sidebar.jsx";
import "./home.css";

function Home() {
    return (

        <div className="container-new">
          <Sidebar/>
          <div className="others">
            <div className='staringpage'>
              <div className="startingh2">
                Welcome to EZ Hire
              </div>
              <div className="StyledSubTitle">
                Hiring made simpler
              </div>
            </div>
          </div>
        </div>


    );
}
export default Home;