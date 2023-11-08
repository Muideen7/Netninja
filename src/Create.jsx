import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const [isLoading, setIsLoading] = useState(false); // Add a new state variable to track the status of the request
    const history = useHistory(); // Import the useHistory hook

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh
        const blog = { title, body, author }; // Create a blog object with the current state
        setIsLoading(true); // Set the isLoading state variable to true

        fetch('http://localhost:8000/blogs', { // Make a POST request to the blogs endpoint
            method: 'POST', // Specify the method
            headers: { "Content-Type": "application/json" }, // Specify the headers
            body: JSON.stringify(blog) // Specify the body
        }).then(() => { // If the request is successful
            console.log('New blog added');
            setIsLoading(false); // Set the isLoading state variable to false
            history.push('/'); // Redirect to the home page
        })
    }

    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}> {/* Add the onSubmit event handler */}
                <label htmlFor="">Blog title:</label>
                <input 
                type="text" 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="">Blog body:</label>
                <textarea 
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                >
                </textarea>
                <label htmlFor="">Blog author:</label>
                <select 
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="mario">Mario</option>
                    <option value="yoshi">Yoshi</option>
                </select>
                {!isLoading && <button type="submit">Add Blog</button>}
                {isLoading && <button disabled>Adding Blog...</button>}
            </form>
        </div>
     );
}
 
export default Create;