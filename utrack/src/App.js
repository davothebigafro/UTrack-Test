import UserVisualisation from "./components/UserVisualisation";

// Read in users from provided json
let users = require("./users.json");
var usersArray = users.users;

function App() {
  return (
    <div>
      <UserVisualisation userData={usersArray}></UserVisualisation>
    </div>
  );
}

export default App;
