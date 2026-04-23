import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import type { Person } from "../../types/person";
import { handleHomeAddressFormatting } from "../../utils/formatAddress";
import { getPersonActiveEmailAddress, getPersonActiveHomeAddress, getPersonActivePhoneNumber, getPersonById, transformPersonData } from "../../services/personService";


function Overview() {

    const userId = useParams();

    const [phonenumber, setPhoneNumber] = useState<any>([]);

    const [emailAddress, setEmailAddress] = useState<any>([]);

    const [homeAddress, setHomeAddress] = useState<any>([]);

    const [personData, setPersonData] = useState<Person | null>(null);

    useEffect(() => {

        async function loadPerson() {
            try{
                const person = await transformPersonData(`${userId.id}`);
                setPersonData(person);
            }catch (error){
                console.error("Failed to load Person", error);
            }
        }

        async function loadPersonNumber() {
            try {
                const number = await getPersonActivePhoneNumber(`${userId.id}`);
                setPhoneNumber(number);
            } catch (error) {
                console.error("Failed to load person Number", error);
            }
        }

        async function loadPersonEmail() {
            try {
                const email = await getPersonActiveEmailAddress(`${userId.id}`);
                setEmailAddress(email);
            }catch (error) {
                console.error("Failed to load person email", error);
            }
        }

        async function loadPersonHomeAddress() {
            try{
                const address = await getPersonActiveHomeAddress(`${userId.id}`);
                console.log(address);
                const x = await handleHomeAddressFormatting(address);
                setHomeAddress(x);
            } catch (error) {
                console.error("Failed to load person home address");
            }
        }

        loadPerson();
        loadPersonNumber();
        loadPersonEmail();
        loadPersonHomeAddress();

    }, [userId.Id])

    return (<>


        {/* MAIN LAYOUT */}
        <div className="flex h-[calc(100vh-3rem)]">

            <div className="flex min-w-0 relative">

                {/* LEFT SIDE (everything except image) */}
                <div className="flex-1 p-2 overflow-auto">

                    <aside className="w-[55vw] border-r border-b border-border-default">
                        <p className="text-text-primary text-3xl border-b m-2">FirstName: <span>{personData?.firstName ?? "Unknown"}</span> </p>
                        <p className="text-text-primary text-3xl border-b m-2">Surname: <span>{personData?.lastName ?? "Unknown"}</span> </p>
                        <p className="text-text-primary text-3xl border-b m-2">Date Of Birth:  <span>{personData?.birthDate?.toLocaleDateString() ?? "Unknown"}</span> </p>
                        <p className="text-text-primary text-3xl border-b m-2">Last Known Address: <span>{homeAddress ?? "Unknown"}</span> </p>
                        <p className="text-text-primary text-3xl border-b m-2">Telephone Number:  <span>{phonenumber.contactValue ?? "Unknown"}</span></p>
                        <p className="text-text-primary text-3xl border-b m-2">Email Address:  <span>{emailAddress.contactValue ?? "Unknown"}</span></p>
                        <p className="text-text-primary text-3xl border-b m-2">PNC ID: <span>{personData?.pncId ?? "Unknown"}</span> </p>
                        <p className="text-text-primary text-3xl border-b m-2">Sex: <span>{personData?.sex ?? "Unknown"}</span> </p>
                        <p className="text-text-primary text-3xl border-b m-2">Height:  </p>
                        <p className="text-text-primary text-3xl border-b m-2">Ethnicity: <span>{personData?.ethnicity ?? "Unknown"}</span> </p>
                        <p className="text-text-primary text-3xl border-b m-2 text-wrap">Alias Details: </p>
                        <p className="text-text-primary text-3xl border-b m-2">Managed By:</p>


                    </aside>
                    {/* Immediate info ** Info regarding the person like OCG or stating that they are in detention** */}
                    <h2 className="text-danger text-3xl my-6">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit...
                    </h2>

                </div>

                {/* RIGHT SIDE (IMAGE ONLY) */}
                <div className="w-2 flex justify-center pt-12 pl-2 items-start lg:w-[300px]">

                    <a href="https://www.thamesvalley.police.uk/SysSiteAssets/media/images/thames-valley/about-us/rebrand/tvp-new-crest-250.png?crop=(0,0,1024,1024)&w=1024&h=1024&scale=both&mode=max"
                        target="__blank">

                        <img
                            className="w-32 h-32 object-cover border-4 rounded-3x lg:w-[300px] h-[300px]"
                            src="https://www.thamesvalley.police.uk/SysSiteAssets/media/images/thames-valley/about-us/rebrand/tvp-new-crest-250.png?crop=(0,0,1024,1024)&w=1024&h=1024&scale=both&mode=max"
                            alt="personimg"

                        />

                    </a>

                </div>


            </div>

        </div>



    </>)
}

export default Overview;