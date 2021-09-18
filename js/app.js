

const sections = document.querySelectorAll('section');
const menu = document.getElementById('navbar__list');


// create navBar function
function createNavBar(){

    const fragment = document.createDocumentFragment();

    for (let section of sections){
       
        const sLink = section.getAttribute('id');
        let sectionName = section.getAttribute('data-nav')

        let list = document.createElement('li');

        list.innerHTML = `<a href="#${sLink}" class="menu__link">${sectionName}</a>`;

         fragment.appendChild(list);
    }
    menu.appendChild(fragment);
}

// find the boundings of the element to check if the element is in viewport or not
function checkSectionInViewPort(sec){
    var bounding = sec.getBoundingClientRect();
    if (bounding.top>=0){ // means section in viewport
         return true;
    }
    else{
        return false;
    }
}


// build the nav
createNavBar();


// Add class 'active' to section when near top of viewport
const anchorss = document.querySelectorAll('a');
var isScrolling;
document.addEventListener('scroll',function(){
    // active the section when it is in viewport  
    for(let section of sections){
           if (checkSectionInViewPort(section)){
                 if (!section.classList.contains('your-active-class')){
                      section.classList.add('your-active-class');
                 }      
           }
           else{
            section.classList.remove('your-active-class');
           }
    }
    // hide the navBar during scrolling and show it when stopping 
    document.querySelector(".page__header").style.cssText = "opacity: 0; visibility: hidden;";
    window.clearTimeout( isScrolling );
    isScrolling = setTimeout(function() {
        document.querySelector(".page__header").style.cssText = "opacity: 1; visibility: visible;";
	}, 210);

    //hide topButton when we are in the top of page and show it when scrolling down
    if (window.scrollY===0){
        document.querySelector("#myBtn").style.cssText = "visibility: hidden;";
    }
    else{
        document.querySelector("#myBtn").style.cssText = "visibility: visible;";
    }

    // activate the anchor link in the navBar related to the section that is in the viewport
    var current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop-1) {
            current = section.getAttribute("id"); 
        }
    });
    anchorss.forEach((anchor) => {
        
        anchor.classList.remove("active");
        if ("#"+current == anchor.getAttribute('href')){
            anchor.classList.add("active");
        }
    });


}, false);

// Scroll to anchor ID using scrollTO event

// scroll smoothly to the certain section when click on the related anchor link in the navBar
const anchors = document.querySelectorAll('a');
for (let anchor of anchors){
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// scroll to the top of the page smoothly when chick on the top button 
//that is in the right bottom corner of the page
const topBtn = document.getElementById('myBtn');

topBtn.addEventListener('click',function(){
    window.scrollTo({top: 0, behavior: 'smooth'});
});



