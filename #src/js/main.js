if (document.querySelector(".preloader")) {
    window.addEventListener("load", (event) => {
        setTimeout(() => {
            enableScroll()
            document.body.classList.add('loaded');
        }, 100);
    });
}
const header = document.querySelector(".header")
const menuMobileBtn = document.querySelector('.menu-mobile__btn');
const mobMenu = document.querySelector('.menu-mobile');
const iconMenu = document.querySelector('.icon-menu');
const overlay = document.querySelector(".overlay")
const modal = document.querySelectorAll(".modal")
const modOpenBtn = document.querySelectorAll(".mod-open-btn")
const modCloseBtn = document.querySelectorAll(".mod-close-btn")
const successModal = document.querySelector(".success-mod")
const errorModal = document.querySelector(".error-mod")
const dropdown = document.querySelectorAll(".dropdown")
let animSpd = 400
let tablet = 991.98
let mob = 767.98
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
    if (document.querySelectorAll(".fixed-block")) {
        document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = '0px')
    }
    document.body.style.paddingRight = '0px'
    document.body.classList.remove("no-scroll")
}
//disable scroll
function disableScroll() {
    let paddingValue = window.innerWidth > 350 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0
    if (document.querySelectorAll(".fixed-block")) {
        document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = paddingValue)
    }
    document.body.style.paddingRight = paddingValue
    document.body.classList.add("no-scroll");
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
function updateOptionsVisibility(activeTab) {
    if (document.querySelectorAll("[data-visibility]")) {
        document.querySelectorAll("[data-visibility]").forEach(item => {
            if (item.getAttribute("data-visibility") === activeTab) {
                item.classList.add("show")
            } else {
                item.classList.remove("show")
            }
        })
    }
}
function tabSwitch(nav, block) {
    nav.forEach(item => {
        if (item.classList.contains("active")) {
            updateOptionsVisibility(item.dataset.tab)
        }
        item.addEventListener("click", () => {
            updateOptionsVisibility(item.dataset.tab)
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
        })
    });
}
// custom scroll FF
const customScroll = document.querySelectorAll(".custom-scroll")
let isFirefox = typeof InstallTrigger !== 'undefined';
if (isFirefox) {
    document.documentElement.style.scrollbarColor = "#769882 #cfd8d2"
}
if (isFirefox && customScroll) {
    customScroll.forEach(item => { item.style.scrollbarColor = "#769882 #cfd8d2" })
}
//anchor
const anchorLinks = document.querySelectorAll(".js-anchor")
if (anchorLinks.length) {
    document.querySelectorAll(".js-anchor").forEach(item => {
        item.addEventListener("click", e => {
            e.preventDefault()
            let windowTop = window.pageYOffset || document.documentElement.scrollTop
            let dest = document.querySelector(item.getAttribute("href"))
            let diff = 0
            if (dest.querySelector(".reports__row") && dest.getBoundingClientRect().top < 0) {
                diff = dest.querySelector(".reports__row").clientHeight
            }
            destPos = dest.getBoundingClientRect().top < 0 ? dest.getBoundingClientRect().top - 60 : dest.getBoundingClientRect().top - 20
            if (iconMenu.classList.contains("open")) {
                iconMenu.click()
                setTimeout(() => {
                    window.scrollTo({ top: windowTop - diff + destPos, behavior: 'smooth' })
                }, 300);
            } else {
                window.scrollTo({ top: windowTop - diff + destPos, behavior: 'smooth' })
            }
        })
    })
}
//fixed header
let lastScroll = scrollPos();
window.addEventListener("scroll", () => {
    if (document.querySelector(".header__top").getBoundingClientRect().bottom < 0) {
        header.classList.add("scroll")
        header.querySelector(".header__body").classList.add("fixed-block")
        if ((scrollPos() > lastScroll && scrollPos() > 150 && !header.classList.contains("unshow"))) {
            header.classList.add("unshow")
        } else if (scrollPos() < lastScroll && header.classList.contains("unshow")) {
            header.classList.remove("unshow")
        }
    } else {
        header.classList.remove("scroll")
        header.classList.remove("unshow")
        header.querySelector(".header__body").classList.remove("fixed-block")
    }
    lastScroll = scrollPos()
})
//switch active tab/block
const switchBlock = document.querySelectorAll(".switch-block")
if (switchBlock) {
    switchBlock.forEach(item => {
        tabSwitch(item.querySelectorAll("[data-tab]"), item.querySelectorAll("[data-block]"))
    })
}
//open modal
function openModal(modal) {
    let activeModal = document.querySelector(".modal.open")
    if (!activeModal /* && !mobMenu.classList.contains("open") */) {
        disableScroll()
    }
    if (activeModal) {
        activeModal.classList.remove("open")
    }
    modal.classList.add("open")
}
//close modal
function closeModal(modal) {
    if (modal.querySelector("video")) {
        modal.querySelectorAll("video").forEach(item => item.pause())
    }
    modal.classList.remove("open")
    setTimeout(() => {
        //  if (!mobMenu.classList.contains("open")) {
        enableScroll()
        // } 
    }, animSpd);
}
// modal click outside
if (modal) {
    modal.forEach((mod) => {
        mod.addEventListener("click", (e) => {
            if (!mod.querySelector(".modal__content").contains(e.target) ||
                mod.querySelector(".btn-close").contains(e.target) ||
                (mod.querySelector(".modal__close") && mod.querySelector(".modal__close").contains(e.target))) {
                closeModal(mod);
            }
        });
    });
}
// modal button on click
if (modOpenBtn) {
    modOpenBtn.forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault()
            let href = btn.getAttribute("data-modal")
            openModal(document.getElementById(href))
        })
    })
}
// modal close button on click
if (modCloseBtn) {
    modCloseBtn.forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault()
            let href = btn.getAttribute("data-modal")
            closeModal(document.getElementById(href))
        })
    })
}
// custom fancybox
function fancyModal(e, fancyItems, fancyModalClass = false) {
    if (fancyItems) {
        fancyItems.forEach(item => {
            if (item.contains(e.target)) {
                let mediaSrc = []
                let objectFit = item.getAttribute("data-fit") ? item.getAttribute("data-fit") : "media-cover"
                let val = item.getAttribute("data-fancy")
                let thumb = item.hasAttribute("data-thumb")
                document.querySelectorAll("[data-fancy]").forEach(el => {
                    if (!el.closest(".swiper-slide-duplicate") && el.getAttribute("data-fancy") === val) {
                        mediaSrc.push({ src: el.getAttribute("data-src"), type: el.getAttribute("data-type") || 'image' })
                    }
                })
                let initialSl = mediaSrc.findIndex(el => el.src === item.getAttribute("data-src"))
                document.querySelector(".footer").insertAdjacentHTML('afterend', `
                <div class="custom-scroll modal fancy-modal ${fancyModalClass ? fancyModalClass : ''}">
                    <div class="fancy-modal__content">
                        <button type="button" class="btn btn-close"></button>
                        <div class="custom-scroll">
                            <div class="fancy-modal__mainswiper">
                                <div class="swiper">
                                    <div class="swiper-wrapper">
                                        ${mediaSrc.map((el, i) => `<div class="swiper-slide">
                                            <div class="${objectFit}">
                                                ${el.type === 'video' ? `<video ${i === initialSl ? `src='${el.src}'` : `data-src='${el.src}'`} loop autoplay playsinline mute controls></video>` : `<img src=${el.src} alt="">`}                                                
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
                                                ${el.type === 'video' ? `<img src=${item.querySelector("img").getAttribute("src")}>` : `<img src=${el.src} alt="">`}                                                
                                            </div>
                                        </div>`).join("")}
                                    </div>
                                </div>
                                <div class="swiper-nav">
                                    <button class="nav-btn nav-btn--prev">${sprite('btn-prev')}</button>
                                    <button class="nav-btn nav-btn--next">${sprite('btn-next')}</button>
                                </div>
                            </div>` : ""}
                        </div>
                    </div>
                </div>
            `);
                const fancyModal = document.querySelector(".fancy-modal")
                let fancyThumbSwiper
                if (thumb && mediaSrc.length > 1) {
                    fancyThumbSwiper = new Swiper(fancyModal.querySelector(".fancy-modal__thumbswiper .swiper"), {
                        slidesPerView: 4,
                        spaceBetween: 12,
                        observer: true,
                        observeParents: true,
                        watchSlidesProgress: true,
                        initialSlide: initialSl,
                        navigation: {
                            prevEl: fancyModal.querySelector(".nav-btn--prev"),
                            nextEl: fancyModal.querySelector(".nav-btn--next"),
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
                    let videoEl = fancyMainSwiper.slides[fancyMainSwiper.activeIndex].querySelector('video');
                    if (videoEl && videoEl.getAttribute("data-src")) {
                        videoEl.setAttribute("src", videoEl.getAttribute("data-src"))
                        videoEl.removeAttribute("data-src")
                    } else if (videoEl) {
                        videoEl.play()
                    }
                })
                openModal(fancyModal)
                fancyModal.querySelector(".btn-close").addEventListener("click", e => {
                    closeModal(fancyModal)
                    setTimeout(() => {
                        fancyModal.remove()
                    }, animSpd);
                })
            }
        })
    }
}
//open dropdown
function openDropdown(item) {
    item.classList.add("open");
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
    item.classList.remove("open");
    item.setAttribute("aria-expanded", false);
}
//dropdown
if (dropdown) {
    dropdown.forEach(item => {
        item.querySelector(".dropdown__header").addEventListener("click", () => {
            item.classList.contains("open") ? closeDropdown(item) : openDropdown(item)
        })
    })
}
//setSuccessTxt
function setSuccessTxt(title = false, txt = false, btnTxt = false) {
    successModal.querySelector("h3").textContent = title ? title : "Заявка успешно отправлена"
    successModal.querySelector(".main-btn").textContent = btnTxt ? btnTxt : "Закрыть"
    if (txt) {
        successModal.querySelector("p").textContent = txt
    }
}
//setErrorTxt
function setErrorTxt(title = false, txt = false, btnTxt = false) {
    errorModal.querySelector("h3").textContent = title ? title : "Что-то пошло не так"
    errorModal.querySelector(".main-btn").textContent = btnTxt ? btnTxt : "Закрыть"
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
            item.querySelector("input").value = ''
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
const itemForm = document.querySelectorAll(".item-form")
if (itemForm) {
    itemForm.forEach(item => {
        const resetBtn = item.querySelector(".item-form__reset")
        if (resetBtn) {
            item.querySelector("input").addEventListener("input", e => {
                if (e.target.value.length > 0) {
                    resetBtn.classList.add("show")
                } else {
                    resetBtn.classList.remove("show")
                }
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
            item.querySelector("[data-error]").textContent = `Разрешённые форматы: ${accept}`
            return
        } else {
            item.classList.remove("error")
            item.querySelector("[data-error]").textContent = ""
            let reader = new FileReader()
            reader.readAsDataURL(file);
            reader.onload = () => {
                item.querySelector(".file-form__items").insertAdjacentHTML("afterbegin", `<div class="file-form__item">
                        <div class="file-form__name">${file.name}</div>
                        <button class="btn-close file-form__del"></button>
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
// showLbl
let lblTimeout
function showLbl(el) {










    overlay.classList.add("show")
    document.querySelectorAll(".js-lbl").forEach(item => item.classList.remove("show"))
    el.classList.add("show")
    if (lblTimeout) {
        clearTimeout(lblTimeout)
    }
    lblTimeout = setTimeout(function () {
        overlay.classList.remove("show")
        el.classList.remove("show")
    }, 3500);
}
//js-fav
function favOnClick() {
    const jsFav = document.querySelectorAll(".js-fav")
    if (jsFav) {
        jsFav.forEach(item => {
            item.addEventListener("click", () => {
                clearTimeout(lblTimeout)
                if (item.classList.contains("active")) {
                    item.classList.remove("active")
                    item.setAttribute("aria-label", "Добавить в избранное")
                } else {
                    item.classList.add("active")
                    item.setAttribute("aria-label", "Удалить из избранного")
                    showLbl(document.querySelector(".js-add-fav"))
                }
            })
        })
    }
}
favOnClick()
//udalit
function addToCart(productId, count) {
    if (count > 0) {
        //showLbl(document.querySelector(".js-add-cart"))
    } else {
        //showLbl(document.querySelector(".js-remove-cart"))
    }
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
    let productID = item.closest('.js-prodBlock').dataset.id
    disabledMinusBtn(item, count)
    if (inStock) {
        disabledPlusBtn(item, count, inStock)
    }
    clearTimeout(lblTimeout)
    addToCart(productID, count)
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
            inp.addEventListener("change", e => {
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
            })
            item.querySelector(".js-minus").addEventListener("click", () => {
                if (inp.value > 1) {
                    inp.value--
                    count = inp.value;
                } else {
                    count = 0
                    if (item.closest("[data-added-to-cart]")) {
                        item.closest("[data-added-to-cart]").setAttribute("data-added-to-cart", false)
                    }
                }
                quantityOnChange(item, count, inStock)
            })
            item.querySelector(".js-plus").addEventListener("click", () => {
                inp.value++
                count = inp.value
                quantityOnChange(item, count, inStock)
            })
        })
    }
}
setQuantity()
// tippy
const tippy = document.querySelectorAll('.tippy')
const tippyContent = document.querySelector(".tippy-content")
if (tippy.length > 0) {
    let timeOut
    function move(item) {
        let top = item.getBoundingClientRect().top
        let left = item.getBoundingClientRect().left
        // tippyContent.style.left = left - tippyContent.clientWidth / 2 < 0 ? 0 : left - tippyContent.clientWidth / 2 + "px"
        tippyContent.style.top = top + 10 + "px"
        if (left - tippyContent.clientWidth / 2 + item.clientWidth / 2 < 0) {
            tippyContent.style.left = '15px'
            tippyContent.style.right = 'auto'
        } else if (
            left + tippyContent.clientWidth / 2 + item.clientWidth / 2 >
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
        tippyContent.classList.remove("show")
        timeOut = setTimeout(() => {
            tippyContent.textContent = ""
        }, 300);
    }
    tippy.forEach(item => {
        item.addEventListener("mouseenter", () => {
            clearTimeout(timeOut)
            tippyContent.textContent = item.querySelector("p").textContent
            tippyContent.classList.add("show")
            move(item)
        })
        item.addEventListener("mouseleave", leave)
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
                            let pos = scrollPos() + item.getBoundingClientRect().top - el.querySelector(".accordion__body").clientHeight - header.querySelector(".header__body").clientHeight - 10
                            window.scrollTo(0, pos)
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
//swiper 6 items
const swiper6 = document.querySelectorAll('.swiper6')
if (swiper6.length) {
    swiper6.forEach(item => {
        let itemSwiper = new Swiper(item.querySelector(".swiper"), {
            slidesPerView: 6,
            spaceBetween: 20,
            observer: true,
            observeParents: true,
            watchSlidesProgress: true,
            breakpoints: {
            },
            navigation: {
                prevEl: item.querySelector(".nav-btn--prev"),
                nextEl: item.querySelector(".nav-btn--next"),
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
            slidesPerView: 5,
            spaceBetween: 20,
            observer: true,
            observeParents: true,
            watchSlidesProgress: true,
            breakpoints: {
            },
            navigation: {
                prevEl: item.querySelector(".nav-btn--prev"),
                nextEl: item.querySelector(".nav-btn--next"),
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
            slidesPerView: 3,
            spaceBetween: 20,
            observer: true,
            observeParents: true,
            watchSlidesProgress: true,
            navigation: {
                prevEl: item.querySelector(".nav-btn--prev"),
                nextEl: item.querySelector(".nav-btn--next"),
            },
            breakpoints: {
                575.98: {
                    //slidesPerView: 3,
                },
            },
            speed: 800,
        });
    })
}
// catalog filter
const catFilter = document.querySelector(".cat-filter")
const filterSelected = document.querySelector(".filter-selected__items")
let catFilterObj
//init range slider
function initRangeSliders() {
    let rangeSliders = catFilter.querySelectorAll(".range-filter")
    rangeSliders.forEach(item => {
        let rangeStart = item.querySelector(".range-filter__start")
        let rangeEnd = item.querySelector(".range-filter__end")
        let rangeSlider = item.querySelector(".range-filter__slider")
        let rangeName = item.getAttribute("data-name")
        let rangeId = item.getAttribute("data-id")
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
        rangeStart.addEventListener("focus", () => {
            rangeStart.value = rangeStart.value.replaceAll(' ', '')
            rangeStart.setAttribute("type", "number")
        });
        rangeEnd.addEventListener("focus", () => {
            rangeEnd.value = rangeEnd.value.replaceAll(' ', '')
            rangeEnd.setAttribute("type", "number")
        });
        rangeStart.addEventListener("change", () => {
            rangeSlider.noUiSlider.set([rangeStart.value, null])
            setRangeSelected(rangeId, rangeName, [rangeStart.value, rangeEnd.value])
        });
        rangeEnd.addEventListener("change", () => {
            rangeSlider.noUiSlider.set([null, rangeEnd.value])
            setRangeSelected(rangeId, rangeName, [rangeStart.value, rangeEnd.value])
        });
        let rangeValues = [rangeStart, rangeEnd];
        rangeSlider.noUiSlider.on('update', function (values, handle) {
            rangeStart.setAttribute("type", "text")
            rangeEnd.setAttribute("type", "text")
            rangeValues[handle].value = String(parseInt(values[handle])).replace(/\B(?=(\d{3})+(?!\d))/g, " ").trim();
        });
        rangeSlider.noUiSlider.on('slide', function (values) {
            setRangeSelected(rangeId, rangeName, values)
        });
        rangeSlider.noUiSlider.on('change', function (values, handle) {
            //submit filtra
        });
    })
}
function setRangeSelected(rangeId, rangeName, values) {
    if (filterSelected.querySelector(`[data-target='${rangeId}']`)) {
        filterSelected.querySelector(`[data-target='${rangeId}']`).innerHTML = rangeName + ' ' + Math.ceil(values[0]) + '-' + Math.ceil(values[1]) + '<button class="btn-close"></button></li>'
    } else {
        filterSelected.insertAdjacentHTML("afterbegin", `<li data-target="${rangeId}">${rangeName + ' ' + Math.ceil(values[0]) + '-' + Math.ceil(values[1])}<button class="btn-close"></button></li>`)
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
            let txt = inp.parentNode.querySelector("span:last-child").textContent
            let idx = inp.getAttribute("data-id")
            let inpName = inp.getAttribute("data-name")
            let selectedTxt = inpName ? inpName + " " + txt.toLowerCase() : txt
            filterSelected.insertAdjacentHTML("afterbegin", `<li data-target="${idx}">${selectedTxt}<button class="btn-close"></button></li>`)
        },
        removeSelected: function (id) {
            if (filterSelected.querySelector(`[data-target="${id}"]`)) {
                filterSelected.querySelector(`[data-target="${id}"]`).remove()
            }
        },
        selectedOnClick: function (e) {
            filterSelected.querySelectorAll("li").forEach((item, idx) => {
                if (item.querySelector(".btn-close").contains(e.target)) {
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
        resetFilter: function () {
            catFilter.querySelectorAll("label input").forEach(inp => {
                this.uncheckInp(inp)
            })
            filterSelected.innerHTML = ""
            catFilter.querySelectorAll('.range-filter__slider').forEach(item => item.noUiSlider.reset())
        }
    }
    catFilter.querySelectorAll("label input").forEach((inp, i) => {
        let id = inp.getAttribute("data-id")
        inp.addEventListener("change", () => {
            if (inp.type === 'checkbox') {
                inp.checked ? catFilterObj.setSelected(inp) : catFilterObj.removeSelected(id)
            } else if (inp.type === 'radio') {
                catFilter.querySelectorAll(`input[name='${inp.name}']`).forEach(inp => catFilterObj.removeSelected(inp.getAttribute("data-id")))
                catFilterObj.setSelected(inp)
            }
        })
        if (inp.checked) {
            catFilterObj.setSelected(inp)
        }
    })
    filterSelected.addEventListener("click", e => catFilterObj.selectedOnClick(e))
    document.querySelectorAll(".filter-reset").forEach(item => item.addEventListener("click", () => catFilterObj.resetFilter()))
}
// catalog grid
document.querySelectorAll(".catalog-p__btn").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".catalog-p__btn").forEach(item => item.classList.remove("active"))
        document.querySelector(".catalog-p__items").style.opacity = 0
        setTimeout(() => {
            item.classList.add("active")
            document.querySelector(".catalog-p__items").setAttribute("data-column", item.getAttribute("data-column"))
            document.querySelector(".catalog-p__items").style.opacity = ""
        }, 150);
    })
})
//menu
const menuBtn = document.querySelector(".menu-btn")
const catMenu = document.querySelector(".cat-menu")
function showCatMenu() {
    if (!menuBtn.classList.contains("active")) {
        if (!document.querySelector(".modal.open") /* && !mobMenu.classList.contains("open") */) {
            disableScroll()
        }
        catMenu.style.top = menuBtn.getBoundingClientRect().bottom + "px"
        catMenu.style.maxHeight = window.innerHeight - menuBtn.getBoundingClientRect().bottom + "px"
        menuBtn.setAttribute("aria-expanded", true)
        menuBtn.classList.add("active");
        catMenu.classList.add("active")
    }
}
function unshowCatMenu() {
    if (!document.querySelector(".modal.open") /* && !mobMenu.classList.contains("open") */) {
        enableScroll()
    }
    menuBtn.setAttribute("aria-expanded", false);
    menuBtn.classList.remove("active");
    catMenu.classList.remove("active")
}
if (menuBtn && catMenu) {
    menuBtn.addEventListener("mouseenter", showCatMenu)
    catMenu.addEventListener("mouseenter", showCatMenu)
    menuBtn.addEventListener("mouseleave", unshowCatMenu)
    catMenu.addEventListener("mouseleave", unshowCatMenu)
    const catMenuNav = catMenu.querySelectorAll('[data-cat-nav]')
    const catMenuSubnavs = catMenu.querySelectorAll('[data-cat-subnav]')
    if (catMenuNav.length) {
        catMenuNav.forEach((nav, idx) => {
            nav.addEventListener("mouseenter", () => {
                if (!nav.classList.contains("active")) {
                    catMenuNav.forEach(el => {
                        el.classList.remove("active")
                    })
                    catMenuSubnavs.forEach(el => {
                        el.classList.remove("active", "animated")
                    })
                    nav.classList.add("active")
                    catMenuSubnavs[idx]?.classList.add("active")
                    setTimeout(() => {
                        catMenuSubnavs[idx]?.classList.add("animated")
                    }, 150);
                }

            })
        });
    }
    window.addEventListener("resize", unshowCatMenu)
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
//about swiper
if (document.querySelector(".main-about .swiper")) {
    let aboutSwiper
    let isInitialized
    function initAboutSwiper() {
        if (window.innerWidth <= tablet && !isInitialized) {
            isInitialized = true
            aboutSwiper = new Swiper(document.querySelector(".main-about .swiper"), {
                slidesPerView: 2,
                spaceBetween: 16,
                observer: true,
                observeParents: true,
                watchSlidesProgress: true,
                breakpoints: {
                    575.98: {
                        //slidesPerView: 3,
                    },
                },
                speed: 800,
            });
        } else if (window.innerWidth > tablet && isInitialized) {
            isInitialized = false
            aboutSwiper.destroy()
        }
    }
    initAboutSwiper()
    window.addEventListener("resize", initAboutSwiper)
}
//info swiper
if (document.querySelector(".info-about .swiper")) {
    let infoSwiper
    let isInitialized
    function initAboutSwiper() {
        if (window.innerWidth >= mob && !isInitialized) {
            isInitialized = true
            infoSwiper = new Swiper(document.querySelector(".info-about .swiper"), {
                slidesPerView: 3,
                spaceBetween: 20,
                observer: true,
                observeParents: true,
                watchSlidesProgress: true,
                breakpoints: {
                    575.98: {
                        //slidesPerView: 3,
                    },
                },
                speed: 800,
            });
        } else if (window.innerWidth < mob && isInitialized) {
            isInitialized = false
            infoSwiper.destroy()
        }
    }
    initAboutSwiper()
    window.addEventListener("resize", initAboutSwiper)
}
const product = document.querySelector(".product")
// product
if (product) {
    //product swiper
    if (product.querySelector(".swiper")) {
        let thumbSwiper
        if (product.querySelector(".product__thumbswiper")) {
            thumbSwiper = new Swiper(".product__thumbswiper", {
                slidesPerView: 5,
                spaceBetween: 12,
                observer: true,
                observeParents: true,
                watchSlidesProgress: true,
                speed: 800
            })
        }
        let mainSwiper = new Swiper(".product__mainswiper", {
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
            speed: 300
        })
    }
    product.addEventListener("click", e => fancyModal(e, document.querySelectorAll("[data-fancy]")))
    //product add to cart
    product.querySelector(".js-add-to-cart").addEventListener("click", () => {
        product.querySelector(".total-product__btns").classList.add("in-cart")
        let count = product.querySelector(".quantity input").value
        clearTimeout(lblTimeout)
        addToCart(product.dataset.id, count)
    })
}
//order
const orderP = document.querySelector(".order-p")
if (orderP) {
    const switchBlocks = orderP.querySelectorAll(".switch-block")
    function setFullAddress() {
        let city = orderP.querySelector("[data-address='city']")?.textContent || ''
        let locality = orderP.querySelector("[data-address='locality']")?.value || ''
        let street = orderP.querySelector("[data-address='street']")?.value || ''
        let home = orderP.querySelector("[data-address='home']")?.value || ''
        let addressParts = [city, locality, street, home].filter(Boolean);
        let fullAddress = addressParts.join(', ');
        document.querySelector("[data-full-address]").textContent = fullAddress
    }
    //reset on tab change
    if (switchBlocks.length) {
        switchBlocks.forEach(item => {
            item.querySelectorAll("[data-tab]").forEach(nav => {
                nav.addEventListener("click", () => {
                    item.querySelectorAll("[data-block]").forEach(block => {
                        formReset(block)
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
    if (document.querySelector("[data-address]") && document.querySelector("[data-full-address]")) {
        setFullAddress()
        document.querySelectorAll("[data-address]").forEach(item => {
            item.addEventListener("change", setFullAddress)
            if (item.closest(".item-form") && item.closest(".item-form").querySelector(".item-form__reset")) {
                item.closest(".item-form").querySelector(".item-form__reset").addEventListener("click", setFullAddress)
            }
        })
    }
    // enable/disable submit btn
    if (orderP.querySelector("[data-agree]") && orderP.querySelector(".total-cart__submit")) {
        orderP.querySelector("[data-agree]").addEventListener("change", () => {
            if (!orderP.querySelector("[data-agree]").checked) {
                orderP.querySelector(".total-cart__submit").classList.add("disabled")
            } else {
                orderP.querySelector(".total-cart__submit").classList.remove("disabled")
            }
        })
    }
}
//cart
const cartP = document.querySelector(".cart-p")
//enable / disable cart submit btn
function cartSubmitBtn(checkItems) {
    if (document.querySelector(".cart-p__form .total-cart__submit")) {
        if (!Array.from(checkItems).some(inp => inp.checked)) {
            document.querySelector(".total-cart__submit").classList.add("disabled")
        } else {
            document.querySelector(".total-cart__submit").classList.remove("disabled")
        }
    }

}
if (cartP) {
    const inStockAllCheckBtn = cartP.querySelector(".cart-p__inStock-allChek")
    const inStockCheckBtns = cartP.querySelectorAll(".item-cart--inStock .item-cart__check")
    if (inStockAllCheckBtn && inStockCheckBtns.length) {
        allCheckBtn(inStockAllCheckBtn, inStockCheckBtns)
    }
}
