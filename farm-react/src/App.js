import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import axios from "axios";


function App() {
  const [comicBookTitle, setComicBookTitle] = useState("");
  const [comicBookIssueNumber, setComicBookIssueNumber] = useState("");
  const [comicsList, setComicsList] = useState([]);
  const comicSearchHandler = async () => {
    const response = await axios.get("http://0.0.0.0:8000/comics/" + comicBookTitle + "/" + comicBookIssueNumber);
    console.log(comicsList);
    console.log(response.data);
    setComicsList(response.data);
    console.log(comicsList);
  };

  const handleComicTitleChange = (event) => {
    setComicBookTitle(event.target.value);
  };

  const handleComicBookIssueNumber = (event) => {
    setComicBookIssueNumber(event.target.value);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h1>Comic Book API Form</h1>
        <form>
          <label htmlFor="comicBookTitleInput">Comic Book Title:</label><br/>
          <input type="text" name="comicBookTitleInput" id="comicBookTitleInput" value={comicBookTitle} onChange={handleComicTitleChange}/><br/>
          <label htmlFor="comicBookIssueNumberInput">Issue Number:</label><br/>
          <input type="text"  name="comicBookIssueNumberInput" id="comicBookIssueNumberInput" value={comicBookIssueNumber} onChange={handleComicBookIssueNumber}/><br/>
        </form><br/>
        <button id="comicBookSearch" onClick={comicSearchHandler}>Search</button>
        <h2>Search Results</h2>
        <table>
          <thead>
          <tr>
            <th>Publisher Name</th>
            <th>Title</th>
            <th>Issue</th>
            <th>Publish Date</th>
          </tr>
          </thead>
          <tbody>
          {comicsList.map((comicBook, key) =>
            <tr key={key}>
                <td>{comicBook.publisher_name}</td>
                <td>{comicBook.series_name}</td>
                <td>{comicBook.number}</td>
                <td>{comicBook.on_sale_date}</td>
              </tr>
            )}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
