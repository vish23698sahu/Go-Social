export default function makeId(length) {
    var result = '';
    var characters = 'abcdefghi1233456789jklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
