import axios from "axios";



// Base URL of your Express server
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + "/api/",
    headers: {
        'Content-Type': 'application/json',
    }
});
console.log(import.meta.env.VITE_BASE_URL);

// Function to create a new resume
const CreateNewResume = (data) => axiosClient.post('/user-resumes', data);
  


// Function to get user resumes by email
const GetUserResumes = (userEmail) => 
    axiosClient.get('/user-resumes', { 
        params: { userEmail: userEmail } // Ensure 'userEmail' is the correct query parameter
    });

    const SendEmail = (data) => 
        axiosClient.post('/send-email', data); // Make a POST request to '/send-email'
// Function to update resume details
const UpdateResumeDetail = (id, data) => 
    axiosClient.put(`/user-resumes/${id}`, data);

// Function to get a specific resume by ID
const GetResumeById = (id) => 
    axiosClient.get(`/user-resumes/${id}`);

// Function to delete a resume by ID
const DeleteResumeById = (id) => 
    axiosClient.delete(`/user-resumes/${id}`);

// Function to get all resumes (for testing)
const GetAllResumes = () => 
    axiosClient.get('/user-resumes');

// Export all functions
export default {
    SendEmail,
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById,
    GetAllResumes,  // Added the new function for getting all resumes
};
