!function(){"use strict";let Cell=e=>{let t=e;return{get:()=>t,set:e=>{t=e}}};var e=tinymce.util.Tools.resolve("tinymce.PluginManager");let hasProto=(e,t,n)=>{var o;return!!n(e,t.prototype)||(null===(o=e.constructor)||void 0===o?void 0:o.name)===t.name},typeOf=e=>{let t=typeof e;return null===e?"null":"object"===t&&Array.isArray(e)?"array":"object"===t&&hasProto(e,String,(e,t)=>t.isPrototypeOf(e))?"string":t},isType$1=e=>t=>typeOf(t)===e,isSimpleType=e=>t=>typeof t===e,t=isType$1("string"),n=isType$1("array"),o=isSimpleType("boolean"),isNullable=e=>null==e,isNonNullable=e=>!isNullable(e),r=isSimpleType("number"),noop=()=>{},constant=e=>()=>e,l=constant(!0),a=`[~\u2116|!-*+-\\/:;?@\\[-\`{}\u00A1\u00AB\u00B7\u00BB\u00BF;\u00B7\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1361-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u3008\u3009\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30\u2E31\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]`,i=constant(a);let Optional=class Optional{constructor(e,t){this.tag=e,this.value=t}static some(e){return new Optional(!0,e)}static none(){return Optional.singletonNone}fold(e,t){return this.tag?t(this.value):e()}isSome(){return this.tag}isNone(){return!this.tag}map(e){return this.tag?Optional.some(e(this.value)):Optional.none()}bind(e){return this.tag?e(this.value):Optional.none()}exists(e){return this.tag&&e(this.value)}forall(e){return!this.tag||e(this.value)}filter(e){return!this.tag||e(this.value)?this:Optional.none()}getOr(e){return this.tag?this.value:e}or(e){return this.tag?this:e}getOrThunk(e){return this.tag?this.value:e()}orThunk(e){return this.tag?this:e()}getOrDie(e){if(this.tag)return this.value;throw Error(null!=e?e:"Called getOrDie on None")}static from(e){return isNonNullable(e)?Optional.some(e):Optional.none()}getOrNull(){return this.tag?this.value:null}getOrUndefined(){return this.value}each(e){this.tag&&e(this.value)}toArray(){return this.tag?[this.value]:[]}toString(){return this.tag?`some(${this.value})`:"none()"}};Optional.singletonNone=new Optional(!1);var u=tinymce.util.Tools.resolve("tinymce.Env"),s=tinymce.util.Tools.resolve("tinymce.util.Tools");let d=Array.prototype.slice,c=Array.prototype.push,map=(e,t)=>{let n=e.length,o=Array(n);for(let r=0;r<n;r++){let n=e[r];o[r]=t(n,r)}return o},each=(e,t)=>{for(let n=0,o=e.length;n<o;n++){let o=e[n];t(o,n)}},eachr=(e,t)=>{for(let n=e.length-1;n>=0;n--){let o=e[n];t(o,n)}},groupBy=(e,t)=>{if(0===e.length)return[];{let n=t(e[0]),o=[],r=[];for(let l=0,a=e.length;l<a;l++){let a=e[l],i=t(a);i!==n&&(o.push(r),r=[]),n=i,r.push(a)}return 0!==r.length&&o.push(r),o}},foldl=(e,t,n)=>(each(e,(e,o)=>{n=t(n,e,o)}),n),flatten=e=>{let t=[];for(let o=0,r=e.length;o<r;++o){if(!n(e[o]))throw Error("Arr.flatten item "+o+" was not an array, input: "+e);c.apply(t,e[o])}return t},bind=(e,t)=>flatten(map(e,t)),sort=(e,t)=>{let n=d.call(e,0);return n.sort(t),n},m=Object.hasOwnProperty,has=(e,t)=>m.call(e,t);"undefined"!=typeof window?window:Function("return this;")();let type=e=>e.dom.nodeType,rawSet=(e,n,l)=>{if(t(l)||o(l)||r(l))e.setAttribute(n,l+"");else throw console.error("Invalid call to Attribute.set. Key ",n,":: Value ",l,":: Element ",e),Error("Attribute value was not simple")},set=(e,t,n)=>{rawSet(e.dom,t,n)},fromDom=e=>{if(null==e)throw Error("Node cannot be null or undefined");return{dom:e}},p={fromHtml:(e,t)=>{let n=t||document,o=n.createElement("div");if(o.innerHTML=e,!o.hasChildNodes()||o.childNodes.length>1){let t="HTML does not have a single root node";throw console.error(t,e),Error(t)}return fromDom(o.childNodes[0])},fromTag:(e,t)=>{let n=t||document,o=n.createElement(e);return fromDom(o)},fromText:(e,t)=>{let n=t||document,o=n.createTextNode(e);return fromDom(o)},fromDom,fromPoint:(e,t,n)=>Optional.from(e.dom.elementFromPoint(t,n)).map(fromDom)},bypassSelector=e=>1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType||0===e.childElementCount,all=(e,t)=>{let n=void 0===t?document:t.dom;return bypassSelector(n)?[]:map(n.querySelectorAll(e),p.fromDom)},parent=e=>Optional.from(e.dom.parentNode).map(p.fromDom),children=e=>map(e.dom.childNodes,p.fromDom),spot=(e,t)=>({element:e,offset:t}),leaf=(e,t)=>{let n=children(e);return n.length>0&&t<n.length?spot(n[t],0):spot(e,t)},before=(e,t)=>{let n=parent(e);n.each(n=>{n.dom.insertBefore(t.dom,e.dom)})},append=(e,t)=>{e.dom.appendChild(t.dom)},wrap=(e,t)=>{before(e,t),append(t,e)},h=((e,t)=>{let getOption=t=>e(t)?Optional.from(t.dom.nodeValue):Optional.none();return{get:n=>{if(!e(n))throw Error("Can only get "+t+" value of a "+t+" node");return getOption(n).getOr("")},getOption,set:(n,o)=>{if(!e(n))throw Error("Can only set raw "+t+" value of a "+t+" node");n.dom.nodeValue=o}}})(e=>3===type(e),"text"),get$1=e=>h.get(e),compareDocumentPosition=(e,t,n)=>(e.compareDocumentPosition(t)&n)!=0,documentPositionPreceding=(e,t)=>compareDocumentPosition(e,t,Node.DOCUMENT_POSITION_PRECEDING),descendants=(e,t)=>all(t,e);var g=tinymce.util.Tools.resolve("tinymce.dom.TreeWalker");let isSimpleBoundary=(e,t)=>e.isBlock(t)||has(e.schema.getVoidElements(),t.nodeName),isContentEditableFalse=(e,t)=>"false"===e.getContentEditable(t),isContentEditableTrueInCef=(e,t)=>"true"===e.getContentEditable(t)&&t.parentNode&&"false"===e.getContentEditableParent(t.parentNode),isHidden=(e,t)=>!e.isBlock(t)&&has(e.schema.getWhitespaceElements(),t.nodeName),isBoundary=(e,t)=>isSimpleBoundary(e,t)||isContentEditableFalse(e,t)||isHidden(e,t)||isContentEditableTrueInCef(e,t),isText=e=>3===e.nodeType,nuSection=()=>({sOffset:0,fOffset:0,elements:[]}),toLeaf=(e,t)=>leaf(p.fromDom(e),t),walk=(e,t,n,o,r,l=!0)=>{let a=l?t(!1):n;for(;a;){let n=isContentEditableFalse(e,a);if(n||isHidden(e,a)){let e=n?o.cef(a):o.boundary(a);if(e)break;a=t(!0);continue}if(isSimpleBoundary(e,a)){if(o.boundary(a))break}else isText(a)&&o.text(a);if(a===r)break;a=t(!1)}},collectTextToBoundary=(e,t,n,o,r)=>{var a;if(isBoundary(e,n))return;let i=null!==(a=e.getParent(o,e.isBlock))&&void 0!==a?a:e.getRoot(),u=new g(n,i),s=r?u.next.bind(u):u.prev.bind(u);walk(e,s,n,{boundary:l,cef:l,text:e=>{r?t.fOffset+=e.length:t.sOffset+=e.length,t.elements.push(p.fromDom(e))}})},collect=(e,t,n,o,r,l=!0)=>{let a=new g(n,t),i=[],u=nuSection();collectTextToBoundary(e,u,n,t,!1);let finishSection=()=>(u.elements.length>0&&(i.push(u),u=nuSection()),!1);return walk(e,a.next.bind(a),n,{boundary:finishSection,cef:e=>(finishSection(),r&&i.push(...r.cef(e)),!1),text:e=>{u.elements.push(p.fromDom(e)),r&&r.text(e,u)}},o,l),o&&collectTextToBoundary(e,u,o,t,!0),finishSection(),i},collectRangeSections=(e,t)=>{let n=toLeaf(t.startContainer,t.startOffset),o=n.element.dom,r=toLeaf(t.endContainer,t.endOffset),l=r.element.dom;return collect(e,t.commonAncestorContainer,o,l,{text:(e,t)=>{e===l?t.fOffset+=e.length-r.offset:e===o&&(t.sOffset+=n.offset)},cef:t=>{let n=bind(descendants(p.fromDom(t),"*[contenteditable=true]"),t=>{let n=t.dom;return collect(e,n,n)});return sort(n,(e,t)=>documentPositionPreceding(e.elements[0].dom,t.elements[0].dom)?1:-1)}},!1)},fromRng=(e,t)=>t.collapsed?[]:collectRangeSections(e,t),fromNode=(e,t)=>{let n=e.createRng();return n.selectNode(t),fromRng(e,n)},fromNodes=(e,t)=>bind(t,t=>fromNode(e,t)),find$2=(e,t,n=0,o=e.length)=>{let r;let l=t.regex;l.lastIndex=n;let a=[];for(;r=l.exec(e);){let e=r[t.matchIndex],n=r.index+r[0].indexOf(e),i=n+e.length;if(i>o)break;a.push({start:n,finish:i}),l.lastIndex=i}return a},extract=(e,t)=>{let n=foldl(e,(e,n)=>{let o=get$1(n),r=e.last,l=r+o.length,a=bind(t,(e,t)=>e.start<l&&e.finish>r?[{element:n,start:Math.max(r,e.start)-r,finish:Math.min(l,e.finish)-r,matchId:t}]:[]);return{results:e.results.concat(a),last:l}},{results:[],last:0}).results;return groupBy(n,e=>e.matchId)},find$1=(e,t)=>bind(t,t=>{let n=t.elements,o=map(n,get$1).join(""),r=find$2(o,e,t.sOffset,o.length-t.fOffset);return extract(n,r)}),mark=(e,t)=>{eachr(e,(e,n)=>{eachr(e,e=>{let o=p.fromDom(t.cloneNode(!1));set(o,"data-mce-index",n);let r=e.element.dom;if(r.length===e.finish&&0===e.start)wrap(e.element,o);else{r.length!==e.finish&&r.splitText(e.finish);let t=r.splitText(e.start);wrap(p.fromDom(t),o)}})})},findAndMark=(e,t,n,o)=>{let r=fromNode(e,n),l=find$1(t,r);return mark(l,o),l.length},findAndMarkInSelection=(e,t,n,o)=>{let r=n.getBookmark(),l=e.select("td[data-mce-selected],th[data-mce-selected]"),a=l.length>0?fromNodes(e,l):fromRng(e,n.getRng()),i=find$1(t,a);return mark(i,o),n.moveToBookmark(r),i.length},getElmIndex=e=>e.getAttribute("data-mce-index"),markAllMatches=(e,t,n,o)=>{let r=e.dom.create("span",{"data-mce-bogus":1});r.className="mce-match-marker";let l=e.getBody();return(done(e,t,!1),o)?findAndMarkInSelection(e.dom,n,e.selection,r):findAndMark(e.dom,n,l,r)},unwrap=e=>{var t;let n=e.parentNode;e.firstChild&&n.insertBefore(e.firstChild,e),null===(t=e.parentNode)||void 0===t||t.removeChild(e)},findSpansByIndex=(e,t)=>{let n=[],o=s.toArray(e.getBody().getElementsByTagName("span"));if(o.length)for(let e=0;e<o.length;e++){let r=getElmIndex(o[e]);null!==r&&r.length&&r===t.toString()&&n.push(o[e])}return n},moveSelection=(e,t,n)=>{let o=t.get(),r=o.index,l=e.dom;n?r+1===o.count?r=0:r++:r-1==-1?r=o.count-1:r--,l.removeClass(findSpansByIndex(e,o.index),"mce-match-marker-selected");let a=findSpansByIndex(e,r);return a.length?(l.addClass(findSpansByIndex(e,r),"mce-match-marker-selected"),e.selection.scrollIntoView(a[0]),r):-1},removeNode=(e,t)=>{let n=t.parentNode;e.remove(t),n&&e.isEmpty(n)&&e.remove(n)},escapeSearchText=(e,t)=>{let n=e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&").replace(/\s/g,"[^\\S\\r\\n\\uFEFF]"),o="("+n+")";return t?`(?:^|\\s|${i()})`+o+`(?=$|\\s|${i()})`:o},find=(e,t,n,o,r,l)=>{let a=e.selection,i=escapeSearchText(n,r),s=a.isForward(),d={regex:new RegExp(i,o?"g":"gi"),matchIndex:1},c=markAllMatches(e,t,d,l);if(u.browser.isSafari()&&a.setRng(a.getRng(),s),c){let a=moveSelection(e,t,!0);t.set({index:a,count:c,text:n,matchCase:o,wholeWord:r,inSelection:l})}return c},next=(e,t)=>{let n=moveSelection(e,t,!0);t.set({...t.get(),index:n})},prev=(e,t)=>{let n=moveSelection(e,t,!1);t.set({...t.get(),index:n})},isMatchSpan=e=>{let t=getElmIndex(e);return null!==t&&t.length>0},replace=(e,t,n,o,r)=>{let l=t.get(),a=l.index,i,u=a;o=!1!==o;let d=e.getBody(),c=s.grep(s.toArray(d.getElementsByTagName("span")),isMatchSpan);for(let t=0;t<c.length;t++){let s=getElmIndex(c[t]),d=i=parseInt(s,10);if(r||d===l.index){for(n.length?(c[t].innerText=n,unwrap(c[t])):removeNode(e.dom,c[t]);c[++t];)if((d=parseInt(getElmIndex(c[t]),10))===i)removeNode(e.dom,c[t]);else{t--;break}o&&u--}else i>a&&c[t].setAttribute("data-mce-index",String(i-1))}return t.set({...l,count:r?0:l.count-1,index:u}),o?next(e,t):prev(e,t),!r&&t.get().count>0},done=(e,t,n)=>{let o,r;let l=t.get(),a=s.toArray(e.getBody().getElementsByTagName("span"));for(let e=0;e<a.length;e++){let t=getElmIndex(a[e]);null!==t&&t.length&&(t===l.index.toString()&&(o||(o=a[e].firstChild),r=a[e].firstChild),unwrap(a[e]))}if(t.set({...l,index:-1,count:0,text:""}),o&&r){let t=e.dom.createRng();return t.setStart(o,0),t.setEnd(r,r.data.length),!1!==n&&e.selection.setRng(t),t}},hasNext=(e,t)=>t.get().count>1,hasPrev=(e,t)=>t.get().count>1,get=(e,t)=>({done:n=>done(e,t,n),find:(n,o,r,l=!1)=>find(e,t,n,o,r,l),next:()=>next(e,t),prev:()=>prev(e,t),replace:(n,o,r)=>replace(e,t,n,o,r)}),singleton=e=>{let t=Cell(Optional.none()),revoke=()=>t.get().each(e);return{clear:()=>{revoke(),t.set(Optional.none())},isSet:()=>t.get().isSome(),get:()=>t.get(),set:e=>{revoke(),t.set(Optional.some(e))}}},value=()=>{let e=singleton(noop);return{...e,on:t=>e.get().each(t)}},open=(e,t)=>{let n=value();e.undoManager.add();let o=s.trim(e.selection.getContent({format:"text"})),updateButtonStates=n=>{n.setEnabled("next",hasNext(e,t)),n.setEnabled("prev",hasPrev(e,t))},updateSearchState=e=>{let n=e.getData(),o=t.get();t.set({...o,matchCase:n.matchcase,wholeWord:n.wholewords,inSelection:n.inselection})},disableAll=(e,t)=>{each(["replace","replaceall","prev","next"],n=>e.setEnabled(n,!t))},toggleNotFoundAlert=(e,t)=>{t.redial(getDialogSpec(e,t.getData()))},focusButtonIfRequired=(e,t)=>{u.browser.isSafari()&&u.deviceType.isTouch()&&("find"===t||"replace"===t||"replaceall"===t)&&e.focus(t)},reset=n=>{done(e,t,!1),disableAll(n,!0),updateButtonStates(n)},doFind=n=>{let o=n.getData(),r=t.get();if(!o.findtext.length){reset(n);return}if(r.text===o.findtext&&r.matchCase===o.matchcase&&r.wholeWord===o.wholewords)next(e,t);else{let r=find(e,t,o.findtext,o.matchcase,o.wholewords,o.inselection);r<=0&&toggleNotFoundAlert(!0,n),disableAll(n,0===r)}updateButtonStates(n)},r=t.get(),l={findtext:o,replacetext:"",wholewords:r.wholeWord,matchcase:r.matchCase,inselection:r.inSelection},getPanelItems=e=>{let t=[{type:"bar",items:[{type:"input",name:"findtext",placeholder:"Find",maximized:!0,inputMode:"search"},{type:"button",name:"prev",text:"Previous",icon:"action-prev",enabled:!1,borderless:!0},{type:"button",name:"next",text:"Next",icon:"action-next",enabled:!1,borderless:!0}]},{type:"input",name:"replacetext",placeholder:"Replace with",inputMode:"search"}];return e&&t.push({type:"alertbanner",level:"error",text:"Could not find the specified string.",icon:"warning"}),t},getDialogSpec=(n,o)=>({title:"Find and Replace",size:"normal",body:{type:"panel",items:getPanelItems(n)},buttons:[{type:"menu",name:"options",icon:"preferences",tooltip:"Preferences",align:"start",items:[{type:"togglemenuitem",name:"matchcase",text:"Match case"},{type:"togglemenuitem",name:"wholewords",text:"Find whole words only"},{type:"togglemenuitem",name:"inselection",text:"Find in selection"}]},{type:"custom",name:"find",text:"Find",primary:!0},{type:"custom",name:"replace",text:"Replace",enabled:!1},{type:"custom",name:"replaceall",text:"Replace all",enabled:!1}],initialData:o,onChange:(e,o)=>{n&&toggleNotFoundAlert(!1,e),"findtext"===o.name&&t.get().count>0&&reset(e)},onAction:(n,o)=>{let r=n.getData();switch(o.name){case"find":doFind(n);break;case"replace":replace(e,t,r.replacetext)?updateButtonStates(n):reset(n);break;case"replaceall":replace(e,t,r.replacetext,!0,!0),reset(n);break;case"prev":prev(e,t),updateButtonStates(n);break;case"next":next(e,t),updateButtonStates(n);break;case"matchcase":case"wholewords":case"inselection":toggleNotFoundAlert(!1,n),updateSearchState(n),reset(n)}focusButtonIfRequired(n,o.name)},onSubmit:e=>{doFind(e),focusButtonIfRequired(e,"find")},onClose:()=>{e.focus(),done(e,t),e.undoManager.add()}});n.set(e.windowManager.open(getDialogSpec(!1,l),{inline:"toolbar"}))},register$1=(e,t)=>{e.addCommand("SearchReplace",()=>{open(e,t)})},showDialog=(e,t)=>()=>{open(e,t)},register=(e,t)=>{e.ui.registry.addMenuItem("searchreplace",{text:"Find and replace...",shortcut:"Meta+F",onAction:showDialog(e,t),icon:"search"}),e.ui.registry.addButton("searchreplace",{tooltip:"Find and replace",onAction:showDialog(e,t),icon:"search"}),e.shortcuts.add("Meta+F","",showDialog(e,t))};e.add("searchreplace",e=>{let t=Cell({index:-1,count:0,text:"",matchCase:!1,wholeWord:!1,inSelection:!1});return register$1(e,t),register(e,t),get(e,t)})}();