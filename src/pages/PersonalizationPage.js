import React, {useState} from "react";
import './../styles/PersonalizationPage.css';


class PersonalizationPage extends React.Component{
    
    render() {
        
        return (
            <>
            <body className="bg">

                <div className="container">
                    <img className="logo" src="/assets/images/logo192.png"/>
                    <h1 className="form-header">SoulMatch</h1>
                </div>
                
                <br></br>

                <div>
                    <div>
                        <GenderDropdown switchFormType/>
                        <br></br>
                    </div>
                   
                   <div>
                        <PreferGenderDropdown switchFormType/>
                        <br></br>
                   </div>

                   <div className="form-box">
                        <label>Select the selfie you would like to upload</label>
                        <ImageUpload selfie/>
                        <br></br>
                   </div>
                    
                    <br></br>
                    
                    <div>
                        <Hobbies hobby/>
                    </div>
                    <input type="submit" value="Submit" />
                </div>

                <br></br>

               
                

            </body>
        
    
            </>
           

        );
    
    }

}

const GenderDropdown = () => {
    const [gender, setGender] = useState('');
    

    return (
        <div className='form-box'>
            
            <form onSubmit={() => {
                
                console.log(`Setting Gender: ${gender}`)
            }}>
                <label>Select your gender: </label>
                        
                    <select value={gender} onChange={event => setGender(event.target.value)}>
                        <option value="">-- Select Option --</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-Binary">Non-Binary</option>
                        <option value="Transgender">Transgender</option>
                        <option value="Other">Other</option>
                    </select>
                    

            </form>

           
        </div>
    );
};

const PreferGenderDropdown = () => {
    const [preferGender, setPreferGender] = useState('');
    

    return (
        <div className='form-box'>
            
            <form onSubmit={() => {
                
                console.log(`Setting preferred gender: ${preferGender}`)
            }}>
                <label>Select the gender you are 
                            looking for in your matches:</label>
                        
                    <select value={preferGender} onChange={event => setPreferGender(event.target.value)}>
                        <option value="">-- Select Option --</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-Binary">Non-Binary</option>
                        <option value="Transgender">Transgender</option>
                        <option value="Other">Other</option>
                    </select>
                    

            </form>

           
        </div>
    );
};

const Hobbies = () => {
    const [selectedOptions, setHobbies] = useState([]);

    const handleSelectChange = event => {
        const options = event.target.options;
        const selectedValues = [];

        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
              selectedValues.push(options[i].value);
            }
        }

        if (selectedValues.length > 2) {
            alert('You can only select up to 2 options.');
            event.preventDefault();
            
        } else {
            setHobbies(selectedValues);
        }

        

    }


    return(
        <div>
            <label htmlFor="options">Select multiple options:</label>
            <select id="options" multiple value={selectedOptions} onChange={handleSelectChange}>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
                <option value="option5">Option 5</option>
            </select>
            <p>You selected: {selectedOptions.join(', ')}</p>
        </div>
    );
}


const ImageUpload = () => {
    const [image, setImage] = useState();
    console.log(image);

    return(
        <div>
            
            <input id="imgs" type="file" onChange={(e)=>setImage(e.target.files)}/>
        </div>
        
    );
}


export default PersonalizationPage
