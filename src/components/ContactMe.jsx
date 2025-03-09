import React from 'react';

const ContactMe = () => {
  return (
    <div className="contact-section bg-gray-200 text-black p-12">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-4xl font-bold mb-4">Contact Me</h2>
        <p className="text-lg mb-8">Feel free to reach out for collaborations or just a friendly hello 👋:</p>
        <form>
          <input type="text" placeholder="Your name" className="p-2 text-lg" />
          <input type="email" placeholder="Your email" className="p-2 text-lg" />
          <textarea placeholder="Your message" className="p-2 text-lg" />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactMe; 