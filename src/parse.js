const mapPosts = (postNodes) => Array.from(postNodes).map((post) => {
  const title = post.querySelector('title')?.textContent ?? '';
  const description = post.querySelector('description')?.textContent ?? '';
  const link = post.querySelector('link')?.textContent ?? '';
  return { title, description, link };
});

export default (content, type) => {
  const parser = new DOMParser();
  const parsedContent = parser.parseFromString(content, type);
  const errorNode = parsedContent.querySelector('parsererror');

  if (errorNode) {
    throw new Error('Parsing error');
  }

  const feed = parsedContent.querySelector('channel');
  const title = feed.querySelector('title')?.textContent ?? '';
  const description = feed.querySelector('description')?.textContent ?? '';
  const link = feed.querySelector('link').textContent;
  const posts = mapPosts(feed.querySelectorAll('item'));

  return {
    title, description, link, posts,
  };
};
