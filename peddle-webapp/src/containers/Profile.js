import React,{Component} from 'react';
import { render } from 'react-dom';
import ProfileDetails from "../components/ProfileDetails";


class Profile extends Component{
    constructor() {
        super();
        this.state = ({
            user: {
                id: 1,
                name: "Bobby Axelrod",
                email: "baxe@gmail.com",
                cityName: "New York/NY/USA",
                profilePhoto: "/test.png",
                profileInfo: "A self made Wall Street billionaire with one of the most successful hedge funds in the business, Bobby Axelrod enjoys all the trappings of his success: mansions, a private jet, a helicopter, and a personal chef. But he also doesn't forget his humble roots, or the fact that he survived 9/11 by a fluke. Although Axe's intentions are good, the temptations of greed and power are enormous and the lines between right and wrong in high finance are blurry at best. He is a shrewd enough player to never reveal his full hand to anybody."
            }
        })
    };

  render(){
    return(
        <div>

        <p>
            Profile details
        </p>
            <ProfileDetails user = {this.state.user}
            />

        </div>
/*trtr*/
    )
  }
}
render(<Profile />, document.getElementById('root'));
export default Profile;