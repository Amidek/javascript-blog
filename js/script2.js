'use strict';
const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add('active');
};

function generateTitleLinks(){
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';
  for (let article of articles) {
    article.classList.remove('active');
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){

  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const articleList = article.querySelector(optArticleTagsSelector);
    articleList.innerHTML = '';
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for (let tag of articleTagsArray) {
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>' + ' ';
      html = html + linkHTML;
    }
    articleList.innerHTML = html;
    const tags = document.querySelectorAll('.list-horizontal a');
    for (let tag of tags) {
      tag.addEventListener('click', tagClickHandler);
    }
  }
}
function generateTags(){

  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const articleList = article.querySelector(optArticleTagsSelector);
    articleList.innerHTML = '';
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for (let tag of articleTagsArray) {
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>' + ' ';
      html = html + linkHTML;
    }
    articleList.innerHTML = html;
    const tags = document.querySelectorAll('.list-horizontal a');
    for (let tag of tags) {
      tag.addEventListener('click', tagClickHandler);
    }
  }
}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const articles = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let article of articles) {
    /* remove class active */
    article.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const articleTags = article.getAttribute('data-tags').split(' ');
  const isVisibleLink = articleTags.find(el => el === tag);
  console.log(isVisibleLink);
  /* START LOOP: for each found tag link */
    /* add class active */
  /* END LOOP: for each found tag link */
}
  /* execute function "generateTitleLinks" with article selector as argument */
generateTitleLinks(article);

function addClickListenersToTags(){
  /* find all links to tags */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();
