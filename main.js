const Alchemy = require('./alchemy.js')
const alchemy = new Alchemy()
document.getElementById('seed').onkeyup = function(e) {
  if(e.keycode = 13) {
    if(this.value == "") {
      document.getElementById("recipe").innerHTML = ""
      return
    }
    e.preventDefault()
    var alc = alchemy.get_alchemy(this.value, 1)
    document.getElementById("recipe").innerHTML = "LC: "+alc["LC"].join(", ")+"<br/>"+"AP: "+alc["AP"].join(", ")
  }
}
document.getElementById('seed').focus()
