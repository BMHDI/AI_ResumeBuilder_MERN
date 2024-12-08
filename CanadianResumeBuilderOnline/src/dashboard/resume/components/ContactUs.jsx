import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        email: '',
        subject: '',
        message: '',
    });
    const [responseMessage, setResponseMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setResponseMessage('');

        try {
            const response = await fetch('http://localhost:3000/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setResponseMessage('Email sent successfully!');
                setFormData({ email: '', subject: '', message: '' }); // Reset form
            } else {
                const errorData = await response.json();
                setResponseMessage(errorData.error || 'Failed to send email.');
            }
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className=" mt-20 py-8 rounded-xl  border lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 className="mb-10 text-xl tracking-tight font-extrabold text-center  dark:text-white">
                Contact
            </h2>
            <p>
            Have a question, want to learn more about me, or looking for a developer with specific skills? Let's get in touch!

Feel free to reach out if you're looking for someone with expertise in a particular technology, need guidance, or just want to connect. I'm open to new opportunities and collaborations!

For app users: If you have any suggestions or feedback to improve the app, we’d love to hear from you! Your input helps us make the app even better for everyone.
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
                        placeholder="Let's get in touche"
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
                <Button
                    type="submit"
                    disabled={isSubmitting}
                                   >
                    {isSubmitting ? 'Sending...' : 'Send message'}
                </Button>
            </form>
            {responseMessage && (
                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
                    {responseMessage}
                </p>
            )}
        </div>
    );
};

export default ContactUs;
