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

                <GenderDropdown switchFormType={this.switchFormType}/>

                <br></br>

                <PreferGenderDropdown switchFormType={this.switchFormType}/>

            </body>
        
    
            </>
           

        );
    
    }

}

const GenderDropdown = ({switchFormType}) => {
    const [gender, setGender] = useState('');
    

    return (
        <div className='form-box'>
            
            <form className='auth-form' onSubmit={() => {
                
                console.log(`Setting Gender: ${gender}`)
            }}>
                <label>Select your gender: </label>
                        
                    <select value={gender} onChange={event => setGender(event.target.value)}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-Binary">Non-Binary</option>
                        <option value="Transgender">Transgender</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="submit" value="Submit" />

            </form>

           
        </div>
    );
};

const PreferGenderDropdown = ({switchFormType}) => {
    const [preferGender, setPreferGender] = useState('');
    

    return (
        <div className='form-box'>
            
            <form className='auth-form' onSubmit={() => {
                
                console.log(`Setting preferred gender: ${preferGender}`)
            }}>
                <label>Select the gender you are 
                            looking for in your matches:</label>
                        
                    <select value={preferGender} onChange={event => setPreferGender(event.target.value)}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-Binary">Non-Binary</option>
                        <option value="Transgender">Transgender</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="submit" value="Submit" />

            </form>

           
        </div>
    );
};

export default PersonalizationPage
