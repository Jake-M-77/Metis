import { TextEncoder, TextDecoder } from "util";
import "@testing-library/jest-dom";

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;

global.fetch = jest.fn();

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;