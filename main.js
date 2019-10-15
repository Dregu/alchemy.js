const Alchemy = require('./alchemy.js')
const alchemy = new Alchemy()
document.getElementById('seed').onkeyup = function(e) {
  if(e.keycode = 13) {
    if(this.value == "") {
      document.getElementById("recipe").innerHTML = ""
      return
    }
    e.preventDefault()
    var alc = alchemy.get_alchemy(this.value)
    document.getElementById("recipe").innerHTML = "LC: "+alc[0].join(", ")+"<br/>"+"AP: "+alc[1].join(", ")
  }
}
document.getElementById('seed').focus()
