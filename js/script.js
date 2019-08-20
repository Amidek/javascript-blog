'use strict';
const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
//const optTagsListSelector = '.tags .list';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';

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

function generateTitleLinks(customSelector = ''){
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
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

function calculateTagsParams(tags) {
  const params = {min: 999999, max: 0};
  for (let tag in tags) {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }

  return params;
}

function calculateTagClass() {
  const classNumber = Math.floor( 0.5 * optCloudClassCount + 1 );
  const prefix = optCloudClassPrefix + classNumber;
  return prefix;
}
calculateTagClass();
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
  event.preventDefault();
  let allTags = {};
  const visibleLinksIds = [];
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const articleTags = article.getAttribute('data-tags').split(' ');
    const isVisibleLink = articleTags.find(el => el === tag);
    if (isVisibleLink) {
      visibleLinksIds.push(article.getAttribute('id'));
    }
    if (!allTags.hasOwnProperty(tag)) {
      allTags[isVisibleLink] = 1;
    } else {
      allTags[isVisibleLink]++;
    }
  }

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  let html = '';
  for (let visibleLinkId of visibleLinksIds) {
    const linkHTML = '<li><a href="#' + visibleLinkId + '"><span>' + visibleLinkId + '</span></a></li>';
    html = html + linkHTML;
  }
  const tagList = document.querySelector('.tags');
  const tagsParams = calculateTagsParams(allTags);
  let allTagsHTML = '';
  for (let tag in allTags) {
    allTagsHTML += '<li><a href="#' + tag + '"><span>' + tag + ' </span>(' + allTags[tag] + ')</a></li>';

  }
  tagList.innerHTML = allTagsHTML;
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const authorList = article.querySelector(optArticleAuthorSelector);
    authorList.innerHTML = '';
    let html = '';
    const authorName = article.getAttribute('data-author');
    const linkHTML = '<span>by ' + authorName + '</span>';
    html = html + linkHTML;
    authorList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
      link.addEventListener('click', authorClickHandler);
    }
  }
}
generateAuthors();

function authorClickHandler(event) {
  event.preventDefault;
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
