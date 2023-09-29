async function get(endpoint, options) {
  // Format the endpoint into a suitable url
  endpoint = `https://www.reddit.com${endpoint.slice(0, -1)}.json`;

  // Make and await the request
  const response = await fetch(endpoint, options);

  // Return the body of the response as an Object
  return await response.json();
}

function formatTimeData(timestamp) {
  // Shorthand used for ease of reading later
  const second = 1000;
  const minute = second * 60;
  const hour   = minute * 60;
  const day    = hour   * 24;
  const week   = day    * 7;
  const month  = day    * 30;
  const year   = day    * 365;

  // If the time is less than 1 minute, return the time in seconds
  if (timestamp <= minute) {
    return `${Math.floor(timestamp / second)} seconds ago`;
  }
  // If the time is less than 1 hour, return the time in minutes
  else if (timestamp <= hour) {
    return `${Math.floor(timestamp / minute)} minutes ago`;
  }
  // If the time is less than 1 day, return the time in hours
  else if (timestamp <= day) {
    return `${Math.floor(timestamp / hour)} hours ago`;
  }
  // If the time is less than 1 week, return the time in days
  else if (timestamp <= week) {
    return `${Math.floor(timestamp / day)} days ago`;
  }
  // If the time is less than 1 month, return the time in weeks
  else if (timestamp <= month) {
    return `${Math.floor(timestamp / week)} weeks ago`;
  }
  // If the time is less than 1 year, return the time in months
  else if (timestamp <= year) {
    return `${Math.floor(timestamp / month)} months ago`;
  }
  // Otherwise, return the time in years
  else {
    return `${Math.floor(timestamp / year)} years ago`;
  }
}

function formatNumberData(number) {
  // If the number is less than 1,000, don't reformat it
  if (number < 1000) {
    return `${number}`;
  }
  // If the number is less than 1,000,000, format like this: 100.0k
  else if (number < 1000000) {
    return `${Math.floor(number / 100) / 10}k`;
  }
  // If the number is less than 1,000,000,000, format like this: 100.0m
  else if (number < 1000000000) {
    return `${Math.floor(number / 100000) / 10}m`
  }
  // If the number is less than 1,000,000,000,000, format like this: 100.0b
  else if (number < 1000000000000) {
    return `${Math.floor(number / 100000000) / 10}b`
  }
  // If the number is less than 1,000,000,000,000,000, format like this: 100.0t
  else if (number < 1000000000000000) {
    return `${Math.floor(number / 100000000000) / 10}t`
  }
}

function formatMediaData({media_metadata, gallery_data}) {
  // If either input is doesn't contain data, return nothing
  if (typeof gallery_data === 'undefined') { return []; }
  if (Object.keys(gallery_data).length < 1) { return []; }
  if (typeof media_metadata === 'undefined') { return []; }
  if (Object.keys(media_metadata).length < 1) { return []; }

  const mediaArr = [];
  Object.keys(gallery_data.items).forEach(({media_id})=>{
    const media = media_metadata[media_id];
    if (!media?.status !== 'valid') { return; }
    mediaArr.push({
      type: media.e,
      fullType: media.m,
      url: media.s.u,
      x: media.s.x,
      y: media.s.y,
    });
  });
  return mediaArr;
}

function formatPageData(page) {
  const children = page.data.children;

  return children.map(({data}) => {

    // Format the body of the comment
    let body = undefined;
    body = data?.selftext_html;
    body = data?.selftext;
    body = `<p>${body}</p>`;
    
    return {
      title: data.title,
      body,
      author: data.author,
      timeAgo: formatTimeData(data.created_utc),
      subreddit: data.subreddit,
      upvotes: formatNumberData(data.ups),
      permalink: data.permalink,
      commentCount: formatNumberData(data.num_comments),
      media: formatMediaData(data),
    };
  });
}

async function getPage(url) {
  // Request the page using the input url
  let page = await get(url);

  // If the request limit has been reached, return the error
  if (page.error === 429) { return page; }

  // If the page doesn't exist, return the error
  if (page.error === 404) { return page; }

  // Format the page data
  page = formatPageData(page);

  // Filter out all 18+ pages
  const posts = [];
  for (let post of page) {
    if (post.over_18) { continue; }
    posts.push(post);
  }

  return posts;
}

function formatCommentData({data}) {
  return data?.children?.map((reply) => {
    reply = reply.data;

    // Recursively format replies
    let replies = formatCommentData(reply.replies);

    // Format the body of the comment
    let body = undefined;
    if (reply?.selftext_html) { body = reply.selftext_html; }
    else if (reply?.selftext) { body = reply.selftext; }
    body = `<p>${body}</p>`;

    return {
      author: reply.author,
      body,
      timeAgo: formatTimeData(reply.created_utc),
      upvotes: formatNumberData(reply.ups),
      permalink: reply.permalink,
      pinned: reply.stickied,
      replies,
      replyCount: replies?.length,
    };
  });
}

async function getComments(url) {
  // Request the comments using the input url
  let comments = (await get(url))[1];
  // Format and return the comments
  return formatCommentData(comments);
}

const GET = {
  page: getPage,
  comments: getComments,
}; export default GET;
