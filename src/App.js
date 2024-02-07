import { Auth } from "./Auth";
import Dashboard from "./Components/userProfile/Dashboard";
import { LoginPage } from "./Components/userProfile/LoginPage";

function App() {
  return (
    <> <Auth dashboard={<Dashboard />} login={<LoginPage />}></Auth></>
  );
}

export default App;
