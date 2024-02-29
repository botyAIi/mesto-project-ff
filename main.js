(()=>{"use strict";const e=document.querySelector("#card-template").content;function t(t,o,r,n,a,s,c,l){const i=e.querySelector(".card").cloneNode(!0),u=i.querySelector(".card__image"),p=i.querySelector(".card__delete-button"),d=i.querySelector(".card__like-score"),_=i.querySelector(".card__title"),m=i.querySelector(".card__like-button");return t.owner._id!==r._id&&p.remove(),t.likes.find((e=>e._id===r._id))&&m.classList.add("card__like-button_is-active"),u.src=t.link,u.alt=t.name,_.textContent=t.name,d.textContent=t.likes.length,u.addEventListener("click",o),i.addEventListener("click",(e=>{e.target.classList.contains("card__like-button")&&(e.target.classList.contains("card__like-button_is-active")?(e.target.classList.remove("card__like-button_is-active"),d.textContent-=1,n(t._id).then((e=>d.textContent=e.likes.length)).catch((e=>console.log(e))).finally((e=>d.textContent=e.likes.length))):(e.target.classList.add("card__like-button_is-active"),++d.textContent,a(t._id).then((e=>d.textContent=e.likes.length)).catch((e=>console.log(e))).finally((e=>d.textContent=e.likes.length))))})),p.addEventListener("click",(()=>{s(),c(t,i)})),i}function o(e){"Escape"===e.key&&n(document.querySelector(".popup_is-opened"))}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o)}function n(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)}function a(e,t,o,r){const n=e.querySelector(`.${t.id}-error`);t.classList.remove(`${o}`),n.classList.remove(`${r}`),n.textContent=""}function s(e,t,o){!function(e){return e.some((e=>!e.validity.valid))}(e)?(t.classList.remove(`${o}`),t.removeAttribute("disabled",!1)):(t.classList.add(`${o}`),t.setAttribute("disabled",!0))}function c(e,t){const o=e.querySelector(`${t.inputSelector}`);e.querySelector(`.${t.errorClass}`)&&a(e,o,t.inputErrorClass,t.errorClass)}const l={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-7",headers:{authorization:"097edd3f-4856-47ea-8cdc-0f0b7a45c344","Content-Type":"application/json"}};function i(e){return e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)}const u=()=>fetch(`${l.baseUrl}/users/me`,{headers:l.headers}).then((e=>i(e))),p=e=>fetch(`${l.baseUrl}/cards/likes/${e}`,{method:"PUT",headers:l.headers}).then((e=>i(e))),d=e=>fetch(`${l.baseUrl}/cards/likes/${e}`,{method:"DELETE",headers:l.headers}).then((e=>i(e))),_={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_is-disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},m=document.querySelector(".places__list"),y=document.querySelector(".profile__title"),h=document.querySelector(".profile__description"),v=document.querySelector(".profile__image"),f=document.querySelectorAll(".popup"),S=document.querySelector(".popup_type_edit"),b=document.querySelector(".popup_type_update-avatar"),q=document.querySelector(".popup_type_new-card"),L=document.querySelector(".popup_type_image"),C=document.querySelector(".popup_type_card-delete"),g=L.querySelector(".popup__image"),E=L.querySelector(".popup__caption"),$=C.querySelector(".popup__form"),k=S.querySelector(".popup__form"),x=b.querySelector(".popup__form"),U=k.querySelector(".popup__input_type_name"),A=k.querySelector(".popup__input_type_description"),w=b.querySelector(".popup__input_type_url"),D=q.querySelector(".popup__form"),T=D.querySelector(".popup__input_type_card-name"),P=D.querySelector(".popup__input_type_url"),B=document.querySelector(".profile__edit-button"),j=document.querySelector(".profile__add-button");function N(e){const t=e.target;g.src=t.src,g.alt=t.alt,E.textContent=t.alt,r(L)}function O(){r(C)}function H(e,t){const o=r=>{var a;r.preventDefault(),M(!0,C),(a=e._id,fetch(`${l.baseUrl}/cards/${a}`,{method:"DELETE",headers:l.headers}).then((e=>i(e)))).then((()=>function(e){e.remove()}(t))).catch((e=>console.log(e))).finally((()=>{n(C),M(!1,C)})),$.removeEventListener("submit",o)};C.addEventListener("mousedown",(e=>{(e.target.classList.contains("popup_is-opened")||e.target.classList.contains("popup__close"))&&(n(C),$.removeEventListener("submit",o))})),$.addEventListener("submit",o)}function J(e,t){e?t.querySelector(".popup__button").textContent="Сохранение...":e||(t.querySelector(".popup__button").textContent="Сохранить")}function M(e,t){e?t.querySelector(".popup__button").textContent="Удаляется...":e||(t.querySelector(".popup__button").textContent="Да")}var V;k.addEventListener("submit",(function(e){e.preventDefault(),J(!0,S),(U.value,A.value,fetch(`${l.baseUrl}/users/me`,{method:"PATCH",headers:l.headers}).then((e=>i(e)))).then((e=>{y.textContent=U.value,h.textContent=A.value,e.name=U.value,e.about=A.value})).catch((e=>console.log(e))).finally((()=>{n(S),J(!1,S)}))})),x.addEventListener("submit",(function(e){e.preventDefault(),J(!0,b),(e=>fetch(`${l.baseUrl}/users/me/avatar`,{method:"PATCH",headers:l.headers,body:JSON.stringify({avatar:`${e}`})}).then((e=>i(e))))(w.value).then((e=>{v.style=`background-image: url(${e.avatar})`})).catch((e=>console.log(e))).finally((()=>{n(b),J(!1,b)}))})),u().then((e=>{y.textContent=e.name,h.textContent=e.about,v.style=`background-image: url(${e.avatar})`})).catch((e=>console.log(e))),B.addEventListener("click",(()=>{U.value=y.textContent,A.value=h.textContent,c(k,_),r(S)})),j.addEventListener("click",(()=>r(q))),v.addEventListener("click",(()=>r(b))),f.forEach((e=>{e.addEventListener("mousedown",(t=>{!t.target.classList.contains("popup_is-opened")&&!t.target.classList.contains("popup__close")||e.classList.contains("popup_type_card-delete")||n(e)}))})),Promise.all([fetch(`${l.baseUrl}/cards`,{headers:l.headers}).then((e=>i(e))),u()]).then((e=>{let[o,r]=e;o.forEach((e=>{m.append(t(e,N,r,d,p,O,H))})),D.addEventListener("submit",(e=>{var o,a;e.preventDefault(),J(!0,q),(o=T.value,a=P.value,fetch(`${l.baseUrl}/cards`,{method:"POST",headers:l.headers,body:JSON.stringify({name:`${o}`,link:`${a}`})}).then((e=>i(e)))).then((e=>{m.prepend(t(e,N,r,d,p,O,H))})).catch((e=>console.log(e))).finally((()=>{D.reset(),c(D,_),n(q),J(!1,q)}))}))})).catch((e=>console.log(e))),V=_,Array.from(document.querySelectorAll(`${V.formSelector}`)).forEach((e=>{e.addEventListener("submit",(e=>{e.preventDefault()})),function(e,t,o,r,n,c){const l=Array.from(e.querySelectorAll(`${t}`)),i=e.querySelector(`${r}`);s(l,i,n),l.forEach((t=>{t.addEventListener("input",(()=>{!function(e,t,o,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.customError):t.setCustomValidity(""),t.validity.valid?a(e,t,o,r):function(e,t,o,r){const n=e.querySelector(`.${t.id}-error`);t.classList.add(`${o}`),n.textContent=t.validationMessage,n.classList.add(`${r}`)}(e,t,o,r)}(e,t,o,c),s(l,i,n)}))}))}(e,V.inputSelector,V.inputErrorClass,V.submitButtonSelector,V.inactiveButtonClass,V.errorClass)}))})();