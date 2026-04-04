
type User = {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: string;
};

type Props = {
    users: User[];
};


function PersonDataTable( {users}: Props ) {


    return (<>

    <div className="flex justify-center p-8">

        <table className="text-text-primary table-fixed border-separate border-4 ">

            <thead className="text-2xl">
                <tr className="">
                    <th className="px-4 py-2">Surname</th>
                    <th className="px-4 py-2">Firstname</th>
                    <th className="px-4 py-2">Date Of Birth</th>
                </tr>
            </thead>


            <tbody className="text-2xl cursor-pointer">

                {users.map((user) => (
                    <tr className="hover:text-primary-hover" key={user.id} onClick={e => console.log(user.id)}>
                        <td className="px-4 py-2">{user.lastName}</td>
                        <td className="px-4 py-2">{user.firstName}</td>
                        <td className="px-4 py-2">{user.birthDate.split("T")[0]}</td>
                    </tr>
                ))}


            </tbody>


        </table>


        </div>


    </>)
}


export default PersonDataTable;