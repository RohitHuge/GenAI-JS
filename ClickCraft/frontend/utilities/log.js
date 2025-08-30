let showlog = true;

export default function log(message) {
    if (showlog) {
        console.log(message);
        return;
    }else { 
        return;
    }
}