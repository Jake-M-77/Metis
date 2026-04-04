import { useState, type FormEvent } from "react";
import Personsearch from "../components/Personsearch/Personsearch";


function Search(){

    const [name, setName] = useState("");

    const [data, setData] = useState<any[]>([]);

    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        
        const res = await fetch(`http://localhost:3001/persons/search?firstName=${name}`);

        const data = await res.json();

        setData(data);

        console.log(data);
    }

    return(<>
    
    <h1 className="text-text-primary text-2xl text-center pb-4 pt-4">Person Search Page</h1>

    <Personsearch />


    {/* <p className="text-xl font-bold">{name}</p>



    <form onSubmit={handleSubmit}>

        <label>
            Name:
            <input type="text" name="name" onChange={e => setName(e.target.value)} />
        </label>

        <input type="submit" value="Submit" />


    </form>


    <hr />


    {data.map((person) => (
        <div key={person.id}>
            <p>Firstname: {person.firstName} - Lastname:{person.lastName} - birthDate: {person.birthDate.split("T")[0]} - createdAt: {person.createdAt}</p>
        </div>
    ))} */}

    </>)
}

export default Search;