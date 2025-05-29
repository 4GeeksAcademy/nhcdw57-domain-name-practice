import "bootstrap";
import "./style.css";


import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

const generateAllDomainCombinations = function(domainArray,pronouns=[],adjs=[],nouns=[],webDots=[]) {
  let domain = '';
  for(let pronoun of pronouns){
    for(let adj of adjs){
      for(let noun of nouns){
        for(let webDot of webDots){
          domain = pronoun+adj;
          domainArray.push(domain+noun+webDot);
          console.log(domain+noun+webDot);
          //following has the .com/.net swoop in and replace part of the noun if applicable, for example, it will identify that you can make a domain "cyb.org" in addition to "cyborg.org" if "cyborg" was a noun and ".org" was a valid ending of a domain
          inclusiveDomainName(domain,domainArray,noun,webDot);
        }
      }
    }
  }
}

function inclusiveDomainName(prefixDomain,domainArray,preWebDot,webDot){
  let withoutTheDot = webDot.substring(1,webDot.length);
  let canBeSubstituted = preWebDot.toLowerCase().includes(withoutTheDot);
  if(canBeSubstituted && preWebDot.toLowerCase() === withoutTheDot){
    prefixDomain = prefixDomain+webDot;
    domainArray.push(prefixDomain);
    console.log(prefixDomain);
  }else if(canBeSubstituted && preWebDot.length !== withoutTheDot.length-1){
    let shortenedPreWebDot = preWebDot.substring(0,preWebDot.length-withoutTheDot.length);
    prefixDomain = prefixDomain+shortenedPreWebDot+webDot;
    domainArray.push(prefixDomain);
    console.log(prefixDomain);
  }else{
    prefixDomain = "error generating this domain, consult developer for details";
  }
}

const insertToHTML = function(array,tag){
  let code = '';
  // const forEachValue = (value) => {code += `<li class="list-group-item">${value}</li>`}
  // array.forEach(forEachValue(value));
  for (let value of array){
    code += `<li class="list-group-item bg-info-subtle">${value}</li>`
  }
  
  console.log(code);
  document.querySelector(tag).innerHTML = code;

}

window.onload = function() {
  //write your code here
  let pronouns = ['the', 'our'];
  let adjs = ['great', 'big'];
  let nouns = ['jogger', 'racoon','cyborg','mario','us'];
  let webDots = ['.com','.net','.org','.io','.us'];
  let domainArray = [];
  generateAllDomainCombinations(domainArray,pronouns,adjs,nouns,webDots);
  insertToHTML(domainArray,'#domainList');
  insertToHTML([pronouns],'#pronounsList');
  insertToHTML([adjs],'#adjsList');
  insertToHTML([nouns],'#nounsList');
  insertToHTML([webDots],'#webDotsList');

};
