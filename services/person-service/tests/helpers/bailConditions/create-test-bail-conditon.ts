import request from "supertest";
import { app, server } from "../../../src/index.js";

export const createTestBailCondition = async (personId:string): Promise<string> => {


    const res = await request(app)
    .post("/bail-conditions")
    .send({
        conditionType: "OTHER",
        imposedBy: "JEST - AUTO",
        description: "JEST - AUTO",
        personId: personId,
    });

    if (res.statusCode !== 201) {
        throw new Error(`Failed to create test bail condition!: ${res.statusCode}`)
    }

    return res.body.data.id;

}

export default createTestBailCondition;