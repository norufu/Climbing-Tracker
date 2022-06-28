import EntryBox from "./Components/Atoms/EntryBox/EntryBox";

export const isToken = () => {
    return(localStorage.getItem("token") != null);
};