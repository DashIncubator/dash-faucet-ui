import React from "react";

export default function App() {
  const [response, setResponse] = React.useState(null);
  const [address, setAddress] = React.useState(
    "yZVHsZUsEHNPT3NgHnUYiUdQhbBzQZ559L"
  );
  const [requesting, setRequesting] = React.useState(false);
  const faucet =
    "https://qetrgbsx30.execute-api.us-west-1.amazonaws.com/stage/";

  const fundAddress = address => {
    setRequesting(true);
    setResponse({ status: "requesting" });
    fetch(`${faucet}?dashAddress=${address}`)
      .then(res => res.json())
      .catch(e => {
        console.log("catch after first then:", e);
        throw e;
      })
      .then(data => setResponse(data))
      .catch(e => {
        console.log("catch after second then:", e);
        setResponse({ status: "error", details: e });
      })
      .finally(() => setRequesting(false));
  };

  return (
    <div>
      <h1>Get eDASH</h1>
      <input
        placeholder="Enter your Dash evonet address (y...)"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <br />
      <button
        type="button"
        disabled={requesting}
        className={requesting ? "disabled" : ""}
        onClick={() => fundAddress(address)}
      >
        {requesting ? "Waiting for funds..." : "Request funds"}
      </button>
      <div className="output">
        {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      </div>
    </div>
  );
}
