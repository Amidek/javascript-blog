'use strict';
{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
  };

  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';
  const optArticleAuthorSelector = '.post-author.list';
  const optCloudClassCount = 5;
  const optCloudClassPrefix = 'tag-size-';


  const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    clickedElement.classList.add('active');
    const activeArticles = document.querySelectorAll('.post.active');
    for(let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);
    targetArticle.classList.add('active');
  };

  const generateTitleLinks = function(customSelector = '') {
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    for(let article of articles) {
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      html = html + linkHTML;
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    for(let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();


  const addClickListenersToLinks = function() {
    const links = document.querySelectorAll('.titles a');
    for(let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  addClickListenersToLinks();

  const calculateParams = function(tags) {
    const params = {
      max: 0,
      min: 999999
    };
    for(let tag in tags) {
      if(tags[tag] > params.max) {
        params.max = tags[tag];
      }
      if(tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }
    return params;
  };

  const calculateTagClass = function(count,params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

    return (optCloudClassPrefix, classNumber);
  };

  const generateTags = function() {
    let allTags = {};
    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles) {
      const titleList = article.querySelector(optArticleTagsSelector);
      let html = '';
      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');
      for(let tag of articleTagsArray) {
        const linkHTMLData = {id: tag, title: tag};
        const linkHTML = templates.tagLink(linkHTMLData);
        html = html + linkHTML;
        if(!allTags.hasOwnProperty(tag)) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
      titleList.innerHTML = html;
    }
    const tagList = document.querySelector('.tags');
    const tagsParams = calculateParams(allTags);
    const allTagsData = {tags: []};
    for(let tag in allTags) {
      allTagsData.tags.push({
        id:tag,
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  };

  generateTags();

  const tagClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    for(let activeTagLink of activeTagLinks) {
      activeTagLink.classList.remove('active');
    }
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    for(let tagLink of tagLinks) {
      tagLink.classList.add('active');
    }
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  const addClickListenersToTags = function() {
    const links = document.querySelectorAll('.post-tags a');
    for(let link of links) {
      link.addEventListener('click', tagClickHandler);
    }
  };

  addClickListenersToTags();

  const addClickListenersToSidebarTags = function() {
    const links = document.querySelectorAll('ul.list.tags a');
    for(let link of links) {
      link.addEventListener('click', tagClickHandler);
    }
  };

  addClickListenersToSidebarTags();


  const calculateAuthorsClass = function(count,params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

    return (optCloudClassPrefix, classNumber);
  };

  const generateAuthors = function() {
    let allTags = {};
    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles) {
      const authorList = article.querySelector(optArticleAuthorSelector);
      let html = '';
      const articleAuthor = article.getAttribute('data-author');
      const linkHTMLData = {id: articleAuthor, title: articleAuthor};
      const linkHTML = templates.authorLink(linkHTMLData);
      html = html + linkHTML;
      if(!allTags.hasOwnProperty(articleAuthor)) {
        allTags[articleAuthor] = 1;
      } else {
        allTags[articleAuthor]++;
      }
      authorList.innerHTML = html;
    }
    const tagList = document.querySelector('.authors');
    const authorsParams = calculateParams(allTags);
    const allAutorsData = {tags: []};
    for(let tag in allTags) {
      allAutorsData.tags.push({
        id: tag,
        tag: tag,
        count: allTags[tag],
        className: calculateAuthorsClass(allTags[tag], authorsParams)
      });
    }
    tagList.innerHTML = templates.authorCloudLink(allAutorsData);
  };

  generateAuthors();


  const authorClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    for(let activeAuthorLink of activeAuthorLinks) {
      activeAuthorLink.classList.remove('active');
    }
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    for(let authorLink of authorLinks) {
      authorLink.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
  };


  const addClickListenersToAuthors = function() {
    const links = document.querySelectorAll('.post-author.list a');
    for(let link of links) {
      link.addEventListener('click', authorClickHandler);
    }
  };

  addClickListenersToAuthors();

  const addClickListenersToSidebarAuthors = function() {
    const links = document.querySelectorAll('ul.list.authors a');
    for(let link of links) {
      link.addEventListener('click', authorClickHandler);
    }
  };

  addClickListenersToSidebarAuthors();

}
