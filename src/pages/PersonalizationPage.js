import React, {useState} from "react";
import './../styles/PersonalizationPage.css';

const genders = ["Male", "Female", "Non-Binary", "Transgender", "Other"]


class PersonalizationPage extends React.Component{
    render() {
        
        return (
            <>
            <body className="bg">

                <div className="container">
                    <img class="logo" src="/assets/images/logo192.png"/>
                    <h1 class="form-header">SoulMatch</h1>
                </div>
                
                <br></br>

                <div className = "selectGender">
                    <form>
                        <label>Please select your gender: </label>
                        <select>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Non-Binary">Non-Binary</option>
                            <option value="Transgender">Transgender</option>
                            <option value="Other">Other</option>
                        </select>
                        <input type="submit" value="Submit" />
                    </form>
                </div>

                <br></br>

                <div className="selectPreferGender">
                    <form>
                        <label>Please select the gender you are 
                            looking for in your matches:</label>
                        
                        <select>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Non-Binary">Non-Binary</option>
                            <option value="Transgender">Transgender</option>
                            <option value="Other">Other</option>
                        </select>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                
                

            </body>
        
    
            </>
           

        );
    
    }

}

export default PersonalizationPage
