// Szövegek nagybetűssé alakítása.
// @param: str, String
function toUpper( str, callbackFn ) {
    if (!callbackFn) {
        console.error('Not given callbackFn!');
        return;
    }
    try {
        str = str.toUpperCase();
        callbackFn( false, str);
    } catch (errorObject) {
        callbackFn (errorObject, str);
    }
}

// Publikus elemek.
module.exports = {
  tu: toUpper
};
