exports.linkResolver = function linkResolver(doc) {
  // Route for blog posts
  if (doc.type === 'talk') {
    return '/talk/' + doc.uid;
  }
  // Homepage route fallback
  return '/';
};
