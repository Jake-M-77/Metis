import { render, screen, waitFor } from '@testing-library/react';
import Overview from "../PersonOverviewPage/Components/Overview";


jest.mock("../services/personService", () => ({
  getPersonById: jest.fn(),
  getPersonActiveEmailAddress: jest.fn(),
  getPersonActivePhoneNumber: jest.fn(),
  getPersonActiveHomeAddress: jest.fn(),
  transformPersonData: jest.fn(),

}));

jest.mock("../utils/formatAddress", () => ({
  handleHomeAddressFormatting: jest.fn(),
}))


import * as personService from "../services/personService"
import { handleHomeAddressFormatting } from "../utils/formatAddress"
import { Address } from '../types/address';


describe("Overview Page", () => {

  beforeEach(() => {
    (personService.getPersonById as jest.Mock).mockResolvedValue({
      id: 1,
      firstName: "Test",
      lastName: "User",
    });

    (personService.getPersonActiveHomeAddress as jest.Mock).mockResolvedValue({
      houseNumber: "1",
      streetName: "testAddress",
      townOrCity: "TestTown",
      county: "TestCounty",
      postCode: "TE1 1ST",
      propertyType: "HOUSE",
      notes: "",
      createdAt: "2026-01-01"
    } as Address);

      (handleHomeAddressFormatting as jest.Mock).mockReturnValue(

        "1, testAddress, TestTown, TestCounty, TE1 1ST"




      );

    (personService.getPersonActivePhoneNumber as jest.Mock).mockResolvedValue({

      contactValue: "1234567890"

    });

    (personService.getPersonActiveEmailAddress as jest.Mock).mockResolvedValue({

      contactValue: "test@email.com"

    });






  })

  it("should render overview component", async () => {

    render(<Overview />);


    await waitFor(() => {
      expect(screen.getByText(/test@email.com/i)).toBeInTheDocument();
      expect(screen.getByText(/testAddress/i)).toBeInTheDocument();
    });




    screen.debug();


  });



});

// describe('true is truthy and false is falsy', () => {
//   it('true is truthy', () => {
//     expect(true).toBe(true);
//   });

//   it('false is falsy', () => {
//     expect(false).toBe(false);
//   });
// });