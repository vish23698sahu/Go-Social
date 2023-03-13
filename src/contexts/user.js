import { createContext, useState } from "react";
import { auth } from "../firebase";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
    const [user, setUser] = useState(null);

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //         setUser(user)
    //     })
    //     return unsubscribe;
    // }, []);

    return (
        <UserContext.Provider value={{ user: [user, setUser], login, signUp }} >
            {props.children}
        </UserContext.Provider>
    );
}

