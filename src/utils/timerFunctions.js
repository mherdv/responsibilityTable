export function clearSet(func, time) {

    let timer
    return function (props) {

        // this for passing event to timer 
        props.persist && props.persist()
        clearTimeout(timer)
        timer = setTimeout(func.bind(this, props), time)
    }
}