import { createWriteStream, WriteStream } from 'fs';
import { once } from 'events';
import { JsonLogFile } from '../src/transports/json-log-file';

jest.mock('fs');
jest.mock('events');

const mockWriteStream = {
  write: jest.fn().mockImplementation(data => data),
  on: jest.fn().mockImplementation(function(_, event, handler) {
    if (event === 'close') {
      handler();
    }
  }),
  close: jest.fn().mockImplementation(jest.fn())
}

describe('JsonLogFile class', () => {
  let jsonLogFile: JsonLogFile
  let mockOnce: Function;
  beforeEach(() => {
    jest.mocked(createWriteStream).mockReturnValueOnce((mockWriteStream as unknown) as WriteStream);
    mockOnce = jest.mocked(once).mockReturnThis()
    jsonLogFile = new JsonLogFile({ filename: 'output.json' })
  })

  it('writes into json file', async () => {
    jsonLogFile.write('{foo: "bar"}')
    expect(mockWriteStream.write).toHaveBeenNthCalledWith(1, '[{foo: "bar"}')
    jsonLogFile.write('{foo: "bar"}')
    expect(mockWriteStream.write).toHaveBeenNthCalledWith(2, ',\n{foo: "bar"}')
    await jsonLogFile.close()
    expect(mockWriteStream.write).toHaveBeenNthCalledWith(3, ']')
    expect(mockOnce).toHaveBeenCalled()
  })
})
