(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = class Alchemy {
  constructor() {
    this.rand_state = 0
    this.LIQUIDS = ["water", "water_ice", "water_swamp",
  "oil", "alcohol", "swamp", "mud", "blood",
  "blood_fungi", "blood_worm", "radioactive_liquid",
  "cement", "acid", "lava", "urine",
  "poison", "magic_liquid_teleportation",
  "magic_liquid_polymorph", "magic_liquid_random_polymorph",
  "magic_liquid_berserk", "magic_liquid_charm",
  "magic_liquid_invisibility"]
    this.ORGANICS = ["sand", "bone", "soil", "honey",
  "slime", "snow", "rotten_meat", "wax",
  "gold", "silver", "copper", "brass", "diamond",
  "coal", "gunpowder", "gunpowder_explosive",
  "grass", "fungi"]
  }

  hax_prng_next(v) {
    let hi = Math.floor(v / 127773)
    let lo = v % 127773
    v = 16807 * lo - 2836 * hi
    if (v <= 0) {
      v += 2147483647
    }
    return v
  }

  shuffle(arr, seed) {
    let v = Math.floor(seed / 2) + 12534
    v = this.hax_prng_next(v)
    for (let i = arr.length; i > 0; i--) {
      v = this.hax_prng_next(v)
      let fidx = v / Math.pow(2, 31)
      let target = Math.floor(fidx * i)
      let temp = arr[i-1]
      arr[i] = arr[target]
      arr[target] = temp
    }
  }

  copy_arr(arr) {
    let ret = [...arr]
    return ret
  }

  random_material(mats) {
    for (let i = 0; i < 1000; i++) {
      this.rand_state = this.hax_prng_next(this.rand_state)
      let rval = this.rand_state / Math.pow(2, 31)
      let sel_idx = Math.floor(mats.length * rval)
      let selection = mats[sel_idx]
      if (selection) {
        mats[sel_idx] = false
        return selection
      }
    }
  }

  random_recipe(seed) {
    let liqs = this.copy_arr(this.LIQUIDS)
    let orgs = this.copy_arr(this.ORGANICS)
    let m1 = this.random_material(liqs)
    let m2 = this.random_material(liqs)
    let m3 = this.random_material(liqs)
    let m4 = this.random_material(orgs)
    let combo = [m1, m2, m3, m4]
    this.shuffle(combo, seed)
    return [combo[1], combo[2], combo[3]]
  }

  get_alchemy(world_seed, translate = false) {
    let seed = parseInt(world_seed)
    this.rand_state = Math.floor(seed * 0.17127000 + 1323.59030000)

    for (let i = 0; i < 6; i++) {
      this.rand_state = this.hax_prng_next(this.rand_state)
    }

    let lc_combo = this.random_recipe(seed)
    this.rand_state = this.hax_prng_next(this.rand_state)
    this.rand_state = this.hax_prng_next(this.rand_state)
    let ap_combo = this.random_recipe(seed)
    if(translate) {
      ap_combo = ap_combo.map(this.translate)
      lc_combo = lc_combo.map(this.translate)
    }
    return {"LC": lc_combo, "AP": ap_combo}
  }

  translate(name) {
    name = name.replace("magic_liquid_", "")
    name = name.replace("teleportation", "teleportatium")
    name = name.replace("berserk", "berserkium")
    name = name.replace("charm", "pheromone")
    name = name.replace("invisibility", "invisiblium")
    name = name.replace("radioactive_liquid", "toxic sludge")
    name = name.replace("random_", "chaotic ")
    name = name.replace("polymorph", "polymorphine")
    name = name.replace("water_ice", "chilly water")
    name = name.replace("water_swamp", "swamp water")
    name = name.replace("blood_fungi", "blood fungus")
    name = name.replace("blood_worm", "worm blood")
    name = name.replace("alcohol", "whiskey")
    name = name.replace("gunpowder_explosive", "explosive gunpowder")
    name = name.replace("fungi", "fungus")
    name = name.replace("_", " ")
    name = name.substr(0, 1).toUpperCase()+name.substr(1)
    return name
  }
}

},{}],2:[function(require,module,exports){
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

},{"./alchemy.js":1}]},{},[2]);
