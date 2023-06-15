import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const StripeModalButton = () => {
  const [user, setUser] = useState(null); // State for user authentication status

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Set the user state based on authentication status
      setUser(user);
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleClick = (e) => {
    // If user is not logged in, show an alert
    if (!user) {
      alert('You must be a registered user to make a contribution to a project.');
    }
  };

  return (
    <a
      href="#"
      className="myBtnEgg"
      onClick={handleClick} // Add click handler
      {...(user && { "data-bs-toggle": "modal", "data-bs-target": "#stripePay" })}
    >
      back this project
    </a>
  );
};

export default StripeModalButton;