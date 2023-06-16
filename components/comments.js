import React, { useState, useEffect } from "react";
import { getFirestore, collection, query, orderBy, onSnapshot, addDoc, where, getDocs } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import Comment from "@components/comment";


// Get a Firestore instance
const db = getFirestore();

const Comments = ({ projectId }) => {
  const [commentText, setCommentText] = useState(""); // local state for storing the comment text
  const [comments, setComments] = useState([]); // local state for storing the list of comments

  // Function to fetch user details
  const fetchUser = async (uid) => {
    console.log("Fetching user with UID: ", uid); 
  
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return null;
    }
    
    let userData = null;
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      userData = doc.data();
    });
    
    return userData;
  };

  // function to post a comment to firestore database
  const handleCommentPost = async () => {
    // Get the userId from the authenticated user logged into the session
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to post a comment.");
      return;
    }
  
    // Check if the comment is within the acceptable length
    if (commentText.length > 144) {
      alert("Your comment is too long. Please limit it to 144 characters.");
      return;
    } else if (commentText.length < 3) {
      alert("Your comment is too short. It must be at least 3 characters long.");
      return;
    }
  
    // console logs for testing
    console.log("User UID: ", user.uid);
    console.log("Project ID: ", projectId);
    console.log("Comment: ", commentText);
  
    const userDoc = await fetchUser(user.uid);
    if (userDoc) {
      const newComment = {
        text: commentText,
        firstName: userDoc.firstName,
        lastName: userDoc.lastName,
        createdBy: user.uid,
        createdAt: new Date().toISOString(),
      };
  
      try {
        // Adds the comment to the 'comments' sub-collection of the current project
        await addDoc(collection(db, "projects", projectId, "comments"), newComment);
        setCommentText(""); // This clears the input box after a successful comment post
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  useEffect(() => {
    // Sets up a real-time listener to the 'comments' collection in Firestore
    // Whenever a new comment is added, it's automatically fetched and the local state is updated
    const commentsRef = collection(db, "projects", projectId, "comments");
    const q = query(commentsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map((doc) => doc.data()));
    });

    return unsubscribe; // clean up on component unmount
  }, [projectId]);

  return (
    <div className="row d-flex">
      <div className="col-md-8 px-3">
      <div className="mb-5">
      <h5 className="egg mt-5">Join the conversation</h5>
      <hr className="grenn" />
     
        <textarea className="form-control mb-3" value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment..."
        rows="3"></textarea>
        <a className="myBtnEgg my-4" onClick={handleCommentPost}>Post Comment</a>
        <div className="mt-5">
        {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
      </div>
      {/* <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment..."
      /> */}
      
      </div>
      </div>
    </div>
  );
};

export default Comments;
