import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import SendEmail from '../../../../service/GlobalApi';


const { SendEmail } = apiClient; // Extract SendEmail from the default object



const ContactUs = () => {
    const [formData, setFormData] = useState({
        email: '',
        subject: '',
        message: '',
    });
    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        setErrorMessage(''); // Clear error message on input change
    };

    const validateForm = () => {
        if (!formData.email || !formData.subject || !formData.message) {
            setErrorMessage('All fields are required.');
            return false;
        }
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrorMessage('Please enter a valid email address.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form:', formData); // Log the submitted data
    
        if (!validateForm()) {
            console.log('Form validation failed.');
            return;
        }
    
        setIsSubmitting(true);
        setResponseMessage('');
    
        try {
            console.log('Sending email via API...');
            const response = await SendEmail(formData);
            console.log('API response:', response);
    
            if (response.status === 200) {
                setResponseMessage('Email sent successfully!');
                setFormData({ email: '', subject: '', message: '' }); // Reset form
            } else {
                console.error('Failed to send email:', response.data.error);
                setResponseMessage(response.data.error || 'Failed to send email.');
            }
        } catch (error) {
            console.error('Error during email send:', error);
            setResponseMessage(
                error.response?.data?.error || 'Something went wrong. Please try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };
    

    return (
        <div className="mt-20 py-8 rounded-xl border lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 className="mb-10 text-xl tracking-tight font-extrabold text-center dark:text-white">
                Contact
            </h2>
            <p>
                Have a question, want to learn more about me, or looking for a developer with
                specific skills? Let's get in touch!
            </p>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        placeholder="name@Gmail.com"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="subject"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Subject
                    </label>
                    <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        placeholder="Let's get in touch"
                        required
                    />
                </div>
                <div className="sm:col-span-2">
                    <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                        Your message
                    </label>
                    <textarea
                        id="message"
                        rows="6"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Leave a message..."
                        required
                    ></textarea>
                </div>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send message'}
                </Button>
            </form>
            {responseMessage && (
                <p className="mt-4 text-center text-sm text-green-600 dark:text-green-300">
                    {responseMessage}
                </p>
            )}
            {errorMessage && (
                <p className="mt-4 text-center text-sm text-red-600 dark:text-red-300">
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

export default ContactUs;
