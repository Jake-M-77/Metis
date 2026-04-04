import { useState, type FormEvent } from "react";
import PersonDataTable from "../PersonDataTable/PersonDataTable";



function Personsearch() {

    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    const [data, setData] = useState(null);


    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();


        const res = await fetch(`http://localhost:3001/persons/search?firstName=${firstName}`);

        const data = await res.json();

        setData(data);

        console.log(data);


    }





    return (<>

        <div className="flex justify-center">




            <form className="inline-block p-4 border-4 space-y-4" onSubmit={handleSubmit}>


                <div className="grid grid-cols-[120px_1fr]">

                    <label className="text-text-primary mr-4">Surname:</label>
                    <input className="w-40" type="text" name="surname" onChange={e => setSurname(e.target.value)} />

                </div>


                <div className="grid grid-cols-[120px_1fr]">

                    <label className="text-text-primary mr-4">FirstName:</label>
                    <input className="inline-block w-40" type="text" name="firstName" onChange={e => setFirstName(e.target.value)} />

                </div>


                <div className="grid grid-cols-[120px_1fr]">

                    <label className="inline-flex text-text-primary mr-4">DateOfBirth:</label>
                    <input className="inline-block w-40" type="date" name="dateOfBirth" onChange={e => setDateOfBirth(e.target.value)} />


                </div>



                <input className="block mx-auto px-4 py-2 border-4 rounded-xl text-text-primary" type="submit" value="Submit" />



            </form>


        </div>

        {data && <PersonDataTable users={data} /> }




    </>)


}

export default Personsearch;