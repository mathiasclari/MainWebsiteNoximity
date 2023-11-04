!function(){"use strict";let Cell=e=>{let t=e;return{get:()=>t,set:e=>{t=e}}};var e,t=tinymce.util.Tools.resolve("tinymce.PluginManager");let n=0,generate=e=>{let t=new Date,a=t.getTime();return e+"_"+Math.floor(1e9*Math.random())+ ++n+String(a)},get$1=e=>({addTab:t=>{var n;let a=null!==(n=t.name)&&void 0!==n?n:generate("tab-name"),i=e.get();i[a]=t,e.set(i)}}),register$2=(e,t)=>{e.addCommand("mceHelp",t)},option=e=>t=>t.options.get(e),register$1=e=>{let t=e.options.register;t("help_tabs",{processor:"array"})},a=option("help_tabs"),i=option("forced_plugins"),register=(e,t)=>{e.ui.registry.addButton("help",{icon:"help",tooltip:"Help",onAction:t}),e.ui.registry.addMenuItem("help",{text:"Help",icon:"help",shortcut:"Alt+0",onAction:t})},hasProto=(e,t,n)=>{var a;return!!n(e,t.prototype)||(null===(a=e.constructor)||void 0===a?void 0:a.name)===t.name},typeOf=e=>{let t=typeof e;return null===e?"null":"object"===t&&Array.isArray(e)?"array":"object"===t&&hasProto(e,String,(e,t)=>t.isPrototypeOf(e))?"string":t},isString=e=>"string"===typeOf(e),r=(e=void 0,t=>e===t),isNullable=e=>null==e,isNonNullable=e=>!isNullable(e),isFunction=e=>"function"==typeof e,never=()=>!1;let Optional=class Optional{constructor(e,t){this.tag=e,this.value=t}static some(e){return new Optional(!0,e)}static none(){return Optional.singletonNone}fold(e,t){return this.tag?t(this.value):e()}isSome(){return this.tag}isNone(){return!this.tag}map(e){return this.tag?Optional.some(e(this.value)):Optional.none()}bind(e){return this.tag?e(this.value):Optional.none()}exists(e){return this.tag&&e(this.value)}forall(e){return!this.tag||e(this.value)}filter(e){return!this.tag||e(this.value)?this:Optional.none()}getOr(e){return this.tag?this.value:e}or(e){return this.tag?this:e}getOrThunk(e){return this.tag?this.value:e()}orThunk(e){return this.tag?this:e()}getOrDie(e){if(this.tag)return this.value;throw Error(null!=e?e:"Called getOrDie on None")}static from(e){return isNonNullable(e)?Optional.some(e):Optional.none()}getOrNull(){return this.tag?this.value:null}getOrUndefined(){return this.value}each(e){this.tag&&e(this.value)}toArray(){return this.tag?[this.value]:[]}toString(){return this.tag?`some(${this.value})`:"none()"}};Optional.singletonNone=new Optional(!1);let o=Array.prototype.slice,l=Array.prototype.indexOf,rawIndexOf=(e,t)=>l.call(e,t),contains=(e,t)=>rawIndexOf(e,t)>-1,map=(e,t)=>{let n=e.length,a=Array(n);for(let i=0;i<n;i++){let n=e[i];a[i]=t(n,i)}return a},filter=(e,t)=>{let n=[];for(let a=0,i=e.length;a<i;a++){let i=e[a];t(i,a)&&n.push(i)}return n},findUntil=(e,t,n)=>{for(let a=0,i=e.length;a<i;a++){let i=e[a];if(t(i,a))return Optional.some(i);if(n(i,a))break}return Optional.none()},find=(e,t)=>findUntil(e,t,never),sort=(e,t)=>{let n=o.call(e,0);return n.sort(t),n},s=Object.keys,m=Object.hasOwnProperty,get=(e,t)=>has(e,t)?Optional.from(e[t]):Optional.none(),has=(e,t)=>m.call(e,t),cat=e=>{let t=[],push=e=>{t.push(e)};for(let t=0;t<e.length;t++)e[t].each(push);return t};var u=tinymce.util.Tools.resolve("tinymce.Resource"),c=tinymce.util.Tools.resolve("tinymce.util.I18n");let pLoadHtmlByLangCode=(e,t)=>u.load(`tinymce.html-i18n.help-keynav.${t}`,`${e}/js/i18n/keynav/${t}.js`),pLoadI18nHtml=e=>pLoadHtmlByLangCode(e,c.getCode()).catch(()=>pLoadHtmlByLangCode(e,"en")),initI18nLoad=(e,t)=>{e.on("init",()=>{pLoadI18nHtml(t)})},pTab=async e=>{let t={type:"htmlpanel",presets:"document",html:await pLoadI18nHtml(e)};return{name:"keyboardnav",title:"Keyboard Navigation",items:[t]}};var p=tinymce.util.Tools.resolve("tinymce.Env");let convertText=e=>{let t=p.os.isMacOS()||p.os.isiOS(),n=t?{alt:"&#x2325;",ctrl:"&#x2303;",shift:"&#x21E7;",meta:"&#x2318;",access:"&#x2303;&#x2325;"}:{meta:"Ctrl ",access:"Shift + Alt "},a=e.split("+"),i=map(a,e=>{let t=e.toLowerCase().trim();return has(n,t)?n[t]:e});return t?i.join("").replace(/\s/,""):i.join("+")},y=[{shortcuts:["Meta + B"],action:"Bold"},{shortcuts:["Meta + I"],action:"Italic"},{shortcuts:["Meta + U"],action:"Underline"},{shortcuts:["Meta + A"],action:"Select all"},{shortcuts:["Meta + Y","Meta + Shift + Z"],action:"Redo"},{shortcuts:["Meta + Z"],action:"Undo"},{shortcuts:["Access + 1"],action:"Heading 1"},{shortcuts:["Access + 2"],action:"Heading 2"},{shortcuts:["Access + 3"],action:"Heading 3"},{shortcuts:["Access + 4"],action:"Heading 4"},{shortcuts:["Access + 5"],action:"Heading 5"},{shortcuts:["Access + 6"],action:"Heading 6"},{shortcuts:["Access + 7"],action:"Paragraph"},{shortcuts:["Access + 8"],action:"Div"},{shortcuts:["Access + 9"],action:"Address"},{shortcuts:["Alt + 0"],action:"Open help dialog"},{shortcuts:["Alt + F9"],action:"Focus to menubar"},{shortcuts:["Alt + F10"],action:"Focus to toolbar"},{shortcuts:["Alt + F11"],action:"Focus to element path"},{shortcuts:["Ctrl + F9"],action:"Focus to contextual toolbar"},{shortcuts:["Shift + Enter"],action:"Open popup menu for split buttons"},{shortcuts:["Meta + K"],action:"Insert link (if link plugin activated)"},{shortcuts:["Meta + S"],action:"Save (if save plugin activated)"},{shortcuts:["Meta + F"],action:"Find (if searchreplace plugin activated)"},{shortcuts:["Meta + Shift + F"],action:"Switch to or from fullscreen mode"}],tab$2=()=>{let e=map(y,e=>{let t=map(e.shortcuts,convertText).join(" or ");return[e.action,t]});return{name:"shortcuts",title:"Handy Shortcuts",items:[{type:"table",header:["Action","Shortcut"],cells:e}]}},d=map([{key:"accordion",name:"Accordion"},{key:"advlist",name:"Advanced List"},{key:"anchor",name:"Anchor"},{key:"autolink",name:"Autolink"},{key:"autoresize",name:"Autoresize"},{key:"autosave",name:"Autosave"},{key:"charmap",name:"Character Map"},{key:"code",name:"Code"},{key:"codesample",name:"Code Sample"},{key:"colorpicker",name:"Color Picker"},{key:"directionality",name:"Directionality"},{key:"emoticons",name:"Emoticons"},{key:"fullscreen",name:"Full Screen"},{key:"help",name:"Help"},{key:"image",name:"Image"},{key:"importcss",name:"Import CSS"},{key:"insertdatetime",name:"Insert Date/Time"},{key:"link",name:"Link"},{key:"lists",name:"Lists"},{key:"media",name:"Media"},{key:"nonbreaking",name:"Nonbreaking"},{key:"pagebreak",name:"Page Break"},{key:"preview",name:"Preview"},{key:"quickbars",name:"Quick Toolbars"},{key:"save",name:"Save"},{key:"searchreplace",name:"Search and Replace"},{key:"table",name:"Table"},{key:"template",name:"Template"},{key:"textcolor",name:"Text Color"},{key:"visualblocks",name:"Visual Blocks"},{key:"visualchars",name:"Visual Characters"},{key:"wordcount",name:"Word Count"},{key:"a11ychecker",name:"Accessibility Checker",type:"premium"},{key:"advcode",name:"Advanced Code Editor",type:"premium"},{key:"advtable",name:"Advanced Tables",type:"premium"},{key:"advtemplate",name:"Advanced Templates",type:"premium",slug:"advanced-templates"},{key:"ai",name:"AI Assistant",type:"premium"},{key:"casechange",name:"Case Change",type:"premium"},{key:"checklist",name:"Checklist",type:"premium"},{key:"editimage",name:"Enhanced Image Editing",type:"premium"},{key:"footnotes",name:"Footnotes",type:"premium"},{key:"typography",name:"Advanced Typography",type:"premium",slug:"advanced-typography"},{key:"mediaembed",name:"Enhanced Media Embed",type:"premium",slug:"introduction-to-mediaembed"},{key:"export",name:"Export",type:"premium"},{key:"formatpainter",name:"Format Painter",type:"premium"},{key:"inlinecss",name:"Inline CSS",type:"premium",slug:"inline-css"},{key:"linkchecker",name:"Link Checker",type:"premium"},{key:"mentions",name:"Mentions",type:"premium"},{key:"mergetags",name:"Merge Tags",type:"premium"},{key:"pageembed",name:"Page Embed",type:"premium"},{key:"permanentpen",name:"Permanent Pen",type:"premium"},{key:"powerpaste",name:"PowerPaste",type:"premium",slug:"introduction-to-powerpaste"},{key:"rtc",name:"Real-Time Collaboration",type:"premium",slug:"rtc-introduction"},{key:"tinymcespellchecker",name:"Spell Checker Pro",type:"premium",slug:"introduction-to-tiny-spellchecker"},{key:"autocorrect",name:"Spelling Autocorrect",type:"premium"},{key:"tableofcontents",name:"Table of Contents",type:"premium"},{key:"tinycomments",name:"Tiny Comments",type:"premium",slug:"introduction-to-tiny-comments"},{key:"tinydrive",name:"Tiny Drive",type:"premium",slug:"tinydrive-introduction"}],e=>({...e,type:e.type||"opensource",slug:e.slug||e.key})),tab$1=e=>{let makeLink=e=>`<a data-alloy-tabstop="true" tabindex="-1" href="${e.url}" target="_blank" rel="noopener">${e.name}</a>`,identifyUnknownPlugin=(e,t)=>{let n=e.plugins[t].getMetadata;if(!isFunction(n))return{name:t,html:t};{let e=n();return{name:e.name,html:makeLink(e)}}},getPluginData=(e,t)=>find(d,e=>e.key===t).fold(()=>identifyUnknownPlugin(e,t),e=>{let t="premium"===e.type?`${e.name}*`:e.name,n=makeLink({name:t,url:`https://www.tiny.cloud/docs/tinymce/6/${e.slug}/`});return{name:t,html:n}}),getPluginKeys=e=>{let t=s(e.plugins),n=i(e);return r(n)?t:filter(t,e=>!contains(n,e))},t={type:"htmlpanel",presets:"document",html:[null==e?"":"<div>"+(e=>{let t=getPluginKeys(e),n=sort(map(t,t=>getPluginData(e,t)),(e,t)=>e.name.localeCompare(t.name)),a=map(n,e=>"<li>"+e.html+"</li>"),i=a.length,r=a.join(""),o="<p><b>"+c.translate(["Plugins installed ({0}):",i])+"</b></p><ul>"+r+"</ul>";return o})(e)+"</div>",(()=>{let e=filter(d,({type:e})=>"premium"===e),t=sort(map(e,e=>e.name),(e,t)=>e.localeCompare(t)),n=map(t,e=>`<li>${e}</li>`).join("");return"<div><p><b>"+c.translate("Premium plugins:")+"</b></p><ul>"+n+'<li class="tox-help__more-link" "><a href="https://www.tiny.cloud/pricing/?utm_campaign=editor_referral&utm_medium=help_dialog&utm_source=tinymce" rel="noopener" target="_blank" data-alloy-tabstop="true" tabindex="-1">'+c.translate("Learn more...")+"</a></li></ul></div>"})()].join("")};return{name:"plugins",title:"Plugins",items:[t]}};var h=tinymce.util.Tools.resolve("tinymce.EditorManager");let tab=()=>{var e,t;let n=(e=h.majorVersion,t=h.minorVersion,0===e.indexOf("@")?"X.X.X":e+"."+t),a={type:"htmlpanel",html:"<p>"+c.translate(["You are using {0}",'<a data-alloy-tabstop="true" tabindex="-1" href="https://www.tiny.cloud/docs/tinymce/6/changelog/?utm_campaign=editor_referral&utm_medium=help_dialog&utm_source=tinymce" rel="noopener" target="_blank">TinyMCE '+n+"</a>"])+"</p>",presets:"document"};return{name:"versions",title:"Version",items:[a]}},parseHelpTabsSetting=(e,t)=>{let n={},a=map(e,e=>{var a;if(isString(e))return has(t,e)&&(n[e]=t[e]),e;{let t=null!==(a=e.name)&&void 0!==a?a:generate("tab-name");return n[t]=e,t}});return{tabs:n,names:a}},getNamesFromTabs=e=>{let t=s(e),n=t.indexOf("versions");return -1!==n&&(t.splice(n,1),t.push("versions")),{tabs:e,names:t}},pParseCustomTabs=async(e,t,n)=>{let i=tab$2(),r=await pTab(n),o=tab$1(e),l=tab(),s={[i.name]:i,[r.name]:r,[o.name]:o,[l.name]:l,...t.get()};return Optional.from(a(e)).fold(()=>getNamesFromTabs(s),e=>parseHelpTabsSetting(e,s))},init=(e,t,n)=>()=>{pParseCustomTabs(e,t,n).then(({tabs:t,names:n})=>{let a=map(n,e=>get(t,e)),i=cat(a);e.windowManager.open({title:"Help",size:"medium",body:{type:"tabpanel",tabs:i},buttons:[{type:"cancel",name:"close",text:"Close",primary:!0}],initialData:{}})})};t.add("help",(e,t)=>{let n=Cell({}),a=get$1(n);register$1(e);let i=init(e,n,t);return register(e,i),register$2(e,i),e.shortcuts.add("Alt+0","Open help dialog","mceHelp"),initI18nLoad(e,t),a})}();