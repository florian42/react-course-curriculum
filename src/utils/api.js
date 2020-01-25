const api = `https://hacker-news.firebaseio.com/v0`;
const json = ".json?print=pretty";

function removeDead(posts) {
  return posts.filter(Boolean).filter(({ dead }) => dead !== true);
}

function removeDeleted(posts) {
  return posts.filter(({ deleted }) => deleted !== true);
}

function onlyComments(posts) {
  return posts.filter(({ type }) => type === "comment");
}

function onlyPosts(posts) {
  return posts.filter(({ type }) => type === "story");
}

export async function fetchItem(id) {
  const response = await fetch(`${api}/item/${id}${json}`);
  return response.json();
}

export async function fetchCommentsOld(ids) {
  const comments = await Promise.all(ids.map(fetchItem));
  return removeDeleted(onlyComments(removeDead(comments)));
}

export async function fetchComments(ids) {
  let comments = await Promise.all(ids.map(fetchItem));
  comments = removeDeleted(onlyComments(removeDead(comments)));
  comments = await Promise.all(
    comments.map(async comment => {
      if (comment.kids && comment.kids.length) {
        const children = await fetchComments(comment.kids);
        comment.children = children;
      }
      return comment;
    })
  );
  return comments;
}

export async function fetchMainPosts(type) {
  const response = await fetch(`${api}/${type}stories${json}`);
  let ids = await response.json();
  if (!ids) {
    throw new Error(`There was an error fetching the ${type} posts.`);
  }
  ids = ids.slice(0, 50);
  const posts = await Promise.all(ids.map(fetchItem));
  return removeDeleted(onlyPosts(removeDead(posts)));
}

export async function fetchUser(id) {
  const response = await fetch(`${api}/user/${id}${json}`);
  return await response.json();
}

export async function fetchPosts(ids) {
  const posts = await Promise.all(ids.map(fetchItem));
  return removeDeleted(onlyPosts(removeDead(posts)));
}
