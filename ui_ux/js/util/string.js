//////////////////////////////////////////////////////////////////////
// string.js
//////////////////////////////////////////////////////////////////////
class String {


    //////////////////////////////////////////////////////////////////////
    // Escape HTML
    //////////////////////////////////////////////////////////////////////
    static EscapeHtml(str) {
        return str.replaceAll('&', '&amp;').
                replaceAll('<', '&lt;').
                replaceAll('>', '&gt;').
                replaceAll('"', '&quot;').
                replaceAll("'", '&#039;');
    }


    //////////////////////////////////////////////////////////////////////
    // Replace line breaks to br element
    //////////////////////////////////////////////////////////////////////
    static ReplaceLineBreaksToBr(str) {
        return str.replace(/(\r\n|\r|\n)/g, '<br>');
    }



}
export { String };
