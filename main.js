const Alchemy = require('./alchemy.js')
const alchemy = new Alchemy()
document.getElementById('seed').onkeyup = function(e) {
  if(this.value == "") {
    document.getElementById("recipe").innerHTML = ""
    return
  }
  e.preventDefault()
  var seed = parseInt(this.value)
  if(!seed) return
  var alc = alchemy.get_alchemy(seed, true)
  document.getElementById("recipe").innerHTML = "LC: "+alc["LC"].join(", ")+"<br/>"+"AP: "+alc["AP"].join(", ")
}
document.getElementById('seed').focus()
