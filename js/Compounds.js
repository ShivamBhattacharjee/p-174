AFRAME.registerComponent("atoms", {
  init:async function(){
      var compounds=await this.getCompounds()
      //   console.log(compounds)

      var barcodes=Object.keys(compounds)
      console.log(barcodes)

      barcodes.map(i=>{
          var element=compounds[i]
          console.log(element)
          this.createAtom(element)
      })
    

  },
  
  getCompounds:function(){
      return fetch("js/compoundList.json")
      .then(response=>response.json())
      .then(data=>data)
  },

  getElementColor:function(){
    return fetch("js/elementColors.json")
      .then(response=>response.json())
      .then(data=>data)
  },

  createAtom:async function(element){
    var elementName=element.element_name
    var barCodeValue=element.barcode_value
    var noOfElectrons=element.noOf_electrons
    console.log(elementName)

    var colors=await this.getElementColor()

    var scene=document.querySelector("a-scene")

    var marker=document.createElement("a-marker")
    marker.setAttribute("id",`marker-${barCodeValue}`)
    marker.setAttribute("type","barcode")
    marker.setAttribute("element_name",elementName)
    marker.setAttribute("value",barCodeValue)
    scene.appendChild(marker)
    // console.log(scene)

    var atom=document.createElement("a-entity")
    atom.setAttribute("id",`${elementName}-${barCodeValue}`)
    marker.appendChild(atom)
    console.log(marker)

    var card=document.createElement("a-entity")
    card.setAttribute("id",`card-${barCodeValue}`)
    card.setAttribute("geometry",{
        primitive:"plane",
        width:1,
        height:1
    })
    card.setAttribute("material",{
        src:`./assets/atom_cards/card_${elementName}.png`
    })
    card.setAttribute("position",{x:0,y:0,z:0})
    card.setAttribute("rotation",{x:-90,y:0,z:0})
    atom.appendChild(card)

    

    var nucleus=document.createElement("a-entity")
    nucleus.setAttribute("id",`nucleus-${elementName}`)
    marker.setAttribute("geometry",{
      primitive:"sphere",
      radius:0.2
    })
    nucleus.setAttribute("material",{
      color:colors[elementName]
    })
    nucleus.setAttribute("material","color",colors[elementName])
    nucleus.setAttribute("position",{x:0,y:0,z:0.3})
    nucleus.setAttribute("rotation",{x:0,y:0,z:0})

    var nucleusName=document.createElement("a-entity")
    nucleusName.setAttribute("id",`nucleusName-${elementName}`)
    nucleusName.setAttribute("position",{x:0,y:0.2,z:0.05})
    nucleusName.setAttribute("rotation",{x:90,y:0,z:0.3})
    nucleusName.setAttribute("text",{
      font:"monoid",
      width:3,
      color:"black",
      value:elementName
    })
    nucleus.appendChild(nucleusName)
    console.log(nucleus)
    atom.appendChild(nucleus)

    var orbitAngle=-180
    var electronAnfle=30
    
    for (var i=0;i<=noOfElectrons.length;i+1){
      var orbit=document.createElement("a-entity")
      orbit.setAttribute("id",`orbit-${elementName}`)
      orbit.setAttribute("geometry",{
        color:"yellow",
        opacity:0.3
      })
      orbit.setAttribute("position",{x:0,y:0.2,z:0.06})
      orbit.setAttribute("rotation",{x:0,y:orbitAngle,z:0})
      orbitAngle+=45
      atom.appendChild(orbit)
    }
  }
   
});
