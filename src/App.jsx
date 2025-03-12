import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [isNumbersIncluded, setIsNumbersIncluded] = useState(false);
  const [isSpecialCharIncluded, setIsSpecialCharIncluded] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    let pass = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers = "1234567890";
    let specialChars = "!@#$%^&*()_+";

    if (isNumbersIncluded) chars += numbers;
    if (isSpecialCharIncluded) chars += specialChars;

    for (let i = 0; i < length; i++) {
      // Ensure it runs exactly `length` times
      const randomCharIndex = Math.floor(Math.random() * chars.length); // Use chars.length
      pass += chars.charAt(randomCharIndex);
    }

    setPassword(pass);
  };

  const passwordRef = useRef();

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  };

  useEffect(() => {
    generatePassword();
  }, [length, isNumbersIncluded, isSpecialCharIncluded]);

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-4">
          Password Generator
        </h2>

        {/* Password Display with Copy Button */}
        <div className="flex items-center border rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            className="w-full p-2 outline-none"
            readOnly
            placeholder="Generated Password"
            value={password}
            ref={passwordRef}
          />
          <button onClick={copyToClipboard} className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600">
            Copy
          </button>
        </div>

        {/* Length Selector */}
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Password Length: <span id="lengthValue">{length}</span>
          </label>
          <input
            type="range"
            min="6"
            max="20"
            className="w-full"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        {/* Checkbox Options */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="includeNumbers"
            className="mr-2"
            value={isNumbersIncluded}
            onChange={() => setIsNumbersIncluded((prev) => !prev)}
          />
          <label htmlFor="includeNumbers">Include Numbers</label>
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="includeSpecial"
            className="mr-2"
            value={isSpecialCharIncluded}
            onChange={() => setIsSpecialCharIncluded((prev) => !prev)}
          />
          <label htmlFor="includeSpecial">Include Special Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
