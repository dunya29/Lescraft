if (document.querySelector(".preloader")) {
    window.addEventListener("load", (event) => {
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    });
}
const header = document.querySelector(".header")
const headerFix = document.querySelector(".fixed-header")
const menuBtn = document.querySelector('.menu-btn');
const iconMenu = document.querySelector('.icon-menu');
const overlay = document.querySelector(".overlay")
const modal = document.querySelectorAll(".modal")
const successModal = document.querySelector("#success-modal")
const errorModal = document.querySelector("#error-modal")
const successPopup = document.querySelector(".success-popup")
const cookiePopup = document.querySelector("#cookie-popup")
const dropdown = document.querySelectorAll(".dropdown")
let animSpd = 400
let headerTranslate = 0
let bp = {
    largeDesktop: 1700.98,
    desktop: 1250.98,
    laptop: 1030.98,
    tablet: 700.98,
    phone: 575.98
}
let lblTimeout
/* perenesti в back start */
function addToCart(productId, count, callback = false) {
    console.log(productId + " Добавлен в корзину в количестве " + count)
    clearTimeout(lblTimeout)
    if (callback) {
        callback()
    }
}
function removeFromCart(productId, callback = false) {
    console.log(productId + " Удалён из корзины")
    clearTimeout(lblTimeout)
    if (callback) {
        callback()
    }
}
function addToFav(productId, callback = false) {
    console.log(productId + " Добавлен в избранное")
    clearTimeout(lblTimeout)
    if (callback) {
        callback()
    }
}
function removeFromFav(productId, callback = false) {
    console.log(productId + " Удалён из избранного")
    clearTimeout(lblTimeout)
    if (callback) {
        callback()
    }
}
function clearCart(cartType, callback = false) {
    console.log(cartType)
    clearTimeout(lblTimeout)
    if (callback) {
        callback()
    }
}
function catFilterSubmit() {
}
function setQuickView(callback = false) {
    if (callback) {
        callback()
    }
}
/* perenesti в back end */

