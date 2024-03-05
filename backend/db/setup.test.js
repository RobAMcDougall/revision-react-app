const db = require("./db");
const fs = require("fs");

const mockQuery = vi.fn(() => Promise.resolve());
db.query = mockQuery;

afterEach(() => {
    vi.resetAllMocks();
});

it("should successfully start a backend server", async () => {
    require("./setup");
    expect(mockQuery.mock.calls.length).toBe(1);
    
    const sql = fs.readFileSync(__dirname + "/setup.sql").toString();
    expect(mockQuery.mock.calls[0][0]).toBe(sql);
});
