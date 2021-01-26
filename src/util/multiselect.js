export const multiSelectChecked = (array, name) => {
    const checked = array.includes(name)
    let newArray = []
    if(checked){
        newArray = array.filter(item => item !== name)
    } else {
        newArray = [...array, name]
    }

    return newArray
}