//get path to sprite id
function sprite(id) {
    return '<svg><use xlink:href="img/svg/sprite.svg#' + id + '"></use></svg>'
}
//scroll pos
function scrollPos() {
    return window.pageYOffset || document.documentElement.scrollTop
}
// phone validation
function isPhone(value) {
    return value.match(/^\+7 \d{3} \d{3}-\d{2}-\d{2}$/) ? true : false
}
//maskEmail
function maskEmail(email) {
    const [username, domain] = email.split('@');
    let maskedUsername = '';
    if (username.length <= 3) {
        maskedUsername = username.substring(0, 1) + "***";
    } else {
        maskedUsername = username.substring(0, 2) + '***' + username.substring(username.length - 1);
    }
    return maskedUsername + '@' + domain;
}
//enable scroll
function enableScroll() {
    if (!document.querySelector(".modal.open") && !menuBtn.classList.contains("active")) {
        if (document.querySelectorAll(".fixed-block")) {
            document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = '0px')
        }
        document.body.style.paddingRight = '0px'
        document.body.classList.remove("no-scroll")
    }
}
//disable scroll
function disableScroll() {
    if (!document.querySelector(".modal.open") && !menuBtn.classList.contains("active")) {
        let paddingValue = window.innerWidth > 350 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0
        if (document.querySelector(".fixed-block")) {
            document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = paddingValue)
        }
        document.body.style.paddingRight = paddingValue
        document.body.classList.add("no-scroll");
    }
}
//smoothdrop
function smoothDrop(header, body, dur = false) {
    let animDur = dur ? dur : 500
    body.style.overflow = 'hidden';
    body.style.transition = `height ${animDur}ms ease`;
    body.style['-webkit-transition'] = `height ${animDur}ms ease`;
    if (!header.classList.contains("active")) {
        header.parentNode.classList.add("active")
        body.classList.add("active")
        let height = body.clientHeight + 'px';
        body.style.height = '0px';
        setTimeout(function () {
            body.style.height = height;
            setTimeout(() => {
                body.style.height = null
                header.classList.add("active")
            }, animDur);
        }, 0);
    } else {
        header.parentNode.classList.remove("active")
        let height = body.clientHeight + 'px';
        body.style.height = height
        setTimeout(function () {
            body.style.height = "0"
            setTimeout(() => {
                body.style.height = null
                header.classList.remove("active")
                body.classList.remove("active")
            }, animDur);
        }, 0);
    }
}
//tabSwitch
// options visibility on switch tabs
function updateOptionsVisibility() {
    if (document.querySelectorAll("[data-visibility]")) {
        document.querySelectorAll("[data-visibility]").forEach(item => {
            let attr = item.getAttribute("data-visibility")
            if (document.querySelector(`[data-block='${attr}'`) && document.querySelector(`[data-block='${attr}'`).classList.contains("active")) {
                item.classList.add("show")
            } else {
                item.classList.remove("show")
            }
        })
    }
}
updateOptionsVisibility()
function tabSwitch(nav, block) {
    nav.forEach(item => {
        item.addEventListener("click", () => {
            nav.forEach(el => {
                el.classList.remove("active")
            })
            item.classList.add("active")
            block.forEach(el => {
                if (el.dataset.block === item.dataset.tab) {
                    if (!el.classList.contains("active")) {
                        el.classList.add("active")
                        el.style.opacity = "0"
                        setTimeout(() => {
                            el.style.opacity = "1"
                        }, 0);
                    }
                } else {
                    el.classList.remove("active")
                }
            })
            updateOptionsVisibility()
        })
    });
}
// tabs scroll btn
const tabsScroll = document.querySelectorAll(".tabs-scroll")
function tabsBtnVisibility(item) {
    let scrollW = item.querySelector(".tabs").scrollWidth
    let clientW = item.querySelector(".tabs").clientWidth
    let scrollLeft = item.querySelector(".tabs").scrollLeft
    scrollW - clientW - scrollLeft > 5 ? item.classList.add("show-btn") : item.classList.remove("show-btn")
}
if (tabsScroll.length) {
    tabsScroll.forEach(item => {
        tabsBtnVisibility(item)
        item.querySelector(".tabs").addEventListener("scroll", () => tabsBtnVisibility(item))
        window.addEventListener("resize", tabsBtnVisibility(item))
    });
}
// custom scroll FF
const customScroll = document.querySelectorAll(".custom-scroll")
let isFirefox = typeof InstallTrigger !== 'undefined';
if (isFirefox) {
    document.documentElement.style.scrollbarWidth = "thin"
    document.documentElement.style.scrollbarColor = "#769882 #cfd8d2"
    if (customScroll) {
        customScroll.forEach(item => {
            document.documentElement.style.scrollbarWidth = "thin"
            item.style.scrollbarColor = "#769882 #cfd8d2"
        })
    }
}
//fixed header
let lastScroll = scrollPos();
const headerTop = document.querySelector(".header__top")
window.addEventListener("scroll", () => {
    if (scrollPos() > headerTop.clientHeight) {
        header.classList.add("scroll")
        if ((scrollPos() > lastScroll && !header.classList.contains("unshow"))) {
            header.classList.add("unshow")
            headerTranslate = headerTop.clientHeight
            header.style.transform = 'translateY(' + (-headerTop.clientHeight - 1) + 'px)'
        } else if (scrollPos() < lastScroll && header.classList.contains("unshow")) {
            header.classList.remove("unshow")
            headerTranslate = 0
            header.style.transform = 'translateY(0)'
        }
    } else {
        header.classList.remove("scroll", "unshow")
        headerTranslate = 0
        header.style.transform = 'translateY(0)'
    }
    lastScroll = scrollPos()
})
//anchorlinks
const anchorLinks = document.querySelectorAll(".js-anchor")
if (anchorLinks.length) {
    anchorLinks.forEach(item => {
        item.addEventListener("click", e => {
            let idx = item.getAttribute("href").indexOf("#")
            const href = item.getAttribute("href").substring(idx)
            let dest = document.querySelector(href)
            if (dest) {
                e.preventDefault()
                let destTop = dest.getBoundingClientRect().top
                let headerH = header.clientHeight
                let headerBodyH = header.querySelector(".header__body")?.clientHeight || 0
                let headerCenterH = header.querySelector(".header__center")?.clientHeight || 0
                let diff = window.innerWidth > bp.desktop ? destTop < 0 ? headerH : headerBodyH : destTop < 0 ? headerH : headerH - headerCenterH
                let destPos = destTop - diff - 10
                if (item.hasAttribute("data-tab")) {
                    let attr = item.getAttribute("data-tab")
                    if (dest.querySelector(`[data-tab='${attr}']`)) {
                        dest.querySelector(`[data-tab='${attr}']`).click()
                    }
                }
                if (menuBtn && menuBtn.classList.contains("active")) {
                    menuBtn.click()
                    setTimeout(() => {
                        window.scrollTo({ top: scrollPos() + destPos, behavior: 'smooth' })
                    }, 300);
                } else {
                    window.scrollTo({ top: scrollPos() + destPos, behavior: 'smooth' })
                }
            }
        })
    })
}
//switch active tab/block
const switchBlock = document.querySelectorAll(".switch-block")
if (switchBlock) {
    switchBlock.forEach(item => {
        tabSwitch(item.querySelectorAll("[data-tab]"), item.querySelectorAll("[data-block]"))
    })
}
//show cookie
function showCookie() {
    if (cookiePopup) {
        cookiePopup.classList.add("show")
    }
}
//show cookie
function unshowCookie() {
    if (cookiePopup) {
        cookiePopup.classList.remove("show")
    }
}
//open modal
function openModal(modal) {
    let activeModal = document.querySelector(".modal.open")
    disableScroll()
    if (activeModal && !activeModal.classList.contains("quickView-modal") && !activeModal.contains(modal)) {
        activeModal.classList.remove("open")
    }
    modal.classList.add("open")
}
//close modal
function closeModal(modal) {
    if (modal.querySelector("video")) {
        modal.querySelectorAll("video").forEach(item => item.pause())
    }
    if (modal.closest(".dropdown")) {
        modal.closest(".dropdown").classList.remove("open")
    }
    if (modal.classList.contains("address-modal")) {
        modal.classList.remove("edit")
    }
    modal.classList.remove("open")
    setTimeout(() => {
        enableScroll()
    }, animSpd);
}
// modal click outside
if (modal) {
    modal.forEach((mod) => {
        mod.addEventListener("click", (e) => {
            if (!mod.querySelector(".modal__content").contains(e.target)) {
                closeModal(mod);
            }
        });
        mod.querySelectorAll(".modal__close").forEach(btn => {
            btn.addEventListener("click", () => {
                closeModal(btn.closest('.modal'))
            })
        })
    });
}
// modal button on click
function modalShowBtns() {
    const modOpenBtn = document.querySelectorAll(".mod-open-btn")
    if (modOpenBtn.length) {
        modOpenBtn.forEach(btn => {
            btn.addEventListener("click", e => {
                e.preventDefault()
                let href = btn.getAttribute("data-modal")
                openModal(document.getElementById(href))
            })
        })
    }
}
modalShowBtns()
// modal close button on click
function modalUnshowBtns() {
    const modCloseBtn = document.querySelectorAll(".mod-close-btn")
    if (modCloseBtn.length) {
        modCloseBtn.forEach(btn => {
            btn.addEventListener("click", e => {
                e.preventDefault()
                let href = btn.getAttribute("data-modal")
                closeModal(document.getElementById(href))
            })
        })
    }
}
modalUnshowBtns()
//mobmodal close on resize
const modalMob = document.querySelectorAll(".modal--mob")
if (modalMob.length) {
    window.addEventListener("resize", () => {
        if (window.innerWidth > bp.laptop) {
            modalMob.forEach(item => closeModal(item))
        }
    })
}
// custom fancybox
function fancyModal(fancyItem) {
    let mediaSrc = []
    let objectFit = fancyItem.hasAttribute("data-fit") ? "media-contain" : "media-cover"
    let val = fancyItem.getAttribute("data-fancy")
    let thumb = fancyItem.hasAttribute("data-thumb")
    document.querySelectorAll("[data-fancy]").forEach(el => {
        if (!el.closest(".swiper-slide-duplicate") && el.getAttribute("data-fancy") === val) {
            let obj = {
                src: el.getAttribute("data-src"),
                type: el.getAttribute("data-type") || 'image'
            }
            if (el.getAttribute("data-type") === 'video' && el.getAttribute("data-poster")) {
                obj.poster = el.getAttribute("data-poster")
            }
            mediaSrc.push(obj)
        }
    })
    let initialSl = mediaSrc.findIndex(el => el.src === fancyItem.getAttribute("data-src"))
    document.querySelector(".footer").insertAdjacentHTML('afterend', `
                <div class="custom-scroll modal fancy-modal ${val + '-modal'}">
                    <div class="fancy-modal__content">
                        <button type="button" class="btn-cross modal__close"></button>
                        <div class="fancy-modal__mainswiper">
                            <div class="swiper">
                                <div class="swiper-wrapper">
                                    ${mediaSrc.map((el, i) => `<div class="swiper-slide">
                                        <div class="${objectFit}">
                                            ${el.type === 'video' ? `<video ${i === initialSl ? `src='${el.src}'` : `data-src='${el.src}'`} ${el.poster ? `poster='${el.poster}'` : ''} loop autoplay playsinline mute controls></video>` : `<img src=${el.src} alt="">`}                                                
                                        </div>
                                    </div>`).join("")}
                                </div>
                            </div>
                        </div>
                        ${thumb && mediaSrc.length > 1 ? `<div class="fancy-modal__thumbswiper">
                            <div class="swiper">
                                <div class="swiper-wrapper">
                                    ${mediaSrc.map(el => `<div class="swiper-slide">
                                        <div class="${objectFit} ${el.type === 'video' ? 'video' : ''}">
                                            ${el.type === 'video' ? `<img ${el.poster ? `src='${el.poster}'` : ''}>` : `<img src=${el.src} alt="">`}                                                
                                        </div>
                                    </div>`).join("")}
                                </div>
                            </div>
                            <div class="swiper-nav">
                                <button type="button" class="nav-btn nav-btn--prev">${sprite('btn-prev')}</button>
                                <button type="button" class="nav-btn nav-btn--next">${sprite('btn-next')}</button>
                            </div>
                        </div>` : ""}
                    </div>
                </div>
            `);
    const fancyModal = document.querySelector(".fancy-modal")
    let fancyThumbSwiper
    if (thumb && mediaSrc.length > 1) {
        fancyThumbSwiper = new Swiper(fancyModal.querySelector(".fancy-modal__thumbswiper .swiper"), {
            slidesPerView: 3,
            spaceBetween: 12,
            observer: true,
            observeParents: true,
            watchSlidesProgress: true,
            initialSlide: initialSl,
            navigation: {
                prevEl: fancyModal.querySelector(".nav-btn--prev"),
                nextEl: fancyModal.querySelector(".nav-btn--next"),
            },
            breakpoints: {
                575.98: {
                    slidesPerView: 4,
                }
            },
            speed: 800
        })
    }
    let fancyMainSwiper = new Swiper(fancyModal.querySelector(".fancy-modal__mainswiper .swiper"), {
        slidesPerView: 1,
        observer: true,
        observeParents: true,
        initialSlide: initialSl,
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        thumbs: {
            swiper: fancyThumbSwiper || null,
        },
        speed: 300,
    })
    fancyMainSwiper.on("slideChange", e => {
        if (fancyModal.querySelector("video")) {
            fancyModal.querySelectorAll("video").forEach(item => item.pause())
        }
        let lazyEl = fancyMainSwiper.slides[fancyMainSwiper.activeIndex].querySelector('[data-src]');
        let videoEl = fancyMainSwiper.slides[fancyMainSwiper.activeIndex].querySelector('video');
        if (lazyEl) {
            lazyEl.setAttribute("src", lazyEl.getAttribute("data-src"))
            lazyEl.removeAttribute("data-src")
        } else if (!lazyEl && videoEl) {
            videoEl.play()
        }
    })
    openModal(fancyModal)
    fancyModal.querySelectorAll(".modal__close").forEach(btn => {
        btn.addEventListener("click", e => {
            closeModal(fancyModal)
            setTimeout(() => {
                fancyModal.remove()
            }, animSpd);
        })
    })
}
const fancyBlock = document.querySelectorAll(".fancy-block")
if (fancyBlock.length) {
    fancyBlock.forEach(block => {
        block.addEventListener("click", e => {
            const fancyItems = block.querySelectorAll("[data-fancy]")
            if (fancyItems.length) {
                fancyItems.forEach(fancyItem => {
                    if (fancyItem.contains(e.target)) {
                        fancyModal(fancyItem)
                    }
                })
            }
        })
    });
}
//open dropdown
function openDropdown(item) {
    if (window.innerWidth <= bp.laptop) {
        disableScroll()
    }
    item.classList.add("open");
    if (item.querySelector(".modal")) {
        item.querySelector(".modal").classList.add("open")
    }
    item.setAttribute("aria-expanded", true);
    item.querySelectorAll(".dropdown__options input").forEach(inp => {
        inp.addEventListener("change", (e) => {
            setActiveOption(item)
        });
    });
    document.addEventListener("click", function clickOutside(e) {
        if (!item.contains(e.target)) {
            closeDropdown(item)
            document.removeEventListener('click', clickOutside);
        }
    });
}
// set active option
function setActiveOption(item) {
    item.querySelector(".dropdown__header").classList.add("checked")
    if (item.classList.contains("radio-select")) {
        let activeInpTxt = item.querySelector("input:checked").nextElementSibling.innerHTML
        item.querySelector(".dropdown__header span").innerHTML = activeInpTxt
        closeDropdown(item)
    }
}
//close dropdonw
function closeDropdown(item) {
    if (item.querySelector(".modal")) {
        item.querySelector(".modal").classList.remove("open")
    }
    item.classList.remove("open");
    item.setAttribute("aria-expanded", false);
    enableScroll()
}
//dropdown
if (dropdown) {
    dropdown.forEach(item => {
        item.querySelector(".dropdown__header").addEventListener("click", () => {
            item.classList.contains("open") ? closeDropdown(item) : openDropdown(item)
        })
        if (item.querySelector(".dropdown__close")) {
            item.querySelector(".dropdown__close").addEventListener("click", () => closeDropdown(item))
        }
    })
}
// openSuccessPopup
function showSuccessPopup(title = false, txt = false) {
    if (successPopup && (title || txt)) {
        successPopup.querySelector(".h6").textContent = title ? title : ''
        successPopup.querySelector("p").textContent = txt ? txt : ''
        successPopup.classList.add("show")
        setTimeout(() => {
            successPopup.classList.remove("show")
        }, 3000);
    }
}
//setSuccessTxt
function setSuccessTxt(title = false, txt = false, btnTxt = false) {
    successModal.querySelector("h3").textContent = title ? title : "Заявка успешно отправлена"
    successModal.querySelector(".stroke-btn").textContent = btnTxt ? btnTxt : "Закрыть"
    if (txt) {
        successModal.querySelector("p").textContent = txt
    }
}
//setErrorTxt
function setErrorTxt(title = false, txt = false, btnTxt = false) {
    errorModal.querySelector("h3").textContent = title ? title : "Что-то пошло не так"
    errorModal.querySelector(".stroke-btn").textContent = btnTxt ? btnTxt : "Закрыть"
    if (txt) {
        errorModal.querySelector("p").textContent = txt
    }
}
// openSuccessMod
function openSuccessMod(title = false, txt = false, btnTxt = false) {
    setSuccessTxt(title, txt, btnTxt)
    openModal(successModal)
}
// openErrorMod
function openErrorMod(title = false, txt = false, btnTxt = false) {
    setErrorTxt(title, txt, btnTxt)
    openModal(errorModal)
}
//formReset
function formReset(form) {
    if (form.querySelectorAll(".item-form").length > 0) {
        form.querySelectorAll(".item-form").forEach(item => item.classList.remove("error"))
    }
    if (form.querySelectorAll(".item-form__reset").length > 0) {
        form.querySelectorAll(".item-form__reset").forEach(item => item.classList.remove("show"))
    }
    if (form.querySelectorAll("[data-error]").length > 0) {
        form.querySelectorAll("[data-error]").forEach(item => item.textContent = '')
    }
    form.querySelectorAll("input").forEach(inp => {
        if (!["hidden", "checkbox", "radio"].includes(inp.type)) {
            inp.value = ""
        }
        if (["checkbox", "radio"].includes(inp.type) && !inp.classList.contains("required")) {
            inp.checked = false
        }
    })
    if (form.querySelector("textarea")) {
        form.querySelector("textarea").value = ""
    }
    if (form.querySelector(".file-form__items")) {
        form.querySelector(".file-form__items").innerHTML = ""
    }
}
// search form
const searchForm = document.querySelectorAll(".search-form")
function showSearchBtns(item) {
    if (item.querySelector("input").value.length > 0) {
        item.querySelector(".search-form__submit").classList.add("show")
        item.querySelector(".search-form__reset").classList.add("show")
    } else {
        item.querySelector(".search-form__submit").classList.remove("show")
        item.querySelector(".search-form__reset").classList.remove("show")
    }
}
if (searchForm) {
    searchForm.forEach(item => {
        showSearchBtns(item)
        item.querySelector("input").addEventListener("input", () => showSearchBtns(item))
        item.querySelector("input").addEventListener("focus", () => item.classList.add("focused"))
        item.querySelector("input").addEventListener("blur", () => item.classList.remove("focused"))
        item.addEventListener("reset", () => {
            item.querySelector("input").setAttribute("value", '')
            item.classList.remove("show-results")
            showSearchBtns(item)
        })
    })
}
//show/unshow password
const itemFormPass = document.querySelectorAll(".item-form--password")
if (itemFormPass) {
    itemFormPass.forEach(item => {
        item.querySelector(".item-form__eye").addEventListener("click", () => {
            item.classList.toggle("show-password")
            if (item.classList.contains("show-password")) {
                item.querySelector("input").type = "text"
            } else {
                item.querySelector("input").type = "password"
            }
        })
    })
}
//reset input field
function showResetBtn(item, resetBtn) {
    if (item.querySelector("input").value.length > 0) {
        resetBtn.classList.add("show")
    } else {
        resetBtn.classList.remove("show")
    }
}
const itemForm = document.querySelectorAll(".item-form")
if (itemForm) {
    itemForm.forEach(item => {
        const resetBtn = item.querySelector(".item-form__reset")
        if (resetBtn) {
            showResetBtn(item, resetBtn)
            item.querySelector("input").addEventListener("input", e => {
                showResetBtn(item, resetBtn)
            })
            resetBtn.addEventListener("click", e => {
                e.preventDefault()
                item.querySelector("input").value = ""
                resetBtn.classList.remove("show")
            })
        }
    })
}
//enable/disable submit btn
const disabledForm = document.querySelectorAll(".disabled-form")
function toggleSubmitBtn(form) {
    let findItem = Array.from(form.querySelectorAll("input.required")).find(inp => {
        if ((inp.value && inp.type === 'tel' && !isPhone(inp.value)) || !inp.value || (['checkbox', 'radio'].includes(inp.type) && !inp.checked)) {
            return inp
        }
    })
    findItem ? form.querySelector("button[type=submit]").setAttribute("disabled", true) : form.querySelector("button[type=submit]").removeAttribute("disabled")
}
if (disabledForm.length > 0) {
    disabledForm.forEach(form => {
        if (form.querySelectorAll("input.required").length > 0) {
            let timeOut
            toggleSubmitBtn(form)
            form.querySelectorAll("input.required").forEach(inp => {
                if (['text', 'tel'].includes(inp.type)) {
                    inp.addEventListener("input", () => {
                        clearTimeout(timeOut)
                        timeOut = setTimeout(() => {
                            toggleSubmitBtn(form)
                        }, 300);
                    })
                } else {
                    inp.addEventListener("change", () => {
                        toggleSubmitBtn(form)
                    })
                }


            })
        }
    })
}
//recoveryPassword
function recoveryPassword(email) {
    if (email && document.querySelector("[data-recovery-email]")) {
        document.querySelector("[data-recovery-email]").textContent = email
    }
    openModal(document.querySelector("#forget-password-success-modal"))
}
//reset password
let codeResTimeout
function resetPassword(phone, timeout) {
    clearTimeout(codeResTimeout)
    document.querySelector(".resend-pass__btn").setAttribute("disabled", true)
    let val = timeout || 30
    document.querySelector(".resend-pass__timeout").classList.remove("hidden")
    if (phone && document.querySelector("[data-log-phone]")) {
        document.querySelector("[data-log-phone]").textContent = `Мы отправили письмо на электронный адрес ${phone}`
    }

    function changeTimeVal() {
        if (val > 0) {
            document.querySelector(".resend-pass__sec").textContent = val
            codeResTimeout = setTimeout(changeTimeVal, 1000);
        } else {
            clearTimeout(codeResTimeout)
            document.querySelector(".resend-pass__timeout").classList.add("hidden")
            document.querySelector(".resend-pass__btn").removeAttribute("disabled")
        }
        val--
    }
    changeTimeVal()
}
//mask input
const inp = document.querySelectorAll('input[type=tel]')
if (inp) {
    inp.forEach(item => {
        Inputmask({ "mask": "+7 999 999-99-99" }).mask(item);
    })
}
//file-form
let allFileTypes = [
    { "extension": ".png", "mimeType": "image/png" },
    { "extension": [".jpg", ".jpeg"], "mimeType": "image/jpeg" },
    { "extension": ".gif", "mimeType": "image/gif" },
    { "extension": ".bmp", "mimeType": "image/bmp" },
    { "extension": ".txt", "mimeType": "text/plain" },
    { "extension": ".rtf", "mimeType": "application/rtf" },
    { "extension": [".ppt", ".pot", ".pps", ".ppa"], "mimeType": "application/vnd.ms-powerpoint" },
    { "extension": ".pptx", "mimeType": "application/vnd.openxmlformats-officedocument.presentationml.presentation" },
    { "extension": ".odp", "mimeType": "application/vnd.oasis.opendocument.presentation" },
    { "extension": ".ods", "mimeType": "application/vnd.oasis.opendocument.spreadsheet" },
    { "extension": ".doc", "mimeType": "application/msword" },
    { "extension": ".docx", "mimeType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
    { "extension": ".pdf", "mimeType": "application/pdf" },
    { "extension": [".xls", ".xlt", ".xla", ".xlsb", ".xlsm", ".xltx", ".xltm"], "mimeType": "application/vnd.ms-excel" },
    { "extension": ".xlsx", "mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
    { "extension": ".odt", "mimeType": "application/vnd.oasis.opendocument.text" }
]
function addFile(files, item) {
    let maxSize = item.querySelector('input').getAttribute("data-max-size")
    let accept = item.querySelector('input').getAttribute("accept")
    let fileTypes = []
    if (accept) {
        let acceptArr = accept.split(",").map(item => item.trim().toLowerCase()).filter(item => item !== "");
        allFileTypes.forEach(type => {
            if (Array.isArray(type.extension)) {
                for (const ext of type.extension) {
                    if (acceptArr.includes(ext)) {
                        fileTypes.push(type.mimeType);
                        break;
                    }
                }
            } else if (typeof type.extension === 'string') {
                if (acceptArr.includes(type.extension)) {
                    fileTypes.push(type.mimeType);
                }
            }
        })
        accept = acceptArr.map(item => item.replace(/^\./, '')).join(", ")
    }
    for (let i = 0; i < files.length; i++) {
        let file = files[i]
        if (maxSize && file.size > maxSize * 1024 * 1024) {
            item.querySelector("input").value = ""
            item.classList.add("error")
            item.querySelectorAll(".file-form__item").forEach((el => el.remove()));
            item.querySelector("[data-error]").textContent = `Файл должен быть менее ${maxSize} МБ`
            return
        } else if (accept && fileTypes.length && !fileTypes.includes(file.type)) {
            item.querySelector("input").value = ""
            item.classList.add("error")
            item.querySelectorAll(".file-form__item").forEach((el => el.remove()));
            item.querySelector("[data-error]").textContent = 'Загрузите картинку в одном из указанных форматов'
            return
        } else {
            item.classList.remove("error")
            item.querySelector("[data-error]").textContent = ""
            let reader = new FileReader()
            reader.readAsDataURL(file);
            reader.onload = () => {
                item.querySelector(".file-form__items").insertAdjacentHTML("afterbegin", `<div class="file-form__item">
                        <div class="file-form__name">${file.name}</div>
                        <div class="file-form__name">${Math.ceil(file.size / 1024 / 1024 * 100) / 100} Mb</div>
                        <button type="button" class="btn-cross file-form__del"></button>
                    </div>`)
            }
            reader.onerror = () => {
                console.log(reader.error);
            }
        }
    }
}
if (document.querySelector(".file-form")) {
    document.querySelectorAll(".file-form").forEach(item => {
        item.querySelector("input").addEventListener("change", e => {
            item.querySelectorAll(".file-form__item").forEach((el => el.remove()));
            let files = e.target.files;
            addFile(files, item)
        })
        //delete file
        item.addEventListener("click", e => {
            item.querySelectorAll(".file-form__del").forEach((del, idx) => {
                if (del.contains(e.target)) {
                    const dt = new DataTransfer()
                    const input = item.querySelector("input")
                    const { files } = input
                    for (let i = 0; i < files.length; i++) {
                        let file = files[i]
                        if (i !== idx) {
                            dt.items.add(file)
                        }
                    }
                    input.files = dt.files
                    setTimeout(() => {
                        del.parentNode.remove()
                    }, 0);
                }
            })
        })
        item.addEventListener("dragenter", e => {
            e.preventDefault();
        })
        item.addEventListener("dragover", e => {
            e.preventDefault();
        })
        item.addEventListener("dragleave", e => {
            e.preventDefault();
        })
        item.addEventListener("drop", function (e) {
            e.preventDefault();
            const dt = new DataTransfer()
            dt.items.add(e.dataTransfer.files[0])
            let files = Array.from(dt.files)
            item.querySelector("input").files = dt.files
            item.querySelectorAll(".file-form__item").forEach((el => el.remove()));
            addFile(files, item)
        });
    })
}
//quantity
function disabledMinusBtn(item, count) {
    if (count <= 1) {
        item.querySelector(".js-minus").classList.add("disabled")
    } else {
        item.querySelector(".js-minus").classList.remove("disabled")
    }
}
function disabledPlusBtn(item, count, inStock) {
    if (count >= inStock) {
        item.querySelector(".js-plus").classList.add("disabled")
    } else {
        item.querySelector(".js-plus").classList.remove("disabled")
    }
}
function quantityOnChange(item, count, inStock) {
    let prodBlock = item.closest(".js-prodBlock")
    let quantityVisCatType = ['tile', 'list'].includes(prodBlock.parentNode.getAttribute("data-catalog-view"))
    disabledMinusBtn(item, count)
    if (inStock) {
        disabledPlusBtn(item, count, inStock)
    }
    if (prodBlock.classList.contains('js-prodBlock--product')) {
        document.querySelectorAll('.js-prodBlock--product').forEach(block => {
            block.querySelectorAll('.quantity').forEach(el => {
                disabledMinusBtn(el, count)
                if (inStock) {
                    disabledPlusBtn(el, count, inStock)
                }
                el.querySelector(".quantity__count").value = count
            })
        })
    }
    if ((!prodBlock.classList.contains('js-prodBlock--product') && !quantityVisCatType) ||
        (prodBlock.classList.contains('js-prodBlock--product') && prodBlock.classList.contains("in-cart")) ||
        (quantityVisCatType && prodBlock.classList.contains("in-cart"))
    ) {
        let productID = prodBlock.dataset.id
        addToCart(productID, count)
    }
}
function setQuantity() {
    const quantity = document.querySelectorAll(".quantity")
    if (quantity.length) {
        quantity.forEach(item => {
            const inp = item.querySelector(".quantity__count")
            let inStock = Number(item.getAttribute("data-stock"))
            let count = inp.value
            disabledMinusBtn(item, count)
            if (inStock) {
                disabledPlusBtn(item, count, inStock)
            }
        })
    }
}
setQuantity()
const jsProdWrapper = document.querySelectorAll(".js-prodWrapper")
const quickViewMod = document.querySelector("#quickView-modal")
if (jsProdWrapper.length) {
    const quickViewModInner = quickViewMod.querySelector(".quickView-modal__inner")
    const quickViewModLink = quickViewMod.querySelector(".quickView-modal__link")
    jsProdWrapper.forEach(wrapper => {
        wrapper.addEventListener("click", async e => {
            if (e.target.closest(".quantity")) {
                let item = e.target.closest(".quantity")
                const inp = item.querySelector(".quantity__count")
                let inStock = Number(item.getAttribute("data-stock"))
                let count = inp.value
                if (item.querySelector(".js-minus").contains(e.target)) {
                    if (inp.value > 1) {
                        inp.value--
                        count = inp.value;
                        quantityOnChange(item, count, inStock)
                    } else {
                        let prodBlock = e.target.closest(".js-prodBlock")
                        removeFromCart(prodBlock.dataset.id, () => {
                            prodBlock.classList.remove("in-cart")
                            if (prodBlock.classList.contains('js-prodBlock--product')) {
                                document.querySelectorAll('.js-prodBlock--product').forEach(el => el.classList.remove("in-cart"))
                            }
                        })
                    }
                }
                if (item.querySelector(".js-plus").contains(e.target)) {
                    inp.value++
                    count = inp.value
                    quantityOnChange(item, count, inStock)
                }
            }
            if (e.target.classList.contains("js-add-to-cart")) {
                let prodBlock = e.target.closest(".js-prodBlock")
                let id = prodBlock.dataset.id
                let count = prodBlock.querySelector(".quantity input").value || 1
                addToCart(id, count, () => {
                    if (document.querySelector(".cart-popup")) {
                        document.querySelector(".cart-popup").classList.add("show")
                        lblTimeout = setTimeout(() => {
                            document.querySelector(".cart-popup").classList.remove("show")
                        }, 1500);
                    }
                    prodBlock.classList.add("in-cart")
                    if (prodBlock.classList.contains("js-prodBlock--product")) {
                        document.querySelectorAll(".js-prodBlock--product").forEach(el => el.classList.add("in-cart"))
                    }
                })
            }
            if (e.target.classList.contains("js-fav")) {
                let btn = e.target
                let prodId = btn.closest(".js-prodBlock").getAttribute("data-id")
                if (btn.classList.contains("active")) {
                    removeFromFav(prodId, () => {
                        btn.classList.remove("active")
                        btn.setAttribute("aria-label", "Добавить в избранное")
                    })
                } else {
                    addToFav(prodId, () => {
                        btn.classList.add("active")
                        btn.setAttribute("aria-label", "Удалить из избранного")
                    })
                }
            }
            if (e.target.classList.contains("product-remove")) {
                let prodId = e.target.closest(".js-prodBlock").getAttribute("data-id")
                const cartRemovalModal = document.getElementById("cart-removal-modal")
                if (cartRemovalModal) {
                    cartRemovalModal.querySelector(".js-remove-from-cart").setAttribute("data-id", prodId)
                    openModal(document.querySelector("#cart-removal-modal"))
                }
            }
            if (e.target.classList.contains("product-view") || e.target.classList.contains("card__quick-view")) {
                let link = e.target.closest(".js-prodBlock")?.getAttribute("data-link")
                if (link && quickViewMod) {
                    if (quickViewModLink) {
                        quickViewModLink.setAttribute("href", link)
                    }
                    quickViewMod.classList.add("loading")
                    openModal(quickViewMod)
                    setQuickView(() => {
                        initProductSwiper(quickViewModInner)
                        quickViewMod.classList.remove("loading")
                        modalShowBtns()
                    })
                }
            }
        })
        wrapper.addEventListener("change", e => {
            if (e.target.closest(".quantity")) {
                let item = e.target.closest(".quantity")
                const inp = item.querySelector(".quantity__count")
                let inStock = Number(item.getAttribute("data-stock"))
                let count = inp.value
                if (item.querySelector(".quantity__count").contains(e.target)) {
                    if (Number.isInteger(e.target.value) || e.target.value >= 1) {
                        if (e.target.value.split("")[0] == 0) {
                            inp.value = Math.round(e.target.value.substring(1))
                        } else {
                            inp.value = inStock && Math.round(e.target.value) > inStock ? inStock : Math.round(e.target.value)
                        }
                    } else {
                        inp.value = 1
                    }
                    count = inp.value
                    quantityOnChange(item, count, inStock)
                }
            }
        })
    })
}
// tippy
const tippy = document.querySelectorAll('.tippy')
const tippyContent = document.querySelector(".tippy-content")
if (tippy.length > 0) {
    let timeOut
    function move(item) {
        let top = item.getBoundingClientRect().top
        let left = item.getBoundingClientRect().left
        tippyContent.style.top = top + item.clientHeight + 10 + "px"
        if (left - tippyContent.clientWidth / 2 + item.clientWidth / 2 < 0) {
            tippyContent.style.left = '15px'
            tippyContent.style.right = 'auto'
        } else if (
            left + tippyContent.clientWidth / 2 + item.clientWidth / 2 >=
            window.innerWidth
        ) {
            tippyContent.style.left = 'auto'
            tippyContent.style.right = '15px'
        } else {
            tippyContent.style.left =
                left -
                tippyContent.clientWidth / 2 +
                item.clientWidth / 2 +
                'px'
            tippyContent.style.right = 'auto'
        }
    }
    function leave() {
        if (window.innerWidth > bp.laptop) {
            tippyContent.classList.remove("open")
            timeOut = setTimeout(() => {
                tippyContent.querySelector(".tippy-content__inner").textContent = ""
            }, 300);
        }
    }
    tippy.forEach(item => {
        item.addEventListener("mouseenter", () => {
            clearTimeout(timeOut)
            if (window.innerWidth > bp.laptop) {
                tippyContent.querySelector(".tippy-content__inner").textContent = item.querySelector("p").textContent
                tippyContent.classList.add("open")
                move(item)
            }
        })
        item.addEventListener("mouseleave", leave)
        item.addEventListener("click", () => {
            if (window.innerWidth < bp.laptop) {
                tippyContent.querySelector(".tippy-content__inner").textContent = item.querySelector("p").textContent
                openModal(tippyContent)
            }
        })
    })
    window.addEventListener("resize", leave)
    window.addEventListener("scroll", leave)
}
// allItemsCheck
function allCheckBtn(allItemsCheck, checkItems) {
    allItemsCheck.addEventListener("change", () => {
        checkItems.forEach(item => {
            if (allItemsCheck.checked) {
                item.checked = true
                item.setAttribute("checked", true)
            } else {
                item.checked = false
                item.removeAttribute("checked")
            }
        })
        if (allItemsCheck.classList.contains("cart-p__inStock-allChek")) {
            cartSubmitBtn(checkItems)
        }
    })
    checkItems.forEach(item => {
        item.addEventListener("change", () => {
            if (Array.from(checkItems).every(item => item.checked)) {
                allItemsCheck.checked = true
                allItemsCheck.setAttribute("checked", true)
            } else {
                allItemsCheck.checked = false
                allItemsCheck.removeAttribute("checked")
            }
            if (item.closest('.item-cart--inStock')) {
                cartSubmitBtn(checkItems)
            }
        })
    })
}
//accordion
const accordion = document.querySelectorAll(".accordion")
if (accordion) {
    accordion.forEach(item => {
        item.querySelector(".accordion__header").addEventListener("click", () => {
            if (!item.classList.contains("no-close")) {
                item.parentNode.parentNode.querySelectorAll(".accordion").forEach(el => {
                    if (el.querySelector(".accordion__header").classList.contains("active")) {
                        smoothDrop(el.querySelector(".accordion__header"), el.querySelector(".accordion__body"))
                        if (el.getBoundingClientRect().top < 0) {
                            if (window.innerWidth < bp.desktop) {
                                header.classList.remove("unshow")
                            }
                            setTimeout(() => {
                                let pos = scrollPos() + item.getBoundingClientRect().top - el.querySelector(".accordion__body").clientHeight - header.clientHeight - 10
                                window.scrollTo(0, pos)
                            }, 300);
                        }
                    }
                })
            }
            smoothDrop(item.querySelector(".accordion__header"), item.querySelector(".accordion__body"))
        })
    })
}
// read more
const readMore = document.querySelectorAll(".read-more")
function readMoreFunc() {
    if (readMore.length) {
        readMore.forEach(item => {
            let openTxt = item.querySelector(".read-more__btn").getAttribute("data-open")
            let closeTxt = item.querySelector(".read-more__btn").getAttribute("data-close")
            function showMoreBtn() {
                item.classList.remove("active")
                item.classList.add("more-hidden")
                let height = item.querySelector(".read-more__content").clientHeight
                item.classList.remove("more-hidden")
                let fullHeight = item.querySelector(".read-more__content").clientHeight
                item.classList.add("more-hidden")
                if (fullHeight > height) {
                    item.classList.add("btn-show")
                    item.querySelector(".read-more__btn span").textContent = openTxt
                } else {
                    item.classList.remove("btn-show")
                }
            }
            showMoreBtn()
            let currWinW = window.innerWidth
            window.addEventListener("resize", () => {
                if (currWinW != window.innerWidth) {
                    showMoreBtn()
                    currWinW = window.innerWidth
                }
            })

            item.querySelector(".read-more__btn").addEventListener("click", () => {
                if (!item.classList.contains("active")) {
                    item.classList.add("active")
                    let height = item.querySelector(".read-more__content").clientHeight + "px"
                    item.classList.remove("more-hidden")
                    let fullHeight = item.querySelector(".read-more__content").clientHeight + "px"
                    item.querySelector(".read-more__content").style.height = height;
                    setTimeout(function () {
                        item.querySelector(".read-more__content").style.height = fullHeight
                        item.querySelector(".read-more__btn span").textContent = closeTxt
                        setTimeout(() => {
                            item.querySelector(".read-more__content").style.height = null
                        }, 500);
                    }, 0);
                } else {
                    item.classList.remove("active")
                    let fullHeight = item.querySelector(".read-more__content").clientHeight + 'px';
                    item.classList.add("more-hidden")
                    let height = item.querySelector(".read-more__content").clientHeight + 'px';
                    item.classList.remove("more-hidden")
                    item.querySelector(".read-more__content").style.height = fullHeight
                    setTimeout(function () {
                        item.querySelector(".read-more__content").style.height = height
                        item.querySelector(".read-more__btn span").textContent = openTxt
                        setTimeout(() => {
                            item.classList.add("more-hidden")
                            item.querySelector(".read-more__content").style.height = null
                        }, 500);
                    }, 0);
                }
            })
        })
    }
}
window.addEventListener("DOMContentLoaded", readMoreFunc)
//share
const shareList = document.querySelectorAll(".share-list [data-share]")
if (shareList) {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(document.title)
    let linkMass = [
        {
            value: 'vk',
            href: "https://vk.com/share.php?url=" + url + "&title=" + title
        },
        {
            value: 'telegram',
            href: "https://t.me/share/url?url=" + url + '&text=' + title
        },
        {
            value: 'viber',
            href: "viber://forward?text=" + url
        },
        {
            value: 'odnoklassniki',
            href: "https://connect.ok.ru/offer?url=" + url + "&title=" + title
        },
    ]
    shareList.forEach(item => {
        let attr = item.getAttribute("data-share")
        linkMass.forEach(obj => {
            if (obj.value === attr) {
                item.setAttribute("href", obj.href)
            }
        })

    })
}
//pageUp button
const jsPageUp = document.querySelector(".js-pageUp")
if (jsPageUp) {
    jsPageUp.addEventListener("click", () => window.scrollTo(0, 0))
}
// section animation
const animItem = document.querySelectorAll('[data-animation]')
function animate() {
    animItem.forEach(item => {
        let animName = item.getAttribute("data-animation");
        if (!item.classList.contains(animName)) {
            let itemTop = item.getBoundingClientRect().top + scrollPos();
            let itemPoint = Math.abs(window.innerHeight - window.innerHeight * 0.1)
            if (scrollPos() > itemTop - itemPoint) {
                item.classList.add(animName);
            }
        }
    })
}
window.addEventListener("load", () => {
    if (animItem.length > 0) {
        animate()
        window.addEventListener("scroll", animate)
    }
})
//swiper 6 items
const swiper6 = document.querySelectorAll('.swiper6')
if (swiper6.length) {
    swiper6.forEach(item => {
        let itemSwiper = new Swiper(item.querySelector(".swiper"), {
            slidesPerView: 3,
            spaceBetween: 12,
            observer: true,
            observeParents: true,
            watchSlidesProgress: true,
            breakpoints: {
                1700.98: {
                    slidesPerView: 6,
                    spaceBetween: 20
                },
                1250.98: {
                    slidesPerView: 6,
                    spaceBetween: 16
                },
                700.98: {
                    slidesPerView: 4,
                    spaceBetween: 16
                }
            },
            scrollbar: {
                el: item.querySelector(".swiper-scrollbar"),
                draggable: true,
            },
            speed: 800,
        });
    })
}
//swiper 5 items
const swiper5 = document.querySelectorAll('.swiper5')
if (swiper5.length) {
    swiper5.forEach(item => {
        let itemSwiper = new Swiper(item.querySelector(".swiper"), {
            slidesPerView: 2,
            spaceBetween: 12,
            observer: true,
            observeParents: true,
            watchSlidesProgress: true,
            breakpoints: {
                1700.98: {
                    slidesPerView: 5,
                    spaceBetween: 20
                },
                1250.98: {
                    slidesPerView: 5,
                    spaceBetween: 16
                },
                1030.98: {
                    slidesPerView: 4,
                    spaceBetween: 16
                },
                700.98: {
                    slidesPerView: 3,
                    spaceBetween: 16
                }
            },
            scrollbar: {
                el: item.querySelector(".swiper-scrollbar"),
                draggable: true,
            },
            speed: 800,
        });
    })
}
//swiper 4 items
const swiper4 = document.querySelectorAll('.swiper4')
if (swiper4.length) {
    swiper4.forEach(item => {
        let itemSwiper = new Swiper(item.querySelector(".swiper"), {
            slidesPerView: 2,
            spaceBetween: 12,
            observer: true,
            observeParents: true,
            watchSlidesProgress: true,
            breakpoints: {
                1700.98: {
                    slidesPerView: 4,
                    spaceBetween: 20
                },
                1250.98: {
                    slidesPerView: 4,
                    spaceBetween: 16
                },
                700.98: {
                    slidesPerView: 3,
                    spaceBetween: 16
                }
            },
            scrollbar: {
                el: item.querySelector(".swiper-scrollbar"),
                draggable: true,
            },
            speed: 800,
        });
    })
}
//swiper 3 items
const swiper3 = document.querySelectorAll('.swiper3')
if (swiper3.length) {
    swiper3.forEach(item => {
        let itemSwiper = new Swiper(item.querySelector(".swiper"), {
            slidesPerView: 1,
            spaceBetween: 12,
            observer: true,
            observeParents: true,
            watchSlidesProgress: true,
            scrollbar: {
                el: item.querySelector(".swiper-scrollbar"),
                draggable: true,
            },
            breakpoints: {
                1700.98: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                1030.98: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                },
                700.98: {
                    slidesPerView: 2.16,
                    spaceBetween: 16
                }
            },
            speed: 800,
        });
    })
}
//intro swiper
if (document.querySelector(".intro .swiper")) {
    let introSwiper = new Swiper(document.querySelector(".intro .swiper"), {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: document.querySelectorAll(".intro .swiper-slide").length > 1,
        observer: true,
        observeParents: true,
        watchSlidesProgress: true,
        pagination: {
            el: document.querySelector(".intro .swiper-pagination"),
            type: "bullets",
            clickable: true,
        },
        navigation: {
            prevEl: document.querySelector(".intro .nav-btn--prev"),
            nextEl: document.querySelector(".intro .nav-btn--next"),
        },
        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false
        },
        speed: 1000,
    });
}
//main-idea swiper
if (document.querySelector(".main-idea .swiper")) {
    let itemSwiper = new Swiper(document.querySelector(".main-idea .swiper"), {
        slidesPerView: 1.52,
        spaceBetween: 12,
        observer: true,
        observeParents: true,
        watchSlidesProgress: true,
        breakpoints: {
            1700.98: {
                slidesPerView: 5,
                spaceBetween: 20
            },
            1250.98: {
                slidesPerView: 5,
                spaceBetween: 16
            },
            1030.98: {
                slidesPerView: 4,
                spaceBetween: 16
            },
            700.98: {
                slidesPerView: 3,
                spaceBetween: 16
            },
            575.98: {
                slidesPerView: 2,
                spaceBetween: 12,
            }
        },
        speed: 800,
    });
}
//about swiper
if (document.querySelector(".main-about .swiper")) {
    let aboutSwiper
    let isInitialized
    function initAboutSwiper() {
        if (window.innerWidth <= bp.desktop && !isInitialized) {
            isInitialized = true
            aboutSwiper = new Swiper(document.querySelector(".main-about .swiper"), {
                slidesPerView: 1.52,
                spaceBetween: 12,
                observer: true,
                observeParents: true,
                watchSlidesProgress: true,
                breakpoints: {
                    1030.98: {
                        slidesPerView: 3,
                        spaceBetween: 16,
                    },
                    700.98: {
                        slidesPerView: 2,
                        spaceBetween: 16
                    },
                    575.98: {
                        slidesPerView: 2,
                        spaceBetween: 12,
                    }
                },
                speed: 800,
            });
        } else if (window.innerWidth > bp.desktop && isInitialized) {
            isInitialized = false
            aboutSwiper.destroy()
        }
    }
    initAboutSwiper()
    window.addEventListener("resize", initAboutSwiper)
}
//info swiper
if (document.querySelector(".main-info .swiper")) {
    let infoSwiper
    let isInitialized
    function initAboutSwiper() {
        if (window.innerWidth >= bp.phone && !isInitialized) {
            isInitialized = true
            infoSwiper = new Swiper(document.querySelector(".main-info .swiper"), {
                slidesPerView: 2,
                spaceBetween: 12,
                observer: true,
                observeParents: true,
                watchSlidesProgress: true,
                breakpoints: {
                    1700.98: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1030.98: {
                        slidesPerView: 3,
                        spaceBetween: 16,
                    },
                    700.98: {
                        slidesPerView: 2,
                        spaceBetween: 16,
                    }
                },
                speed: 800,
            });
        } else if (window.innerWidth < bp.phone && isInitialized) {
            isInitialized = false
            infoSwiper.destroy()
        }
    }
    initAboutSwiper()
    window.addEventListener("resize", initAboutSwiper)
}
//reviews swiper
const reviewsSwiper = document.querySelector('.reviews .swiper')
if (reviewsSwiper) {
    let swiper = new Swiper(reviewsSwiper, {
        slidesPerView: 1,
        spaceBetween: 12,
        observer: true,
        observeParents: true,
        watchSlidesProgress: true,
        breakpoints: {
            1700.98: {
                slidesPerView: reviewsSwiper.parentNode.classList.contains("reviews--product") ? 2.22 : 3,
                spaceBetween: 20
            },
            1030.98: {
                slidesPerView: reviewsSwiper.parentNode.classList.contains("reviews--product") ? 2 : 2.18,
                spaceBetween: 16,
            },
            700.98: {
                slidesPerView: 1.6,
                spaceBetween: 16,
            },
            575.98: {
                slidesPerView: 1.3,
                spaceBetween: 12,
            }
        },
        scrollbar: {
            el: document.querySelector(".reviews .swiper-scrollbar"),
            draggable: true,
        },
        speed: 800,
    })
}
//advants swiper
if (document.querySelector(".main-advants .swiper")) {
    let advantsSwiper
    let isInitialized
    function initAboutSwiper() {
        if (window.innerWidth <= bp.tablet && !isInitialized) {
            isInitialized = true
            advantsSwiper = new Swiper(document.querySelector(".main-advants .swiper"), {
                slidesPerView: 1.52,
                spaceBetween: 12,
                observer: true,
                observeParents: true,
                watchSlidesProgress: true,
                speed: 800,
            });
        } else if (window.innerWidth > bp.tablet && isInitialized) {
            isInitialized = false
            advantsSwiper.destroy()
        }
    }
    initAboutSwiper()
    window.addEventListener("resize", initAboutSwiper)
}
//legal entity cards swiper
if (document.querySelector(".legal-entity-cards .swiper")) {
    let legalSwiper
    let isInitialized
    function initLegalSwiper() {
        if (window.innerWidth <= bp.tablet && !isInitialized) {
            isInitialized = true
            legalSwiper = new Swiper(document.querySelector(".legal-entity-cards .swiper"), {
                slidesPerView: 2,
                spaceBetween: 12,
                observer: true,
                observeParents: true,
                watchSlidesProgress: true,
                speed: 800,
            });
        } else if (window.innerWidth > bp.tablet && isInitialized) {
            isInitialized = false
            legalSwiper.destroy()
        }
    }
    initLegalSwiper()
    window.addEventListener("resize", initLegalSwiper)
}
//menu
const mainMenu = document.querySelector(".main-menu")
const mainMenuNav = mainMenu.querySelectorAll('.link-btn')
const mainMenuBackNav = mainMenu.querySelectorAll("[data-back-to-level]")
function showMainMenu() {
    if (!menuBtn.classList.contains("active")) {
        disableScroll()
        header.classList.add("show-menu")
        mainMenu.style.top = menuBtn.getBoundingClientRect().bottom + headerTranslate + "px"
        mainMenu.style.maxHeight = window.innerHeight - menuBtn.getBoundingClientRect().bottom - headerTranslate + "px"
        menuBtn.setAttribute("aria-expanded", true)
        menuBtn.classList.add("active");
        mainMenu.classList.add("show")
        if (window.innerWidth > bp.laptop) {
            if (mainMenu.querySelector("[data-level='2']")) {
                mainMenu.querySelectorAll("[data-level='2']")[0].parentNode.children[0].classList.add("active")
            }
        }
    }
}
function unshowMainMenu() {
    header.classList.remove("show-menu")
    menuBtn.setAttribute("aria-expanded", false);
    menuBtn.classList.remove("active");
    mainMenu.classList.remove("show")
    mainMenu.querySelectorAll(`[data-level]`).forEach(el => {
        el.classList.remove("active")
    })
    enableScroll()
}
if (menuBtn && mainMenu) {
    [menuBtn, mainMenu].forEach(item => {
        item.addEventListener("mouseenter", () => {
            if (window.innerWidth > bp.desktop) {
                showMainMenu()
            }
        })
        item.addEventListener("mouseleave", () => {
            if (window.innerWidth > bp.desktop) {
                unshowMainMenu()
            }
        })
    })
    menuBtn.addEventListener("click", e => {
        if (window.innerWidth <= bp.desktop) {
            e.preventDefault()
            if (!menuBtn.classList.contains("active")) {
                showMainMenu()
            } else {
                unshowMainMenu()
            }

        }
    })
    function navMenuOnOpen(nav) {
        if (!nav.classList.contains("active")) {
            Array.from(nav.parentNode.children).forEach(el => el.classList.remove("active"))
            if (nav.classList.contains("has-icon")) {
                nav.classList.add("active")
            }
        }
    }
    if (mainMenuNav.length) {
        mainMenuNav.forEach(nav => {
            nav.addEventListener("mouseenter", () => {
                if (window.innerWidth > bp.desktop) {
                    navMenuOnOpen(nav)
                }
            })
            if (nav.classList.contains("has-icon") && nav.querySelector(".main-menu__header")) {
                nav.querySelector(".main-menu__header").addEventListener("click", e => {
                    if (window.innerWidth <= bp.desktop) {
                        e.preventDefault()
                        navMenuOnOpen(nav)
                    }
                })
            }
        });
    }
    if (mainMenuBackNav.length) {
        mainMenuBackNav.forEach(item => {
            item.addEventListener("click", e => {
                e.preventDefault()
                let attr = item.getAttribute("data-back-to-level")
                if (mainMenu.querySelector(`[data-level='${attr}']`)) {
                    mainMenu.querySelectorAll(`[data-level='${attr}']`).forEach(el => el.classList.remove("active"))
                }
            })
        })
    }
    window.addEventListener("resize", () => {
        if (window.innerWidth > bp.laptop) {
            unshowMainMenu()
        }
    })
}
//header__cart
const headerCartBtn = document.querySelector(".header__cart")
const cartPopup = document.querySelector(".cart-popup")
if (headerCartBtn && cartPopup) {
    let cartVisibilityTimeout
    [headerCartBtn, cartPopup].forEach(item => {
        item.addEventListener("mouseenter", () => {
            clearTimeout(cartVisibilityTimeout)
            cartPopup.classList.add("show")
        })
        item.addEventListener("mouseleave", () => {
            clearTimeout(cartVisibilityTimeout)
            cartVisibilityTimeout = setTimeout(() => {
                cartPopup.classList.remove("show")
            }, 300);
        })
    })
}
// catalog filter
const catFilter = document.querySelector(".cat-filter")
const filterSelected = document.querySelector(".filter-selected__items")
const filterCount = document.querySelectorAll(".filter-count")
let catFilterObj
//init range slider
function initRangeSliders() {
    let rangeSliders = catFilter.querySelectorAll(".range-filter")
    rangeSliders.forEach(item => {
        let rangeStart = item.querySelector(".range-filter__start")
        let rangeEnd = item.querySelector(".range-filter__end")
        let rangeSlider = item.querySelector(".range-filter__slider")
        let start = +item.getAttribute("data-start")
        let end = +item.getAttribute("data-end")
        let min = +item.getAttribute("data-min")
        let max = +item.getAttribute("data-max")
        noUiSlider.create(rangeSlider, {
            start: [start, end],
            connect: true,
            range: {
                'min': min,
                'max': max
            }
        });
        rangeStart.addEventListener("change", () => {
            rangeSlider.noUiSlider.set([rangeStart.value, null])
            if (!item.classList.contains("updated")) {
                item.classList.add("updated")
            }
        });
        rangeEnd.addEventListener("change", () => {
            rangeSlider.noUiSlider.set([null, rangeEnd.value])
            if (!item.classList.contains("updated")) {
                item.classList.add("updated")
            }
        });
        let rangeValues = [rangeStart, rangeEnd];
        rangeSlider.noUiSlider.on('slide', function (values, handle) {
            rangeValues[handle].value = parseInt(values[handle])
            if (!item.classList.contains("updated")) {
                item.classList.add("updated")
            }
        });
    })
}
function setRangeSelected() {
    if (catFilter.querySelector(".range-filter")) {
        catFilter.querySelectorAll(".range-filter").forEach(item => {
            if (item.classList.contains("updated")) {
                let rangeId = item.getAttribute("data-id")
                let rangeName = item.getAttribute("data-name")
                let values = item.querySelector('.range-filter__slider').noUiSlider.get()
                filterSelected.insertAdjacentHTML("afterbegin", `<li data-target="${rangeId}">${rangeName + ' ' + parseInt(values[0]) + '-' + parseInt(values[1])}<button type="button" class="btn-cross"></button></li>`)
            }
        })
    }
}
if (catFilter && filterSelected) {
    initRangeSliders()
    catFilterObj = {
        checkInp: function (inp) {
            inp.checked = true
            inp.setAttribute("checked", true)
        },
        uncheckInp: function (inp) {
            inp.checked = false
            inp.removeAttribute("checked")
        },
        setSelected: function (inp) {
            let txt = inp.nextElementSibling.textContent
            let idx = inp.getAttribute("data-id")
            let inpName = inp.getAttribute("data-name")
            let selectedTxt = inpName ? inpName + " " + txt.toLowerCase() : txt
            filterSelected.insertAdjacentHTML("afterbegin", `<li data-target="${idx}">${selectedTxt}<button type="button" class="btn-cross"></button></li>`)
        },
        removeSelected: function (id) {
            if (filterSelected.querySelector(`[data-target="${id}"]`)) {
                filterSelected.querySelector(`[data-target="${id}"]`).remove()
            }
        },
        selectedOnClick: function (e) {
            catFilterSubmit()
            filterSelected.querySelectorAll("li").forEach(item => {
                if (item.querySelector(".btn-cross").contains(e.target)) {
                    let dataTarget = item.getAttribute("data-target")
                    const el = catFilter.querySelector(`[data-id='${dataTarget}']`)
                    if (el.querySelector(".range-filter__slider")) {
                        el.querySelector(".range-filter__slider").noUiSlider.reset()
                    } else {
                        this.uncheckInp(el)
                    }
                    item.remove()
                }
            })
        },
        selectedCount: function () {
            if (filterCount.length) {
                let count = filterSelected.querySelector("li") ? filterSelected.querySelectorAll("li").length : ''
                filterCount.forEach(item => {
                    item.textContent = count
                })
            }
        },
        closeFilter: function () {
            if (catFilter.classList.contains("show")) {
                catFilter.classList.remove("show")
                enableScroll()
            }
            catFilterObj.selectedCount()
        },
        resetFilter: function () {
            catFilter.querySelectorAll("label input").forEach(inp => {
                this.uncheckInp(inp)
            })
            filterSelected.innerHTML = ""
            if (catFilter.querySelector('.range-filter__slider')) {
                catFilter.querySelectorAll('.range-filter__slider').forEach(item => item.noUiSlider.reset())
            }
            catFilterObj.closeFilter()
        }
    }
    filterSelected.innerHTML = ""
    catFilter.querySelectorAll("label input").forEach(inp => {
        if (inp.checked) {
            catFilterObj.setSelected(inp)
        }
        catFilterObj.selectedCount()
    })
    setRangeSelected()
    filterSelected.addEventListener("click", e => catFilterObj.selectedOnClick(e))
    document.querySelectorAll(".filter-reset").forEach(item => item.addEventListener("click", () => catFilterObj.resetFilter()))
    document.querySelectorAll(".filter-submit").forEach(item => item.addEventListener("click", e => {
        e.preventDefault()
        filterSelected.innerHTML = ""
        catFilter.querySelectorAll("label input").forEach((inp, i) => {
            let id = inp.getAttribute("data-id")
            inp.checked ? catFilterObj.setSelected(inp) : catFilterObj.removeSelected(id)
            catFilterObj.selectedCount()
        })
        setRangeSelected()
        catFilterObj.closeFilter()
        catFilterSubmit()
    }))
    if (document.querySelector(".filter-icon")) {
        document.querySelector(".filter-icon").addEventListener("click", () => {
            disableScroll()
            catFilter.classList.add("show")
        })
        catFilter.querySelector(".cat-filter__close").addEventListener("click", () => {
            catFilterObj.closeFilter()
            enableScroll()
        })
    }
}
//catalog views
const catalogViewBtn = document.querySelectorAll(".catalog-top__view-btn")
const catalogView = document.querySelector("[data-catalog-view]")
if (catalogViewBtn.length && catalogView) {
    catalogViewBtn.forEach(item => {
        item.addEventListener("click", () => {
            catalogView.classList.add("loading")
            catalogViewBtn.forEach(btn => btn.classList.remove("active"))
            item.classList.add("active")
            let attr = item.getAttribute("data-view")
            catalogView.setAttribute("data-catalog-view", attr)
            setTimeout(() => {
                catalogView.classList.remove("loading")
            }, 300);
        })
    })
}
// product
const productSwiper = document.querySelector(".product .product__swipers")
function initProductSwiper(productSwiper) {
    //product swiper
    if (productSwiper) {
        const thumbs = productSwiper.querySelector(".product__thumbswiper")
        let thumbSwiper
        if (thumbs) {
            thumbSwiper = new Swiper(thumbs.querySelector(".swiper"), {
                slidesPerView: thumbs.classList.contains('product__thumbswiper--quickView') ? 3 : 4,
                spaceBetween: 8,
                observer: true,
                observeParents: true,
                watchSlidesProgress: true,
                breakpoints: {
                    1700.98: {
                        slidesPerView: thumbs.classList.contains('product__thumbswiper--quickView') ? 4 : 5.31,
                        spaceBetween: 12,
                    },
                    1030.98: {
                        slidesPerView: thumbs.classList.contains('product__thumbswiper--quickView') ? 3 : 4,
                        spaceBetween: 8,
                    },
                    700.98: {
                        slidesPerView: 4,
                        spaceBetween: 8,
                    },
                },
                navigation: {
                    prevEl: productSwiper.querySelector(".nav-btn--prev"),
                    nextEl: productSwiper.querySelector(".nav-btn--next"),
                },
                speed: 800
            })
        }
        let mainSwiper = new Swiper(productSwiper.querySelector(".product__mainswiper .swiper"), {
            slidesPerView: 1,
            observer: true,
            observeParents: true,
            watchSlidesProgress: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            thumbs: {
                swiper: thumbSwiper || null,
            },
            pagination: {
                el: productSwiper.querySelector(".swiper-pagination"),
                type: "bullets",
                clickable: true,
            },
            navigation: {
                prevEl: productSwiper.querySelector(".nav-btn--prev"),
                nextEl: productSwiper.querySelector(".nav-btn--next"),
            },
            speed: 300
        })
    }
}
initProductSwiper(productSwiper)
//cart
const cartP = document.querySelector(".cart-p")
//enable / disable cart submit btn
function cartSubmitBtn(checkItems) {
    const submitBtn = cartP.querySelector(".total-cart__submit")
    if (submitBtn) {
        if (!Array.from(checkItems).some(inp => inp.checked)) {
            submitBtn.classList.add("disabled")
        } else {
            submitBtn.classList.remove("disabled")
        }
    }
    if (Array.from(checkItems).some(inp => inp.checked) && !Array.from(checkItems).every(inp => inp.checked)) {
        cartP.classList.add("some-items-checked")
    } else {
        cartP.classList.remove("some-items-checked")
    }
}
if (cartP) {
    const inStockAllCheckBtn = cartP.querySelector(".cart-p__inStock-allChek")
    const inStockCheckBtns = cartP.querySelectorAll(".item-cart--inStock .item-cart__check")
    if (inStockAllCheckBtn && inStockCheckBtns.length) {
        allCheckBtn(inStockAllCheckBtn, inStockCheckBtns)
    }
}
const clearCartBtns = document.querySelectorAll(".cart-clear-btn")
if (clearCartBtns.length) {
    clearCartBtns.forEach(item => {
        item.addEventListener("click", () => {
            let cartType = item.getAttribute("data-cart-type")
            const cartClearModal = document.getElementById("cart-clear-modal")
            if (cartClearModal) {
                cartClearModal.querySelector(".js-clear-cart").setAttribute("data-cart-type", cartType)
                openModal(document.querySelector("#cart-clear-modal"))
            }
        })
    })

}
//order
const orderP = document.querySelector(".order-p")
if (orderP) {
    const switchBlocks = orderP.querySelectorAll(".switch-block")
    const orderAddress = orderP.querySelectorAll("[data-address]")
    const orderFullAddress = orderP.querySelector("[data-full-address]")
    const orderAgree = orderP.querySelector("[data-agree]")
    const orderSubmit = orderP.querySelector(".total-cart__submit")
    function setFullAddress() {
        let city = orderP.querySelector("[data-address='city']")?.textContent || ''
        let locality = orderP.querySelector("[data-address='locality']")?.value || ''
        let street = orderP.querySelector("[data-address='street']")?.value || ''
        let home = orderP.querySelector("[data-address='home']")?.value || ''
        let addressParts = [locality, street, home].filter(Boolean);
        let fullAddress = addressParts.join(', ');
        orderFullAddress.textContent = fullAddress || city
    }
    //reset on tab change
    if (switchBlocks.length) {
        switchBlocks.forEach(item => {
            item.querySelectorAll("[data-tab]").forEach(nav => {
                nav.addEventListener("click", () => {
                    item.querySelectorAll("[data-block]").forEach(block => {
                        //  formReset(block)
                    })
                    if (item.closest("[data-step]")) {
                        orderP.querySelectorAll("[data-step]").forEach(step => {
                            if (Number(step.dataset.step) > Number(item.closest("[data-step]").dataset.step)) {
                                formReset(step)
                                if (step.querySelector("[data-radio-value]")) {
                                    step.querySelector("[data-radio-value]").innerHTML = ''
                                }
                                if (step.querySelector(".switch-block [data-block]")) {
                                    step.querySelectorAll(".switch-block").forEach(item => {
                                        if (item.querySelector("input[data-tab]")) {
                                            item.querySelectorAll("[data-block]").forEach(block => block.classList.remove("active"))
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
            })
        })
    }
    //set checked radio value
    if (orderP.querySelector(".text-radio")) {
        orderP.querySelectorAll(".text-radio").forEach(item => {
            item.querySelector("input").addEventListener('change', () => {
                const acc = item.closest(".accordion")
                let content = item.querySelector("p").innerHTML
                if (acc && content && acc.querySelector("[data-radio-value")) {
                    acc.querySelector("[data-radio-value").innerHTML = content
                }
            })
        })
    }
    //set full address
    if (orderAddress.length && orderFullAddress) {
        setFullAddress()
        orderAddress.forEach(item => {
            item.addEventListener("change", setFullAddress)
            if (item.closest(".item-form") && item.closest(".item-form").querySelector(".item-form__reset")) {
                item.closest(".item-form").querySelector(".item-form__reset").addEventListener("click", setFullAddress)
            }
        })
    }
    // enable/disable submit btn
    if (orderAgree && orderSubmit) {
        orderAgree.addEventListener("change", () => {
            if (!orderAgree.checked) {
                orderSubmit.classList.add("disabled")
            } else {
                orderSubmit.classList.remove("disabled")
            }
        })
    }
}
//order cancel
const orderCancelBtn = document.querySelectorAll(".order-cancel-btn")
const orderCancelModal = document.querySelector("#order-cancel-modal")
if (orderCancelBtn.length && orderCancelModal) {
    orderCancelBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            let id = btn.closest(".order-current").getAttribute("data-order-id")
            orderCancelModal.querySelector("button[type=submit]")?.setAttribute("data-order-id", id)
            openModal(orderCancelModal)
        })
    })
}
const orderCallbackBtn = document.querySelectorAll(".order-callback-btn")
const contactManagerMod = document.querySelector('#contact-manager-modal')
if (orderCallbackBtn.length && contactManagerMod) {
    orderCallbackBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            let id = btn.closest(".order-current").getAttribute("data-order-id")
            contactManagerMod.querySelector("button[type=submit]")?.setAttribute("data-order-id", id)
            openModal(contactManagerMod)
        })
    })
}
//blog anchors 
const navAnchors = document.querySelectorAll(".nav-anchors .js-anchor")
if (navAnchors.length) {
    function initializeObserver() {
        if (window.innerWidth > bp.desktop) {
            let marginTop = header.clientHeight + 10
            let marginBot = window.innerHeight - (header.clientHeight + 10)
            let observerOptions = {
                rootMargin: `-${marginTop}px 0px -${marginBot}px 0px`,
                threshold: 0,
            };
            let observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const targetId = entry.target.id;
                        const activeLink = document.querySelector(`.js-anchor[href="#${targetId}"]`);
                        navAnchors.forEach(link => link.classList.remove('active'));
                        if (activeLink) {
                            activeLink.classList.add('active');
                        }
                    }
                });
            }, observerOptions);
            navAnchors.forEach(link => {
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    observer.observe(targetElement);
                }
            });
            return observer
        } else {
            return null
        }
    }
    let currentObserver = initializeObserver();
    window.addEventListener('resize', () => {
        if (currentObserver) {
            currentObserver.disconnect();
        }
        currentObserver = initializeObserver();
    });
}
const quizP = document.querySelector(".quiz-p")
const quizStep = document.querySelectorAll(".quiz-p [data-step]")
if (quizP && quizStep.length > 1) {
    function setActiveStep(activeStep) {
        quizP.querySelectorAll("[data-step]").forEach(step => step.classList.remove("active"))
        activeStep.classList.add("active")
        activeStep.style.opacity = 0
        setTimeout(() => {
            activeStep.style.opacity = 1
        }, 0);
    }
    quizStep.forEach(item => {
        const errorEl = item.querySelector("[data-error]")
        let currentStepAttr = item.getAttribute("data-step")
        const quizStepBtn = item.querySelector("[data-to-step]")
        if (quizStepBtn) {
            quizStepBtn.addEventListener('click', () => {
                let nextStepAttr = quizStepBtn.getAttribute("data-to-step")
                const activeStep = quizP.querySelector(`[data-step='${nextStepAttr}']`)
                if (Number(currentStepAttr) === 1) {
                    let hasInputChecked = Array.from(item.querySelectorAll(".category-check")).some(cat => {
                        let checkedInp = cat.querySelector("input:checked")
                        if (!checkedInp) {
                            return false
                        } else {
                            const catInp = cat.querySelector(".item-form")
                            if (catInp) {
                                if (catInp.querySelector("input").value) {
                                    return true
                                } else {
                                    catInp.classList.add("error")
                                    return false
                                }
                            } else {
                                return true
                            }
                        }
                    })
                    if (hasInputChecked && activeStep) {
                        setActiveStep(activeStep)
                        errorEl.textContent = ''
                        if (item.querySelectorAll(".item-form")) {
                            item.querySelectorAll(".item-form").forEach(inp => inp.classList.remove("error"))
                        }
                    } else {
                        errorEl.textContent = 'Выберите одну или несколько категорий'
                    }
                }
            })
        }
    })
}
//calculator
const calculator = document.querySelectorAll(".calculator")
function initCalcRangeSliders(calc) {
    let rangeSliders = calc.querySelectorAll(".range-filter")
    rangeSliders.forEach(item => {
        let rangeStart = item.querySelector(".range-filter__start")
        let rangeEnd = item.querySelector(".range-filter__end")
        let rangeSlider = item.querySelector(".range-filter__slider")
        let start = +item.getAttribute("data-start")
        let min = +item.getAttribute("data-min")
        let max = +item.getAttribute("data-max")
        let timeOut
        noUiSlider.create(rangeSlider, {
            start: start,
            connect: [true, false],
            range: {
                'min': min,
                'max': max
            }
        });
        rangeStart.addEventListener("change", () => {
            if (rangeStart.value < min) {
                rangeStart.value = min
            }
            if (rangeStart.value > max) {
                rangeStart.value = max
            }
            rangeSlider.noUiSlider.set([rangeStart.value, null])
        });
        let rangeValues = [rangeStart, rangeEnd];
        rangeSlider.noUiSlider.on('update', function (values, handle) {
            rangeValues[handle].value = parseInt(values[handle])
            clearTimeout(timeOut)
            timeOut = setTimeout(() => {
                let width = calc.querySelector("[data-range=width]")?.querySelector('.range-filter__slider').noUiSlider.get()
                let length = calc.querySelector("[data-range=length]")?.querySelector('.range-filter__slider').noUiSlider.get()
                let depth = calc.querySelector("[data-range=depth]")?.querySelector('.range-filter__slider').noUiSlider.get()
                let square = width * length / 1000000
                let volume = square * depth / 1000
                calc.setAttribute("data-square", Number(square))
                calc.setAttribute("data-volume", Number(volume))
                let countInp = calc.querySelector("[data-calc-inp='data-count']")
                if (countInp && countInp.value >= 1) {
                    calc.querySelectorAll("[data-calc-inp]").forEach(el => {
                        let elAttr = el.getAttribute("data-calc-inp")
                        let elProductVal = calc.getAttribute(`${elAttr}`) || 1
                        el.value = elProductVal * countInp.value
                    })
                }
            }, 500);
        });
    })
}
if (calculator.length) {
    calculator.forEach(calc => {
        if (calc.querySelector(".range-filter")) {
            initCalcRangeSliders(calc)
        }
        const calcInputs = calc.querySelectorAll("[data-calc-inp]")
        if (calcInputs.length) {
            calcInputs.forEach(item => {
                let prevVal = item.value
                let attr = item.getAttribute("data-calc-inp")
                item.addEventListener("change", () => {
                    if (/^\d+(\.\d+)?$/.test(item.value)) {
                        item.value = Number(item.value)
                        let productVal = calc.getAttribute(`${attr}`) || 1
                        let ratio = item.value / productVal
                        calcInputs.forEach(el => {
                            if (item !== el) {
                                let elAttr = el.getAttribute("data-calc-inp")
                                let elProductVal = calc.getAttribute(`${elAttr}`) || 1
                                el.value = elProductVal * ratio
                            }
                        })
                    } else {
                        item.value = prevVal
                    }
                    prevVal = item.value
                })
            })
        }

    })
}
