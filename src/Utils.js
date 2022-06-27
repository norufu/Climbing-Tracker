import EntryBox from "./Components/Atoms/EntryBox/EntryBox";

export const isToken = () => {
    return(localStorage.getItem("token") != null);
};

export const dataToBoxes = (data) => {
    let tempBoxes = []
    for(let key in data) {
      for(let i =0; i < data[key].length; i++) {
        let k = data[key][i].difficulty + "box" + i;
        tempBoxes.push(<EntryBox key={k} info={data[key][i]}></EntryBox>)
      }
    }
    return(tempBoxes);
}