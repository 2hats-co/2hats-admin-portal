import {globalReplace} from '../index'
import * as R from 'ramda'

const makeElement = (template,type,replaceables) =>{
  let output = template[type]
  for (const replaceable in replaceables){
    output = globalReplace(output,`{{${replaceable}}}`,replaceables[replaceable])
  }
  return output
}
const makeElements = (template,elements) =>{
    return elements.map(element=>
      makeElement(template,element.type,element.replaceables)
     )
}
const footerElements = [{
  type:'footerText',
  replaceables:{text:'66 Devonshire Street, Surry Hills, Sydney.'}
},
// {
//   type:'footerLink',
//   replaceables:{url:'https://portal.2hats.com.au/?unsubscribe=123#unsubscribe',label:'Unsubscribe from our emails'}
// },
]
export const makeEmail = (template,bodyElements) =>{

  let output = template.wrapper
  const logo = makeElement(template,'logo',{url:'https://firebasestorage.googleapis.com/v0/b/production2hats.appspot.com/o/assets%2FemailTempate2hatLogo.png?alt=media&token=aba63f32-8c84-4dbe-926a-58f9223ee46f'})
  const body = makeElements(template,bodyElements)
  const footer = makeElements(template,footerElements)
  output = output.replace('{{logo}}',logo)
  output = output.replace('{{body}}',R.join('', body))
  output = output.replace('{{footer}}',R.join('', footer))
  return output
}

const personaliseElement = (element,personalisables)=>{
  let output = element
  personalisables.forEach(personalisable => {
    for ( const field in personalisable){
      for (const replaceable in element.replaceables){
        console.log(output.replaceables[replaceable])
        output.replaceables[replaceable] = globalReplace(output.replaceables[replaceable],`#${field}#`,personalisable[field])
      }
    }
  });
  return output
}

export const personaliseElements = (elements,personalisables) =>{
return elements.map(element=>personaliseElement(element,personalisables))
}
