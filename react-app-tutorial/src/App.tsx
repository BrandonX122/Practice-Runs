import { useState } from "react";
import Alert from "./components/Alert";
import MyButton from "./components/MyButtton";
// import ListGroup from "./components/ListGroup";

function App() {
  // let items = ["New York", "San Fran", "Tokyo", "London", "Paris"];

  // const handleSelectItem = (item: string) => {
  //   console.log(item);
  // };
  const [alertVisible, setAlertVisibility] = useState(false);

  return (
    <div>
      {/* <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      /> */}
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>My Alert</Alert>
      )}
      <MyButton
        color="danger"
        onClick={() => {
          setAlertVisibility(true);
        }}
      >
        Button
      </MyButton>
    </div>
  );
}

export default App;
