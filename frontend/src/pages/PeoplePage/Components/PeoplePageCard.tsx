

function PeoplePageCard() {


    return (<>

        <div className="flex flex-col border ">

            <img
                className="inline-block m-auto w-32 pb-4"
                src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673.png"
                alt="person image">
            </img>

            <div className="grid grid-cols-2 pb-2">
                <p className="text-text-primary">Firstname: </p> <p className="text-text-secondary">test</p>
                <p className="text-text-primary">Surname: </p> <p className="text-text-secondary">test</p>
                <p className="text-text-primary">Date Of Birth: </p> <p className="text-text-secondary">test</p>
                <p className="text-text-primary">RelationType: </p> <p className="text-text-secondary">test</p>

            </div>

        </div>

    </>)
}

export default PeoplePageCard;