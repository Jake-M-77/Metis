import { render, screen } from '@testing-library/react';
import PeoplePageCard from '../Components/PeoplePageCard';
import { PersonAssociation } from '../../../types/personAssociation';
import { MemoryRouter } from 'react-router-dom';



describe("PeoplePageCard", () => {


    it("should render People Page Card", async () => {


        const mockAssociation: PersonAssociation = {
            person: {
                id: "123",
                firstName: "John",
                lastName: "Smith",
                birthDate: new Date("1912-06-23T00:00:00.000Z"),
                createdAt: new Date("2026-05-15T00:00:00.000Z"),
                ethnicity: "White",
                pncId: "000000",
                sex: "Male",
            },
            relationType: "UNKNOWN",
            direction: "INCOMING"
        };

        render(
            <MemoryRouter>
                <PeoplePageCard association={mockAssociation} />
            </MemoryRouter>
        );


        const expectedDate = mockAssociation.person.birthDate?.toString().split("T")[0];


        expect(screen.getByText("John")).toBeInTheDocument();
        expect(screen.getByText("Smith")).toBeInTheDocument();
        expect(screen.getByText("UNKNOWN")).toBeInTheDocument();
        expect(screen.getByText(`${expectedDate}`)).toBeInTheDocument();

        expect(screen.getByRole("link"))
            .toHaveAttribute("href", "/person/123/overview");
    });

    // screen.debug();

});

